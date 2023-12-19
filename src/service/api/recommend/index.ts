import request from '../../index'
import { IBanner, IHotRecommend, IRanking } from './type'
import { IAlbum, IArtist } from '@/service/type'

enum mainAPI {
  GetBanner = '/banner',
  GetHotRecommend = '/personalized',
  GetNewAlbum = '/album/newest',
  GetRanking = '/playlist/detail',
  GetSettleSinger = '/artist/list'
}

// 轮播图片信息
export function getBannerRequest() {
  return request.get<{ banners: IBanner }>({
    url: mainAPI.GetBanner
  })
}

// 获取热门推荐歌单
export function getHotRecommendRequest(limit = 30) {
  return request.get<{ result: IHotRecommend[] }>({
    url: mainAPI.GetHotRecommend,
    params: { limit }
  })
}

// 获取新碟上架数据
export function getNewAlbumRequest() {
  return request.get<{ albums: IAlbum[] }>({ url: mainAPI.GetNewAlbum })
}

// 获取排行榜
export function getRankingRequest(id: number) {
  return request.get<{ playlist: IRanking }>({
    url: mainAPI.GetRanking,
    params: { id }
  })
}

// 获取入住歌手
export function getSettleSingerRequest(limit = 30) {
  return request.get<{ artists: IArtist }>({
    url: mainAPI.GetSettleSinger,
    params: { limit }
  })
}
