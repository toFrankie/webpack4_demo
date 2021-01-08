/**
 * Created by 小敏哥 on 2017/12/4.
 * 列表tab头部
 */
import React from 'react'
import styles from './listTab.scss'

class ListTab extends React.Component {
  constructor(props) {
    super()
    this.tabName = ['办理中', '已完成', '全部']
    this.state = {
      active: typeof props.initActive != 'undefined' ? props.initActive : 0
    }
  }

  static propTypes = {
    handleIndexChange: React.PropTypes.func, // 切换tab回调函数
    initActive: React.PropTypes.number // 初始选中项
  }

  // tab切换
  tabChange(index) {
    this.setState({
      active: index
    })
    this.props.handleIndexChange && this.props.handleIndexChange(index)
  }

  // 渲染tab标题
  renderTab() {
    let res = this.props.selectedIndex || this.props.tagIndex
    return [0, 1, 2].map((item, index) => {
      return (
        <div key={index} className={res == item ? styles.tab + ' ' + styles.tabChoice : styles.tab}>
          <button
            onClick={() => {
              this.tabChange(item)
            }}
          >
            {this.tabName[item]}
          </button>
        </div>
      )
    })
  }

  getSlideBorderClass(index) {
    switch (index) {
      case 0:
        return styles.slideBorder
      case 1:
        return styles.slideBorder + ' ' + styles.slideBorderRight
      default:
        return styles.slideBorder + ' ' + styles.slideBorderRightAdd
    }
  }

  render() {
    let res = this.props.selectedIndex || this.props.tagIndex
    return (
      <div className={styles.container}>
        <div className={styles.listTab}>
          {this.renderTab()}
          <div className={this.getSlideBorderClass(res)} />
        </div>
        <div className={styles.space} />
      </div>
    )
  }
}

export default ListTab
