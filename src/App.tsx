import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import router from '@/router'
import NavBar from './components/nav-bar'
import Footer from './components/footer'

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback="">
        <div>{useRoutes(router)}</div>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
