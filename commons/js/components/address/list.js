/**
 *  地址列表组件
 * */
import React, { Component } from 'react'
import style from './list.scss'
import config from '../../config'
class AddrList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    let { isLoading, addressList, defaultIndex, handleAdd, handleDelte, handleEdit, setDefault, handleSelect } = this.props
    return (
      <div>
        <div className={style.addAddress_List}>
          {isLoading ? (
            <div className={style.load}>加载中......</div>
          ) : addressList.length > 0 ? (
            <div>
              <div style={{ height: '.24rem', background: '#f2f2f2' }} />
              {addressList.map((item, i) => (
                <div className={style.curreentList} key={i}>
                  <div className={style.addressList + ' border_bottom_1'} onClick={() => handleSelect(i)}>
                    <div className={style.contacts}>
                      <img className={style.map} src={config.resourceUrl + 'images/maps.png'} alt="" />
                      <span>{item.contactName}</span>
                      <span style={{ marginLeft: '.15rem' }}>{item.cellNum}</span>
                    </div>
                    <div className={style.location}>{item.fullAddr.replace('null', '')}</div>
                  </div>
                  <div className={style.featrue}>
                    <div className={style.default} onClick={() => setDefault(i)}>
                      <img
                        className={style.edit}
                        src={defaultIndex == i ? config.resourceUrl + 'images/yes_choice.png' : config.resourceUrl + 'images/no_choice.png'}
                        alt=""
                      />
                      <span className="font-28">{defaultIndex == i ? '默认地址' : '设为默认'}</span>
                    </div>

                    <div className={style.repeat}>
                      <div className={style.press} onClick={() => handleDelte(i)}>
                        <img src={config.resourceUrl + 'images/dustbin.png'} alt="" className={style.dustbin} />
                        <span style={{ marginLeft: '.5rem' }}>删除</span>
                      </div>

                      <div className={style.press} onClick={() => handleEdit(i)}>
                        <img src={config.resourceUrl + 'images/edit.png'} alt="" className={style.edit} />
                        <span>编辑</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ height: '.2rem', background: '#f2f2f2' }} />
                </div>
              ))}
              <div style={{ height: '.2rem', background: '#f2f2f2' }} />
              <div className={style.addAddress} onClick={() => handleAdd()}>
                <img src={config.resourceUrl + 'images/to_add.png'} alt="" />
                添加新地址
              </div>
            </div>
          ) : (
            <div className={style.noData}>
              <div className={style.voidBox}>
                <img className={style.noDataImg} src={config.resourceUrl + 'images/noAddress.png'} alt="" />
                <p>暂无收件地址</p>
              </div>
              <div className={style.btnBox}>
                <button onClick={() => handleAdd()}>
                  <img src={config.resourceUrl + 'images/noDataAdd.png'} alt="" />
                  添加新地址
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

AddrList.defaultProps = {
  isLoading: false,
  defaultIndex: 0,
  handleAdd: () => console.log('点击添加地址'),
  handleDelte: index => console.log('点击删除地址', index),
  handleEdit: index => console.log('点击编辑', index),
  handleSelect: index => console.log('选择地址', index),
  setDefault: index => console.log('设置为默认值', index),
  addressList: [
    // {
    //     "id": "7C6B024EB6E345EAA066FFBDE27C2895",
    //     "accountId": "3C47617384F4484E88D3E892938E112E",
    //     "provinceId": 440000,
    //     "provinceName": "广东省",
    //     "cityId": 445300,
    //     "cityName": "云浮市",
    //     "countyId": 445381,
    //     "countyName": "罗定市",
    //     "street": "saddle士大夫士大夫",
    //     "postCode": null,
    //     "contactName": "张三",
    //     "cellNum": "18900000000",
    //     "defaultFlag": null,
    //     "fullAddr": "广东省云浮市罗定市saddle士大夫士大夫"
    // }
  ]
}

export default AddrList
