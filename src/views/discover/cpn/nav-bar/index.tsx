import { memo } from 'react'
import { type ReactNode, FC } from 'react'
import { NavLink } from 'react-router-dom'
import { discoverMenu } from '@/assets/data/local_data'
import { NavBarWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const NavBar: FC<IProps> = () => {
  return (
    <NavBarWrapper>
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => {
          return (
            <div className="item" key={item.link}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          )
        })}
      </div>
    </NavBarWrapper>
  )
}

export default memo(NavBar)
