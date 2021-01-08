import React from 'react'
import style from './index.scss'

const CxySelectionField = (props = {}) => {
  const { name, title, value, iconEvent, placeholder, selectEvent, disabled, hideLine, disColor, left, right } = props

  // 选择值样式
  const selectClass = !value ? `${style.select} ${style.selectPlaceholder}` : style.select
  // 设置禁用样式
  const selectStyle = !disabled || (disabled && !disColor) ? {} : disColor ? { color: disColor + ' !important' } : {}
  // 需要隐藏底部分割线时
  const boxStyle = {
    marginLeft: left,
    marginRight: right
  }

  return (
    <div className={style.cxySelectFieldBox} style={boxStyle}>
      {title ? (
        <div className={style.cxySelectFieldTitle}>
          <div>{title}</div>
          {iconEvent ? (
            <div
              className={style.cxyIcon}
              onClick={() => {
                typeof iconEvent == 'function' && iconEvent(name)
              }}
            />
          ) : null}
        </div>
      ) : null}
      <div className={style.cxySelectField}>
        <div
          name={name}
          id={name}
          className={style.selectArea}
          onClick={() => {
            !disabled && selectEvent(name)
          }}
        >
          <div className={selectClass} style={selectStyle}>
            {value || placeholder || '请选择'}
          </div>
          <div className={style.arrow} />
        </div>
        {!hideLine ? <div className={style.cxySelectFieldLine} /> : null}
      </div>
    </div>
  )
}

CxySelectionField.defaultProps = {
  disabled: false
}

export default CxySelectionField
