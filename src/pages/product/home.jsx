import React, { Component } from 'react'
import { Card, Select, Input, Button, Table } from 'antd'
import LinkButton from '../../component/link-button'
import { reqProducts, reqSearchProducts } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option

//product 的默认子路由组件
export default class ProductHome extends Component {
  state = {
    total: 0,
    products: [],
    loading: false,
    searchName: '',
    searchType: 'productName'
  }

  //初始化列的名称
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: price => '¥' + price
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: status => {
          return (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        render: product => {
          return (
            <span>
              <LinkButton>修改</LinkButton>
              <LinkButton>删除</LinkButton>
            </span>
          )
        }
      }
    ]
  }

  //获取指定页码的列表数据显示
  getProducts = async pageNum => {
    //   console.log(pageNum, PAGE_SIZE);
    this.setState({
      loading: true
    })
    //如果有值，进行表格数据搜索
    const { searchName, searchType } = this.state
    console.log(this.state, this.state.searchName)
    let result = null
    if (searchName) {
      result = await reqSearchProducts(pageNum, PAGE_SIZE, searchName, searchType)
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
    if (result.status === 0) {
      const { total, list } = result
      this.setState({
        products: list,
        total,
        loading: false
      })
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getProducts(1)
  }

  render() {
    const { products, total, loading, searchType, searchName } = this.state

    const title = (
      <span>
        <Select value={searchType} onChange={value => this.setState({ searchType: value })} style={{ width: 150 }}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          value={searchName}
          onChange={e => this.setState({ searchName: e.target.value })}
          style={{ width: 200, margin: '0 15px' }}
        />
        <Button
          type="primary"
          onClick={() => {
            this.getProducts(1)
          }}
        >
          搜索
        </Button>
      </span>
    )

    const extra = <Button type="primary">添加商品</Button>
    return (
      <Card title={title} extra={extra}>
        <Table
          loading={loading}
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}
