/**
 * Created by 小敏哥 on 2018/1/3.
 * 此处封装一个简单的上传控件
 */
import React, { Component } from 'react'
import style from './index.scss'
import lrz from 'lrz'
import { Toast } from 'antd-mobile'

class SimpleUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgCache: typeof props.initImg != 'undefined' && props.initImg ? props.initImg : ''
    }
  }

  static propTypes = {
    title: React.PropTypes.string, // 标题
    titleWidth: React.PropTypes.string, // 此处提供可设置的标题长度，防止标题太长换行
    fileChange: React.PropTypes.func, // 邮件改变后触发
    submitType: React.PropTypes.func, // 用于提交的数据类型，两种类型：base64,file
    initImg: React.PropTypes.string // 默认图片路径
  }

  /**
   * 图片压缩上传
   * @param e 图片资源
   */
  compressImage(files, callBack) {
    try {
      Toast.hide()
      Toast.loading('正在上传', 30)
      let quality = 1
      if (files.size > 1024 * 100) {
        quality = 0.5
      } else {
        quality = 0.7
      }
      lrz(files, {
        width: 1024,
        quality: quality
      })
        .then(rst => {
          Toast.hide()
          callBack(rst.base64)
        })
        .catch(err => {
          Toast.fail('上传失败', 2)
        })
        .always(() => {})
    } catch (e) {
      Toast.fail('上传失败', 2)
      console.log(e)
    }
  }

  // 点击触发上传
  contentClick() {
    this.refs.uploadCompent.click()
  }

  // 改变显示的图片
  changeImgAndCallBack(result) {
    this.setState({
      imgCache: result
    })
    this.props.fileChange && this.props.fileChange(result)
  }

  // 图片改变时触发上传操作
  imgFileChange(e) {
    let file = e.target.files[0]
    this.compressImage(file, result => {
      if (this.props.submitType == 'base64') {
        this.changeImgAndCallBack(result)
      } else {
        // 非base64方式传回原始file
        this.setState({
          imgCache: result
        })
        this.props.fileChange && this.props.fileChange(file)
      }
    })
  }

  render() {
    let titleStyle = this.props.titleWidth ? { width: this.props.titleWidth } : {}
    let backgroundStyle = this.state.imgCache ? { backgroundImage: 'url()' } : {}
    return (
      <div className={style.simpleUpload}>
        <div className={style.title} style={titleStyle}>
          {this.props.title}
        </div>
        <div
          className={style.content}
          style={backgroundStyle}
          onClick={() => {
            this.contentClick()
          }}
        >
          <img src={this.state.imgCache || 'http://yzres.cs580.com/h5resource/test/illegal/images/icon_findcamera.png'} />
        </div>
        <input ref="uploadCompent" type="file" accept="image/*" onChange={e => this.imgFileChange(e)} className={style.uploadCompent} />
      </div>
    )
  }
}

export default SimpleUpload
