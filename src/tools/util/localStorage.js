/**
 * localStorage相关操作（存储各项目共享的数据）
 */
export function setLocalStorage (name, content) {
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

export function getLocalStorage (name) {
  let content = window.localStorage.getItem(name)
  try {
    JSON.parse(content)
  } catch (error) {
    return content
  }
  return JSON.parse(content)
}

export function removeLocalStorage (name) {
  window.localStorage.removeItem(name)
}

export function clearLocalStorage () {
  window.localStorage.clear()
}
