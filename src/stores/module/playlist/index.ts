import { createSlice } from '@reduxjs/toolkit'

interface IPlaylistState {}

const initialState: IPlaylistState = {}

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {}
})

export default playlistSlice.reducer
