import crypto from 'crypto'
import NodeRSA from 'node-rsa'
import config from '@/config'
import store from '@/store'
import { setStorage, getStorage, removeStorage, clearStorage } from './localStorage'
import { setCookie, getCookie, removeCookie, clearCookie } from './cookie'
import { routerAuth } from './auth'
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
  const dictArray = getStorage('dict')
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
  const dictArray = getStorage('dict')
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

// 递归处理叶子菜单
function handleLeafMenu (menus, leafMenus) {
  menus.forEach(menu => {
    if (menu.children && menu.children.length) {
      this.handleLeafMenu(menu.children, leafMenus)
    } else {
      leafMenus.push(menu)
    }
  })
}

// 获取叶子菜单
function getLeafMenus (menus) {
  let leafMenus = []
  if (menus && menus.length) {
    handleLeafMenu(menus, leafMenus)
  }
  setStorage('leafMenus', leafMenus)
}

// 日期格式化
function dateFormat (date, fmt = 'yyyy-MM-dd') {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export default {
  showLoading,
  toast,
  rsa,
  sha256,
  // sessionStore相关
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  // cookie相关
  setCookie,
  getCookie,
  removeCookie,
  clearCookie,
  routerAuth,
  getDictTree,
  getDictOptionKey,
  getLeafMenus,
  dateFormat
}
