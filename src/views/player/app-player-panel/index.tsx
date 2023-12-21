import { memo, useState, useEffect } from 'react'
import { type ReactNode, FC } from 'react'
import { PanelWrapper } from './style'
import PanelHeader from './cpn/panel-header'
import SongList from './cpn/song-list'
import LyricPanel from './cpn/lyric-panel'

interface IProps {
  children?: ReactNode
  isShow: boolean
}

const AppPlayerPanel: FC<IProps> = (props) => {
  const [showPanel, setShowPanel] = useState(props.isShow)
  useEffect(() => {
    setShowPanel(props.isShow)
  }, [props.isShow])

  function closePanel() {
    setShowPanel(false)
  }
  return (
    <div>
      {showPanel && (
        <PanelWrapper>
          <PanelHeader closePanel={closePanel} />
          <div className="main">
            <img
              className="image"
              src="https://p4.music.126.net/qeN7o2R3_OTPhghmkctFBQ==/764160591569856.jpg"
              alt=""
            />
            <SongList />
            <LyricPanel />
          </div>
        </PanelWrapper>
      )}
    </div>
  )
}

export default memo(AppPlayerPanel)
