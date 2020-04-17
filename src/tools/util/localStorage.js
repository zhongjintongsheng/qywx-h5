import config from '@/config'

/**
 * localStorage相关操作
 * 如果 name 为 user 不做处理
 * 否则在 name 后面拼接项目名称
 */
export function setStorage (name, content) {
  if (name !== 'user') {
    name += `_${config.PROJECT_NAME}`
  }
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

export function getStorage (name) {
  if (name !== 'user') {
    name += `_${config.PROJECT_NAME}`
  }
  let content = window.localStorage.getItem(name)
  try {
    JSON.parse(content)
  } catch (error) {
    return content
  }
  return JSON.parse(content)
}

export function removeStorage (name) {
  if (name !== 'user') {
    name += `_${config.PROJECT_NAME}`
  }
  window.localStorage.removeItem(name)
}

export function clearStorage () {
  window.localStorage.clear()
}
