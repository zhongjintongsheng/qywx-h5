import axios from 'axios'
import config from '@/config'
import util from '@/tools/util'
import http from '@/tools/http'
import apis from '@/apis'
import router from '@/router'

axios.defaults.baseURL = config.PORTAL + 'mapi/'
axios.defaults.headers.common['If-Modified-Since'] = '0'
if (process.env.NODE_ENV === 'production') {
  axios.defaults.timeout = config.NETWORK_TIMEOUT
}

axios.interceptors.request.use(function (c) {
  c.headers.common['x-token'] = util.getCookie('token')
  return c
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  let { respCode } = response.data
  // 处理 token 过期
  if (respCode === config.LOST_TOKEN) {
    if (process.env.NODE_ENV === 'development') {
      // 获取字典、获取权限接口处理
      let url = response.config.url
      if (url.includes(apis.base.getMenuAndPermission) || url.includes(apis.base.getDict)) {
        return
      }
      http.devLogin()
      return
    }
    router.replace('/auth')
    return
  }

  // 处理无权限
  if (respCode === config.NO_AUTH) {
    router.replace('/noauth')
    return
  }

  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 504:
        return Promise.reject(new Error('服务器网络异常，错误码 504'))
      case 404:
        return Promise.reject(new Error('资源不存在，错误码 404'))
    }
  }
  if (error.message.startsWith('timeout')) {
    return Promise.reject(new Error('连接超时，请检查网络环境或重试'))
  }
  return Promise.reject(new Error('系统异常，请联系管理员'))
})

export default axios
