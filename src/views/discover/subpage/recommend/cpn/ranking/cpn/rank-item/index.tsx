import { memo } from 'react'
import { type ReactNode, FC } from 'react'
import { RankingItemWrapper } from './style'
import { IRanking } from '@/service/api/common/type'
import { getImageSize } from '@/utils/format'
import { useAppDispatch } from '@/stores'
import { getPlayerSongAction } from '@/stores/module/app-play-bar'

interface IProps {
  children?: ReactNode
  rankData: IRanking
}

const RankItem: FC<IProps> = (props) => {
  const { rankData } = props
  const { tracks = [] } = rankData
  const dispatch = useAppDispatch()

  // 播放歌曲
  function handlePlayClick(id: number, fee: number) {
    if (fee === 1) {
      console.log('需要会员')
      return
    }
    dispatch(getPlayerSongAction(id))
  }

  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(rankData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprite_cover mask"></a>
        </div>
        <div className="info">
          <div className="name">{rankData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item, index: number) => {
          return (
            <div className="item" key={item.id}>
              <div className="index">{index + 1}</div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  <button
                    className="btn sprite_02 play"
                    onClick={() => handlePlayClick(item.id, item.fee)}
                  ></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="#/discover/ranking">查看全部 &gt;</a>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(RankItem)
