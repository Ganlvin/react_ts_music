import { createSlice } from '@reduxjs/toolkit'
import localStorage from '@/utils/local-storage'

interface IUserInfoState {
  profile: {
    userId: number
    nickname: string
    userType: number
    avatarUrl: string
  }
}

const initialState: IUserInfoState = {
  profile: localStorage.getCache('userInfo') ?? {
    userId: 0,
    nickname: '',
    userType: 0,
    avatarUrl: ''
  }
}

const UserInfoSlice = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    changeUserProfile(state, { payload }) {
      state.profile = payload
    }
  }
})

export const { changeUserProfile } = UserInfoSlice.actions
export default UserInfoSlice.reducer
