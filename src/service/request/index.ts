import axios, { type AxiosInstance } from 'axios'
import type {
  RequestInterceptors,
  RequestConfig,
  Response,
  InterceptorsConfig,
  IResultType
} from './type' //导入接口
import qs from 'qs'
const pendingRequests = new Map() // 存放正在请求 的请求
let isNotRefreshing = true //标志当前是否正在刷新 accessToken

let requests: any[] = [] //请求队列

class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  maxRetry: number

  constructor(config: RequestConfig) {
    // 构造器 当类创建时 会执行里面代码 config 是创建时要求传入的 对象
    // 1.创建axios的实例
    this.instance = axios.create(config)
    //config 是 WLRequestConfig 这个类型 所以会有 interceptors属性
    this.interceptors = config.interceptors
    // 最大重试次数
    this.maxRetry = 5

    //所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config: InterceptorsConfig) => {
        // 生成本次字符串key
        const requestKey = [
          config.method,
          config.url,
          qs.stringify(config.params),
          qs.stringify(config.data)
        ].join('&')
        // 如果 重复的请求，cancel 掉当前请求
        if (pendingRequests.has(requestKey)) {
          config.cancelToken = new axios.CancelToken((cancel) => {
            // cancel 函数的参数会作为 promise 的 error 被捕获
            cancel(`重复的请求被主动拦截: ${requestKey}`)
          })
        } else {
          pendingRequests.set(requestKey, config)
          config.requestKey = requestKey
        }
        return config
      },
      (err) => {
        // 这里出现错误可能是网络波动造成的，清空 pendingRequests 对象 允许重发
        pendingRequests.clear()
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res: Response) => {
        // 拿到本次的Key,请求这次请求记录
        const requestKey = res.config.requestKey
        pendingRequests.delete(requestKey)

        // 如果 token 无效,判断是否已经有请求在刷新token
        if (res.status === 1005) {
          // 没有之前都没有请求刷新token 则这次为 刷新的请求
          if (isNotRefreshing) {
            res.config.isNotRefreshing = true
            isNotRefreshing = false
            return res
          } else {
            // 之前已经有请求正在请求ing
            res.config.isNotRefreshing = false
            return res
          }
        }
        isNotRefreshing = true
        return res
      },
      (err) => {
        console.log(err)
        // 如果是 主动取消的 则打印错误 直接返回
        if (axios.isCancel(err)) {
          console.warn(err)
          return Promise.reject(err)
        }
        if (axios.isAxiosError(err)) {
          const code = err.response?.status
          // 如果错误是 404,500 不再重复请求
          if (code === 404 || code === 500) {
            console.warn(err)
            return Promise.reject(err)
          }
        }

        //如果是返回某些错误 则清空 map ,允许重发请求
        pendingRequests.clear()

        // 如果取不到config 返回错误
        if (!err.response.config) return Promise.reject(err)

        // 取出 retryCount 默认为 0
        let { retryCount = 0 } = err.response.config
        // 超过最大重试次数停止
        if (retryCount >= this.maxRetry) {
          return Promise.reject(err)
        }

        // 如果出错 1.5s后 重试
        setTimeout(() => {
          retryCount++
          err.response.config.retryCount = retryCount
          this.instance(err.response.config)
        }, 1500)

        return Promise.reject(err)
      }
    )

    // 使用拦截器 这里的拦截器 是单个类 config 传入的拦截器
    //axios.interceptors.request.use(fn1,fn2)
    // fn1: 请求发送成功会执行的函数
    // fn2: 请求发送失败会执行的函数
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
  }

  // 在类里面定义一个方法 使用这个方法需要传入 config参数
  // 里面有单独请求拦截器的逻辑
  request<T>(config: RequestConfig<T>): Promise<IResultType<T>> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        // 如果有传入请求拦截器 调用处理函数 处理响应 再把请求赋值出去
        config = config.interceptors.requestInterceptors(
          config as InterceptorsConfig
        )
      }
      this.instance
        .request<any, IResultType<T>>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            // 如果有传入响应拦截器 调用处理函数 处理响应结果 再把结果赋值出去
            res = config.interceptors.responseInterceptors(res)
          }

          resolve(res)
        })
        .catch((err) => {
          if (config.interceptors?.responseInterceptorsCatch) {
            config.interceptors?.responseInterceptorsCatch(err)
          }
          reject(err)
          return err
        })
    })
  }
  //定义其他函数
  get<T>(config: RequestConfig<T>): Promise<IResultType<T>> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: RequestConfig<T>): Promise<IResultType<T>> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: RequestConfig<T>): Promise<IResultType<T>> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: RequestConfig<T>): Promise<IResultType<T>> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  // 对外暴露一个方法 清空pendingRequests列表
  clearRequestList() {
    pendingRequests.clear()
  }

  // 往队列中添加请求
  addRequest(func: any) {
    requests.push(func)
  }

  // 重新请求队列中的 请求
  runRequest() {
    isNotRefreshing = true

    //执行requests队列中的请求，（requests中存的不是请求参数，而是请求的Promise函数，这里直接拿来执行就好）
    requests.forEach((run) => run())

    //将请求队列置空
    requests = []
  }
}

export default Request
