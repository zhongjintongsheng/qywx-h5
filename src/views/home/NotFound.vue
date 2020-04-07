<template>
  <div class="not-found">
    <div class="icon">
      <base-icon icon-class="404" class="icon-style"></base-icon>
    </div>
    <div class="text">
      抱歉！您访问的地址不存在！
    </div>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
  .not-found {
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background-color: #fff;
    text-align: center;
    .icon {
      margin-top: 25vh;
      .icon-style {
        width: 40vw;
        height: 40vw;
      }
    }
    .text {
      font-size: 1rem;
      color: #909090;
      letter-spacing: 1px;
    }
  }
</style>
