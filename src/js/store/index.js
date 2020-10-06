import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootSaga from '../sagas'
import reducers from '../reducers'

// 初始值
const initialState = { count: 0, status: 'offline' }

// 创建 saga middleware
const sagaMiddleware = createSagaMiddleware()

// 当使用 middleware 时，我们需要使用 window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 作判断了
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

// 判断是否含有 Redux DevTools 插件
const middlewares =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? applyMiddleware(sagaMiddleware) : applyMiddleware(sagaMiddleware, logger)

// 创建 Store（也可以不传入 initialState 参数，而将 reducer 中的 state 设置一个初始值）
const store = createStore(reducers, initialState, composeEnhancers(middlewares))

// 启动 saga
sagaMiddleware.run(rootSaga)

// 监听 state 变化
// const unsubscribe = store.subscribe(() => {
//   console.log('监听 state 变化', store.getState())
// })

// 解除监听
// unsubscribe()

export default store
