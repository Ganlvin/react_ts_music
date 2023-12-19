import { memo, useEffect } from 'react'
import { type ReactNode, FC } from 'react'
import { useAppDispatch } from '@/stores'
import {
  getBannerDataAction,
  getHotRecommendAction,
  getNewAlbumAction,
  getRankingAction,
  getSettleSingerAction
} from '@/stores/module/recommend'
import Banner from './cpn/scroll-banner'
import HotRecommend from './cpn/hot-recommend'
import NewAlbum from './cpn/new-album'
import { RecommendWrapper } from './style'
import Ranking from './cpn/ranking'
import UserLogin from './cpn/user-login'
import SettleSinger from './cpn/settle-singer'
import HotAnchor from './cpn/hot-anchor'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getBannerDataAction())
    dispatch(getHotRecommendAction())
    dispatch(getNewAlbumAction())
    dispatch(getRankingAction())
    dispatch(getSettleSingerAction())
  }, [])
  return (
    <RecommendWrapper>
      <Banner></Banner>
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend />
          <NewAlbum />
          <Ranking />
        </div>
        <div className="right">
          <UserLogin />
          <SettleSinger />
          <HotAnchor />
        </div>
      </div>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
