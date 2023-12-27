import request from '../../index'
import { ICatelist, IRadio } from './type'

enum mainAPI {
  GetDjCatelist = '/dj/catelist',
  GetDjRecommend = '/dj/recommend/type',
  GetDjRadioHot = '/dj/radio/hot'
}

// 获取主播电台分类
export function getDjRadioCatelistRequest() {
  return request.get<{ categories: ICatelist[] }>({
    url: mainAPI.GetDjCatelist
  })
}

// 获取主播电台推荐节目
export function getDjRadioRecommendRequest(type: string) {
  return request.get<{ djRadios: IRadio[] }>({
    url: mainAPI.GetDjRecommend,
    params: { type }
  })
}

// 获取节目排行榜
export function getDjRadiosHotRequest(
  cateId: string,
  limit: number,
  offset: number
) {
  return request.get<{ djRadios: IRadio[] }>({
    url: mainAPI.GetDjRadioHot,
    params: { cateId, limit, offset }
  })
}
