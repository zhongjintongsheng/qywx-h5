import config from '@/config'

// 在原 name 后面拼接项目名称，以区分各项目自己的数据
function prettyName (name) {
  return `${name}_${config.PROJECT_NAME}`
}

/**
 * sessionStorage相关操作（存储各项目自己的数据）
 */
export function setSessionStorage (name, content) {
  name = prettyName(name)
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

export function getSessionStorage (name) {
  name = prettyName(name)
  let content = window.sessionStorage.getItem(name)
  try {
    JSON.parse(content)
  } catch (error) {
    return content
  }
  return JSON.parse(content)
}

export function removeSessionStorage (name) {
  name = prettyName(name)
  window.sessionStorage.removeItem(name)
}

export function clearSessionStorage () {
  window.sessionStorage.clear()
}
