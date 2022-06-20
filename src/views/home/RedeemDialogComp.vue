<template>
  <BaseDialog class="redeem-dialog-comp" v-model:visible="dialogVisible">
    <template #default>
      <van-radio-group v-model="checked" v-show="JSON.stringify(redeemList) !== '{}'">
        <van-cell-group inset>
          <van-cell v-for="(item, index) in redeemList" :class="{ checked: checked===item.id }" @click="checked=item.id" :key="index">
            <template #title>
              <van-field v-model="inputList[item.id]" :disabled="checked!==item.id" :label="$t('home.redeemNumber')"
                         :placeholder="$t('home.redeemNumberPlaceholder')">
                <template #right-icon>
                  <van-radio :name="item.id"/>
                </template>
              </van-field>
            </template>
            <template #label>
              <span>{{ $t('home.pledgeNumber') + ':' + item.value }}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-empty image="search" description=""  v-show="JSON.stringify(redeemList) === '{}'"/>
      <div>
        <van-button :disabled="disabled" @click="redeem" type="primary" color="#02B202" block>{{
            $t('component.redeem')
          }}
        </van-button>
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
      activeNames: [],
      dialogVisible: false,
      checked: -1,
      redeemList: {}, // 需要赎回的item
      inputList: {}
    }
  },
  computed: {
    ...mapGetters({
      ivyContract: 'contract/getIVYContract'
    }),
    disabled () {
      if (this.checked < 0) {
        return true
      }
      const number = this.redeemList[this.checked].value
      const input = this.inputList[this.checked]
      return isNaN(Number(input)) || input <= 0 || input > number
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.qry()
      }
      this.dialogVisible = val
    },
    dialogVisible (val) {
      if (!val) {
        this.$emit('update:visible', false)
        this.$emit('close')
      }
    },
    checked (val) {
      // 清空未选中输入框
      for (const id in this.inputList) {
        this.inputList[id] = Number(id) === val ? this.redeemList[id].value : ''
      }
    },
    ivyContract (val) {
      if (val) {
        this.qry()
      }
    }
  },
  methods: {
    qry () {
      this.ivyContract.getDepositLength().then(res => {
        const promiseList = []
        for (let i = 0; i < res; i++) {
          promiseList.push(this.ivyContract.getDepositDetails({ id: i }))
        }
        Promise.all(promiseList).then(detailsList => {
          this.inputList = {}
          this.redeemList = {}
          detailsList.forEach((item, index) => {
            const amount = Number(Web3.utils.fromWei(item.tokenAmount))
            if (amount > 0) {
              this.inputList[index] = ''
              this.redeemList[index] = {
                id: index,
                value: amount
              }
            }
          })
        }).catch(() => {
          this.qry()
        })
      }).catch(e => {
        this.qry()
      })
    },
    redeem () {
      this.$store.commit('transaction/setRedeem', true)
      this.$store.commit('notice/setNotice', this.$t('common.redeemIng'))
      this.$emit('update:visible', false)
      this.$emit('close')
      this.$toast.loading({
        message: this.$t('common.waiting'),
        duration: 5000,
        forbidClick: true
      })
      this.ivyContract.redeem({
        amount: this.inputList[this.checked],
        depositId: this.checked
      }).then(hash => {
        this.ivyContract.getTransactionReceipt(hash).then(() => {
          this.$store.commit('transaction/setRedeem', false)
          this.$store.commit('notice/setNotice', '')
          this.$notify({
            type: 'success',
            message: this.$t('common.redeemSuccess'),
            duration: 5000
          })
        }).catch(() => {
          this.$store.commit('transaction/setRedeem', false)
          this.$store.commit('notice/setNotice', '')
          this.$notify({
            type: 'danger',
            message: this.$t('common.redeemFailed'),
            duration: 5000
          })
        })
      }).catch(() => {
        this.$store.commit('transaction/setRedeem', false)
        this.$store.commit('notice/setNotice', '')
        this.$notify({
          type: 'danger',
          message: this.$t('common.redeemFailed'),
          duration: 5000
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.redeem-dialog-comp {
  --van-radio-border-color: var(--primary-color);
  --van-radio-checked-icon-color: var(--primary-color);
  --van-radio-checked-icon-color: var(--primary-color);

  .van-cell.van-field {
    padding-left: 0 !important;
  }

  .van-cell {
    background: none;
  }

  .checked {
    background-color: rgba(76, 194, 144, .1);
  }

  .van-cell-group--inset {
    height: 300px;
    overflow: scroll;
  }
}
</style>
