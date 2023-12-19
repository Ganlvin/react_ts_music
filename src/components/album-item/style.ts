import styled from 'styled-components'

export const AlbumItemWrapper = styled.div`
  background-position: -260px 100px;
  .top {
    position: relative;
    margin-bottom: 7px;
    width: 118px;
    height: 100px;
    overflow: hidden;

    img {
      width: 100px;
      height: 100px;
    }

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: 0 -570px;
      text-indent: -9999px;
    }
  }

  .bottom {
    font-size: 12px;
    width: 100px;
    .name {
      color: #000;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .artist {
      color: #666;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`
