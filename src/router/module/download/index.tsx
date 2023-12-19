import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Download = lazy(() => import('@/views/download'))

const routes: RouteObject[] = [
  {
    path: '/download',
    element: <Download />
  }
]

export default routes
