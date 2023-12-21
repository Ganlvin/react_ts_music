import request from '../../index'
import { IToplistType } from './type'

enum mainAPI {
  GetToplist = '/toplist'
}

// 获取排行榜列表
export function getToplistRequest() {
  return request.get<{ list: IToplistType[] }>({
    url: mainAPI.GetToplist
  })
}
