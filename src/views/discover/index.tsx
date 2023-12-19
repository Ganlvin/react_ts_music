import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from './cpn'

const Discover = () => {
  return (
    <>
      <NavBar></NavBar>
      <Suspense fallback="">
        <Outlet></Outlet>
      </Suspense>
    </>
  )
}

export default Discover
