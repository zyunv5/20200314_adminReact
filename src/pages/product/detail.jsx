import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../component/link-button'
import memoryUtils from '../../utils/memoryUtils'

//product 的默认子路由组件
export default class ProductDetail extends Component {
  //组件卸载之前清除保存的数据
  componentWillUnmount(){
    memoryUtils.product={}
  }

  render() {
    const { name, desc, price, detail, imgs } = memoryUtils.product
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined style={{ marginRight: 10, fontSize: 20 }} onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className="product-detail">
        <List bordered size="default">
          <List.Item>
            <span className="left">商品名称：</span>
            <span>{name}</span>
          </List.Item>
          <List.Item>
            <span className="left">商品描述：</span>
            <span>{desc}</span>
          </List.Item>
          <List.Item>
            <span className="left">商品价格：</span>
            <span>{price}元</span>
          </List.Item>
          <List.Item>
            <span className="left">所属分类：</span>
            <span>联想</span>
          </List.Item>
          <List.Item>
            <span className="left">商品图片：</span>
            <span>
              {imgs.map((item, index) => {
                return <img className="product-img" src={item} alt="img" key={index} />
              })}
            </span>
          </List.Item>
          <List.Item>
            <span className="left">商品详情：</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </List.Item>
        </List>
      </Card>
    )
  }
}
