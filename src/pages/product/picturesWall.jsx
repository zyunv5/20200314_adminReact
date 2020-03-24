import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { reqDeleteImg } from '../../api'
import {BASE_IMG_URL} from "../../utils/constants"

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

class PicturesWall extends Component {
  constructor(props){
    super(props)

    let fileList=[]
    //如果传入了imgs属性
    const {imgs}=this.props;
    if(imgs&&imgs.length>0){
      fileList=imgs.map((img,index)=>({
        uid:-index,
        name:img,
        status:"done",
        url:BASE_IMG_URL+img
      }))
    }
    this.state = {
      previewVisible: false, //是否模态框显示预览
      previewImage: '', //大图的url
      fileList
    }
  }

  //获取所有已上传图片文件名的数组
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  handleCancel = () => this.setState({ previewVisible: false }) //取消预览

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    })
  }

  handleChange = async ({ file, fileList }) => {
    // console.log(file, fileList)
    // console.log(file.status);
    if (file.status === 'done') {
      //上传完成
      const result = file.response
      if (result.status === 0) {
        message.success('上传成功')
        const { name, url } = result
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('上传失败')
      }
    } else if (file.status === 'removed') {
      // console.log(file.name)
      const result = await reqDeleteImg(file.name)
      if (result.status === 0) {
        message.success('图片删除成功')
      } else {
        message.error('图片删除失败')
      }
    }

    this.setState({ fileList: [...fileList] })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          accept="image/*"
          action="/manage/img/upload"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default PicturesWall
