import styled from 'styled-components'
import downloadImg from '@/assets/img/download.png'
import bannerSprite from '@/assets/img/banner_sprite.png'
import dotsImg from '@/assets/img/banner_sprite.png'

export const BannerWrapper = styled.div`
  position: relative;

  .banner {
    height: 270px;
    display: flex;
    position: relative;
  }
  .background {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  .fade-enter {
    opacity: 0;
    transition: opacity 0.5s ease-in;
  }

  .fade-enter-active {
    opacity: 1;
  }

  .fade-exit {
    opacity: 1;
    transition: opacity 1s ease-out;
  }

  .fade-exit-active {
    opacity: 0;
  }
`

export const BannerLeft = styled.div`
  position: relative;
  width: 730px;

  .banner-item {
    overflow: hidden;
    height: 270px;
    .image {
      width: 100%;
    }
  }

  .dots {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    > li {
      margin: 0 2px;

      .item {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(${dotsImg}) 3px -343px;
        cursor: pointer;

        &:hover,
        &.active {
          background-position: -16px -343px;
        }
      }
    }
  }
`
export const BannerRight = styled.a.attrs({
  href: 'https://music.163.com/#/download',
  target: '_blank'
})`
  display: inline-flex;
  width: 254px;
  height: 270px;
  background-image: url(${downloadImg});
`

export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 63px;

  .btn {
    position: absolute;
    width: 37px;
    height: 63px;
    background-image: url(${bannerSprite});
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`
