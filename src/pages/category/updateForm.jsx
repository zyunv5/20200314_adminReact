import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  }

  render() {
    const { categoryName, onChange } = this.props
    return (
      <Form
        initialValues={{ categoryName }}
        onFieldsChange={(changedFields, allFields) => {
          onChange(allFields)
        }}
      >
        <Form.Item
          name="categoryName"
          rules={[
            {
              required: true,
              message: '分类名称必须输入'
            }
          ]}
        >
          <Input placeholder="请输入分类名称" />
        </Form.Item>
      </Form>
    )
  }
}

export default UpdateForm
