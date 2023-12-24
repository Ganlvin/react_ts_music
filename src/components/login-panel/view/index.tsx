import { memo, useEffect, useState } from 'react'
import { type ReactNode, FC } from 'react'
import { LoginPanelWrapper } from './style'
import {
  getQRCheckStatus,
  getQRLoginImgRequest,
  getQRLoginKeyRequest,
  PostCheckLoginStatus
} from '@/service/api/login'
import localStore from '@/utils/local-storage'
import { useAppDispatch } from '@/stores'
import { changeUserProfile } from '@/stores/module/user'
import { setCookies } from '@/utils/set-cookies'

interface IProps {
  children?: ReactNode
  closeFn: () => void
}

const LoginPanel: FC<IProps> = (props) => {
  const [QrImg, setQrImg] = useState('')
  const [QrKey, setQrKey] = useState('')
  const [QrDue, setQrDue] = useState(false)

  const dispatch = useAppDispatch()

  // 获取二维码
  useEffect(() => {
    if (QrDue) return
    async function fetchData() {
      const keyRes = await getQRLoginKeyRequest()
      const QRImgRes = await getQRLoginImgRequest(keyRes.data.data.unikey)
      setQrImg(QRImgRes.data.data.qrimg)
      setQrKey(keyRes.data.data.unikey)
    }
    fetchData()
  }, [QrDue])

  // 扫码二维码相关操作
  useEffect(() => {
    if (!QrKey) return
    let timer: ReturnType<typeof setInterval>
    async function checkQRStatus() {
      timer = setInterval(async () => {
        const statusRes = await getQRCheckStatus(QrKey)
        if (statusRes.data.code === 800) {
          setQrDue(true)
          clearInterval(timer)
        }
        if (statusRes.data.code === 803) {
          // 这一步会返回cookie
          clearInterval(timer)
          // 请求用户数据并保存
          const userData = await PostCheckLoginStatus(statusRes.data.cookie)
          const { userId, nickname, userType, avatarUrl } =
            userData.data.data.profile
          const userProfile = { userId, nickname, userType, avatarUrl }
          localStore.setCache('cookie', statusRes.data.cookie)
          localStore.setCache('userInfo', userProfile)
          setCookies(statusRes.data.cookie)
          dispatch(changeUserProfile(userProfile))
          // 关闭组件
          props.closeFn()
        }
      }, 1000)
    }
    checkQRStatus()
    return () => clearInterval(timer)
  }, [QrKey])

  return (
    <LoginPanelWrapper>
      <div className="login-container">
        <div className="login-header">
          登录 <i className="close" onClick={props.closeFn}></i>
        </div>
        <div className="login-body">
          <div className="tip-img">
            <img src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png" />
          </div>
          <div className="qr-container">
            <div className="title">扫码登录</div>
            <div className="qr">
              <img src={QrImg} alt="" />
              {QrDue && (
                <div className="qr-mask">
                  <span className="tip">二维码已经失效</span>
                  <div className="refresh" onClick={() => setQrDue(false)}>
                    点击刷新
                  </div>
                </div>
              )}
            </div>
            <div className="qr-tip">
              使用 <span style={{ color: '#0c73c2' }}>网易云音乐APP</span>{' '}
              扫码登录
            </div>
          </div>
        </div>
        <div className="login-footer">
          <button className="other-btn">选择其他登录模式</button>
        </div>
      </div>
    </LoginPanelWrapper>
  )
}

export default memo(LoginPanel)
