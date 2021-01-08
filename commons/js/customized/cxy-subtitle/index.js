import React from 'react'
import style from './index.scss'

const CxySubtitle = (props = {}) => {
  const {
    title = '',
    description = '',
    background = '#fff',
    color = '#6a6a6a',
    descColor = '#ababab',
    fontSize = '0.28rem',
    descFontSize = '',
    hideLine = false
  } = props
  const boxStyle = { background }
  const subTitleStyle = { color, fontSize, borderBottom: hideLine ? 'none' : '1px solid #e5e5e5' }
  const subTitleDescStyle = { fontSize: descFontSize || fontSize, color: descColor || color }

  return (
    <div className={style.cxySubtitleBox} style={boxStyle}>
      <div className={style.cxySubtitle} style={subTitleStyle}>
        <span className={style.cxySubtitleLine} />
        <span className={style.cxySubtitleTitle}>{title}</span>
        <span className={style.cxySubtitleDesc} style={subTitleDescStyle}>
          {description}
        </span>
      </div>
    </div>
  )
}

CxySubtitle.defaultProps = {}

export default CxySubtitle
