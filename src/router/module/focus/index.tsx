import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Focus = lazy(() => import('@/views/focus'))

const routes: RouteObject[] = [
  {
    path: '/focus',
    element: <Focus />
  }
]

export default routes
