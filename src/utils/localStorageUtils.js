//使用localStorage进行管理登录态
//最后选用了npm store包进行管理状态
import store from "store";
const USER_KEY = "user_key"; //保证操作user_key方法不出错

export default {
  //保存
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user));
    store.set(USER_KEY, user);
  },
  //读取
  getUser() {
    // return JSON.parse(localStorage.getItem(USER_KEY) || "{}");
    return store.get(USER_KEY) || {};
  },
  //删除
  removeUser(user) {
    // localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
  }
};
