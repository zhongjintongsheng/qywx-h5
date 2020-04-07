// import { getStorage } from './localStorage'

// 控制路由权限
export function routerAuth (meta) {
  // return getStorage('leafMenus').some(menu => menu.href === meta.group)
  return true
}
