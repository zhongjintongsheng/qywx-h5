import Cookies from 'js-cookie'

/**
 * cookie 相关操作
 */
export function setCookie (name, content, options) {
  Cookies.set(name, content, options)
}

export function getCookie (name) {
  return Cookies.get(name)
}

export function removeCookie (name) {
  Cookies.remove(name)
}

export function clearCookie () {
  Object.keys(Cookies.get()).forEach(name => {
    Cookies.remove(name)
  })
}
