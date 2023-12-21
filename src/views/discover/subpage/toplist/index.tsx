import { memo, useEffect } from 'react'
import { type ReactNode, FC } from 'react'
import RankHeader from './cpn/rank-header'
import RankContent from './cpn/rank-content'
import { TopListWrapper, TopListLeft, TopListRight } from './style'
import RankList from './cpn/rank-list'
import { useAppDispatch } from '@/stores'
import { getToplistAction } from '@/stores/module/toplist'
interface IProps {
  children?: ReactNode
}

const TopList: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getToplistAction())
  }, [])
  return (
    <TopListWrapper className="wrap-v2">
      <TopListLeft>
        <RankList></RankList>
      </TopListLeft>
      <TopListRight>
        <RankHeader></RankHeader>
        <RankContent></RankContent>
      </TopListRight>
    </TopListWrapper>
  )
}

export default memo(TopList)
