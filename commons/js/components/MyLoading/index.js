import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './index.scss'

class MyLoading extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    tips: React.PropTypes.string // 内容标题
  }

  render() {
    let { tips } = this.props

    return (
      <div className={style.MyLoading}>
        <div className={style.loadMore}>
          <div className={style.loading} />
          <div className={style.loadingTips}>{tips}</div>
        </div>
      </div>
    )
  }
}

MyLoading.defaultProps = {
  tips: '加载中'
}

export default MyLoading
