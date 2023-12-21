import { useAppSelector, shallowEqual, useAppDispatch } from '@/stores'
import { memo } from 'react'
import { type ReactNode, FC } from 'react'
import { SongListWrapper, NoContentWrapper } from './style'
import classNames from 'classnames'
import { formatTime } from '@/utils/format'
import { Link } from 'react-router-dom'
import { getPlayerSongAction } from '@/stores/module/app-play-bar'

interface IProps {
  children?: ReactNode
}

const SongList: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  const { playList, currentSongIndex } = useAppSelector(
    (state) => ({
      playList: state.playBar.playSongList,
      currentSongIndex: state.playBar.playSetting.index
    }),
    shallowEqual
  )

  // 播放歌曲
  function handlePlayClick(id: number) {
    dispatch(getPlayerSongAction(id))
  }
  return (
    <SongListWrapper>
      <div className="mask"></div>
      {playList.map((item, index) => {
        return (
          <div
            key={item.id}
            className={classNames('play-item', {
              active: currentSongIndex === index
            })}
            onClick={() => handlePlayClick(item.id)}
          >
            <div className="left">{item.name}</div>
            <div className="right">
              <span className="singer one-line">{item.ar[0].name}</span>
              <span className="duration">{formatTime(item.dt)}</span>
              <span className="sprite_playlist link"></span>
            </div>
          </div>
        )
      })}
      {!playList.length && (
        <NoContentWrapper>
          <div className="no-content">
            <i className="ico sprite_playlist"></i> 你还没有添加任何歌曲
            <br />
            去首页
            <Link className="link" to={'/discover'}>
              发现音乐
            </Link>
            ，或在
            <Link className="link" to={'/mine'}>
              {' '}
              我的音乐
            </Link>
            收听自己收藏的歌单。
          </div>
        </NoContentWrapper>
      )}
    </SongListWrapper>
  )
}

export default memo(SongList)
