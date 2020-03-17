import ajax from "./request";

// const BASEURL = "http://localhost:3001";
const BASEURL = "";

//登录
export const reqLogin = (username, password) =>
  ajax(BASEURL + "/login", { username, password }, "POST");

//添加用户
export const reqAddUser = user =>
  ajax(BASEURL + "/manage/user/add", user, "POST");
