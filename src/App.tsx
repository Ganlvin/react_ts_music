import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import router from '@/router'
import NavBar from './components/nav-bar'
import Footer from './components/footer'
import AppPlayerBar from './views/player/app-player-bar'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Suspense fallback="">
        <div>{useRoutes(router)}</div>
      </Suspense>
      <Footer />

      {/* 播放器工具栏 */}
      <AppPlayerBar />
    </div>
  )
}

export default App
