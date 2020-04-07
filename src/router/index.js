import Vue from 'vue'
import VueRouter from 'vue-router'
import util from '@/tools/util'

import Home from '@/views/home/Home.vue'
import Relogin from '@/views/home/Relogin.vue'
import Auth from '@/views/home/Auth.vue'
import DealMessage from '@/views/home/DealMessage.vue'
import Noauth from '@/views/home/Noauth.vue'
import ErrorPage from '@/views/home/ErrorPage.vue'
import NotFound from '@/views/home/NotFound.vue'
import childRoute from './childRoute'

let routes = [
  {
    path: '/',
    component: Home,
    meta: {
      checkLogin: false
    }
  },
  {
    path: '/relogin',
    component: Relogin,
    meta: {
      checkLogin: false
    }
  },
  {
    path: '/auth',
    component: Auth,
    meta: {
      checkLogin: false
    }
  },
  {
    path: '/deal-message',
    component: DealMessage,
    meta: {
      checkLogin: false
    }
  },
  {
    path: '/noauth',
    component: Noauth,
    meta: {
      checkLogin: false
    }
  },
  {
    path: '/error',
    component: ErrorPage,
    meta: {
      checkLogin: false
    }
  },
  {
    path: '/404',
    component: NotFound,
    meta: {
      checkLogin: false
    }
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      checkLogin: false
    }
  }
]

childRoute.forEach(item => {
  let route = {
    path: item.path,
    component: item.component,
    meta: Object.assign({ checkLogin: true }, item.meta)
  }
  routes.unshift(route)
})

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash',
  routes
})

if (process.env.NODE_ENV === 'production') {
  router.beforeEach((to, _from, next) => {
    if (!to.meta.checkLogin) {
      next()
      return
    }
    util.setStorage('redirect', to.fullPath)
    let token = util.getCookie('token')
    if (!token) {
      router.replace('/auth')
    } else {
      let flag = util.routerAuth(to.path)
      if (!flag) {
        router.replace('/noauth')
        return
      }
      next()
    }
  })
}

export default router
