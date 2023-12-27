import { shallowEqual, useAppDispatch, useAppSelector } from '@/stores'
import { memo, useEffect } from 'react'
import { type ReactNode, FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getRadioRecommendAction } from '@/stores/module/djradio'
import SectionHeaderV1 from '@/components/section-header-v1'
import { RecommendWrapper, CoverWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const RadioRecommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const { recommends } = useAppSelector(
    (state) => ({
      recommends: state.djRadio.recommends
    }),
    shallowEqual
  )

  // 监听路由变化请求数据
  useEffect(() => {
    const currentId = searchParams.get('id')
    if (!currentId) return
    dispatch(getRadioRecommendAction(currentId))
  }, [searchParams.get('id')])

  return (
    <RecommendWrapper>
      <SectionHeaderV1 title="优秀新电台" rightPart={<span></span>} />
      <div className="radio-list">
        {recommends.slice(0, 5).map((item) => {
          return (
            <CoverWrapper key={item.id}>
              <a href="/#">
                <img src={getImageSize(item.picUrl, 150)} alt="" />
              </a>
              <a href="/#" className="text-nowrap name">
                {item.name}
              </a>
              <p className="text-nowrap">{item.desc}</p>
            </CoverWrapper>
          )
        })}
      </div>
    </RecommendWrapper>
  )
}

export default memo(RadioRecommend)
