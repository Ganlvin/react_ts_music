import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector,
  useDispatch,
  TypedUseSelectorHook,
  shallowEqual as reduxShallowEqual
} from 'react-redux'
import recommend from './module/recommend'
import playBar from './module/app-play-bar'
import toplist from './module/toplist'

const store = configureStore({
  reducer: {
    recommend,
    playBar,
    toplist
  }
})

type GetStateFnType = typeof store.getState
type DispatchType = typeof store.dispatch
export type IRootState = ReturnType<GetStateFnType>

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqual = reduxShallowEqual

export default store
