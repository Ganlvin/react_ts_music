import { shallowEqual, useAppSelector } from '@/stores'
import { memo, useEffect, useRef, useState } from 'react'
import { type ReactNode, FC, ElementRef } from 'react'
import { CategoryWrapper, CategoryContent, CategoryItemImage } from './style'
import { Carousel } from 'antd'
import classnames from 'classnames'
import { useSearchParams } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const PAGE_SIZE = 18

const RadioCategory: FC<IProps> = () => {
  const [currentId, setCurrentId] = useState(-1)
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const { categories } = useAppSelector(
    (state) => ({
      categories: state.djRadio.categories
    }),
    shallowEqual
  )

  const page = Math.ceil(categories.length / PAGE_SIZE) || 1

  useEffect(() => {
    const currentId = searchParams.get('id')
    const page = searchParams.get('page')
    if (!currentId || !page) {
      setSearchParams({ id: '3', page: '1' })
      return
    }
    setCurrentId(Number(currentId))
  }, [searchParams])

  return (
    <CategoryWrapper>
      <div
        className="arrow arrow-left"
        onClick={() => carouselRef.current?.prev()}
      ></div>
      <CategoryContent>
        <Carousel dots={{ className: 'dots' }} ref={carouselRef}>
          {Array(page)
            .fill(0)
            .map((_, index) => {
              return (
                <div key={index} className="category-page">
                  {categories
                    .slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE)
                    .map((item) => {
                      return (
                        <div
                          key={item.id}
                          className={classnames('category-item', {
                            active: currentId === item.id
                          })}
                          onClick={() =>
                            setSearchParams({ id: String(item.id), page: '1' })
                          }
                        >
                          <CategoryItemImage
                            className="image"
                            $imgUrl={item.picWebUrl}
                          ></CategoryItemImage>
                          <span>{item.name}</span>
                        </div>
                      )
                    })}
                </div>
              )
            })}
        </Carousel>
      </CategoryContent>
      <div
        className="arrow arrow-right"
        onClick={() => carouselRef.current?.next()}
      ></div>
    </CategoryWrapper>
  )
}

export default memo(RadioCategory)
