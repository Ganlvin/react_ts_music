import { shallowEqual, useAppSelector } from '@/stores'
import { memo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import { type ReactNode, FC, ElementRef } from 'react'
import { Carousel } from 'antd'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const Banner: FC<IProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [speed, setSpeed] = useState(2000)

  const carouselRef = useRef<ElementRef<typeof Carousel>>(null)
  // 处理按钮点击上下一张
  function handleBannerNext(order: 'next' | 'pre' | 'chose', i?: number) {
    // 立马切换
    flushSync(() => {
      setSpeed(0)
      if (order === 'next') {
        carouselRef.current?.next()
      } else if (order === 'pre') {
        carouselRef.current?.prev()
      } else {
        carouselRef.current?.goTo(i!)
      }
    })
    // 恢复默认时间
    setTimeout(() => setSpeed(2000))
  }

  function handleBeforeChange(_: number, next: number) {
    setCurrentIndex(next)
  }
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )

  /** 获取背景图片 */
  let bgImageUrl
  if (currentIndex >= 0 && banners.length > 0) {
    bgImageUrl = banners[currentIndex].imageUrl + '?imageView&blur=40x20'
  }

  return (
    <>
      <BannerWrapper>
        <TransitionGroup mode="out-in">
          <CSSTransition
            classNames="fade"
            timeout={speed ? 1000 : 0}
            key={bgImageUrl}
          >
            <div
              className="background"
              style={{
                background: `url('${bgImageUrl}') center center / 6000px`
              }}
            ></div>
          </CSSTransition>
        </TransitionGroup>

        <div className="banner wrap-v2">
          <BannerLeft>
            <Carousel
              fade
              dots={false}
              speed={speed}
              autoplay
              ref={carouselRef}
              effect="fade"
              beforeChange={handleBeforeChange}
            >
              {banners.map((item) => {
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img
                      className="image"
                      src={item.imageUrl}
                      alt={item.typeTitle}
                    />
                  </div>
                )
              })}
            </Carousel>
            <ul className="dots">
              {banners.map((item, index) => {
                return (
                  <li
                    key={item.imageUrl}
                    onClick={() => handleBannerNext('chose', index)}
                  >
                    <span
                      className={classNames('item', {
                        active: index === currentIndex
                      })}
                    ></span>
                  </li>
                )
              })}
            </ul>
          </BannerLeft>
          <BannerRight></BannerRight>
          <BannerControl>
            <button
              className="btn left"
              onClick={() => handleBannerNext('pre')}
            ></button>
            <button
              className="btn right"
              onClick={() => handleBannerNext('next')}
            ></button>
          </BannerControl>
        </div>
      </BannerWrapper>
    </>
  )
}

export default memo(Banner)
