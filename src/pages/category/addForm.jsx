import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const { Option } = Select

class AddForm extends Component {
  static propTypes = {
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired
  }

  render() {
    const { categorys, parentId, onChange } = this.props
    const [form] = Form.useForm();
    return (
      <Form
        form={form}
        initialValues={{ parentId, categoryName: '' }}
        onFieldsChange={async (changedFields, allFields) => {
          try {
            const values = await form.validateFields()
            console.log('Success:', values)
            onChange(allFields)
          } catch (errorInfo) {
            console.log('Failed:', errorInfo)
          }
        }}
      >
        <Form.Item name="parentId">
          <Select style={{ width: '100%', marginBottom: 20 }}>
            <Option value="0">一级分类</Option>
            {categorys.map(item => (
              <Option value={item._id} key={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
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

export default AddForm
