import { memo } from 'react'
import { type ReactNode, FC } from 'react'

interface IProps {
  children?: ReactNode
}

const Footer: FC<IProps> = () => {
  return <div>Footer</div>
}

export default memo(Footer)
