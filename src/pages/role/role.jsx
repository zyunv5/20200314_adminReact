import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles,reqAddRoles } from '../../api'
import AddForm from './addForm'

export default class Role extends Component {
  state = {
    roles: [],
    role: {},
    loading: false,
    isShowAdd: false
  }

  onRow = role => {
    return {
      onClick: event => {
        // console.log(role,event);
        this.setState({ role })
      }
    }
  }

  //初始化列的名称
  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time'
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time'
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ]
  }

  getRoles = async () => {
    this.setState({ loading: true })
    let result = await reqRoles()
    // console.log(result);
    if (result.status === 0) {
      this.setState({
        roles: result.data,
        loading: false
      })
    }
  }

  addRole = async () => {
    console.log(this.add[0].value);
    let name=this.add[0].value
    let result=await reqAddRoles(name)
    if(result.status===0){
      message.success("添加成功")
      this.setState({isShowAdd:false})
      this.getRoles();
    }else{
      message.error("添加失败")
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {
    const { roles, loading, role,isShowAdd } = this.state
    const title = (
      <span>
        <Button type="primary" style={{ marginRight: 10 }} onClick={()=>{this.setState({isShowAdd:true})}}>
          创建角色
        </Button>
        <Button type="primary" disabled={!role._id}>
          设置角色权限
        </Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          loading={loading}
          onRow={this.onRow}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id]
          }}
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={{
            pageSize: PAGE_SIZE,
            showQuickJumper: true
          }}
        />

        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({
              isShowAdd: false
            })
          }}
          destroyOnClose={true}
        >
          <AddForm
            onChange={newFields => {
              this.add = newFields
            }}
          />
        </Modal>
      </Card>
    )
  }
}
