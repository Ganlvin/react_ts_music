import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getSongDetailRequest, getSongLyricRequest } from '@/service/api/song'
import { parseLyric } from '@/utils/parse-lyric'
import localStorage from '@/utils/local-storage'
import type { IThunkState, IAppPlayBarState, IPlaySetting } from './type'

export const getPlayerSongAction = createAsyncThunk<void, number, IThunkState>(
  'playerSong',
  (id, { dispatch, getState }) => {
    // 准备播放某一首歌曲时, 分成两种情况
    // 1.从列表尝试是否可以获取到这首歌
    const playSongList = getState().playBar.playSongList
    const playSetting = getState().playBar.playSetting
    const findIndex = playSongList.findIndex((item) => item.id === id)
    if (findIndex === -1) {
      getSongDetailRequest(id).then((res) => {
        // 1.获取song
        if (!res.data.songs.length) {
          console.warn('获取歌曲信息失败:', res)
          return
        }
        const song = res.data.songs[0]
        const newPlaySongList = [...playSongList]
        newPlaySongList.push(song)
        const newIndex = newPlaySongList.length - 1

        dispatch(changeSongDetailAction(song))
        dispatch(changePlaySongListAction(newPlaySongList))
        dispatch(changePlaySettingAction({ ...playSetting, index: newIndex }))
      })
    } else {
      // 找到了相同的item
      const song = playSongList[findIndex]
      dispatch(changeSongDetailAction(song))
      dispatch(changePlaySettingAction({ ...playSetting, index: findIndex }))
    }
  }
)

export const getSongLyricAction = createAsyncThunk(
  'getSongLyric',
  (id: number, { dispatch }) => {
    getSongLyricRequest(id).then((res) => {
      // 1.获取歌词的字符串
      const lyricString = res.data.lrc.lyric
      // 2.对歌词进行解析(一个个对象)
      const lyrics = parseLyric(lyricString)
      // 3.将歌词放到state中
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changeMusic',
  (isNext, { dispatch, getState }) => {
    // 1.获取state中的数据
    const player = getState().playBar
    const playSetting = player.playSetting
    const playMode = playSetting.mode
    const songIndex = playSetting.index
    const songList = player.playSongList

    // 2.根据不同的模式计算不同的下一首歌曲的索引
    let newIndex = songIndex
    if (playMode === 1) {
      // 随机播放
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      // 单曲顺序和顺序播放
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      if (newIndex > songList.length - 1) newIndex = 0
      if (newIndex < 0) newIndex = songList.length - 1
    }

    // 3.获取当前的歌曲
    const song = songList[newIndex]
    dispatch(changeSongDetailAction(song))
    dispatch(changePlaySettingAction({ ...playSetting, index: newIndex }))
  }
)

function initialState(): IAppPlayBarState {
  const playSongList = localStorage.getCache('track-queue') ?? []
  const playSetting = localStorage.getCache('play-setting') ?? {
    mode: 0, // 0:顺序播放 1:随机播放 2:单曲循环
    volume: 0.5, // 音量
    autoPlay: false,
    index: 0, // 播放第几个歌曲
    lock: false
  }
  const currentSong = playSongList[playSetting.index] ?? null
  const State: IAppPlayBarState = {
    currentSong,
    playSongList,
    lyrics: [],
    lyricIndex: -1,
    playSetting
  }

  return State
}

const AppPlayBarSlice = createSlice({
  name: 'AppPlayBar',
  initialState: initialState(),
  reducers: {
    changeSongDetailAction(state, { payload }) {
      state.currentSong = { ...payload }
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySettingAction(state, action: PayloadAction<IPlaySetting>) {
      localStorage.setCache('play-setting', action.payload)
      state.playSetting = action.payload
    },
    changePlaySongListAction(state, { payload }) {
      localStorage.setCache('track-queue', payload)
      state.playSongList = payload
    }
  }
})

export const {
  changeSongDetailAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changePlaySongListAction,
  changePlaySettingAction
} = AppPlayBarSlice.actions
export default AppPlayBarSlice.reducer
