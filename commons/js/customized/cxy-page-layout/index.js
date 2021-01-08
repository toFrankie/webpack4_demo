/**
 * 页面上下布局组件：
 *
 * 【表现形式】
 * 1. 若内容未超过一屏，则表现为一上一下；
 * 2. 若内容超过一屏，bottom 部分的内容会紧接着 top 部分。
 *
 * 【应用场景】
 * 这是是符合我们大部分业务首页的要求的，比如客服电话、由xxx提供文案贴着底部的场景。
 *
 * 【用法】
 * 1. 支持配置背景颜色（默认：background: inherit）
 * 2. 支持配置布局方向 direction：direct、reverse
 *
 * 【Usage】
 * <CxyPageLayout>
 *     <div ref="top">顶部内容</div>
 *     <div ref="bottom">底部内容</div>
 * </CxyPageLayout>
 */

import React from 'react'
import styles from './index.scss'

const CxyPageLayout = (props = {}) => {
  const { background, direction, style = {}, children = [] } = props
  const [childTop = {}, childBottom = {}] = children
  const boxStyle = {
    ...style,
    background
  }
  const topClassname = direction === 'reverse' ? styles.pageTopReverse : styles.pageTop
  const bottomClassname = direction === 'reverse' ? styles.pageBottomReverse : styles.pageBottom

  return (
    <div className={styles.CxyPageLayout} style={boxStyle}>
      <div className={topClassname}>{childTop.ref === 'top' ? [childTop] : null}</div>
      <div className={bottomClassname}>{childBottom.ref === 'bottom' ? [childBottom] : null}</div>
    </div>
  )
}

CxyPageLayout.defaultProps = {
  direction: 'direct'
}

export default CxyPageLayout
