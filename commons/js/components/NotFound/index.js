import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './index.scss'
const PropTypes = React.PropTypes

class NotFound extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    title: PropTypes.string // 内容标题
  }

  componentDidMount() {}

  render() {
    let { title } = this.props

    return (
      <div className={style.notFound}>
        <img src="https://yzres.cx580.com/wx/images/common/query_order_fail.png" />
        <span>{title}</span>
      </div>
    )
  }
}

NotFound.defaultProps = {}

export default NotFound
