import styled from 'styled-components'
import footerImg02 from '@/assets/img/foot_enter_new2.png'

export const AppFooterWrapper = styled.div`
  height: 172px;
  background-color: #f2f2f2;
  color: #666;
  border-top: 1px solid #d3d3d3;
  padding-bottom: 150px;
  .content {
    display: flex;
    flex-direction: column;
  }
`

export const FooterTop = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 35px 25px;
  .item {
    width: 45px;
    text-align: center;
    color: #666;

    .link {
      display: block;
      width: 45px;
      height: 45px;
      margin: 0 auto;

      background-image: url(${footerImg02});
      background-size: 220px 220px;
    }

    &:nth-child(1) .link {
      background-position: -170px -5px;
      &:hover {
        background-position: -5px -115px;
      }
    }
    &:nth-child(2) .link {
      background-position: -5px -170px;
      &:hover {
        background-position: -60px -170px;
      }
    }
    &:nth-child(3) .link {
      background-position: -5px -60px;
      &:hover {
        background-position: -60px -5px;
      }
    }
    &:nth-child(4) .link {
      background: url('https://s2.music.126.net/style/web2/img/xStudio.png?5adfe6ac51ee96100d7b46cc0d0ced71');
      background-size: 45px;
      &:hover {
        background-image: url('https://s2.music.126.net/style/web2/img/xStudioHover.png?b72c078f0234024d8f6eb09ac788bb44');
        background-size: 45px;
      }
    }
    &:nth-child(5) .link {
      background-position: -60px -60px;
      &:hover {
        background-position: -115px -5px;
      }
    }
    &:nth-child(6) .link {
      background-position: -115px -115px;
      &:hover {
        background-position: -5px -5px;
      }
    }
    &:nth-child(7) .link {
      background: url('https://s2.music.126.net/style/web2/img/cloudSong.png?2fd40ec363a91427b83e8978184569ac');
      background-size: 45px;
      &:hover {
        background-image: url('https://s2.music.126.net/style/web2/img/cloudSongHover.png?f33df3711c2dc43d69961536f56be060');
        background-size: 45px;
      }
    }
    &:nth-child(8) .link {
      background-position: -170px -115px;
      &:hover {
        background-position: -60px -115px;
      }
    }

    .title {
      display: inline-block;
      width: 100px;
      margin-top: 10px;
      margin-left: -27.5px;
      font-weight: 400;
      font-size: 12px;
      text-align: center;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`

export const FooterBottom = styled.div`
  padding-top: 15px;
  line-height: 24px;
  a {
    color: #666;
  }
  .link {
    display: flex;
    justify-content: center;

    .line {
      margin: 0 10px;
      color: #999;
      &:last-child {
        display: none;
      }
    }
  }

  .copyright {
    display: flex;
    justify-content: center;
    span {
      margin-right: 15px;
    }
  }
  .report {
    display: flex;
    justify-content: center;
  }
  .info {
    display: flex;
    justify-content: center;
  }
`
