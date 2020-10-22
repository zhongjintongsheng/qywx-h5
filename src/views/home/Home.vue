<template>
  <div>
  </div>
</template>

<script>
export default {
  created () {
    let code = this.getQueryStringArgs().code
    // 如果code为空，跳转noauth页面
    if (!code) {
      this.$router.replace('/noauth')
      return
    }

    this.$util.showLoading(true)
    let param = {
      code,
      appCode: this.$config.APPLICATION_NAME
    }
    this.$http.post({
      url: this.$apis.base.login,
      param,
      loading: false,
      success: ({ data }) => {
        // 0.清空 localStorage ，TODO 后期可以删除（20200708）
        this.$util.clearLocalStorage()
        // 1.缓存 用户信息 到 localStorage
        this.$util.setLocalStorage('user', data.user)
        // 2.缓存 token 到 cookie
        this.$util.setCookie('token', data.user.token)
        // 3.获取字典
        this.$store.dispatch('getDict')
          .then(() => {
            this.$util.showLoading(false)
            // 跳转之前缓存的页面
            this.$router.replace(this.$util.getSessionStorage('redirect'))
          })
          .catch(() => {
            this.$util.showLoading(false)
          })
      },
      fail: () => {
        this.$util.showLoading(false)
        this.$router.replace('/relogin')
      }
    })
  },
  methods: {
    getQueryStringArgs () {
      let args = {}
      let qs = location.search.length ? location.search.substring(1) : ''
      let items = qs.split('&')
      items.forEach(item => {
        args[item.split('=')[0]] = item.split('=')[1]
      })
      return args
    }
  }
}
</script>
