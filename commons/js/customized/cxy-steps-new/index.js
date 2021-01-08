import React, { Component } from 'react'
import style from './index.scss'

class CxyStepsNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: false // 展开
    }
  }

  static propTypes = {}

  toggleExpand() {
    this.setState({ expand: !this.state.expand })
  }

  render() {
    const { expand } = this.state
    const { progressList = [], padding = '.32rem .3rem 0' } = this.props

    if (progressList.length == 0) return null

    return (
      <div className={style.cxyStepsNew} style={{ padding }}>
        <div>
          {progressList.map((item, index) => {
            return (
              <div
                key={index}
                className={style.cxySteps}
                style={index < 2 || (index >= 2 && expand) ? { height: 'auto' } : { height: 0, visibility: 'hidden' }}
              >
                {/* 左边 */}
                <div className={style.stepsLeft}>
                  <div className={style.main}>{item.createDate}</div>
                  <div className={style.secondary}>{item.createTime}</div>
                </div>
                {/* 中间节点 */}
                <div className={style.stepsMiddle}>
                  <div className={style.stepsNode}>
                    {item.status === '00' ? (
                      <div className={`${style.node} ${style.node00}`} />
                    ) : item.status === '50' ? (
                      <div className={`${style.node} ${style.node50}`} />
                    ) : item.status === '10' ? (
                      <div className={`${style.node} ${style.node10}`} />
                    ) : progressList.length === 1 ? (
                      <div className={`${style.node} ${style.nodeOnlyOne}`} />
                    ) : index === 0 ? (
                      <div className={`${style.node} ${style.nodeLastest}`} />
                    ) : index === progressList.length - 1 ? (
                      <div className={`${style.node} ${style.nodeEarliest}`} />
                    ) : (
                      <div className={`${style.nodeNormal}`} />
                    )}
                  </div>
                  <div className={style.stepsLinePlaceholder}>
                    <div className={style.stepsLine} />
                  </div>
                </div>
                {/* 右边 */}
                <div className={style.stepsRight}>
                  {item.statusName ? <div className={style.main}>{item.statusName}</div> : null}
                  <div className={style.secondary}>{item.remark}</div>
                </div>
              </div>
            )
          })}
        </div>
        {progressList.length < 2 ? (
          <div style={{ height: '.4rem' }} />
        ) : (
          <div className={style.expand} onClick={this.toggleExpand.bind(this)}>
            <div style={{ marginRight: '.08rem' }}>{expand ? '收起' : '展开'}</div>
            <div className={`${style.icon} ${expand ? style.iconRotate : ''}`} />
          </div>
        )}
      </div>
    )
  }
}

CxyStepsNew.defaultProps = {}

export default CxyStepsNew
