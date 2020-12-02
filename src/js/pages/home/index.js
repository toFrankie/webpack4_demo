import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import avatarImg from '../../../images/avatar.jpg'
import style from './index.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handle(type, val) {
    this.props.simpleDispatch(type, val)
    // 获取 State 快照
    console.log(`当前操作是 ${type}，count 为：${store.getState().count}`)
  }

  render() {
    return (
      <div>
        <h3>Home Component!</h3>
        {/* 将 state 展示到页面上 */}
        <h5>count：{this.props.count}</h5>
        <button onClick={this.handle.bind(this, 'ADD', 1)}>加一</button>
        <button onClick={this.handle.bind(this, 'SUB', 1)}>减一</button>
        <h5>status：{this.props.status}</h5>
        <button
          className={style.flexBox}
          onClick={() => {
            this.props.toggleStatus('LOGIN_IN')
          }}
        >
          Login in
        </button>
        <button
          onClick={() => {
            this.props.toggleStatus('LOGIN_OUT')
          }}
        >
          Login out
        </button>

        <img src={avatarImg} />
      </div>
    )
  }
}

// 将 count 映射到 Home 组件的 props 属性上，通过 this.props.count 即可访问到它。
const mapStateToProps = (state, ownProps) => {
  return {
    count: state.count,
    status: state.status
  }
}

// 同理，它将 simpleDispatch 映射到组件的 props 属性上，通过 this.props.simpleDispatch 访问并由 Redux 发出一个 Action。
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    simpleDispatch: (type, payload) => {
      dispatch({ type, payload })
    },
    toggleStatus: type => {
      dispatch({ type })
    }
  }
}

// 若忽略 mapStateToProps 参数，store 的更新将不会触发组件重新渲染
// 若忽略 mapDispatchToProps 参数，默认情况下，store.dispatch 会注入组件 props 中。
// 若指定了，你就不能通过 this.props.dispatch 来发出 Action 了。
export default connect(mapStateToProps, mapDispatchToProps)(Home)
