import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IBanner } from '@/service/api/recommend/type'
import { IAlbum, IArtist, IRanking, IPlaylist } from '@/service/api/common/type'
import { IResultType } from '@/service/request/type'
import {
  getBannerRequest,
  getHotRecommendRequest,
  getNewAlbumRequest,
  getSettleSingerRequest
} from '@/service/api/recommend'
import { getRankingDetailRequest } from '@/service/api/common'

export const getBannerDataAction = createAsyncThunk(
  'banners',
  (_, { dispatch }) => {
    getBannerRequest().then((res) => {
      dispatch(changeBannersAction(res.data.banners))
    })
  }
)

export const getHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  (_, { dispatch }) => {
    getHotRecommendRequest(8).then((res) => {
      dispatch(changeHotRecommendAction(res.data.result))
    })
  }
)

export const getNewAlbumAction = createAsyncThunk(
  'newAlbum',
  (_, { dispatch }) => {
    getNewAlbumRequest().then((res) => {
      dispatch(changeNewAlbumsAction(res.data.albums))
    })
  }
)

const rankingIds = [19723756, 3779629, 2884035]
export const getRankingAction = createAsyncThunk(
  'ranking',
  (_, { dispatch }) => {
    // 将三个结果都拿到, 统一放到一个数组中管理
    // 保障一: 获取到所有的结果后, 进行dispatch操作
    // 保障二: 获取到的结果一定是有正确的顺序
    type ResType = IResultType<{ playlist: IRanking }>
    const promises: Promise<ResType>[] = []
    for (const id of rankingIds) {
      promises.push(getRankingDetailRequest(id))
    }
    Promise.all(promises).then((res) => {
      const playlists = res.map((item) => item.data.playlist)
      dispatch(changeRankingsAction(playlists))
    })
  }
)

export const getSettleSingerAction = createAsyncThunk(
  'settleSinger',
  (_, { dispatch }) => {
    getSettleSingerRequest(5).then((res) => {
      dispatch(changeSettleSingerAction(res.data.artists))
    })
  }
)

interface IRecommendState {
  banners: IBanner[]
  hotRecommends: IPlaylist[]
  newAlbums: IAlbum[]
  rankings: IRanking[]
  settleSingers: IArtist[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: [],
  settleSingers: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }) {
      state.newAlbums = payload
    },
    changeRankingsAction(state, { payload }) {
      state.rankings = payload
    },
    changeSettleSingerAction(state, { payload }) {
      state.settleSingers = payload
    }
  }
})

export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAlbumsAction,
  changeRankingsAction,
  changeSettleSingerAction
} = recommendSlice.actions
export default recommendSlice.reducer
