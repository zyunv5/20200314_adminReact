import React, { Component } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../component/link-button'
import { reqCategorys, reqAddCategorys, reqUpdateCategorys } from '../../api'
import AddForm from './addForm'
import UpdateForm from './updateForm'

class Category extends Component {
  state = {
    dataSource: [], //列表数据
    loading: false,
    parentId: '0',
    parentName: '',
    subCategorys: [],
    categoryName: '',
    showStatus: 0, //标识添加/更新的确认框 0不显示 1添加 2更新
    fields: ''
  }

  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '操作',
        width: 300,
        key: 'action',
        render: dataSource => (
          <span>
            <LinkButton
              style={{ marginRight: 16 }}
              onClick={() => {
                this.showUpdate(dataSource)
              }}
            >
              修改分类
            </LinkButton>
            {/*如何向事件回调函数传递参数：先定义一个匿名函数，在函数调用处理的函数并传入数据*/}
            {this.state.parentId === '0' ? (
              <LinkButton
                onClick={() => {
                  this.showSubCategorys(dataSource)
                }}
              >
                查看二级分类
              </LinkButton>
            ) : null}
          </span>
        )
      }
    ]
  }

  //获取一级或者二级分类列表
  getCategory = async parentId => {
    this.setState({ loading: true })
    parentId = parentId || this.state.parentId
    const result = await reqCategorys(parentId)
    // console.log(result.status)
    if (result.status === 0) {
      if (parentId === '0') {
        this.setState({
          dataSource: result.data,
          loading: false
        })
      } else {
        this.setState({
          subCategorys: result.data,
          loading: false
        })
      }
    } else {
      message.error('获取分类列表失败')
    }
  }
  //获取指定的二级分类列表
  showSubCategorys = dataSource => {
    this.setState(
      {
        parentId: dataSource._id,
        parentName: dataSource.name
      },
      () => {
        this.getCategory()
      }
    )
  }

  //获取指定的一级分类列表
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  //添加模态框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  //修改模态框
  showUpdate = dataSource => {
    this.setState({
      showStatus: 2,
      categoryName: dataSource
    })
  }

  //关闭模态框
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }

  //添加分类
  addCategory = async () => {
    // console.log(this.add)
    if (!this.add[0].errors.length) {
      //关闭模态框
      this.setState({
        showStatus: 0
      })
      //发请求更新分类
      const result = await reqAddCategorys(this.add[1].value, this.add[0].value)
      if (result.status === 0) {
        // console.log(result)
        if (this.add[0].value === this.state.parentId) {
          // 给当前下的列表获取数据
          this.getCategory()
        } else if (this.add[0].value === '0') {
          //二级列表里面给一级列表添加分类，更新一级，但是不显示
          this.getCategory('0')
        }
      }
    }
  }
  //更新分类
  updateCategory = async categoryName => {
    if (!this.form[0].errors.length) {
      //关闭模态框
      this.setState({
        showStatus: 0
      })
      // console.log(categoryName._id, this.form)
      // 发请求更新分类
      const result = await reqUpdateCategorys(categoryName._id, this.form[0].value)
      if (result.status === 0) {
        // console.log(result);
        // 重新更新列表
        this.getCategory()
      }
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  //发异步请求
  componentDidMount() {
    this.getCategory()
  }

  render() {
    const { dataSource, categoryName, loading, parentId, parentName, subCategorys, showStatus, fields } = this.state
    //card的title
    const title =
      parentId === '0' ? (
        '一级类目分类'
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <ArrowRightOutlined style={{ marginRight: '10px' }} />
          <span>{parentName}</span>
        </span>
      )
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <PlusOutlined />
        添加
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={parentId === '0' ? dataSource : subCategorys}
          columns={this.columns}
          bordered
          rowKey="_id"
          pagination={{ defaultPageSize: 9, showQuickJumper: true }}
          loading={loading}
        />

        <Modal title="添加分类" visible={showStatus === 1} onOk={this.addCategory} onCancel={this.handleCancel} destroyOnClose={true}>
          <AddForm
          ref="form"
            categorys={dataSource}
            parentId={parentId}
            onChange={newFields => {
              this.add = newFields
            }}
          />
        </Modal>

        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={() => {
            this.updateCategory(categoryName)
          }}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <UpdateForm
            categoryName={showStatus === 2 ? categoryName.name : ''}
            fields={fields}
            onChange={newFields => {
              this.form = newFields
            }}
          />
        </Modal>
      </Card>
    )
  }
}

export default Category
