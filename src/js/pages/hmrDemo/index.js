import React, { Component } from 'react'

class HMRDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div>
        <h3>HMR Demo Component!</h3>
        <h5>Add some node element</h5>
        <h5>计数器：{this.state.count}</h5>
        <button
          onClick={() => {
            this.setState({ count: ++this.state.count })
          }}
        >
          add
        </button>
      </div>
    )
  }
}

export default HMRDemo
