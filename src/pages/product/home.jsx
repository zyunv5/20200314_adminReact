import React, { PureComponent } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'
import LinkButton from '../../component/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import './product.less'
import { connect } from 'react-redux'
import { receiveProduct } from '../../redux/actions'

const Option = Select.Option

//product 的默认子路由组件
class ProductHome extends PureComponent {
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
        render: product => {
          const { status, _id } = product
          return (
            <span>
              <Button type="primary" onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}>
                {status === 1 ? '下架' : '上架'}
              </Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        render: product => {
          return (
            <span>
              <LinkButton onClick={() => this.showDetail(product)}>详情</LinkButton>
              <LinkButton onClick={() => this.showUpdate(product)}>修改</LinkButton>
            </span>
          )
        }
      }
    ]
  }

  //跳转新增
  showAdd = () => {
    this.props.receiveProduct(['', 1])
    this.props.history.push('/product/addupdate')
  }

  //跳转详情
  showDetail = product => {
    this.props.receiveProduct([product])
    this.props.history.push('/product/detail')
  }

  //显示修改商品界面
  showUpdate = product => {
    this.props.receiveProduct([product, 2])
    this.props.history.push('/product/addUpdate')
  }

  //获取指定页码的列表数据显示
  getProducts = async pageNum => {
    this.pageNum = pageNum //保存当前页码,以便今后继续使用
    this.setState({
      loading: true
    })
    //如果有值，进行表格数据搜索
    const { searchName, searchType } = this.state
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

  //更新状态
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if (result.status === 0) {
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
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

    const extra = (
      <Button type="primary" onClick={() => this.showAdd()}>
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          loading={loading}
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
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

export default connect(null, { receiveProduct })(ProductHome)
