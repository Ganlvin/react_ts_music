import { memo } from 'react'
import { type ReactNode, FC } from 'react'
import SectionHeaderV1 from '@/components/section-header-v1'
import RankItem from './cpn/rank-item'
import { RankingWrapper } from './style'
import { shallowEqual, useAppSelector } from '@/stores'

interface IProps {
  children?: ReactNode
}

const Ranking: FC<IProps> = () => {
  const { rankings } = useAppSelector(
    (state) => ({
      rankings: state.recommend.rankings
    }),
    shallowEqual
  )

  return (
    <RankingWrapper>
      <SectionHeaderV1
        title="榜单"
        moreLink="/discover/ranking"
      ></SectionHeaderV1>
      <div className="content">
        {rankings.map((item) => {
          return <RankItem key={item.id} rankData={item} />
        })}
      </div>
    </RankingWrapper>
  )
}

export default memo(Ranking)
