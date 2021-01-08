/**
 * Created by 小敏哥 on 2018/1/4.
 */
import React, { Component } from 'react'
import CarPrefixList from '../carPrefixList'
import InputWithDelete from '../inputWithDelete'
import style from './index.scss'

class ProvinceIntutItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showProvinces: false,
      currentProvince: '粤'
    }
    this.numberValue = ''
    this.status = false // 校验状态
  }

  static propTypes = {
    onChange: React.PropTypes.func, // 值改变回调
    onInput: React.PropTypes.func, // 值改变时回调
    areaList: React.PropTypes.array // 省份列表
  }

  // 车牌格式化，6-7位数字或字母，第七位允许为中文港澳
  valueToUpper(value) {
    let pattern = /([^A-Za-z0-9]|\s)*/g
    let lastPattern = /([^A-Za-z0-9港澳]|\s)*/g
    let finalValue = ''
    // 兼容部分安卓maxlength失效
    if (value.length > 7) {
      value = value.substr(0, 7)
    }
    if (value.length == 7) {
      finalValue = value.substr(0, 6).replace(pattern, '').toUpperCase() + value.substr(6, 1).replace(lastPattern, '').toUpperCase()
    } else {
      finalValue = value.replace(pattern, '').toUpperCase()
    }
    return finalValue
  }

  // 获取省份名称
  getProvinceName(result) {
    if (result) {
      this.setState({
        showProvinces: false,
        currentProvince: result
      })
      this.props.onChange && this.props.onChange(result + this.numberValue, this.status)
    } else {
      this.setState({
        showProvinces: false
      })
    }
  }

  // 显示省份列表
  showProvinces() {
    this.setState({
      showProvinces: true
    })
  }

  // 输入框值改变
  inputChange(value) {
    this.numberValue = value
    this.props.onChange && this.props.onChange(this.state.currentProvince + value, this.status)
  }

  render() {
    return (
      <div className={style.provinceInputItem}>
        <div className={style.title}>{this.props.title}</div>
        <div
          className={style.itemIcon}
          onClick={() => {
            this.showProvinces()
          }}
        >
          <span>{this.state.currentProvince}</span>
          <div className={style.rightArrow} />
        </div>
        <div className={style.inputContent}>
          <InputWithDelete
            placeholder="请输入车牌号码"
            regular="^[A-Za-z][A-Za-z0-9]{5,6}$"
            changeValue={value => {
              return this.valueToUpper(value)
            }}
            errorCallBack={value => {
              this.status = false
              this.inputChange(value)
            }}
            currentCallBack={value => {
              this.status = true
              this.inputChange(value)
            }}
            onInput={value => {
              this.props.onInput && this.props.onInput(this.state.currentProvince + value)
            }}
          />
        </div>
        <CarPrefixList
          getName={result => {
            this.getProvinceName(result)
          }}
          show={this.state.showProvinces}
          list={
            this.props.areaList
              ? this.props.areaList
              : // prettier-ignore
                [ '京', '津', '沪', '渝', '湘', '黑', '琼', '贵', '苏', '闽', '辽', '宁', '粤', '陕', '豫', '新', '赣', '冀', '甘', '鄂', '吉', '浙', '云', '桂', '皖', '晋', '鲁', '川', '蒙', '藏', '青' ]
          }
        />
      </div>
    )
  }
}

export default ProvinceIntutItem
