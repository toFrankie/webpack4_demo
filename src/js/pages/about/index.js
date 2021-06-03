import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../actions/userActions'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  xhrRequest() {
    // 创建 xhr 对象
    const xhr = new XMLHttpRequest()

    // 通过 onreadystatechange 事件捕获请求状态的变化
    // 必须在 open 之前指定该事件，否则无法接收 readyState 0 和 1 的状态
    xhr.onreadystatechange = () => {
      console.log(xhr.status)
      console.log(xhr.readyState)

      console.log(xhr.getResponseHeader('FooBar'))
    }

    xhr.onerror = err => {
      console.log('error:', err)
    }

    // 初始化请求
    xhr.open('GET', 'http://10.16.4.226:7701/config', true)

    // 发送请求
    xhr.send(null)
  }

  render() {
    return (
      <div>
        <h3>About Component！</h3>
        <h5>Get User: {this.props.user.name || ''}</h5>
        <button
          onClick={() => {
            this.props.dispatch({ type: 'FETCH_REQUEST', status: 'requesting' })
          }}
        >
          Fetch Data
        </button>
        <button
          onClick={() => {
            this.xhrRequest()
          }}
        >
          XHR Request
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(About)
