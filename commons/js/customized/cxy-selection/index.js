import React from 'react'
import style from './index.scss'

const CxySelection = (props = {}) => {
  const {
    name,
    title,
    value,
    iconEvent,
    placeholder,
    selectEvent,
    hideLine,
    disColor,
    titleWidth,
    titleMaxWidth,
    description,
    descColor,
    left,
    right,
    selectType
  } = props

  // 选择值样式
  const selectStyle =
    !value && !title
      ? `${style.select} ${style.selectPlaceholder} ${style.alignLeft}`
      : value && !title
      ? `${style.select} ${style.alignLeft}`
      : !value && title
      ? `${style.select} ${style.selectPlaceholder}`
      : style.select

  // 如果设置了 titleWidth，则把“标题” max-width 也设置成该长度；
  const titleStyle = { ...(titleMaxWidth ? { maxWidth: titleMaxWidth } : {}), ...(titleWidth ? { width: titleWidth, maxWidth: titleWidth } : {}) }
  // 需要隐藏底部分割线时
  const boxStyle = {
    ...(hideLine ? { borderBottom: '0' } : {}),
    ...(left !== undefined ? { marginLeft: left } : {}),
    ...(right !== undefined ? { marginRight: right } : {})
  }

  return (
    <div className={style.cxySelectBox} style={boxStyle}>
      <div className={style.cxySelect}>
        {/* 标题 */}
        {title ? (
          <div className={style.title} style={titleStyle}>
            {title}
          </div>
        ) : null}
        {/* 引导图标 */}
        {title && iconEvent ? (
          <div
            className={style.icon}
            onClick={() => {
              typeof iconEvent == 'function' && iconEvent(name)
            }}
          />
        ) : null}
        {/* 内容部分 */}
        {selectType === 'image' ? (
          <div
            name={name}
            id={name}
            className={style.selectArea}
            style={!title ? { paddingLeft: 0 } : {}}
            onClick={() => {
              selectEvent(name)
            }}
          >
            <div
              className={style.selectImg}
              style={{
                width: value ? '.6rem' : '.62rem',
                backgroundImage: `url(${value || 'https://yzres.cx580.com/h5resource/pro/public/images/commonlyIcon/icon_camera_upload-62-60.png'})`
              }}
            />
          </div>
        ) : title ? (
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
      {description ? (
        <div className={style.selectDescription} style={descColor ? { color: descColor } : {}}>
          {description}
        </div>
      ) : null}
    </div>
  )
}

CxySelection.defaultProps = {
  disabled: false
}

export default CxySelection
