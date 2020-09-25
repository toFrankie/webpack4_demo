import React from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'
import App from './pages/App'
import store from './store'

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default hot(Root)