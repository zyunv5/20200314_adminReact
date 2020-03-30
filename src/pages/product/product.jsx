import React, { Component } from 'react'
import { Switch, Route,Redirect } from 'react-router-dom'

import ProductHome from './home'
import ProductAddUpdate from './addUpdate'
import ProductDetail from './detail'

 class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/product" component={ProductHome}></Route>
        <Route exact path="/product/addupdate" component={ProductAddUpdate}></Route>
        <Route exact path="/product/detail" component={ProductDetail}></Route>
        <Redirect to="/product"/>
      </Switch>
    )
  }
}

export default Product
