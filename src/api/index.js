import ajax from './request'
import jsonp from 'jsonp'
import { message } from 'antd'

// const BASEURL = "http://localhost:3001";
const BASEURL = ''
//登录
export const reqLogin = (username, password) => ajax(BASEURL + '/login', { username, password }, 'POST')
//添加用户
export const reqAddUser = user => ajax(BASEURL + '/manage/user/add', user, 'POST')

//获取一级/二级分类的列表
export const reqCategorys = parentId => ajax(BASEURL + '/manage/category/list', { parentId })
//添加分类
export const reqAddCategorys = (categoryName, parentId) => ajax(BASEURL + '/manage/category/add', { categoryName, parentId }, 'POST')
//更新分类
export const reqUpdateCategorys = (categoryId, categoryName) => ajax(BASEURL + '/manage/category/update', { categoryId, categoryName }, 'POST')

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
