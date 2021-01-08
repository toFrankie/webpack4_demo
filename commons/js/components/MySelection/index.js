import React, { Component } from 'react'
import style from './index.scss'

class MySelect extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {}

  componentDidMount() {}

  render() {
    let {
      name,
      title,
      value,
      iconEvent,
      placeholder,
      selectEvent,
      focusEvent,
      blurEvent,
      disabled,
      maxLength,
      hideLine,
      disColor,
      titleWidth,
      isFocus,
      nameIconType,
      regular
    } = this.props

    // 选择值样式
    let selectStyle =
      !value && !title
        ? `${style.select} ${style.selectPlaceholder} ${style.alignLeft}`
        : value && !title
        ? `${style.select} ${style.alignLeft}`
        : !value && title
        ? `${style.select} ${style.selectPlaceholder}`
        : style.select

    // 如果设置了 titleWidth，则把“标题” max-width 也设置成该长度；
    let titleStyle = titleWidth ? { width: titleWidth, maxWidth: titleWidth } : {}
    // 可能需要设置成不可点击状态
    let inputStyle = disColor ? { color: disColor } : {}
    // 无标题时，input设置左对齐
    let inputClass = !title ? style.input + ' ' + style.alignLeft : style.input
    // 需要隐藏底部分割线时
    let boxStyle = hideLine ? { borderBottom: '0' } : {}

    return (
      <div className={style.mySelectBox} style={boxStyle}>
        {title ? (
          <div className={style.title} style={titleStyle}>
            {title}
          </div>
        ) : (
          ''
        )}
        {title && iconEvent ? (
          <div
            className={style.icon}
            onClick={() => {
              iconEvent()
            }}
          />
        ) : (
          ''
        )}
        {title ? (
          <div
            name={name}
            id={name}
            className={style.selectArea}
            style={!title ? { paddingLeft: 0 } : {}}
            onClick={() => {
              selectEvent(name)
            }}
          >
            <div className={selectStyle}>
              <span className={style.text}>{value || placeholder || '请选择'}</span>
            </div>
            <div className={style.arrow} />
          </div>
        ) : (
          <div
            name={name}
            id={name}
            className={style.selectArea}
            style={!title ? { paddingLeft: 0 } : {}}
            onClick={() => {
              selectEvent(name)
            }}
          >
            <div className={selectStyle}>{value || placeholder || '请选择'}</div>
            <div className={style.arrow} />
          </div>
        )}
      </div>
    )
  }
}

MySelect.defaultProps = {
  disabled: false
}

export default MySelect
