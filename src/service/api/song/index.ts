import request from '../../index'
import { ISongDetail } from './type'
enum mainAPI {
  GetSongDetail = '/song/detail',
  GetSongLyric = '/lyric'
}

// 获取歌曲详情
export function getSongDetailRequest(ids: number) {
  return request.get<{ songs: [ISongDetail] }>({
    url: mainAPI.GetSongDetail,
    params: { ids }
  })
}

// 获取歌词详情
export function getSongLyricRequest(id: number) {
  return request.get<{ lrc: { lyric: string } }>({
    url: mainAPI.GetSongLyric,
    params: { id }
  })
}
