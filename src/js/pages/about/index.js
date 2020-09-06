import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../actions/userActions'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h3>About Component！</h3>
        <h5>Get User: {this.props.user.status || ''}</h5>
        {/* 我们发现这里并不是传了一个标准的 Action 对象，而是一个函数 */}
        <button onClick={() => { this.props.dispatch(getUser(false)) }}>Get User Fail</button>
        <button onClick={() => { this.props.dispatch(getUser(true)) }}>Get User Success</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(About)