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
    xhr.onreadystatechange = () => {
      // console.log(xhr.status)
      // console.log(xhr.readyState)

      if (xhr.status === 200 && xhr.readyState === 4) {
        console.log(xhr.getResponseHeader('Date'))
        console.log(xhr.getResponseHeader('Access-Control-Allow-Origin'))
      }
    }

    // 捕获错误
    xhr.onerror = err => {
      console.log('error:', err)
    }

    xhr.withCredentials = true

    // 初始化请求
    xhr.open('PUT', 'http://192.168.1.105:7701/config', true)

    // 设置自定义头部（必须在 open 之后）
    xhr.setRequestHeader('X-Custom-Header', 'foo')

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
