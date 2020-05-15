<template>
  <div>
  </div>
</template>

<script>
export default {
  created () {
    let { reportCode, ...query } = this.$route.query
    this.$router.replace({ path: this.$util.codeToUrl(reportCode) || '404', query })
    this.refreshCache()
  },
  methods: {
    refreshCache () {
      // 有token，并且缓存的时间大于30分钟，则更新数据
      let token = this.$util.getCookie('token')
      let lastTime = this.$util.getCookie('cacheTime') || 0
      let time = (Date.now() - lastTime) / 1000 / 60
      if (token && time > 30) {
        this.$store.dispatch('getDict')
      }
    }
  }
}
</script>
