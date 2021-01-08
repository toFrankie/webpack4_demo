/**
 * Created by 小敏哥 on 2017/11/24.
 * 带删除按钮，验证功能，记忆功能的输入框
 */
import React, { Component } from 'react'
import timeOutLocalStorage from '../../utils/timeOutLocalStorage'
import style from './index.scss'

class InputWithDelete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      check: 'none',
      value: typeof props.initValue != 'undefined' && props.initValue ? props.initValue : ''
    }
  }

  static propTypes = {
    initValue: React.PropTypes.string, // 初始值
    storageKey: React.PropTypes.string, // 用于记忆最后输入值的key值，如需记忆则需传入，且需唯一
    title: React.PropTypes.string, // 标题
    placeholder: React.PropTypes.string, // 提示语
    onChange: React.PropTypes.func, // onChange事件
    onBlur: React.PropTypes.func, // onBlur事件
    onInput: React.PropTypes.func, // onInput事件
    onFocus: React.PropTypes.func, // onFocus时间
    errorCallBack: React.PropTypes.func, // 错误时触发的回调
    currentCallBack: React.PropTypes.func, // 正确时触发回调
    regular: React.PropTypes.string, // 正则表达式
    type: React.PropTypes.string, // 类型
    maxLength: React.PropTypes.number, // 最大长度
    changeValue: React.PropTypes.func, // 此处提供一个钩子，在输入之后显示之前能够改变当前的值并显示
    titleWidth: React.PropTypes.string, // 此处提供可设置的标题长度，防止标题太长换行
    icon: React.PropTypes.string, // 提示图标链接
    iconClick: React.PropTypes.func // 图标点击事件
  }

  componentWillUnmount() {
    // this.props.storageKey&&timeOutLocalStorage.setItem(this.props.storageKey, this.state.value,24*60*60*1000);
  }

  componentDidMount() {
    let sessionValue = timeOutLocalStorage.getItem(this.props.storageKey)
    if (this.props.storageKey && sessionValue) {
      this.setState(
        {
          value: sessionValue
        },
        () => {
          this.textChange(sessionValue)
        }
      )
    }
  }

  // 值改变是进行验证
  textChange(value) {
    // 有正则时验证正则
    if (this.props.regular) {
      let exp = new RegExp(this.props.regular, 'g')
      if (exp.test(value)) {
        this.props.currentCallBack && this.props.currentCallBack(value)
        // 此处当值为空时不显示验证图标，但仍然会检验结果并返回给父组件
        let checkValue = value ? 'true' : 'none'
        this.setState({
          check: checkValue
        })
      } else {
        this.props.errorCallBack && this.props.errorCallBack(value)
        // 此处当值为空时不显示验证图标，但仍然会检验结果并返回给父组件
        let checkValue = value ? 'false' : 'none'
        this.setState({
          check: checkValue
        })
      }
    } else {
      // 校验身份证
      if (this.props.idcard) {
        let flg = this.checkIdcardValid(value)
        if (flg) {
          this.props.currentCallBack && this.props.currentCallBack(value)
          this.setState({
            check: 'true'
          })
        } else {
          this.setState({
            check: 'false'
          })
        }
      } else {
        // 无正则时不验证，直接返回正确通知
        this.props.currentCallBack && this.props.currentCallBack(value)
        this.setState({
          check: 'true'
        })
      }
    }
  }

  checkIdcardValid(idcode) {
    let firstCode = idcode.substr(0, 1)
    let idCardRule = /^[0-9]{17}([0-9]|X|x)$/
    if (firstCode == 0) {
      // 港澳户口居民证件因为不够18位，则在前面补0，同时只允许输入数字和X
      if (idcode.length == 18 && idCardRule.test(idcode)) {
        return true
      } else {
        return false
      }
    } else {
      // 严格的身份证校验模式，避免用户填错身份证也能提交

      // 加权因子
      let weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 校验码
      let check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

      let code = String(idcode)
      let last = idcode[17] // 最后一个

      let seventeen = code.substring(0, 17)

      // ISO 7064:1983.MOD 11-2
      // 判断最后一位校验码是否正确
      let arr = seventeen.split('')
      let len = arr.length
      let num = 0
      for (let i = 0; i < len; i++) {
        num = num + arr[i] * weight_factor[i]
      }

      // 获取余数
      let resisue = num % 11
      let last_no = check_code[resisue]

      // 格式的正则
      // 正则思路
      /*
            第一位不可能是0
            第二位到第六位可以是0-9
            第七位到第十位是年份，所以七八位为19或者20
            十一位和十二位是月份，这两位是01-12之间的数值
            十三位和十四位是日期，是从01-31之间的数值
            十五，十六，十七都是数字0-9
            十八位可能是数字0-9，也可能是X
            */
      let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/

      // 判断格式是否正确
      let format = idcard_patter.test(idcode)

      // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
      return last === last_no && format ? true : false
    }
  }

  // 值更改时存入缓存
  changeAndLeave(value) {
    if (typeof this.props.maxLength == 'undefined' || value.length <= this.props.maxLength) {
      setTimeout(() => {
        // 缓存信息到本地
        this.props.storageKey && timeOutLocalStorage.setItem(this.props.storageKey, value, 24 * 60 * 60 * 1000)
        this.props.onChange && this.props.onChange(value)
        this.textChange(value)
      }, 0)
    }
  }

  // 清空

  clear() {
    if (this.state.check == 'edit' || this.state.check == 'false') {
      this.setState(
        {
          value: ''
        },
        () => {
          // 防止state值尚未更新前，其他操作抢先调用changgeAndLeave，此处重新调用一次确保清除成功
          this.changeAndLeave(this.state.value)
        }
      )
      this.refs.inputItem.focus()
      this.props.errorCallBack && this.props.errorCallBack('')
      this.props.onChange && this.props.onChange('')
    }
  }

  // 跟踪输入值改变，并向父节点实时通知验证结果
  input(e) {
    if (typeof this.props.maxLength == 'undefined' || e.target.value.length <= this.props.maxLength) {
      let value = e.target.value
      if (this.props.changeValue) {
        if (this.props.storageKey == 'lineCarNumber') {
          value = this.props.changeValue(value).toUpperCase()
        } else {
          value = this.props.changeValue(value)
        }
      }
      this.setState({
        value: value,
        check: 'edit'
      })
      this.props.onInput && this.props.onInput(value)
    }
  }

  // 获取焦点时将状态设置为编辑状态
  inputFocus() {
    this.setState({
      check: 'edit'
    })
  }

  // 获取删除按钮样式
  getDeleteImg() {
    switch (this.state.check) {
      case 'true':
        return style.true
      case 'edit':
        return style.edit
      case 'false':
        return style.false
      default:
        return ''
    }
  }

  render() {
    let titleStyle = this.props.titleWidth ? { width: this.props.titleWidth } : {}
    return (
      <div className={style.InputWidthDelete}>
        {this.props.title ? (
          <div className={style.title} style={titleStyle}>
            <span>{this.props.title}</span>
            {this.props.icon ? (
              <img
                src={this.props.icon}
                onClick={() => {
                  this.props.iconClick()
                }}
              />
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
        <input
          className={this.props.storageKey == 'lineCity' ? 'c-1a1a1a' : ''}
          ref="inputItem"
          disabled={this.props.storageKey == 'lineCity' ? true : false}
          style={{
            paddingLeft: this.props.storageKey == 'lineCarNumber' ? '.4rem' : '',
            marginLeft: this.props.storageKey == 'lineCity' ? '-4%' : ''
          }}
          onFocus={e => {
            this.inputFocus()
            this.props.onFocus && this.props.onFocus(e)
          }}
          value={this.state.value}
          placeholder={this.props.placeholder}
          type={this.props.type}
          onBlur={e => {
            let value = e.target.value
            if (this.props.changeValue) {
              value = this.props.changeValue(value)
            }
            this.changeAndLeave(value)
          }}
          onInput={e => {
            this.input(e)
          }}
        />
        {this.props.storageKey == 'lineCity' ? (
          ''
        ) : (
          <div className={style.buttonContainer}>
            {this.state.check != 'none' ? (
              <button
                className={this.getDeleteImg()}
                onClick={() => {
                  this.clear()
                }}
              />
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    )
  }
}

export default InputWithDelete
