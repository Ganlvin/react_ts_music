import {
  getDjRadioCatelistRequest,
  getDjRadioRecommendRequest,
  getDjRadiosHotRequest
} from '@/service/api/djradio'
import { ICatelist, IRadio } from '@/service/api/djradio/type'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCategoriesAction = createAsyncThunk(
  'DjRadioCategories',
  (_, { dispatch }) => {
    getDjRadioCatelistRequest().then((res) => {
      dispatch(changeCategoriesAction(res.data.categories))
    })
  }
)

export const getRadioRecommendAction = createAsyncThunk(
  'DjRadioRecommends',
  (type: string, { dispatch }) => {
    getDjRadioRecommendRequest(type).then((res) => {
      dispatch(changeRecommendAction(res.data.djRadios))
    })
  }
)

export const getRadioRankAction = createAsyncThunk(
  'DjRadioRank',
  (query: { cateId: string; limit: number; offset: number }, { dispatch }) => {
    const { cateId, limit, offset } = query
    getDjRadiosHotRequest(cateId, limit, offset).then((res) => {
      dispatch(changeRankRadiosAction(res.data.djRadios))
    })
  }
)

interface IDjRadioState {
  categories: ICatelist[]
  recommends: IRadio[]
  rankRadios: IRadio[]
}

const initialState: IDjRadioState = {
  categories: [],
  recommends: [],
  rankRadios: []
}

const DjRadioSlice = createSlice({
  name: 'DjRadio',
  initialState,
  reducers: {
    changeCategoriesAction(state, { payload }) {
      state.categories = payload
    },
    changeRecommendAction(state, { payload }) {
      state.recommends = payload
    },
    changeRankRadiosAction(state, { payload }) {
      state.rankRadios = payload
    }
  }
})

export const {
  changeCategoriesAction,
  changeRecommendAction,
  changeRankRadiosAction
} = DjRadioSlice.actions
export default DjRadioSlice.reducer
