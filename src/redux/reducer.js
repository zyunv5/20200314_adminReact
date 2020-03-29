//用来根据老的state和指定的action，返回新的state函数

//引入合并reducer函数 combineRedu
import { combineReducers } from 'redux'
import storageUtils from '../utils/localStorageUtils'
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER, RECEIVE_PRODUCT } from './actionTypes'

//管理头部标题的reducer函数
const initHeadTitle = ''
const headTitle = (state = initHeadTitle, action) => {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

//管理当前用户的reducer函数
const initUser = storageUtils.getUser()
const user = (state = initUser, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      return { ...state, errorMsg }
    case RESET_USER:
      return {}
    default:
      return state
  }
}

const product = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default combineReducers({ headTitle, user, product })
