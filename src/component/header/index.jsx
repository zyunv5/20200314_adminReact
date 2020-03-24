import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import storageUtils from '../../utils/localStorageUtils'
import LinkButton from '../../component/link-button'

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()), //时间
    dayPictureUrl: '',
    weather: ''
  }

  //获取时间方法
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }

  //获取天气方法
  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('北京')
    this.setState({ dayPictureUrl, weather })
  }

  //获取路由名称,包含children 需要遍历两次
  getTitle = () => {
    const path = this.props.location.pathname
    let title = null
    menuList.forEach(item => {
      //当前item的key和path一样
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        //path是children里面的key
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0) //找出对应项
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  //退出登录
  logOut = () => {
    Modal.confirm({
      title: '确定退出吗?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        console.log('OK')
        //删除user数据
        storageUtils.removeUser()
        memoryUtils.user = {}
        //跳转到login
        this.props.history.replace('/login')
      }
    })
  }
  //首次挂载时，执行方法
  componentDidMount() {
    //获取当前时间
    this.getTime()
    //获取当前天气
    this.getWeather()
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const username = memoryUtils.user.username
    //获取当前的title
    const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎,{username}</span>
          <LinkButton onClick={this.logOut}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
