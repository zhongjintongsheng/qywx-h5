import Cookies from 'js-cookie'
import config from '@/config'

/**
 * cookie 相关操作
 * 如果 name 为 token 不做处理
 * 否则在 name 后面拼接项目名称
 */
export function setCookie (name, content, options) {
  if (name !== 'token') {
    name += `_${config.PROJECT_NAME}`
  }
  Cookies.set(name, content, options)
}

export function getCookie (name) {
  if (name !== 'token') {
    name += `_${config.PROJECT_NAME}`
  }
  return Cookies.get(name)
}

export function removeCookie (name) {
  if (name !== 'token') {
    name += `_${config.PROJECT_NAME}`
  }
  Cookies.remove(name)
}

export function clearCookie () {
  Object.keys(Cookies.get()).forEach(name => {
    Cookies.remove(name)
  })
}
