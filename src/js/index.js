import React from 'react'
import { render } from 'react-dom'
import '../styles/style.css'
import Root from './Root'

// 最简单的 React 示例
const rootElem = document.getElementById('app')
render(<Root />, rootElem)


if (module.hot) {
  module.hot.accept('./Root', () => {
    import('./Root.js').then(module => {
      const NextRoot = module.default
      render(<NextRoot/>, rootElem)
    })
  })
}