<template>
  <BaseDialog class="pickup-dialog-comp" v-model:visible="dialogVisible">
    <template #default>
      <van-field v-model="miningVol" :label="$t('home.miningNumber')" disabled/>
      <div>
        <van-button @click="pickup" type="primary" color="#02B202" block>{{ $t('component.pickup') }}</van-button>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/BaseDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'PickupDialogComp',
  components: {
    BaseDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      ivyContract: 'contract/getIVYContract',
      miningVol: 'contract/getMiningVol'
    })
  },
  watch: {
    visible (val) {
      this.dialogVisible = val
    },
    dialogVisible (val) {
      if (!val) {
        this.$emit('update:visible', false)
        this.$emit('close')
      }
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    pickup () {
      this.$store.commit('transaction/setPickup', true)
      this.$store.commit('notice/setNotice', this.$t('common.pickupIng'))
      this.$emit('update:visible', false)
      this.$emit('close')
      this.$toast.loading({
        message: this.$t('common.waiting'),
        duration: 5000,
        forbidClick: true
      })
      this.ivyContract.pickup().then(hash => {
        this.ivyContract.getTransactionReceipt(hash).then(() => {
          this.$store.commit('transaction/setPickup', false)
          this.$store.commit('notice/setNotice', '')
          this.$notify({
            type: 'success',
            message: this.$t('common.pickupSuccess'),
            duration: 5000
          })
        }).catch(() => {
          this.$store.commit('transaction/setPickup', false)
          this.$store.commit('notice/setNotice', '')
          this.$notify({
            type: 'danger',
            message: this.$t('common.pickupFailed'),
            duration: 5000
          })
        })
      }).catch(() => {
        this.$store.commit('transaction/setPickup', false)
        this.$store.commit('notice/setNotice', '')
        this.$notify({
          type: 'danger',
          message: this.$t('common.pickupFailed'),
          duration: 5000
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pickup-dialog-comp {
}
</style>
