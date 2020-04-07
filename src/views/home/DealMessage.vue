<template>
  <div>
  </div>
</template>

<script>
export default {
  created () {
    let { reportCode, ...query } = this.$route.query
    this.$router.replace({ path: this.$util.codeToUrl(reportCode) || '404', query })
  }
}
</script>
