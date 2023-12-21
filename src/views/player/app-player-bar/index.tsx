import { memo, useState, useRef, useEffect } from 'react'
import { type ReactNode, FC } from 'react'
import { Link } from 'react-router-dom'
import {
  PlayerBarWrapper,
  BarControl,
  BarOperator,
  BarPlayerInfo,
  VolumeBar
} from './style'
import { Slider } from 'antd'
import { shallowEqual, useAppSelector, useAppDispatch } from '@/stores'
import { getImageSize, formatTime } from '@/utils/format'
import { getSongPlayUrl } from '@/utils/handle-player'
import {
  changeLyricIndexAction,
  changePlaySettingAction,
  changeMusicAction,
  getSongLyricAction
} from '@/stores/module/app-play-bar'
import AppPlayerPanel from '../app-player-panel'
import { useClickOtherClose } from '@/hooks/click-close'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  const dispatch = useAppDispatch()

  const { currentSong, lyrics, playSetting, lyricIndex, playSongList } =
    useAppSelector(
      (state) => ({
        currentSong: state.playBar.currentSong,
        lyrics: state.playBar.lyrics,
        playSetting: state.playBar.playSetting,
        lyricIndex: state.playBar.lyricIndex,
        playSongList: state.playBar.playSongList
      }),
      shallowEqual
    )
  /** 组件内的副作用操作 */
  useEffect(() => {
    if (!currentSong) {
      setIsFirstLoad(false)
      return
    }
    audioRef.current!.src = getSongPlayUrl(currentSong!.id)
    audioRef.current!.volume = playSetting.volume
    // 1.获取音乐的总时长
    setDuration(currentSong!.dt)
    // 2. 获取歌词
    dispatch(getSongLyricAction(currentSong.id))

    if (isFirstLoad) {
      setIsFirstLoad(false)
      return
    }
    // 3.播放音乐
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
        console.log('歌曲播放成功')
      })
      .catch((err) => {
        setIsPlaying(false)
        console.log('歌曲播放失败:', err)
      })
  }, [currentSong])

  /** 音乐播放的进度处理 */
  function handleTimeUpdate() {
    // 1.获取当前的播放时间
    const currentTime = audioRef.current!.currentTime * 1000

    // 2.计算当前歌曲进度
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    // 3.根据当前的时间匹配对应的歌词
    // currentTime/lyrics
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }

    // 4.匹配上对应的歌词的index
    if (lyricIndex === index || index === -1) return
    dispatch(changeLyricIndexAction(index))
  }

  function handleTimeEnded() {
    if (playSetting.mode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeMusic(true)
    }
  }

  /** 组件内部的事件处理 */
  // 播放或暂停
  function handlePlayBtnClick() {
    // 1.控制播放器的播放/暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    // 2.改变isPlaying的状态
    setIsPlaying(!isPlaying)
  }

  // 切换歌曲
  function handleChangeMusic(isNext = true) {
    dispatch(changeMusicAction(isNext))
  }
  // 改变播放模式
  function handleChangePlayMode() {
    let newPlayMode = playSetting.mode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlaySettingAction({ ...playSetting, mode: newPlayMode }))
  }
  // 滑动进度条
  function handleSliderChanging(value: number) {
    // 0.目前是处于拖拽状态
    setIsSliding(true)

    // 1.设置progress
    setProgress(value)

    // 2.获取value对应位置的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }
  // 当进度条完成改变
  function handleSliderChangeComplete(value: number) {
    // 1.获取点击位置的时间
    const currentTime = (value / 100) * duration

    // 2.设置当前播放的时间
    audioRef.current!.currentTime = currentTime / 1000

    // 3.currentTime/progress
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }
  // 修改音量
  function handleChangeVolume(value: number) {
    const volume = value / 100
    audioRef.current!.volume = value / 100
    dispatch(changePlaySettingAction({ ...playSetting, volume }))
  }

  // 点击元素外其他地方关闭面板
  const closeRef = useClickOtherClose(() => {
    setShowVolume(false)
    setShowPanel(false)
  })

  return (
    <PlayerBarWrapper className="sprite_play_bar" ref={closeRef}>
      {String(showPanel)}
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button
            className="btn sprite_play_bar prev"
            onClick={() => handleChangeMusic(false)}
          ></button>
          <button
            className="btn sprite_play_bar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_play_bar next"
            onClick={() => handleChangeMusic()}
          ></button>
        </BarControl>
        <BarPlayerInfo>
          <div className="player-img">
            <Link to="/player" className="sprite_play_bar"></Link>
            <img
              className="image"
              src={
                getImageSize(currentSong?.al.picUrl ?? '', 50) ||
                'https://s4.music.126.net/style/web2/img/default/default_album.jpg'
              }
              alt=""
            />
          </div>

          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* Slider组件 */}
              <Slider
                value={progress}
                step={0.5}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onChangeComplete={handleSliderChangeComplete}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator playMode={playSetting.mode} volume={playSetting.volume}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_play_bar favor"></button>
            <button className="btn sprite_play_bar share"></button>
          </div>
          <div className="right sprite_play_bar">
            <button
              className="btn sprite_play_bar volume"
              onClick={() => setShowVolume(!showVolume)}
            >
              {/* 音量控制 */}
              {showVolume && (
                <VolumeBar>
                  <div
                    className="volume-bar"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bar-bgc sprite_play_bar"></div>
                    <Slider
                      value={playSetting.volume * 100}
                      vertical
                      tooltip={{ formatter: null }}
                      onChange={handleChangeVolume}
                    />
                  </div>
                </VolumeBar>
              )}
            </button>
            <button
              className="btn sprite_play_bar loop"
              onClick={handleChangePlayMode}
            ></button>
            <button
              className="btn sprite_play_bar playlist"
              onClick={() => setShowPanel(!showPanel)}
            >
              {playSongList.length}
            </button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      />
      <AppPlayerPanel isShow={showPanel} />
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
