import { memo } from 'react'
import { type ReactNode, FC } from 'react'

interface IProps {
  children?: ReactNode
}

const Playlist: FC<IProps> = () => {
  return <div>playlist</div>
}

export default memo(Playlist)
