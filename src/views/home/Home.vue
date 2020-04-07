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
        this.$util.setStorage('user', data.user)
        this.$util.setStorage('menus', data.menus)
        this.$util.setStorage('permission', data.permissions)
        this.$util.setCookie('token', data.user.token)
        this.$util.setCookie('cacheTime', Date.now())
        this.$store.dispatch('getDict')
          .then(() => {
            this.$util.showLoading(false)
            // 跳转之前缓存的页面
            this.$router.replace(this.$util.getStorage('redirect'))
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
