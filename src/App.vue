<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
    <van-overlay :show="$store.state.loading" z-index="9999" class-name="custom-overlay">
      <van-loading size="24px" type="spinner" vertical class="loading">加载中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
import { Loading, Overlay } from 'vant'

export default {
  components: { [Loading.name]: Loading, [Overlay.name]: Overlay },
  created () {
    window.document.title = this.$config.SYS_NAME
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
