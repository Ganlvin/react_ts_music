import { memo, useState } from 'react'
import { type ReactNode, FC } from 'react'
import { NavLink } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style'
import navBarData from '@/assets/data/nav-bar.json'

interface IProps {
  children?: ReactNode
}

const NavBar: FC<IProps> = () => {
  const [showSearchTip, setShowSearchTip] = useState(true)
  const [searchText, setSearchText] = useState('')

  function handleShowSearchTip() {
    setShowSearchTip(!showSearchTip)
  }
  function saveSearchText(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value)
  }
  function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => {
            return isActive ? 'active' : undefined
          }}
        >
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.title}
        </a>
      )
    }
  }
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a href="/" className="logo sprite_01">
            网易云音乐
          </a>
          <div className="title-list">
            {navBarData.map((item) => {
              return (
                <div className="item" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            value={searchText}
            onFocus={handleShowSearchTip}
            onBlur={handleShowSearchTip}
            onChange={saveSearchText}
            className="search"
            placeholder={showSearchTip ? '音乐/视频/电台/用户' : ''}
            prefix={<SearchOutlined />}
          />
          <span className="center">创作者中心</span>
          <span className="login">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(NavBar)
