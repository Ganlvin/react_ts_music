import { memo } from 'react'
import { type ReactNode, FC } from 'react'

interface IProps {
  children?: ReactNode
}

const mine: FC<IProps> = () => {
  return <div>mine</div>
}

export default memo(mine)
