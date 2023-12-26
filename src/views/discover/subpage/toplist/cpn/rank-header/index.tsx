import { memo } from 'react'
import { type ReactNode, FC } from 'react'
import { RankingHeaderWrapper } from './style'
import SongOperationBar from '@/components/song-operation-bar'
import { formatMonthDay } from '@/utils/format'
import { shallowEqual, useAppSelector } from '@/stores'

interface IProps {
  children?: ReactNode
}

const RankHeader: FC<IProps> = () => {
  const { rankInfo, toplist } = useAppSelector(
    (state) => ({
      rankInfo: state.toplist.toplistDetail,
      toplist: state.toplist.toplist
    }),
    shallowEqual
  )
  const updateTime = toplist.find((i) => i.id == String(rankInfo?.id))
    ?.updateFrequency
  return (
    <>
      {rankInfo && (
        <RankingHeaderWrapper>
          <div className="image">
            <img src={rankInfo.coverImgUrl} alt="" />
            <span className="image_cover sprite_cover"></span>
          </div>
          <div className="info">
            <h2 className="title">{rankInfo.name}</h2>
            <div className="time">
              <i className="clock sprite_icon2"></i>
              <div>最近更新：{formatMonthDay(rankInfo.updateTime)}</div>
              <div className="update-f">（{updateTime}）</div>
            </div>
            <SongOperationBar
              favorTitle={`(${rankInfo.subscribedCount})`}
              shareTitle={`(${rankInfo.shareCount})`}
              downloadTitle="下载"
              commentTitle={`(${rankInfo.commentCount})`}
            />
          </div>
        </RankingHeaderWrapper>
      )}
    </>
  )
}

export default memo(RankHeader)
