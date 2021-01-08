import React, { Component } from 'react'
import style from './index.scss'

class MySteps extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    processList: React.PropTypes.array // 显示数据
  }

  render() {
    let { processList } = this.props

    return (
      <div className={style.myStepsBox}>
        {processList.map((item, index) => {
          let mainClass =
            index == 0 ? style.stepsText32 + ' ' + style.stepsColor00B488 + ' ' + style.stepsWeight600 : style.stepsText32 + ' ' + style.stepsColorC8C8C8
          let secondaryClass = style.stepsText26 + ' ' + style.stepsColorC8C8C8
          return (
            <div className={style.mySteps} key={index}>
              <div className={style.myStepsLeft}>
                {index == 0 ? (
                  <div className={style.stepsCircle}>
                    <div className={style.circleBig} />
                    <div className={style.circleSmall} />
                  </div>
                ) : (
                  <div className={style.stepsCircle}>
                    <div className={style.circleDefault} />
                  </div>
                )}
                <div className={style.stepsLine} />
              </div>
              <div className={style.myStepsRight}>
                <div className={mainClass}>{item.name}</div>
                <div className={secondaryClass}>{item.createTime}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

MySteps.defaultProps = {
  processList: []
}

export default MySteps
