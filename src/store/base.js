import apis from '@/apis'
import http from '@/tools/http'
import util from '@/tools/util'
import config from '@/config'

const state = {
  // 进度条控制
  loading: false
}

const mutations = {
  updateLoading (state, loading) {
    state.loading = loading
  }
}

const actions = {
  // 获取数据字典
  getDict () {
    return new Promise((resolve, reject) => {
      http.get({
        url: apis.base.getDict,
        loading: false,
        success: ({ data }) => {
          util.setStorage('dict', data)
          resolve()
        },
        fail: () => {
          reject(new Error())
        }
      })
    })
  },
  // 获取菜单和权限,更新权限时间
  getMenuAndPermission () {
    http.get({
      url: apis.base.getMenuAndPermission,
      param: { appCode: config.APPLICATION_NAME },
      loading: false,
      success: ({ data }) => {
        util.setStorage('menus', data.menus)
        util.setStorage('permission', data.permissions)
        util.setCookie('cacheTime', Date.now())
      }
    })
  }
}

const getters = {}

export default {
  actions,
  getters,
  state,
  mutations
}
