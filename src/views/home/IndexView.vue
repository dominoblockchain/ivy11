<template>
  <div class="home-view">
    <van-notice-bar mode="closeable" v-show="notice">{{ notice }}</van-notice-bar>
    <HeaderComp></HeaderComp>
    <MiningComp></MiningComp>
    <DescriptionComp></DescriptionComp>
  </div>
</template>

<script>
import HeaderComp from './HeaderComp'
import MiningComp from './MiningComp'
import DescriptionComp from './DescriptionComp'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    HeaderComp,
    MiningComp,
    DescriptionComp
  },
  computed: {
    ...mapGetters({
      notice: 'notice/getNotice'
    })
  }
}
</script>
<style lang="less" scoped>
.home-view {
  background-color: #EFEFEF;
  overflow: hidden;
  .header-comp {
    margin-bottom: 15px;
  }
  .mining-comp {
    margin-bottom: 45px;
  }
}
</style>
