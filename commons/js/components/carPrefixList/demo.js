import React, { Component, PropTypes } from 'react'
import CarPrefixList from './index'

class Demo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      carPrefix: '粤',
      carPrefixListProps: {
        getName: name => this.getName(name), // 获取车牌前缀
        show: false // 显示或隐藏
      }
    }
  }

  showCarPrefixListProps() {
    this.props.getName(true)
  }

  render() {
    console.log('----')
    let props = {
      getName: name => console.log('获取车牌前缀:', name), // 获取车牌前缀
      show: false // 显示或隐藏
    }
    return (
      <div>
        {/* <div onClick={() => this.showCarPrefixListProps()}>{this.props.carPrefix}</div> */}
        {/* <CarPrefixList {...this.state.carPrefixListProps} /> */}
      </div>
    )
  }
}

Demo.propTypes = {}

export default Demo
