import React from 'react'
import style from './index.scss'

const CxyCellShow = (props = {}) => {
  const { data, titleWidth, fontSize = '0.24rem' } = props
  const boxStyle = { fontSize }
  const titleStyle = { width: titleWidth || 'auto' }

  if (!data) return null
  return (
    <div className={style.cxyCellShow}>
      {data.map((item, index) => {
        return (
          <div key={index} className={style.cxyCellShowItem} style={boxStyle}>
            <div className={style.itemTitle} style={titleStyle}>
              {item.title}
            </div>
            <div className={style.itemValue}>{item.value}</div>
          </div>
        )
      })}
    </div>
  )
}

CxyCellShow.defaultProps = {}

export default CxyCellShow
