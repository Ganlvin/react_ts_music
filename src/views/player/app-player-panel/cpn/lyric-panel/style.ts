import styled from 'styled-components'

export const LyricPanelWrapper = styled.div`
  position: relative;
  flex: 1;
  padding: 21px 0 20px 0;
  overflow: scroll;
  /* 到底后不会滚动页面 */
  overscroll-behavior: contain;
  -ms-scroll-chaining: contain;

  &::-webkit-scrollbar {
    display: none;
  }

  .lrc-content {
    .lrc-item {
      height: 32px;
      text-align: center;
      color: #989898;

      &.active {
        color: #fff;
        font-size: 14px;
      }
    }
  }
  .mask {
    position: absolute;
    left: 2px;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 260px;
    background: transparent;
  }
`
