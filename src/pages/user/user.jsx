import React, { Component } from "react";
import { Card, Button, Table, Modal } from "antd";
import LinkButton from "../../component/link-button";
import { formateDate } from "../../utils/dateUtils";
import { PAGE_SIZE } from "../../utils/constants";
import { reqUsers } from "../../api";

class User extends Component {
  state = {
    users: [],
    roles:[],
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
        dataIndex: "role._id"
      },
      {
        title: "操作",
        render: dataSource => (
          <span>
            <LinkButton>修改</LinkButton>
            <LinkButton>删除</LinkButton>
          </span>
        )
      }
    ];
  };

  addOrUpdateUser = () => {};

  getUsers=async ()=>{
    const result=await reqUsers();
    console.log(result);
    if(result.status===0){
      this.setState({
        users:result.data.user,
        roles:result.data.roles
      })
    }else{

    }
  }

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount(){
    this.getUsers();
  }

  render() {
    const title = <Button type="primary">创建用户</Button>;
    const { users, isShow } = this.state;
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
          title="添加用户"
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={()=>this.setState({ isShow: false })}
          destroyOnClose={true}
        >
          添加/更新
        </Modal>
      </Card>
    );
  }
}

export default User;
