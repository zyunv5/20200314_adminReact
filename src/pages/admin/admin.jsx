import React, { Component } from "react";
// import memoryUtils from "../../utils/memoryUtils";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import LeftNav from "../../component/leftNav";
import Header from "../../component/header";
import Home from "../../pages/home/home";
import Category from "../../pages/category/category";
import Product from "../../pages/product/product";
import Role from "../../pages/role/role";
import User from "../../pages/user/user";
import Bar from "../../pages/charts/bar";
import Line from "../../pages/charts/line";
import Pie from "../../pages/charts/pie";
import "./admin.less";
import {connect} from "react-redux"
const { Footer, Sider, Content } = Layout;

// 后台管理的路由组件
class Admin extends Component {
  render() {
    // const user = memoryUtils.user;
    const user = this.props.user;
    //如果内存中没有user==>当前没有登录
    if (!user || !user._id) {
      //自动跳转到登录(在render()中)
      return <Redirect to="/login" />;
    }
    return (
      <Layout className="admin-container">
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>
            <Header />
            <div>hello {user.username}</div>
          </Header>
          <Content style={{ margin: 20 }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#ccc" }}>
            就这个教程144P，完全可以把人给累死
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(state=>({user:state.user}))(Admin);
