import React, { Component, Fragment } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menuList from "../../config/menuConfig";

class AddForm extends Component {
  static propTypes = {
    role: PropTypes.object
  };

  constructor(props) {
    super(props);

    const menus = this.props.role.menus;
    this.state = {
      checkedKeys: menus
    };
  }

  // getTreeNodes = menuList => {
  //   for (var i = 0; i < menuList.length; i++) {
  //     // item = menuList[i];
  //     if (menuList[i].children && menuList[i].children.length > 0) {
  //       this.getTreeNodes(menuList[i].children);
  //       delete menuList[i].children;
  //     }
  //     treeArr.push({ title: menuList[i].title, key: menuList[i].key });
  //   }
  // };

  //获取所有选项
  getMenus=()=>this.state.checkedKeys

  
  componentWillMount() {
    //按照antd4的tree数据结构，这里已经是制作好的数据了，不需要二次转换了
    // this.treeNodes = this.getTreeNodes(menuList);
  }

  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;
    const treeData = [
      { title: "平台界面", key: "all", children: [...menuList] }
    ];

    const onCheck = checkedKeys => {
      // console.log(checkedKeys);
      this.setState({
        checkedKeys
      });
    };
    

    return (
      <Fragment>
        <Form initialValues={{ roleName: role.name }}>
          <Form.Item label="角色名称" name="roleName">
            <Input disabled />
          </Form.Item>
        </Form>
        <Tree
          checkable
          defaultExpandAll={true}
          treeData={treeData}
          checkedKeys={checkedKeys}
          onCheck={onCheck}
        />
      </Fragment>
    );
  }
}

export default AddForm;
