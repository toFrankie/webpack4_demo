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

export default reducer