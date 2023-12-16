import { memo } from 'react'
import { type ReactNode, FC } from 'react'

interface IProps {
  children?: ReactNode
}

const TopList: FC<IProps> = () => {
  return <div>TopList</div>
}

export default memo(TopList)
