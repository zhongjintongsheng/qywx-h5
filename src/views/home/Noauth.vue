<template>
  <div class="not-found">
    <div class="icon">
      <base-icon icon-class="no-auth" class="icon-style"></base-icon>
    </div>
    <div class="text">
      抱歉！您无权限访问该页面！
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
      margin-top: 1rem;
      font-size: 1rem;
      color: #909090;
      letter-spacing: 1px;
    }
  }
</style>
