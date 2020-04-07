<template>
  <div class="relogin">
    <div class="icon">
      <base-icon icon-class="relogin" class="icon-style"></base-icon>
    </div>
    <div class="text">
      抱歉！登录异常！
    </div>
    <div class="button">
      <van-button round type="info" replace to="auth">重新登录</van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'

export default {
  components: { [Button.name]: Button }
}
</script>

<style lang="less" scoped>
  .relogin {
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background-color: #fff;
    text-align: center;
    .icon {
      margin-top: 20vh;
      .icon-style {
        width: 40vw;
        height: 40vw;
      }
    }
    .text {
      margin-top: 2rem;
      font-size: 1rem;
      color: #909090;
      letter-spacing: 1px;
    }
    .button {
      margin-top: 3rem;
    }
  }
</style>
