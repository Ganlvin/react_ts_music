import { memo } from 'react'
import { type ReactNode, FC } from 'react'
import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'
import { useAppSelector, shallowEqual, useAppDispatch } from '@/stores'
import { changePlaySongListAction } from '@/stores/module/app-play-bar'

interface IProps {
  children?: ReactNode
  closePanel: () => void
}

const PanelHeader: FC<IProps> = (props) => {
  const { closePanel } = props
  const dispatch = useAppDispatch()
  const { playList, currentSong } = useAppSelector(
    (state) => ({
      playList: state.playBar.playSongList,
      currentSong: state.playBar.currentSong
    }),
    shallowEqual
  )
  function clearSongList() {
    dispatch(changePlaySongListAction([]))
  }
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <h3>播放列表({playList.length})</h3>
        <div className="operator">
          <button>
            <i className="sprite_playlist icon favor"></i>
            收藏全部
          </button>
          <button onClick={clearSongList}>
            <i className="sprite_playlist icon remove"></i>
            清除
          </button>
        </div>
      </HeaderLeft>
      <HeaderRight>
        {currentSong?.name}
        <div className="close sprite_playlist" onClick={closePanel}></div>
      </HeaderRight>
    </HeaderWrapper>
  )
}

export default memo(PanelHeader)
