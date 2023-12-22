import { memo, useState } from 'react'
import { type ReactNode, FC } from 'react'
import { HeaderWrapper, SubTitleWrapper, HeaderRightWrapper } from './style'
import SectionHeaderV1 from '@/components/section-header-v1'
import SongsCategory from '../category-panel'
import { useClickOtherClose } from '@/hooks/click-close'
import { useSearchParams } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const PlaylistHeader: FC<IProps> = () => {
  const [searchParams] = useSearchParams()
  const [showCategory, setShowCategory] = useState(false)
  const closeRef = useClickOtherClose(() => {
    setShowCategory(false)
  })
  const title = searchParams.get('cat')
  return (
    <HeaderWrapper>
      <SectionHeaderV1
        title={title!}
        subTitle={
          <SubTitleWrapper ref={closeRef}>
            <button
              className="select "
              onClick={() => setShowCategory(!showCategory)}
            >
              <span>选择分类</span>
              <i className="sprite_icon2"></i>
            </button>
            {showCategory ? (
              <SongsCategory
                closePanel={() => setShowCategory(!showCategory)}
              />
            ) : null}
          </SubTitleWrapper>
        }
        rightPart={
          <HeaderRightWrapper>
            <button className="hot sprite_button2">热门</button>
          </HeaderRightWrapper>
        }
      ></SectionHeaderV1>
    </HeaderWrapper>
  )
}

export default memo(PlaylistHeader)
