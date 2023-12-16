import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Discover = lazy(() => import('@/views/discover'))

const Album = lazy(() => import('@/views/discover/subpage/album'))
const Artist = lazy(() => import('@/views/discover/subpage/artist'))
const DjRadio = lazy(() => import('@/views/discover/subpage/djradio'))
const Playlist = lazy(() => import('@/views/discover/subpage/playlist'))
const Recommend = lazy(() => import('@/views/discover/subpage/recommend'))
const Toplist = lazy(() => import('@/views/discover/subpage/toplist'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/discover'} />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to={'/discover/recommend'} />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/toplist',
        element: <Toplist />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      },
      {
        path: '/discover/djradio',
        element: <DjRadio />
      },
      {
        path: '/discover/playlist',
        element: <Playlist />
      },
      {
        path: '/discover/album',
        element: <Album />
      }
    ]
  }
]

export default routes
