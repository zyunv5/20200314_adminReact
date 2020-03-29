//包含n个action creator函数的模块
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER, RECEIVE_PRODUCT } from './actionTypes'
import { reqLogin } from '../api/index'
import localStorageUtils from '../utils/localStorageUtils'

//设置头部标题的同步action
export const setHeadTitle = headTitle => ({
  type: SET_HEAD_TITLE,
  data: headTitle
})

//登录的异步action
export const login = (username, password) => {
  return async dispatch => {
    const result = await reqLogin(username, password)
    if (result.status === 0) {
      //成功回调
      const user = result.data
      //保存到local中
      localStorageUtils.saveUser(user)
      //分发接收用户的同步action
      dispatch(receiveUser(user))
    } else {
      const msg = result.msg
      dispatch(showErrorMsg(msg))
    }
  }
}

//接收用户信息的同步action
export const receiveUser = user => ({ type: RECEIVE_USER, user })

//显示错误信息的action
export const showErrorMsg = errorMsg => ({ type: SHOW_ERROR_MSG, errorMsg })

//退出登录的同步action
export const logout = () => {
  //删除local中的user
  localStorageUtils.removeUser()
  //返回action对象
  return { type: RESET_USER }
}

export const receiveProduct = product => ({
  type: RECEIVE_PRODUCT,
  product
})
