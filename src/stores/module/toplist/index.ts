import { getToplistRequest } from '@/service/api/toplist'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IToplistType } from '@/service/api/toplist/type'
import { getRankingDetailRequest } from '@/service/api/common'
import { IRanking } from '@/service/api/common/type'

export const getToplistAction = createAsyncThunk(
  'toplist',
  (_, { dispatch }) => {
    getToplistRequest().then((res) => {
      dispatch(changeToplistAction(res.data.list))
    })
  }
)

export const getToplistDetailAction = createAsyncThunk(
  'toplistDetail',
  (id: number, { dispatch }) => {
    getRankingDetailRequest(id).then((res) => {
      dispatch(changeToplistDetailAction(res.data.playlist))
    })
  }
)

interface IToplistState {
  toplist: IToplistType[]
  toplistDetail: IRanking | null
}

const initialState: IToplistState = {
  toplist: [],
  toplistDetail: null
}

const ToplistSlice = createSlice({
  name: 'Toplist',
  initialState,
  reducers: {
    changeToplistAction(state, { payload }) {
      state.toplist = payload
    },
    changeToplistDetailAction(state, { payload }) {
      state.toplistDetail = payload
    }
  }
})

export const { changeToplistAction, changeToplistDetailAction } =
  ToplistSlice.actions
export default ToplistSlice.reducer
