import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Mine = lazy(() => import('@/views/mine'))

const routes: RouteObject[] = [
  {
    path: '/mine',
    element: <Mine />
  }
]

export default routes
