import { memo, useRef } from 'react'
import { type ReactNode, FC, ElementRef } from 'react'
import SectionHeaderV1 from '@/components/section-header-v1'
import NewAlbumItem from '@/components/album-item'
import { Carousel } from 'antd'
import { AlbumWrapper } from './style'
import { shallowEqual, useAppSelector } from '@/stores'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  const { newAlbums } = useAppSelector(
    (state) => ({
      newAlbums: state.recommend.newAlbums
    }),
    shallowEqual
  )

  const carouselRef = useRef<ElementRef<typeof Carousel>>(null)
  // 处理按钮点击上下一张
  function handleBannerNext(order: 'next' | 'pre') {
    if (order === 'next') {
      carouselRef.current?.next()
    } else {
      carouselRef.current?.prev()
    }
  }
  return (
    <AlbumWrapper>
      <SectionHeaderV1
        title="新碟上架"
        moreLink="/discover/album"
      ></SectionHeaderV1>
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={() => handleBannerNext('pre')}
        ></button>
        <div className="container">
          <Carousel ref={carouselRef} dots={false} speed={1200}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbums.slice(item * 5, (item + 1) * 5).map((album) => {
                      return <NewAlbumItem key={album.id} itemData={album} />
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={() => handleBannerNext('next')}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)
