import { memo, useEffect } from 'react'
import { type ReactNode, FC } from 'react'
import { DjRadioWrapper } from './style'
import Category from './cpn/category'
import Ranking from './cpn/ranking'
import Recommend from './cpn/recommend'
import { useAppDispatch } from '@/stores'
import { getCategoriesAction } from '@/stores/module/djradio'

interface IProps {
  children?: ReactNode
}

const DjRadio: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCategoriesAction())
  }, [])
  return (
    <DjRadioWrapper className="wrap-v2">
      <Category />
      <Recommend />
      <Ranking />
    </DjRadioWrapper>
  )
}

export default memo(DjRadio)
