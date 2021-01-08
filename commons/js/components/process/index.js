/**
 * Created by 小敏哥 on 2017/11/28.
 * 封装好的流程列表
 */
import React, { Component } from 'react'
import ProcessItem from './processItem'
import style from './index.scss'

class Process extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    status: React.PropTypes.number, // 当前节点位置
    processArray: React.PropTypes.array // 过程列表，name:标题，updateTime:时间
  }

  structProcess() {
    return this.props.processArray
      .map((item, index) => {
        if (index == this.props.status) {
          return <ProcessItem statusType="current" onlyOne={this.props.processArray.length == 1} time={item.updateTime} content={item.name} key={index} />
        } else if (index == 0) {
          return <ProcessItem statusType="start" onlyOne={this.props.processArray.length == 1} time={item.updateTime} content={item.name} key={index} />
        } else {
          return <ProcessItem statusType="normal" time={item.updateTime} content={item.name} key={index} />
        }
      })
      .reverse()
  }

  render() {
    return <div className={style.process}>{this.structProcess()}</div>
  }
}
export default Process
