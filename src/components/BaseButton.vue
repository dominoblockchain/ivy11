<template>
  <button class="base-button"
          :class="{'base-button_selected': selected}">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    checked (val) {
      this.selected = val
    }
  },
  data () {
    return {
      selected: false
    }
  }
}
</script>

<style lang="less" scoped>
.base-button {
  width: 95px;
  height: 35px;
  border-radius: var(--mining-radius);
  border: 1px solid rgba(255, 255, 255, .6);
  color: #FFFFFF;
  background-color: rgba(76, 194, 144, .6);
  &.base-button_selected {
    background-color: #FFFFFF;
    color: var(--primary-color);
  }
}
</style>
