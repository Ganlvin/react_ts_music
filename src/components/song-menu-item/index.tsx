import { memo } from 'react'
import { type ReactNode, FC } from 'react'
import { MenuItemWrapper } from './style'
import { getImageSize, formatCount } from '@/utils/format'
import { IPlaylist } from '@/service/api/common/type'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
  itemData: IPlaylist
  coverSource?: boolean
  oneLineTitle?: boolean
}

const SongMenuItem: FC<IProps> = (props) => {
  const { itemData, coverSource = false, oneLineTitle = false } = props

  return (
    <MenuItemWrapper>
      <div className="top">
        <img
          src={getImageSize(itemData.picUrl || itemData.coverImgUrl, 140)}
          alt=""
        />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              <span className="count">{formatCount(itemData.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className={classNames('title', { 'one-line': oneLineTitle })}>
        {itemData.name}
      </div>
      {coverSource && (
        <div className="cover-source">
          by {itemData.copywriter || itemData.creator?.nickname}
        </div>
      )}
    </MenuItemWrapper>
  )
}

export default memo(SongMenuItem)
