import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        Page not found! <br /> <Link to="/">Go back</Link>
      </div>
    )
  }
}

export default NotFound
