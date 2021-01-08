import React from 'react'
import style from './index.scss'

const CxyFeeInfo = (props = {}) => {
  const { data = [] } = props
  return (
    <div className={style.cxyFeeInfo}>
      {data.map((item, index) => {
        if (item.disabled) return null

        const feeItemClassname = `${style.cxyFeeInfoItem} ${index === data.length - 1 && item.hideLine ? style.cxyFeeInfoLastItemHide : ''}`
        const feeItemStyle = { fontSize: item.fontSize || '0.24rem' }
        const feeItemTitleStyle = { color: item.titleColor || '#6a6a6a' }
        const feeItemValueStyle = { color: item.valueColor || '#1a1a1a' }

        return (
          <div key={index} className={feeItemClassname} style={feeItemStyle}>
            <div className={style.itemTitle} style={feeItemTitleStyle}>
              {item.title}
            </div>
            <div className={`${style.itemValue} ${style.CxyFeeInfoOneClamp}`} style={feeItemValueStyle}>
              {item.value}
            </div>
          </div>
        )
      })}
    </div>
  )
}

CxyFeeInfo.defaultProps = {
  data: []
}

export default CxyFeeInfo
