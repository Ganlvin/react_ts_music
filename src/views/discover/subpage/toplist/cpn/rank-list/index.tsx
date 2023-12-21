import { shallowEqual, useAppDispatch, useAppSelector } from '@/stores'
import { memo, useEffect, useState } from 'react'
import { type ReactNode, FC } from 'react'
import { RankingListWrapper } from './style'
import { getImageSize } from '@/utils/format'
import { useSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import { getToplistDetailAction } from '@/stores/module/toplist'

interface IProps {
  children?: ReactNode
}

const RankList: FC<IProps> = () => {
  const [currentId, setCurrentId] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const id = searchParams.get('id')
    if (id === null) {
      setSearchParams({ id: '19723756' })
      return
    }
    setCurrentId(id)
    dispatch(getToplistDetailAction(Number(id)))
  }, [searchParams])

  // 请求排行榜数据
  const { toplist } = useAppSelector(
    (state) => ({
      toplist: state.toplist.toplist
    }),
    shallowEqual
  )

  return (
    <RankingListWrapper>
      {toplist.map((item, index) => {
        let header
        if (index === 0 || index === 4) {
          header = (
            <div className="header">
              {index === 0 ? '云音乐特色榜' : '全球媒体榜'}
            </div>
          )
        }
        return (
          <div key={item.id}>
            {header}
            <div
              className={classNames('item', { active: item.id == currentId })}
              onClick={() => setSearchParams({ id: item.id })}
            >
              <img src={getImageSize(item.coverImgUrl, 40)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="update">{item.updateFrequency}</div>
              </div>
            </div>
          </div>
        )
      })}
    </RankingListWrapper>
  )
}

export default memo(RankList)
