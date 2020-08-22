import './main.js'
import './style.css'

console.log('Hello Webpack!')

if(module.hot) {
    module.hot.accept('./main.js', () => {
        console.log('Accept update！')
    })
}