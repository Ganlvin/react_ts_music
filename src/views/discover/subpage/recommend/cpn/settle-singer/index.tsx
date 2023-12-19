import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SingerWrapper } from './style'
import SectionHeaderV2 from '@/components/section-header-v2'
import { shallowEqual, useAppSelector } from '@/stores'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {
  const { settleSingers } = useAppSelector(
    (state) => ({
      settleSingers: state.recommend.settleSingers
    }),
    shallowEqual
  )

  return (
    <SingerWrapper>
      <SectionHeaderV2
        title="入驻歌手"
        moreText="查看全部 &gt;"
        moreLink="#/discover/artist"
      />
      <div className="artists">
        {settleSingers.map((item) => {
          return (
            <a href="#/discover/artist" className="item" key={item.id}>
              <img src={getImageSize(item.picUrl, 80)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alia">{item.alias.join(' ')}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a className="btn sprite_button" href="/recruit">
          <i className="sprite_button">申请成为网易音乐人</i>
        </a>
      </div>
    </SingerWrapper>
  )
}

export default memo(SettleSinger)
