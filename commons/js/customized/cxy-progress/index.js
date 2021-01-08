import React from 'react'
import style from './index.scss'

const CxyProgress = (props = {}) => {
  const { statusName = '', statusDesc = '', statusTime = '', navigateUrl = '', navigateEvent = null, showRow = 'auto' } = props

  let descStyle = {}
  if (Number(showRow) === 2) {
    descStyle = {
      maxHeight: '0.86rem',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      lineClamp: 2,
      WebkitLineClamp: 2
    }
  }

  return (
    <div className={style.cxyProgress}>
      <div
        className={style.cellStatusBox}
        onClick={() => {
          typeof navigateEvent === 'function' && navigateEvent(navigateUrl)
        }}
      >
        <div className={style.cellStatus}>
          <div className={style.cellStatusName}>{statusName}</div>
          {navigateUrl ? (
            <div className={style.cellNavigate}>
              <div>查看进度详情</div>
              <div className={style.icon} />
            </div>
          ) : null}
        </div>
        <div className={style.cellDesc} style={descStyle}>
          {statusDesc}
        </div>
        <div className={style.cellTime}>{statusTime}</div>
      </div>
    </div>
  )
}

export default CxyProgress
