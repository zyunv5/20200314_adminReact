<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//引入redux
import { Provider } from "react-redux"; //包裹app
import store from "./redux/store";//传入provider

//读取local中保存的user，保存到内存中
// import memoryUtils from "./utils/memoryUtils";
// import storageUtils from "./utils/localStorageUtils";
// const user = storageUtils.getUser();
// memoryUtils.user = user;

=======
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//读取local中保存的user，保存到内存中
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/localStorageUtils'

import { Provider } from 'react-redux'
import store from './redux/store'
const user = storageUtils.getUser()
memoryUtils.user = user

>>>>>>> 9ece550ea52508282c418df5221390427e94416a
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
<<<<<<< HEAD
  document.getElementById("root")
);
=======
  document.getElementById('root')
)
>>>>>>> 9ece550ea52508282c418df5221390427e94416a
