import ajax from './request'
import jsonp from 'jsonp'
import { message } from 'antd'

// const BASEURL = "http://localhost:3001";
const BASEURL = ''
//登录
export const reqLogin = (username, password) => ajax(BASEURL + '/user/login', { username, password }, 'POST')
//添加用户
export const reqAddUser = user => ajax(BASEURL + '/manage/user/add', user, 'POST')

//获取一级/二级分类的列表
export const reqCategorys = parentId => ajax(BASEURL + '/manage/category/list', { parentId })
//添加分类
export const reqAddCategorys = (categoryName, parentId) => ajax(BASEURL + '/manage/category/add', { categoryName, parentId }, 'POST')
//更新分类
export const reqUpdateCategorys = (categoryId, categoryName) => ajax(BASEURL + '/manage/category/update', { categoryId, categoryName }, 'POST')

//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASEURL + '/manage/product/list', { pageNum, pageSize })
//根据Name，desc搜索商品
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) =>
  ajax(BASEURL + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
  })
//更新商品的状态（上架/下架）
export const reqUpdateStatus = (productId, status) =>
  ajax(
    BASEURL + '/manage/product/updateStatus',
    {
      productId,
      status
    },
    'POST'
  )
//删除图片
export const reqDeleteImg = name => ajax(BASEURL + '/manage/img/delete', { name }, 'POST')

//添加or更新商品
export const reqAddOrUpdateProduct = product => {
  let pid = product._id,
    uri = null
  pid ? (uri = 'update') : (uri = 'add')
  return ajax(BASEURL + '/manage/product/' + uri, product, 'POST')
}

//获取角色列表
export const reqRoles = ()=> ajax(BASEURL + '/manage/role/list')
//添加角色
export const reqAddRoles = (name)=> ajax(BASEURL + '/manage/role/add',{name},"POST")
//更新角色
export const reqUpdateRoles = (role)=> ajax(BASEURL + '/manage/role/update',role,"POST")

//获取用户列表
export const reqUsers = ()=> ajax(BASEURL + '/user/list')
//删除用户
export const reqDeleteUsers = (userId)=> ajax(BASEURL + '/user/delete',{userId},"POST")

//jsonp请求的接口函数
export const reqWeather = city => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        message.error('获取天气信息失败')
      }
    })
  })
}
// reqWeather("北京");
