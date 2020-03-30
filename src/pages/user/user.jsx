import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import LinkButton from "../../component/link-button";
import { formateDate } from "../../../../20200314_adminReact的副本/src/utils/dateUtils";
import { PAGE_SIZE } from "../../../../20200314_adminReact的副本/src/utils/constants";
import { reqUsers, reqDeleteUsers, reqAddOrUpdateUser } from "../../api";
import storageUtils from "../../../../20200314_adminReact的副本/src/utils/localStorageUtils";
import UserForm from "./useForm";

class User extends Component {
  state = {
    users: [],
    roles: [],
    isShow: false
  };

  initColumns = () => {
    this.columns = [
      {
        title: "用户名",
        dataIndex: "username"
      },
      {
        title: "邮箱",
        dataIndex: "email"
      },
      {
        title: "电话",
        dataIndex: "phone"
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: create_time => formateDate(create_time)
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        render: role_id => {
          if (role_id) {
            return this.roleNames[role_id];
          } else {
            return "";
          }
        }
      },
      {
        title: "操作",
        render: user => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      }
    ];
  };

  //更改请求到的角色数据，以便表格处理
  initRoleNames = roles => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    //保存
    this.roleNames = roleNames;
  };

  showAdd=()=>{
    this.user={}
    this.setState({
      isShow:true
    })
  }

  //添加/更新用户
  addOrUpdateUser = async () => {
    // console.log(this.form);
    const user = this.form.reduce((pre, index) => {
      pre[index.name[0]] = index.value;
      return pre;
    }, {});

    if (this.user) {
      user._id = this.user._id;
    }
    const result = await reqAddOrUpdateUser(user);
    if (result.status === 0) {
      message.success(`${this.user ? "修改" : "添加"}成功`);
      this.setState({ isShow: false });
      this.getUsers();
      this.user = null;
    } else {
      message.success(`${this.user ? "修改" : "添加"}成功`);
    }
  };

  //修改界面
  showUpdate = user => {
    this.user = user; //保存user
    this.setState({ isShow: true });
  };

  //获取用户列表
  getUsers = async () => {
    const result = await reqUsers();
    // console.log(result);
    if (result.status === 0) {
      const { user, roles } = result.data;
      this.initRoleNames(roles);
      this.setState({ users: user, roles });
    }
  };

  //删除用户
  deleteUser = user => {
    if (user.username === storageUtils.getUser().username) {
      message.error("住手自己人！！！");
      return;
    }
    Modal.confirm({
      title: `确认删除${user.username}吗？`,
      onOk: async () => {
        const result = await reqDeleteUsers(user._id);
        console.log(result);
        if (result.status === 0) {
          message.success("删除成功");

          this.getUsers();
        } else {
          message.error("删除失败");
        }
      }
    });
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const title = (
      <Button type="primary" onClick={this.showAdd}>
        创建用户
      </Button>
    );
    const { users, roles, isShow } = this.state;
    const user = this.user||{}; //看当前环境下有没有user
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
        <Modal
          title={user._id ? "修改用户" : "添加用户"}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => this.setState({ isShow: false })}
          destroyOnClose={true}
        >
          <UserForm
            roles={roles}
            user={user}
            onChange={newFields => {
              this.form = newFields;
            }}
          />
        </Modal>
      </Card>
    );
  }
}

export default User;
