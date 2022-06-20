<template>
  <BaseDialog class="pledge-dialog-comp" v-model:visible="dialogVisible">
    <template #default>
      <van-field v-model="balance" :label="$t('home.balance', { symbol: 'LP' })" disabled/>
      <van-field v-model="number" type="number" :label="$t('home.pledgeNumber')" :placeholder="$t('home.pledgeNumberPlaceholder')">
        <template #button>
          <van-button plain size="mini" type="primary" color="#02B202" @click="number = balance">{{ $t('component.all') }}</van-button>
        </template>
      </van-field>
      <div>
        <van-button @click="pledge" :disabled="disabled" type="primary" color="#02B202" block>{{ $t('component.pledge') }}</van-button>
      </div>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/BaseDialog'
import { mapGetters } from 'vuex'
import Web3 from 'web3'
export default {
  name: 'RedeemDialogComp',
  components: {
    BaseDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      number: null
    }
  },
  computed: {
    ...mapGetters({
      cakeLPContract: 'contract/getCakeLPContract',
      ivyContract: 'contract/getIVYContract',
      balance: 'contract/getLpBalance'
    }),
    disabled () {
      return this.number === null || !Number(this.number) || this.number <= 0 || this.number > this.balance
    }
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
  methods: {
    approve () {
      return new Promise(resolve => {
        // 查询授权
        this.cakeLPContract.allowance().then(number => {
          if (number >= Web3.utils.toWei(this.number)) {
            resolve()
          } else {
            this.cakeLPContract.approve(Web3.utils.toWei(this.number) - number).then(() => {
              this.$toast.success(this.$t('common.approveWaiting'))
            }).finally(() => {
              resolve()
            })
          }
        })
      })
    },
    pledge () {
      this.$store.commit('transaction/setPledge', true)
      this.$store.commit('notice/setNotice', this.$t('common.pledgeIng'))
      this.$emit('update:visible', false)
      this.$emit('close')
      this.$toast.loading({
        message: this.$t('common.waiting'),
        duration: 5000,
        forbidClick: true
      })
      this.approve().then(() => {
        this.ivyContract.pledge({
          amount: this.number
        }).then(hash => {
          this.ivyContract.getTransactionReceipt(hash).then(() => {
            this.$store.commit('transaction/setPledge', false)
            this.$store.commit('notice/setNotice', '')
            this.$notify({
              type: 'success',
              message: this.$t('common.pledgeSuccess', { number: this.number, symbol: 'LP' }),
              duration: 5000
            })
          }).catch(() => {
            this.$store.commit('transaction/setPledge', false)
            this.$store.commit('notice/setNotice', '')
            this.$notify({
              type: 'danger',
              message: this.$t('common.pledgeFailed'),
              duration: 5000
            })
          })
        }).catch(() => {
          this.$store.commit('transaction/setPledge', false)
          this.$store.commit('notice/setNotice', '')
          this.$notify({
            type: 'danger',
            message: this.$t('common.pledgeFailed'),
            duration: 5000
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pledge-dialog-comp {
}
</style>
