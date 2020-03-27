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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
