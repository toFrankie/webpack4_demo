/**
 * 地址预览组件
 */
import React, { Component } from 'react'
import style from './view.scss'
import config from '../../config'
class AddrView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  render() {
    let { text, isLine, fullAddr, contactName, cellNum, handleClick } = this.props
    return (
      <div className={style.addressBox}>
        <img className={style.separateLine} src={config.resourceUrl + 'images/line.png'} alt="" />
        <div className={style.titleBox}>
          <div className={style.title}>
            <i />
            {text}
          </div>
        </div>
        <div onClick={() => handleClick()}>
          <div className={style.address}>
            <img className={style.map} src={config.resourceUrl + 'images/map.png'} alt="" />
            <div className={style.addAddress}>{fullAddr != '' ? contactName + ' ' + cellNum : '添加收件人信息'}</div>
            <img className={style.iconToRight} src={config.resourceUrl + 'images/icon_to_r.png'} alt="" />
          </div>
          {/* 中山和东莞没有区传给后台null+cacheAddress.street */}
          {fullAddr && <div className={style.fullAddress}>{fullAddr.replace(null, '')}</div>}
        </div>
      </div>
    )
  }
}

AddrView.defaultProps = {
  text: '收件人信息',
  fullAddr: '',
  contactName: '',
  cellNum: '',
  handleClick: () => console.log('点击了地址预览')
}

export default AddrView
