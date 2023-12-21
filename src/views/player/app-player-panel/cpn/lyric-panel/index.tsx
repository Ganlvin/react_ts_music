import { memo, useRef, useEffect } from 'react'
import { type ReactNode, FC } from 'react'
import { LyricPanelWrapper } from './style'
import { useAppSelector, shallowEqual } from '@/stores'
import classNames from 'classnames'
import { smoothScrollTo } from '@/utils/ui-help'

interface IProps {
  children?: ReactNode
}

const LyricPanel: FC<IProps> = () => {
  const panelRef = useRef<HTMLDivElement>(null)
  const { lyricIndex, lyrics } = useAppSelector(
    (state) => ({
      lyricIndex: state.playBar.lyricIndex,
      lyrics: state.playBar.lyrics
    }),
    shallowEqual
  )
  useEffect(() => {
    if (lyricIndex > 0 && lyricIndex < 3) return
    if (!panelRef.current) return
    smoothScrollTo(panelRef.current, (lyricIndex - 3) * 32, 300)
  }, [lyricIndex])
  return (
    <LyricPanelWrapper ref={panelRef}>
      <div className="mask"></div>
      <div className="lrc-content">
        {lyrics.map((item, index) => {
          return (
            <div
              key={item.time}
              className={classNames('lrc-item', {
                active: index === lyricIndex
              })}
            >
              {item.text}
            </div>
          )
        })}
      </div>
    </LyricPanelWrapper>
  )
}

export default memo(LyricPanel)
