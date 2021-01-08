/**
 * 详情页进度信息模块组件
 */
import React, { Component } from 'react'
import style from './index.scss'
const PropTypes = React.PropTypes

class MyCellProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    navigateUrl: PropTypes.string, // 跳转路径
    statusName: PropTypes.string, // 进度状态
    statusDesc: PropTypes.string, // 进度信息
    statusTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) // 进度更新时间
  }

  render() {
    let { statusName, statusDesc, statusTime, navigateUrl, navigateEvent } = this.props

    return (
      <div className={style.cellProgress}>
        <div
          className={style.cellStatusBox}
          onClick={() => {
            navigateEvent && navigateEvent(navigateUrl)
          }}
        >
          <div className={style.cellStatus}>
            <div className={style.cellStatusName}>{statusName}</div>
            {navigateUrl ? (
              <div className={style.cellNavigate}>
                <div>查看进度详情</div>
                <div className={style.icon} />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={style.cellDesc}>{statusDesc}</div>
          <div className={style.cellTime}>{statusTime}</div>
        </div>
      </div>
    )
  }
}

MyCellProgress.defaultProps = {
  navigateUrl: '',
  statusName: '',
  statusDesc: '',
  statusTime: ''
}

export default MyCellProgress
