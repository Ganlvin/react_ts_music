import styled from 'styled-components'
import bgcImg from '@/assets/img/playlist_sprite.png'

export const SongListWrapper = styled.div`
  position: relative;
  width: 553px;
  padding: 2px;
  overflow: scroll;
  /* 到底后不会滚动页面 */
  overscroll-behavior: contain;
  -ms-scroll-chaining: contain;
  .mask {
    position: absolute;
    left: 2px;
    top: 0;
    z-index: 1;
    width: 558px;
    height: 260px;
    background: #121212;
    opacity: 0.5;
  }
  .play-item {
    padding: 0 8px 0 25px;
    display: flex;
    position: relative;
    z-index: 2;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    line-height: 28px;
    color: #ccc;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #000;
    }

    &.active {
      color: #fff;
      background-color: #000;

      &::before {
        content: '';
        position: absolute;
        left: 8px;
        width: 10px;
        height: 13px;
        background: url(${bgcImg}) -182px 0;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .singer {
        width: 80px;
      }

      .duration {
        width: 45px;
        margin-left: 10px;
      }

      .link {
        margin-left: 20px;
        width: 14px;
        height: 16px;
        background-position: -80px 0px;
      }
    }
  }
`
export const NoContentWrapper = styled.div`
  .no-content {
    position: relative;
    z-index: 1;
    color: #aaa;
    padding-top: 85px;
    text-align: center;
    line-height: 43px;
  }
  .ico {
    display: inline-block;
    position: relative;
    top: -4px;
    width: 36px;
    height: 29px;
    margin-right: 3px;
    background-position: -138px 0;
    vertical-align: middle;
  }
  .link {
    color: #aaa;
    text-decoration: underline;
  }
`
