import { Fragment, memo } from 'react'
import { Link } from 'react-router-dom'
import { type ReactNode, FC } from 'react'
import { SectionHeaderV1Wrapper } from './style'

interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreText?: string
  moreLink?: string
  subTitle?: string
  rightPart?: ReactNode
}

const SectionHeaderV1: FC<IProps> = (props) => {
  const {
    title = '默认标题',
    subTitle = '小标题',
    keywords = [],
    moreText = '更多',
    moreLink = '/',
    rightPart = null
  } = props
  return (
    <SectionHeaderV1Wrapper className="section-header-v1 sprite_02">
      <div className="left">
        <h3 className="title">
          {title} <span className="sub-title">{subTitle}</span>
        </h3>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        {rightPart || (
          <Fragment>
            <Link className="more" to={moreLink}>
              {moreText}
            </Link>
            <i className="sprite_02 icon"></i>
          </Fragment>
        )}
      </div>
    </SectionHeaderV1Wrapper>
  )
}

export default memo(SectionHeaderV1)
