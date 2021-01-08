import React from 'react'
import style from './index.scss'

const CxyCell = (props = {}) => {
  const { height = '1rem', fontSize = '0.32rem', label, value, labelColor = '#6a6a6a', valueColor = '#1a1a1a' } = props
  const labelStyle = { color: labelColor }
  const valueStyle = { color: valueColor }
  const boxStyle = {
    height,
    fontSize,
    lineHeight: fontSize
  }

  return (
    <div className={style.cxyCell} style={boxStyle}>
      <div className={style.cellLabel + ' ' + style.textEllipsis} style={labelStyle}>
        {label}
      </div>
      <div className={style.cellValue + ' ' + style.textEllipsis} style={valueStyle}>
        {value}
      </div>
    </div>
  )
}

CxyCell.defaultProps = {}

export default CxyCell
