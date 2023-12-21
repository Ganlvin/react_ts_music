import type { IRootState } from '@/stores'
import type { ILyric, ISongDetail } from '@/service/api/song/type'

export interface IThunkState {
  state: IRootState
}

export interface IAppPlayBarState {
  currentSong: ISongDetail | null
  playSongList: ISongDetail[]
  lyrics: ILyric[]
  lyricIndex: number
  playSetting: IPlaySetting
}

export interface IPlaySetting {
  mode: number // 0:顺序播放 1:随机播放 2:单曲循环
  volume: number
  autoPlay: boolean
  index: number
  lock: boolean
}
