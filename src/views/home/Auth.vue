<template>
  <div>
  </div>
</template>

<script>
export default {
  created () {
    let param = {
      appCode: this.$config.APPLICATION_NAME,
      redirectUrl: location.protocol + '//' + location.host + location.pathname + '#/'
    }
    // 获取授权登录地址
    this.$http.get({
      url: this.$apis.base.getAuthUrl,
      param,
      loading: false,
      success: ({ data }) => {
        location.href = data
      },
      fail: () => {
        this.$router.replace('/relogin')
      }
    })
  }
}
</script>
