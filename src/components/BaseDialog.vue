<template>
  <van-overlay class="base-dialog" :show="dialogVisible" @click="dialogVisible = false" :lock-scroll="false">
    <div class="base-dialog_wrapper" @click.stop>
      <div class="base-dialog_container">
        <div>
          <van-icon name="cross" @click="dialogVisible = false"/>
        </div>
        <slot></slot>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (val) {
      this.dialogVisible = val
    },
    dialogVisible (val) {
      if (!val) {
        this.$emit('update:visible', false)
      }
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang="less" scoped>
.base-dialog {
  .base-dialog_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .base-dialog_container {
      width: 340px;
      overflow: hidden;
      border-radius: var(--mining-radius);
      background-color: #FFFFFF;
      &>div {
        padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
      }
      &>div:first-child {
        text-align: right;
      }
      .van-icon {
        font-size: 26px;
        color: #808080;
      }
    }
  }
}
</style>
