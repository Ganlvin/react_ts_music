import ReactDOM from 'react-dom/client'
import LoginPanelIns from './view'
import { Provider } from 'react-redux'
import store from '@/stores'

let root: ReactDOM.Root

function showLoginPanel() {
  const container = document.createElement('div')
  root = ReactDOM.createRoot(container)
  root.render(
    <Provider store={store}>
      <LoginPanelIns closeFn={() => removeDom(container)} />
    </Provider>
  )
  document.body.appendChild(container)
}

function removeDom(container: HTMLElement) {
  root.unmount()
  document.body.removeChild(container)
}

const LoginPanel = {
  open: showLoginPanel,
  close: removeDom
}

export { LoginPanel }
