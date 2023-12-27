import { memo, useState, useEffect } from 'react'
import { type ReactNode, FC } from 'react'
import SectionHeaderV1 from '@/components/section-header-v1'
import Pagination from '@/components/pagination'
import { RankingWrapper, CoverWrapper } from './style'
import { shallowEqual, useAppDispatch, useAppSelector } from '@/stores'
import { useSearchParams } from 'react-router-dom'
import { getImageSize } from '@/utils/format'
import { getRadioRankAction } from '@/stores/module/djradio'
import { useScrollToRef } from '@/hooks/scroll-to-ref'

interface IProps {
  children?: ReactNode
}

const RadioRanking: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [elRef, scrollToRef] = useScrollToRef()

  const { rankRadios } = useAppSelector(
    (state) => ({
      rankRadios: state.djRadio.rankRadios
    }),
    shallowEqual
  )
  // 监听路由变化请求数据
  useEffect(() => {
    const cateId = searchParams.get('id')
    const page = searchParams.get('page')
    if (!cateId) return
    setCurrentPage(Number(page))
    const query = { cateId, limit: 30, offset: (currentPage - 1) * 30 }
    dispatch(getRadioRankAction(query))
  }, [searchParams])

  function onPageChange(page: number) {
    const paramsObject = Object.fromEntries(searchParams.entries())
    setSearchParams({ ...paramsObject, page: String(page) })
    scrollToRef()
  }
  return (
    <RankingWrapper>
      <div ref={elRef}></div>
      <SectionHeaderV1 title="电台排行榜" />
      <div className="ranking-list">
        {rankRadios.map((item) => {
          return (
            <CoverWrapper key={item.id}>
              <a href="/#">
                <img src={getImageSize(item.picUrl, 120)} alt="" />
              </a>
              <div className="info">
                <h2 className="title">{item.name}</h2>
                <div className="nickname sprite_icon2">
                  <i className="sprite_icon2 left"></i>
                  {item.dj.nickname}
                </div>
                <div className="count">
                  <span className="phase">共{item.programCount}期</span>
                  <span className="subscribe">订阅{item.subCount}次</span>
                </div>
              </div>
            </CoverWrapper>
          )
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        total={1000}
        pageSize={30}
        onPageChange={onPageChange}
      />
    </RankingWrapper>
  )
}

export default memo(RadioRanking)
