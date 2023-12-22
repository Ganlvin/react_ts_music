import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { ISongCategory } from '@/service/api/playlist/type'
import {
  getSongCategoryRequest,
  getCategoryPlaylistRequest
} from '@/service/api/playlist'
import { handleSongsCategory } from './handle'
import { IPlaylist } from '@/service/api/common/type'

export const getCategoriesAction = createAsyncThunk(
  'songCategories',
  (_, { dispatch }) => {
    getSongCategoryRequest().then((res) => {
      dispatch(changeCategoriesAction(handleSongsCategory(res.data)))
    })
  }
)

type query = { cat: string; offset: number; limit: number }
export const getPlaylistAction = createAsyncThunk(
  'songCategoryPlaylist',
  (query: query, { dispatch }) => {
    getCategoryPlaylistRequest(query).then((res) => {
      dispatch(changePlaylistAction(res.data))
    })
  }
)

interface IPlaylistState {
  categories: { name: string; subs: ISongCategory[] }[] | null
  playlistInfo: {
    playlists: IPlaylist[]
    total: number
  } | null
}

const initialState: IPlaylistState = {
  categories: null,
  playlistInfo: null
}

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    changeCategoriesAction(state, { payload }) {
      state.categories = payload
    },
    changePlaylistAction(state, { payload }) {
      state.playlistInfo = payload
    }
  }
})
export const { changeCategoriesAction, changePlaylistAction } =
  playlistSlice.actions
export default playlistSlice.reducer
