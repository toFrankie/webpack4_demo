import React from 'react'
import { render } from 'react-dom'
import './main.js'
import './style.css'

// 最简单的 React 示例
const rootElem = document.getElementById('app')
render(<div>Hello React!</div>, rootElem)

if(module.hot) {
    module.hot.accept('./main.js', () => {
        console.log('Accept update！')
    })
}