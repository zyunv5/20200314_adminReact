import React, { Component } from 'react'
import { Button, Row, Col } from 'antd'
import { connect } from 'react-redux'

import { setHeadTitle } from '../../redux/actions'
import './notFound.less'

class NotFound extends Component {
  goHome = () => {
    this.props.setHeadTitle('首页')
    this.props.history.replace('/home')
  }
  render() {
    return (
      <Row className="notFound">
        <Col span={12} className="left"></Col>
        <Col span={12} className="right"></Col>
        <h1>404</h1>
        <h2>抱歉，你访问的页面不存在</h2>
        <div>
          <Button type="primary" onClick={this.goHome}>
            回到首页
          </Button>
        </div>
      </Row>
    )
  }
}

export default connect(null, { setHeadTitle })(NotFound)
