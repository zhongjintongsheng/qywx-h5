<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'base-icon ' + this.className
      } else {
        return 'base-icon'
      }
    }
  }
}
</script>

<style>
  .base-icon {
    width: 1rem;
    height: 1rem;
    vertical-align: -0.19rem;
    fill: currentColor;
    overflow: hidden;
  }
</style>
