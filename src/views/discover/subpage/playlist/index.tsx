import { memo, useEffect } from 'react'
import { type ReactNode, FC } from 'react'
import { PlayListWrapper } from './style'
import HeaderArea from './cpn/header-area'
import ShowArea from './cpn/show-area'
import { useAppDispatch } from '@/stores'
import {
  getCategoriesAction,
  getPlaylistAction
} from '@/stores/module/playlist'
import { useSearchParams } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Playlist: FC<IProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  // 查询所有分类
  useEffect(() => {
    dispatch(getCategoriesAction())
  }, [])

  // 查询分类相关的歌单
  useEffect(() => {
    const cat = searchParams.get('cat')
    const page = Number(searchParams.get('page'))
    // 参数验证
    if (!cat || Number.isNaN(page)) {
      setSearchParams({ cat: '华语', page: '1' })
      return
    }
    dispatch(getPlaylistAction({ cat, limit: 35, offset: (page - 1) * 35 }))
  }, [searchParams])
  return (
    <PlayListWrapper className="wrap-v2">
      <div className="container">
        <HeaderArea />
        <ShowArea />
      </div>
    </PlayListWrapper>
  )
}

export default memo(Playlist)
