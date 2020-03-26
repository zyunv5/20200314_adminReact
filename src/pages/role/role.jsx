import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRoles, reqUpdateRoles } from '../../api'
import AddForm from './addForm'
import AuthForm from './authForm'
import storageUtils from '../../utils/localStorageUtils'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'

export default class Role extends Component {
  state = {
    roles: [],
    role: {},
    loading: false,
    isShowAdd: false,
    isShowAuth: false
  }

  constructor(props) {
    super(props)

    this.auth = React.createRef()
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
        dataIndex: 'create_time',
        render: create_time => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: auth_time => formateDate(auth_time)
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

  //添加角色
  addRole = async () => {
    // console.log(this.add[0].value);
    let name = this.add[0].value
    let result = await reqAddRoles(name)
    if (result.status === 0) {
      // console.log(result);
      message.success('添加成功')
      this.setState({ isShowAdd: false })
      // this.getRoles();
      const role = result.data
      //更新状态
      this.setState(state => {
        return { roles: [...state.roles, role] }
      })
    } else {
      message.error('添加失败')
    }
  }

  //更新角色
  updateRole = async () => {
    const role = this.state.role
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_name = storageUtils.getUser().username
    role.auth_time = Date.now()
    const result = await reqUpdateRoles(role)
    if (result.status === 0) {
      message.success('更新成功')
      this.setState({
        isShowAuth: false
      })
      //当个人修改了个人权限的时候，需要退出登录
      if (role._id === memoryUtils.user.role_id) {
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
      } else {
        this.getRoles()
      }
    } else {
      message.success('更新失败')
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {
    const { roles, loading, role, isShowAdd, isShowAuth } = this.state
    const title = (
      <span>
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={() => {
            this.setState({ isShowAdd: true })
          }}
        >
          创建角色
        </Button>
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => {
            this.setState({ isShowAuth: true })
          }}
        >
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
            selectedRowKeys: [role._id],
            onSelect:(role)=>{
              this.setState({role})
            }
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

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({
              isShowAuth: false
            })
          }}
          destroyOnClose={true}
        >
          <AuthForm role={role} ref={this.auth} />
        </Modal>
      </Card>
    )
  }
}
