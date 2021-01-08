/**
 * Created by 小敏哥 on 2017/8/17.
 * 封装ant的picker组件，用于展示地区，在参数中传入区域数据和列数、回调函数，在子组件中可传入自定义样式
 */
import React, { Component } from 'react'
import { Picker } from 'antd-mobile'
import timeOutLocalStorage from '../../utils/timeOutLocalStorage'
import { createForm } from 'rc-form'

class AddressPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      regionData: [], // 后台获取地区信息
      initialValue: [] // 初始数据
    }
  }
  static propTypes = {
    regionData: React.PropTypes.array.isRequired, // 区域数据
    colCount: React.PropTypes.number, // 地区列数
    onChange: React.PropTypes.func, // 选择后回调函数
    initialValue: React.PropTypes.array, // 初始值
    storageKey: React.PropTypes.string // 缓存key值，如传入则会缓存当前输入值,优先级低于initialValue，如有定义initialValue，则不会加载缓存
  }

  componentDidMount() {
    if (this.props.initialValue) {
      // 读取默认值
      this.setState({
        initialValue: this.props.initialValue
      })
      this.props.onChange && this.props.onChange(this.props.initialValue)
    } else {
      // 读取缓存
      let storage = timeOutLocalStorage.getItem(this.props.storageKey)
      if (storage) {
        this.setState({
          initialValue: storage
        })
        this.props.onChange && this.props.onChange(storage)
      }
    }
  }

  render() {
    const { getFieldProps } = this.props.form
    let self = this
    console.log(self.state.initialValue)
    return (
      <div style={{ position: 'relative' }}>
        {this.props.hideArrow && <div style={{ position: 'absolute', height: '1.1rem', width: '100%', zIndex: '10001', top: '-0.3rem' }} />}
        <Picker
          data={this.props.regionData}
          title={this.props.title || '选择地区'}
          extra="请选择"
          cols={this.props.colCount}
          {...getFieldProps('district', {
            initialValue: self.state.initialValue,
            onChange(e) {
              self.props.storageKey && timeOutLocalStorage.setItem(self.props.storageKey, e, 24 * 60 * 60 * 1000)
              self.props.onChange && self.props.onChange(e)
            }
          })}
        >
          {this.props.children}
        </Picker>
      </div>
    )
  }
}

export default createForm()(AddressPicker)
