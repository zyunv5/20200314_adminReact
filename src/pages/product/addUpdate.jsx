import React, { Component } from "react";
import { Form, Input, Card, message, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "../../component/link-button";
import PicturesWall from "./picturesWall";
import RichTextEditor from "./richTextEditor";
import { reqAddOrUpdateProduct } from "../../api";

const { TextArea } = Input;

//product 的默认子路由组件
class ProductAddUpdate extends Component {
  constructor(props) {
    super(props);
    //创建用来保存ref标识的标签对象容器
    this.pw = React.createRef();
    this.editor = React.createRef();
  }

  render() {
    const type = this.props.location.state[1];
    // console.log(this.props);
    let [name, desc, price, imgs, detail] = ["", "", 0, [], ""];
    if (type === 2) {
      name = this.props.location.state[0].name;
      desc = this.props.location.state[0].desc;
      price = this.props.location.state[0].price;
      imgs = this.props.location.state[0].imgs;
      detail = this.props.location.state[0].detail;
    }
    
    const title = (
      <span>
        <LinkButton>
          <ArrowLeftOutlined onClick={() => this.props.history.goBack()} />
        </LinkButton>
        <span>{type === 2 ? "修改商品" : "新增商品"}</span>
      </span>
    );

    //指定item布局的配置项
    const layout = {
      labelCol: { span: 2 }, //左侧label的宽度
      wrapperCol: { span: 10 } //指定右侧包裹的宽度
    };

    const onFinish = async values => {
      console.log("Success:", values);

      const imgs = this.pw.current.getImgs();
      console.log(imgs);

      const detail = this.editor.current.getDetail();
      console.log(detail);

      let productId = null,status=null;
      if (this.props.location.state[1] === 2) {
        productId = this.props.location.state[0]._id;
        status = this.props.location.state[0].status;
      }

      const product = { _id: productId,status, ...values, imgs: imgs, detail: detail };
      const result = await reqAddOrUpdateProduct(product);
      if(result.status===0){
        message.success("成功");
        this.props.history.goBack();
      }else{
        message.error("失败")
      }

      console.log(result);
    };

    return (
      <Card title={title}>
        <Form
          {...layout}
          initialValues={{
            name,
            desc,
            price,
            imgs,
            detail
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[{ required: true, message: "商品名称必须输入" }]}
          >
            <Input placeholder="商品名称" />
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="desc"
            rules={[{ required: true, message: "商品描述必须输入" }]}
          >
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              placeholder="请输入商品描述"
            />
          </Form.Item>
          <Form.Item
            label="商品价格"
            name="price"
            rules={[
              { required: true, message: "商品价格必须输入" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject("价格必须大于0");
                }
              })
            ]}
          >
            <Input placeholder="请输入商品价格" type="number" addonAfter="元" />
          </Form.Item>
          {/* <Form.Item label="商品分类" name="price">
            <div>商品分类</div>
          </Form.Item> */}
          <Form.Item label="商品图片" name="price">
            <PicturesWall ref={this.pw} imgs={imgs} />
          </Form.Item>
          <Form.Item
            label="商品详情"
            name="detail"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 18 }}
          >
            <RichTextEditor ref={this.editor} detail={detail} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default ProductAddUpdate;
