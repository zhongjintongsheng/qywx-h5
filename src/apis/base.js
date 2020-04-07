import config from '@/config'

/**
 * 项目的基础接口（不鉴权）
 */
export default {
  // 获取授权登录重定向地址
  getAuthUrl: 'getOAuthUrl',
  // 登录、并获取用户的菜单和功能权限
  login: 'login',
  // 获取用户的菜单和权限
  getMenuAndPermission: 'getMenuAndPermission',
  // 获取字典
  getDict: config.APPLICATION_NAME + '/dict/findAll'
}
