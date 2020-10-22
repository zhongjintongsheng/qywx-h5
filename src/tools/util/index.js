import crypto from 'crypto'
import NodeRSA from 'node-rsa'
import config from '@/config'
import store from '@/store'
import { setLocalStorage, getLocalStorage, removeLocalStorage, clearLocalStorage } from './localStorage'
import { setSessionStorage, getSessionStorage, removeSessionStorage, clearSessionStorage } from './sessionStorage'
import { setCookie, getCookie, removeCookie, clearCookie } from './cookie'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)

function showLoading (flag) {
  store.commit('updateLoading', flag)
}

function toast (content) {
  Toast(content)
}

// rsa加密
function rsa (str) {
  let key = new NodeRSA(config.PUBLIC_KEY)
  key.setOptions({
    encryptionScheme: 'pkcs1'
  })
  return key.encrypt(str, 'hex')
}

// crypto
function sha256 (text) {
  let hash = crypto.createHash('sha256')
    .update(text)
    .digest('hex')
  return hash
}

// 字典数据从 array 转为 tree
function getDictTree () {
  const dictArray = getSessionStorage('dict')
  let dictTree = {}
  // 如果没有字典，则返回空对象
  if (!dictArray) {
    return dictTree
  }
  Object.entries(dictArray).forEach(([key, val]) => {
    let option = {}
    val.forEach(item => {
      option[item.optionKey] = item.optionName
    })
    dictTree[key] = option
  })
  return dictTree
}

// 获取字典数据的 optionKey
function getDictOptionKey (dictType, optionCode) {
  const dictArray = getSessionStorage('dict')
  if (!dictArray) {
    return ''
  }
  if (!dictArray[dictType]) {
    return ''
  }
  let dict = dictArray[dictType].find(item => item.optionCode === optionCode)
  if (!dict) {
    return ''
  }
  return dict.optionKey
}

export default {
  showLoading,
  toast,
  rsa,
  sha256,
  // localStore相关
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  // sessionStore相关
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  clearSessionStorage,
  // cookie相关
  setCookie,
  getCookie,
  removeCookie,
  clearCookie,
  getDictTree,
  getDictOptionKey
}
