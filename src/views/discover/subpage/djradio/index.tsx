import { memo } from 'react'
import { type ReactNode, FC } from 'react'

interface IProps {
  children?: ReactNode
}

const DjRadio: FC<IProps> = () => {
  return <div>DjRadio</div>
}

export default memo(DjRadio)
