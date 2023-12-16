import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import router from '@/router'

function App() {
  return (
    <Suspense fallback="">
      <div>{useRoutes(router)}</div>
    </Suspense>
  )
}

export default App
