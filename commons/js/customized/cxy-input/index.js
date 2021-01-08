import React, { Component } from 'react'
import style from './index.scss'
const PropTypes = React.PropTypes

class CxyInput extends Component {
  constructor(props) {
    super(props)
    // 作为首次有真实数据渲染的标识
    this.firstRenderFlag = true
    // 初始值（由于动态赋值，这里无法得到我们想要的初始值）
    this.initValue = typeof props.value === 'undefined' ? '' : props.value
    // 初始状态
    let initCheckStatus = ''
    // 默认正则表达式，匹配所有
    this.defaultRegularExperssion = /[\s\S]*/
    // 创建正则表达式
    this.regularExperssion = props.regular || this.defaultRegularExperssion
    if (props.type == 'idcard') {
      if (props.regular) console.warn("<CxyInput /> 类型是身份证（idcard）时，无需传入 'regular' 属性校验。")
      initCheckStatus = !this.initValue || this.identityCodeValid(this.initValue) ? 'success' : 'error'
    } else if (this.regularExperssion) {
      initCheckStatus = !this.initValue || this.regularExperssion.test(this.initValue) ? 'success' : 'error'
    }

    this.state = {
      value: this.initValue,
      checkStatus: initCheckStatus
    }

    // 触发了 onChange、onFocus、onBlur 的标识
    this.changeFlag = false
  }

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 初始值
    title: PropTypes.string, // 标题
    placeholder: PropTypes.string, // 提示语，默认：请输入
    onChange: PropTypes.func, // onChange事件
    onBlur: PropTypes.func, // onBlur事件
    onInput: PropTypes.func, // onInput事件
    onFocus: PropTypes.func, // onFocus事件
    regular: PropTypes.object, // 正则表达式
    type: PropTypes.string, // 类型，现在只有 text、idcard
    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 最大长度，默认长度： 99
    titleWidth: PropTypes.string, // 此处提供可设置的标题长度，防止标题太长换行
    titleMaxWidth: PropTypes.string, // 此处提供可设置的标题最大长度
    iconEvent: PropTypes.func, // 图标点击事件
    disabled: PropTypes.bool, // 是否禁用组件
    capital: PropTypes.bool // 是否大写显示
  }

  /**
   * 一、触发 onChange、onFocus、onBlur 事件，就无需再更新一遍了
   *
   * 二、处理未触发 onChange、onFocus、onBlur 时，对部分属性 regular、 value 状态发生变化时的情况，以下情况需要处理。
   * 1. state.value != props.value
   * 2. props.disabled == true
   * 3. props.regular 发生改变时
   */
  componentDidUpdate() {
    if (this.changeFlag) return

    const data = {}
    const { regular, type, disabled } = this.props
    let { value } = this.props

    if (value === undefined) value = ''
    // value 发生变化：更新并重新校验规则
    if (value !== this.state.value) {
      this.regularExperssion = regular || this.defaultRegularExperssion
      data.value = value
      // 禁用状态或 value 为空，checkStatus 设为 success。
      data.checkStatus = disabled || !value || (type !== 'idcard' ? this.regularExperssion.test(value) : this.identityCodeValid(value)) ? 'success' : 'error'
    } else if (regular && this.regularExperssion.toString() !== regular.toString()) {
      this.regularExperssion = regular || this.defaultRegularExperssion
      data.checkStatus = disabled || !value || (type !== 'idcard' ? this.regularExperssion.test(value) : this.identityCodeValid(value)) ? 'success' : 'error'
    }

    if (Object.keys(data).length) this.setState(data)
  }

  identityCodeValid(code) {
    if (!code || typeof code !== 'string') return false
    // x 转为大写
    code = code.toUpperCase()
    const city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    let tip = ''
    let pass = true

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      tip = '身份证号格式错误'
      pass = false
    } else if (!city[code.substr(0, 2)]) {
      tip = '地址编码错误'
      pass = false
    } else {
      // 18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
        let sum = 0
        let ai = 0
        let wi = 0
        for (let i = 0; i < 17; i++) {
          ai = code[i]
          wi = factor[i]
          sum += ai * wi
        }
        if (parity[sum % 11] != code[17]) {
          tip = '校验位错误'
          pass = false
        }
      }
    }
    return pass
  }

  onInput(value) {
    const { capital, onInput } = this.props
    if (capital) value = value.toUpperCase()
    this.setState({ value })
    // 回调函数
    onInput && onInput(value)
  }

  onBlur(value) {
    let checkStatus = ''
    const { capital, type, regular, onBlur } = this.props
    if (capital) value = value.toUpperCase()
    if (!value) {
      checkStatus = ''
    } else if (type == 'idcard') {
      checkStatus = this.identityCodeValid(value) ? 'success' : 'error'
    } else if (regular) {
      checkStatus = regular.test(value) ? 'success' : 'error'
    }
    this.setState({ checkStatus }, () => {
      this.changeFlag = false
    })
    // 回调函数
    onBlur && onBlur(value)
  }

  onFocus(value) {
    const { capital, onFocus } = this.props

    if (capital) value = value.toUpperCase()

    this.changeFlag = true
    this.setState({ checkStatus: '' })
    // 回调函数
    onFocus && onFocus(value)
  }

  render() {
    const { value, checkStatus } = this.state
    const {
      name,
      title,
      iconEvent,
      placeholder,
      maxLength,
      hideLine,
      disColor,
      titleWidth,
      titleMaxWidth,
      disabled,
      description,
      descColor,
      left,
      right
    } = this.props

    // 如果设置了 titleWidth，则把“标题” max-width 也设置成该长度；
    const titleStyle = {
      ...(titleMaxWidth ? { maxWidth: titleMaxWidth } : {}),
      ...(titleWidth ? { width: titleWidth, maxWidth: titleWidth } : {})
    }
    // 内联样式：字段校验失败、不可点击状态
    const inputStyle =
      checkStatus == 'error'
        ? { color: '#e64340', WebkitTextFillColor: '#e64340', textFillColor: '#e64340', WebkitOpacity: 1 }
        : disabled && disColor
          ? { color: disColor, WebkitTextFillColor: disColor, textFillColor: disColor, WebkitOpacity: 1 }
          : {}
    // 无标题时，input设置左对齐
    const inputClass = !title ? style.input + ' ' + style.alignLeft : style.input
    // 需要隐藏底部分割线时
    const boxStyle = {
      ...(hideLine ? { borderBottom: '0' } : {}),
      ...(left !== undefined ? { marginLeft: left } : {}),
      ...(right !== undefined ? { marginRight: right } : {})
    }

    return (
      <div className={style.cxyInputBox} style={boxStyle}>
        <div className={style.cxyInput}>
          {title ? (
            <div className={style.title} style={titleStyle}>
              {title}
            </div>
          ) : null}
          {title && iconEvent ? (
            <div
              className={style.icon}
              onClick={() => {
                typeof iconEvent == 'function' && iconEvent(name)
              }}
            />
          ) : null}
          <input
            name={name}
            id={name}
            value={value}
            className={inputClass}
            style={inputStyle}
            disabled={!!disabled}
            type="text"
            maxLength={maxLength || 99}
            placeholder={placeholder || '请输入'}
            onChange={e => {
              this.onInput(e.target.value)
            }}
            onBlur={e => {
              this.onBlur(e.target.value)
            }}
            onFocus={e => {
              this.onFocus(e.target.value)
            }}
          />
        </div>
        {description ? (
          <div className={style.inputDescription} style={descColor ? { color: descColor } : {}}>
            {description}
          </div>
        ) : null}
      </div>
    )
  }
}

CxyInput.defaultProps = {
  disabled: false,
  type: 'text',
  capital: false
}

export default CxyInput
