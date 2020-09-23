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
        <h5>Get User: {this.props.user.name || ''}</h5>
        <button onClick={() => { this.props.dispatch({ type: 'FETCH_REQUEST', status: 'requesting' }) }}>Fetch Data</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(About)