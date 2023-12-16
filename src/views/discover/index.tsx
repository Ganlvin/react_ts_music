import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const Discover = () => {
  return (
    <Suspense fallback="">
      <div>discover</div>
      <Outlet></Outlet>
    </Suspense>
  )
}

export default Discover
