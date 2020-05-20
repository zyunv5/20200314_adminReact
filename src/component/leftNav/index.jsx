//左侧导航组件
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
import menuList from "../../config/menuConfig";
import logo from "../../assets/images/music_off.png";
// import storageUtils from "../../utils/localStorageUtils";
// import memoryUtils from "../../utils/memoryUtils";
import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/actions";
import "./index.less";

const { SubMenu } = Menu;

class LeftNav extends Component {
  //判断当前登录用户对item是否由权限
  hasAuth = item => {
    // 当前是admin 看key在不在menus中 item是公开的
    // indexOf() 找不到的返回-1 对大小写敏感
    const { key, isPublic } = item;

    // const menus = storageUtils.getUser().menus;
    // const username = storageUtils.getUser().username;
    const menus = this.props.user.menus;
    const username = this.props.user.username;

    if (username === "admin" || isPublic || menus.indexOf(key) !== -1) {
      return true;
    }
    return true;
  };
  //根据menu数组生成对应的数组,map加递归
  // getMenuNodes_map = menuList => {
  //   return menuList.map(item => {
  //     if (!item.children) {
  //       return (
  //         <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //             {item.icon}
  //             <span>{item.title}</span>
  //           </Link>
  //         </Menu.Item>
  //       );
  //     } else {
  //       return (
  //         <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //               {item.icon}
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //           {this.getMenuNodes(item.children)}
  //         </SubMenu>
  //       );
  //     }
  //   });
  // };

  //根据menu数组生成对应的数组,reduce加递归
  getMenuNodes = menuList => {
    //得到当前请求的路由路径
    const path = this.props.location.pathname;

    return menuList.reduce((pre, item) => {
      //向pre中添加Menu.item
      //如果当前用户有item对应的权限，才显示对应的菜单项
      if (this.hasAuth(item)) {
        if (!item.children) {
          //判断item是否是当前对应的item,是的话，放入redux中
          if (item.key === path || path.indexOf(item.key) === 0) {
            this.props.setHeadTitle(item.title);
          }
          pre.push(
            <Menu.Item key={item.key}>
              <Link
                to={item.key}
                onClick={() => this.props.setHeadTitle(item.title)}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          //查找一个与当前请求路径匹配的子item
          const sItem = item.children.find(sItem => sItem.key === path);
          //如果查找到了
          if (sItem) {
            this.openKey = item.key;
          }
          //向pre中添加SubMenu
          pre.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  {item.icon}
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }
      return pre;
    }, []); //第二个参数为初始值，初始值是个空数组
  };
  componentWillMount() {
    //这里提前循环，设置出节点
    this.menuNodes = this.getMenuNodes(menuList);
  }
  render() {
    const path = this.props.location.pathname;
    const openKey = this.openKey;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="lgo" />
          <h1>Manage</h1>
        </Link>
        <Menu
          selectedKeys={[path]} //不用初始化属性，用这个，能更新变动
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}
//withRouter高阶组件：包装非路由组件，返回一个新的组件。新的组件向非路由组件传递3个属性：history/location/match
export default connect(state => ({user:state.user}), { setHeadTitle })(withRouter(LeftNav));
