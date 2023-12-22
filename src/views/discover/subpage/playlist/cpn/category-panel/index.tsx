import { memo } from 'react'
import { type ReactNode, FC } from 'react'
import { CategoryWrapper } from './style'
import { shallowEqual, useAppSelector } from '@/stores'
import { useSearchParams } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  closePanel?: () => void
}

const PlaylistCategoryPanel: FC<IProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { category } = useAppSelector(
    (state) => ({
      category: state.playlist.categories
    }),
    shallowEqual
  )

  function selectCategory(cat: string) {
    const paramsObject = Object.fromEntries(searchParams.entries())
    setSearchParams({ ...paramsObject, cat, page: '1' })
    if (props.closePanel) props.closePanel()
  }

  return (
    <CategoryWrapper>
      <div className="arrow sprite_icon"></div>
      <div className="all">
        <span
          className="link sprite_button2"
          onClick={() => selectCategory('全部')}
        >
          全部风格
        </span>
      </div>
      <div className="category">
        {category?.map((item, index) => {
          return (
            <dl key={item.name} className={'item' + index}>
              <dt>
                <i className="icon sprite_icon2"></i>
                <span>{item.name}</span>
              </dt>
              <dd>
                {item.subs.map((sItem) => {
                  return (
                    <div className="item" key={sItem.name}>
                      <span
                        className="link"
                        onClick={() => selectCategory(sItem.name)}
                      >
                        {sItem.name}
                      </span>
                      <span className="divider">|</span>
                    </div>
                  )
                })}
              </dd>
            </dl>
          )
        })}
      </div>
    </CategoryWrapper>
  )
}

export default memo(PlaylistCategoryPanel)
