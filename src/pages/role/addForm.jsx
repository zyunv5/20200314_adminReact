import React, { Component } from 'react'
import { Form, Input } from 'antd'

class AddForm extends Component {
  render() {
    const { onChange } = this.props

    return (
      <Form
        initialValues={{ roleName: '' }}
        onFieldsChange={(changedFields, allFields) => {
          onChange(allFields)
        }}
      >
        <Form.Item
        label="角色名称"
          name="roleName"
          rules={[
            {
              required: true,
              message: '角色名称必须输入',
              whitespace: true
            }
          ]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
      </Form>
    )
  }
}

export default AddForm
