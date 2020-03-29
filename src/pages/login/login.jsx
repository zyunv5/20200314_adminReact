import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './login.less'
import logo from './images/music_on.png'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'

// 登录组件
class Login extends Component {
  render() {
    //如果用户已经登录，自动跳转到管理界面
    const user = this.props.user
    if (user.username && user._id) {
      return <Redirect to="/" />
    }
    const errorMsg = this.props.user.errorMsg

    const onFinish = async values => {
      const { username, password } = values
      //调用分发异步action的函数=>发login的请求，有了结果后，更新状态
      this.props.login(username, password)
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </header>
        <section className="login-content">
          <div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>{user.errorMsg}</div>
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!'
                },
                { min: 4, message: '用户名不少于4个字!' },
                { max: 12, message: '用户名不多于12个字!' },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '用户名必须是英文、数字或下划线组成!'
                }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value.length < 4) {
                      return Promise.reject('密码需要大于4位')
                    } else if (value.length > 12) {
                      return Promise.reject('密码需要小于12位')
                    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                      return Promise.reject('密码必须是英文、数字或下划线组成')
                    } else {
                      return Promise.resolve()
                    }
                  }
                })
              ]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
// 高阶函数与高阶组件 create是高阶函数
// 包装form组件形成新组件
// const WrapLogin = Form.create()(Login);
// export default WrapLogin;

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { login })(Login)
