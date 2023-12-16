import { memo } from 'react'
import { type ReactNode, FC } from 'react'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  return <div>recommend</div>
}

export default memo(Recommend)
