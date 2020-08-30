import React, { Component } from 'react'
import store from '../../store'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // Action Creator 函数
  actionCreator(type, payload) {
    return { type, payload }
  }

  handle(type, val) {
    // 创建 Action
    const action = this.actionCreator(type, val)
    // 派发 Action
    store.dispatch(action)
    // 获取 State 快照
    console.log(`当前操作是 ${type}，State 为：${store.getState()}`)
  }

  render() {
    return (
      <div>
        <h3>Home Component!</h3>
        <button onClick={this.handle.bind(this, 'ADD', 1)}>加一</button>
        <button onClick={this.handle.bind(this, 'SUB', 1)}>减一</button>
      </div>
    )
  }
}

export default Home