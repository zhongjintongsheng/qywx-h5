import apis from '@/apis'
import http from '@/tools/http'
import util from '@/tools/util'
import config from '@/config'
import _ from '@/tools/lib/lodash'

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
      let dict = util.getSessionStorage('dict')
      if (_.isEmpty(dict)) {
        http.get({
          url: apis.base.getDict,
          loading: false,
          success: ({ data }) => {
            util.setSessionStorage('dict', data)
            resolve()
          },
          fail: () => {
            reject(new Error())
          }
        })
      } else {
        resolve()
      }
    })
  },
  // 获取菜单和权限
  getMenuAndPermission () {
    http.get({
      url: apis.base.getMenuAndPermission,
      param: { appCode: config.APPLICATION_NAME },
      loading: false,
      success: ({ data }) => {
        util.setSessionStorage('menus', data.menus)
        util.setSessionStorage('permission', data.permissions)
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
