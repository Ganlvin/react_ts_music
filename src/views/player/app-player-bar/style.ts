import styled from 'styled-components'
import pipIcon from '@/assets/img/pip_icon.png'
import processBar from '@/assets/img/progress_bar.png'
import spriteIcon from '@/assets/img/sprite_icon.png'
import volumeBar from '@/assets/img/playbar_sprite.png'

export const PlayerBarWrapper = styled.div`
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  height: 52px;
  background-position: 0 0;
  background-repeat: repeat;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    z-index: 99;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 47px;
  }
`
interface IBarControl {
  isPlaying: boolean
}
export const BarControl = styled.div<IBarControl>`
  display: flex;
  align-items: center;

  .btn {
    cursor: pointer;
  }

  .prev,
  .next {
    width: 28px;
    height: 28px;
  }

  .prev {
    background-position: 0 -130px;
    &:hover {
      background-position: -30px -130px;
    }
  }

  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: 0 ${(props) => (props.isPlaying ? '-165px' : '-204px')};
    &:hover {
      background-position: -40px -204px;
    }
  }

  .next {
    background-position: -80px -130px;
    &:hover {
      background-position: -110px -130px;
    }
  }
`
export const BarPlayerInfo = styled.div`
  display: flex;
  width: 642px;
  align-items: center;

  .player-img {
    position: relative;
    .image {
      width: 34px;
      height: 34px;
      border-radius: 5px;
    }
    a {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      display: block;
      z-index: 1;
      background-position: 0 -80px;
    }
  }

  .info {
    flex: 1;
    color: #a1a1a1;
    margin-left: 10px;

    .song {
      color: #e1e1e1;
      position: relative;
      top: 8px;
      left: 8px;

      .singer-name {
        color: #a1a1a1;
        margin-left: 10px;
      }
    }

    .progress {
      display: flex;
      align-items: center;

      .ant-slider {
        position: relative;
        top: -3px;
        width: 493px;
        margin-right: 10px;

        .ant-slider-rail {
          height: 9px;
          background: url(${processBar}) right 0;
        }

        .ant-slider-track {
          height: 9px;
          background: url(${processBar}) left -66px;
        }

        .ant-slider-handle {
          width: 22px;
          height: 24px;
          border: none;
          margin-top: -5px;
          background: url(${spriteIcon}) 0 -250px;
          &::after {
            opacity: 0;
          }
          &::before {
            opacity: 0;
          }
        }
      }

      .time {
        .current {
          color: #e1e1e1;
        }
        .divider {
          margin: 0 3px;
        }
      }
    }
  }
`

interface IBarOperator {
  playMode: number
  volume: number
}
export const BarOperator = styled.div<IBarOperator>`
  display: flex;
  align-items: center;
  position: relative;
  top: 3px;

  .btn {
    width: 25px;
    height: 25px;
    color: #666 !important;
    cursor: pointer;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .pip {
    background: url(${pipIcon});
    &:hover {
      background-position-y: -25px;
    }
  }

  .favor {
    background-position: -88px -163px;
    &:hover {
      background-position: -88px -189px;
    }
  }

  .share {
    background-position: -114px -163px;
    &:hover {
      background-position: -114px -189px;
    }
  }

  .right {
    display: flex;
    align-items: center;
    width: 126px;
    padding-left: 13px;
    background-position: -147px -248px;

    .volume {
      background-position: ${(props) => {
        if (props.volume) {
          return ' -2px -248px;'
        } else {
          return ' -104px -69px;'
        }
      }};
      &:hover {
        background-position: ${(props) => {
          if (props.volume) {
            return ' -31px -248px;'
          } else {
            return ' -126px -69px;'
          }
        }};
      }
    }

    .loop {
      background-position: ${(props) => {
        switch (props.playMode) {
          case 1:
            return '-66px -248px'
          case 2:
            return '-66px -344px'
          default:
            return '-3px -344px'
        }
      }};
      &:hover {
        background-position: ${(props) => {
          switch (props.playMode) {
            case 0:
              return '-33px -344px'
            case 1:
              return '-93px -248px'
            default:
              return '-93px -344px'
          }
        }};
      }
    }

    .playlist {
      padding-left: 18px;
      text-align: center;
      color: #ccc;
      width: 59px;
      background-position: -42px -68px;
      &:hover {
        background-position: -42px -98px;
        text-decoration: none;
      }
    }
  }
`

export const VolumeBar = styled.div`
  position: relative;
  .volume-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: -138px;
    left: -9px;
    clear: both;
    width: 32px;
    height: 113px;
  }
  .bar-bgc {
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 113px;
    background-position: 0 -503px;
  }
  .ant-slider {
    position: relative;
    top: 2px;
    margin: 0 11px;
    height: 88px;
    .ant-slider-track {
      height: 5px;
      background: url(${volumeBar});
      background-position: -40px bottom;
    }

    .ant-slider-handle {
      left: -3px;
      width: 18px;
      height: 20px;
      border: none;
      background: url(${spriteIcon}) -40px -250px;

      &::after {
        opacity: 0;
      }
      &::before {
        opacity: 0;
      }
    }
  }
`
