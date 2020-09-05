import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

// Reducer 处理函数
const reducer = (prevState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'ADD':
      // 一定要不能修改 state，而是返回一个新的副本
      // 倘若 state 是引用数据类型，一定要借助 Object.assign、对象展开运算符(...)、其他库的拷贝方法或者自己实现深拷贝方法，返回一个新副本
      return { ...prevState, count: prevState.count + payload }
    case 'SUB':
      return { ...prevState, count: prevState.count - payload }
    default:
      // default 或者未知 action 时，返回旧的 state
      return prevState
  }
}

// 初始化值
const initialState = { count: 0 }

// 创建 Store（也可以不传入 initialState 参数，而将 reducer 中的 state 设置一个初始值）
const store = createStore(reducer, initialState, applyMiddleware(logger))

// 监听 state 变化
// const unsubscribe = store.subscribe(() => {
//   console.log('监听 state 变化', store.getState())
// })

// 解除监听
// unsubscribe()

export default store