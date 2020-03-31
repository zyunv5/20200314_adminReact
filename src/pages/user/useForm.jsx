import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

const Option = Select.Option;

//添加/修改用户的form组件
function UserForm(props) {
  // static propTypes = {
  //   roles: PropTypes.array.isRequired,
  //   user: PropTypes.object
  // }
  // const { onChange, roles } = this.props
  // const user = this.props.user

  const layout = {
    labelCol: { span: 4 }, //左侧label的宽度
    wrapperCol: { span: 18 } //指定右侧包裹的宽度
  };
  const [onChange] = useState(props.onChange);
  const [roles] = useState(props.roles);
  const [user] = useState(props.user);

  return (
    <Form
      {...layout}
      initialValues={{
        username: user.username,
        password: user.password,
        phone: user.phone,
        email: user.email,
        role_id: user.role_id
      }}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields);
      }}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: "用户名必须输入",
            whitespace: true
          }
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      {user._id ? null : (
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "密码必须输入",
              whitespace: true
            }
          ]}
        >
          <Input placeholder="请输入密码" type="password" />
        </Form.Item>
      )}
      <Form.Item
        label="手机号"
        name="phone"
        rules={[
          {
            required: true,
            message: "手机号必须输入",
            whitespace: true
          }
        ]}
      >
        <Input placeholder="请输入手机号" type="number" />
      </Form.Item>
      <Form.Item
        label="邮编"
        name="email"
        rules={[
          {
            required: true,
            message: "角色名称必须输入",
            whitespace: true
          }
        ]}
      >
        <Input placeholder="请输入角色名称" />
      </Form.Item>
      <Form.Item
        label="角色"
        name="role_id"
        rules={[
          {
            required: true,
            message: "角色名称必须选择",
            whitespace: true
          }
        ]}
      >
        <Select placeholder="请选择角色">
          {roles.map(role => (
            <Option value={role._id} key={role._id}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}

export default UserForm;
