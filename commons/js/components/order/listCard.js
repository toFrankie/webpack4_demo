/**
 * 订单列表卡片
 *
 */
import React, { Component } from 'react'
import style from './listCard.scss'
import config from '../../config'

export default class ListCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    handleClick: React.PropTypes.func, // 点击回调
    icon: React.PropTypes.string, // 图标
    order: React.PropTypes.object // 订单对象,status:订单状态，statusName：状态名称，orderTitle订单标题，orderAmount：订单金额，orderId：订单id
  }

  render() {
    let { order, icon, handleClick } = this.props
    let { status, statusName, orderTitle, orderAmount, orderId } = order
    return (
      <div className={style.order} onClick={() => handleClick(order)}>
        <div style={{ alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
          <div className={style.list}>
            <img className={style.region} src={icon} alt="" />
            <div className={style.orderType + ' cf'}>
              <span className="text-overflow-1">{orderTitle}</span>
              {this.props.hideAmount ? '' : <span>{orderAmount && orderAmount > 0 ? '￥' + orderAmount / 100 : ''}</span>}
            </div>
            <div className={style.orderNum}>
              <span>订单号:{orderId}</span>
              <span style={status == 3 || status == 4 || status == 5 ? { color: 'red' } : {}}>{statusName}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ListCard.defaultProps = {
  icon: config.resourceUrl + 'images/region_icon.png', // 订单图标
  order: {}, // 订单信息
  handleClick: order => console.log('订单信息', order)
}
