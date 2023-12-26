import { shallowEqual, useAppSelector } from '@/stores'
import { memo } from 'react'
import { type ReactNode, FC } from 'react'
import { RankContentWrapper } from './style'
import { getImageSize, formatMinuteSecond } from '@/utils/format'
import SectionHeaderV1 from '@/components/section-header-v1'

interface IProps {
  children?: ReactNode
}

const RankContent: FC<IProps> = () => {
  const { toplistDetail } = useAppSelector(
    (state) => ({
      toplistDetail: state.toplist.toplistDetail
    }),
    shallowEqual
  )
  return (
    <>
      {toplistDetail && (
        <RankContentWrapper>
          <SectionHeaderV1
            title="歌曲列表"
            subTitle={
              <span className="sub-title">
                {toplistDetail.tracks.length + '首歌'}
              </span>
            }
            rightPart={
              <div className="play-count">
                播放：<span className="count">{toplistDetail.playCount}</span>{' '}
                次
              </div>
            }
          ></SectionHeaderV1>
          <div className="play-list">
            <table>
              <thead>
                <tr className="header">
                  <th className="ranking"></th>
                  <th className="title">标题</th>
                  <th className="duration">时长</th>
                  <th className="singer">歌手</th>
                </tr>
              </thead>
              <tbody>
                {toplistDetail?.tracks.map((item, index) => {
                  return (
                    <tr className="rank-item" key={item.id}>
                      <td>
                        <div className="rank-num">
                          <span className="num">{index + 1}</span>
                          <span className="new sprite_icon2"></span>
                        </div>
                      </td>
                      <td>
                        <div className="song-name">
                          {index < 3 ? (
                            <img
                              src={getImageSize(item.al.picUrl, 50)}
                              alt=""
                            />
                          ) : null}
                          <span className="play sprite_table"></span>
                          <span className="name">{item.name}</span>
                          {item.videoInfo?.video && (
                            <span className="mv sprite_table"></span>
                          )}
                        </div>
                      </td>
                      <td className="time-handle">
                        <span className="time">
                          {formatMinuteSecond(item.dt)}
                        </span>
                        <div className="handle">
                          <span className="add sprite_icon2"></span>
                          <span className="collect sprite_table"></span>
                          <span className="share sprite_table"></span>
                          <span className="download sprite_table"></span>
                        </div>
                      </td>
                      <td>{item.ar[0].name}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </RankContentWrapper>
      )}
    </>
  )
}

export default memo(RankContent)
