import React from 'react'
import styles from './index.scss'

const CxyCard = (props = {}) => {
  const { children, title, over, margin, titleEvent, style = {} } = props

  // 合并内联样式
  const cxyCardStyle = {
    ...style,
    margin: margin || '.24rem'
  }
  const cxyCardContentStyle = {
    overflow: over || 'hidden'
  }

  return (
    <div className={styles.CxyCard} style={cxyCardStyle}>
      {
        // 标题
        title ? (
          <div className={styles.cardTitleBox}>
            <div className={styles.text}>{title}</div>
            {
              // 目前仅驾驶证补换业务，编辑车辆页面有个删除操作使用到
              // 因为这里有很大的不确定性，目前写死了删除图标。若后面其他业务增加的话，自行修改此处，但同时记得要适配驾驶证补换的
              // 虽然这种方式不太合理，先凑合着吧，或者你来优化吧。
              titleEvent ? (
                <div className={styles.iconBox}>
                  <img className={styles.img} src="https://yzres.cx580.com/wx/images/driverchange/del.png" />
                  <div className={styles.iconClick} onClick={titleEvent()} />
                </div>
              ) : null
            }
          </div>
        ) : null
      }
      <div className={styles.cardContent} style={cxyCardContentStyle}>
        {children}
      </div>
    </div>
  )
}

CxyCard.defaultProps = {}

export default CxyCard
