import request from '../../index'
import { IPlaylist } from '../common/type'
import type { ISongCategoryData, playListQuery } from './type'
enum mainAPI {
  GetCategories = '/playlist/catlist',
  GetCategoriesPlaylist = '/top/playlist'
}

// 获取所有歌曲分类数据
export function getSongCategoryRequest() {
  return request.get<ISongCategoryData>({
    url: mainAPI.GetCategories
  })
}

// 获取选择歌曲分类的歌单
export function getCategoryPlaylistRequest(
  query: playListQuery = { cat: '全部', limit: 35, offset: 0 }
) {
  return request.get<{ playlists: IPlaylist[]; total: number }>({
    url: mainAPI.GetCategoriesPlaylist,
    params: query
  })
}
