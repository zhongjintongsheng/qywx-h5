import Cookies from 'js-cookie'

export function setCookie (name, content, options) {
  Cookies.set(name, content, options)
}

export function getCookie (name) {
  return Cookies.get(name)
}

export function removeCookie (name) {
  Cookies.remove(name)
}
