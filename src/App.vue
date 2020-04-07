<template>
  <div id="app">
    <router-view />
    <van-overlay :show="$store.state.loading" z-index="1000" class-name="custom-overlay">
      <van-loading size="24px" type="spinner" vertical class="loading">加载中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
import { Loading, Overlay } from 'vant'

export default {
  components: { [Loading.name]: Loading, [Overlay.name]: Overlay },
  created () {
    // 判断是否需要更新权限信息
    let lastTime = this.$util.getCookie('cacheTime')
    if (!lastTime) {
      return
    }
    // 计算缓存时间，是否超过30分钟
    let time = (Date.now() - lastTime) / 1000 / 60
    if (time > 30) {
      this.$store.dispatch('getMenuAndPermission')
      this.$store.dispatch('getDict')
    }
  }

}
</script>

<style lang="less">
  body {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 13pt;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    height: 100%;
    width: 100%;
  }

  .custom-overlay {
    background-color: transparent;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
