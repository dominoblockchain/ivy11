<template>
  <div class="header-comp">
    <div class="header-comp_background"></div>
    <div class="header-comp_container">
      <div class="header-comp-container_top">
        <div>
          <img class="header-container-top_logo" src="@img/logo.png">
          <span>IVY</span>
        </div>
        <div>
          <button v-if="connection"><i class="header-comp-container_dot"></i>{{ $t('home.connected') }}</button>
          <button v-else @click="enable">{{ $t('home.connect') }}</button>
          <van-dropdown-menu>
            <van-dropdown-item v-model="lang" :options="langList" @change="languageSelect"/>
          </van-dropdown-menu>
        </div>
      </div>

      <div id="header-comp-container_panel" class="header-comp-container_panel">
        <div><span>{{ $t('home.issue') }}:</span><span>{{ TOTAL }}</span></div>
        <div><span>{{ $t('home.contract', { symbol: 'BSC'}) }}:</span><span>{{ CONTRACT_ADDRESS }}</span></div>
        <img src="@img/home/flower.png">
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import IVYContract from '@/server/IVYContract'
import ClipboardJS from 'clipboard'
import tp from 'tp-js-sdk'
import config from '@data/config.json'

export default {
  name: 'HeaderComp',
  data () {
    return {
      isTpApp: false,
      connection: false,
      CONTRACT_ADDRESS: IVYContract.TOKEN_ADDRESS,
      TOTAL: 10000 // 发行总量
    }
  },
  methods: {
    // 语言切换
    languageSelect (language) {
      localStorage.setItem('language', language)
      this.locale = language
    },
    // 链接钱包
    connect () {
      if (this.isTpApp) {
        tp.getWallet({
          walletTypes: ['bsc'], switch: true
        })
      } else {
        window.ethereum.request({
          method: 'wallet_addEthereumChain', // Metamask的api名称
          params: [config.wallet]
        })
      }
    },
    // 获取授权
    enable () {
      window.ethereum.enable().then((accounts) => {
        if (Number(window.ethereum.chainId) === 0x38) {
          this.connection = true
          const account = accounts[0]
          this.$store.dispatch('contract/initialize', account)
          localStorage.setItem('enable', 'true')
        } else {
          this.connection = false
          this.connect()
        }
      }).catch(e => {
        console.log('授权失败', e)
      })
    }
  },
  mounted () {
    if (localStorage.getItem('enable')) {
      this.enable()
    }
    window.ethereum.autoRefreshOnNetworkChange = false
    window.ethereum.on('networkChanged', chainId => {
      this.enable()
    })
    const clipboard = new ClipboardJS('#header-comp-container_panel', {
      text: () => {
        return this.CONTRACT_ADDRESS
      }
    })
    clipboard.on('success', e => {
      this.$toast(this.$t('common.contractCopySuccess'))
    })
    clipboard.on('error', e => {
      this.$toast(this.$t('common.contractCopyFailed'))
    })
  },
  setup () {
    const lang = ref('zh')
    const langList = [
      { text: '中文', value: 'zh' },
      { text: '繁體', value: 'tw' },
      { text: 'English', value: 'en' }
    ]
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
      lang,
      langList
    }
  }
}
</script>

<style>
.van-dropdown-menu {
  display: inline-block;
  --van-dropdown-menu-height: 26px;
  --van-gray-4: #FFFFFF;
  --van-dropdown-menu-background-color: transparent;
  --van-dropdown-menu-title-text-color: #FFFFFF;
  --van-dropdown-menu-box-shadow: none;
  --van-dropdown-menu-option-active-color: var(--primary-color);
  --van-dropdown-menu-title-active-text-color: #FFFFFF;
}
</style>
<style lang="less" scoped>
.header-comp {
  position: relative;
  .header-comp_container {
    position: relative;
    z-index: 1;
    width: 340px;
    margin: auto;
    padding-top: 22px;
    .header-comp-container_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-container-top_logo {
        width: 32px;
        height: 32px;
      }
      span {
        color: #FFFFFF;
        font-size: 24px;
        font-weight: 600;
        margin-left: 8px;
      }
      button {
        border: none;
        background-color: rgba(255,255,255, 0.4);
        color: #FFFFFF;
        padding: 4px 8px;
        border-radius: 6px;
        margin-right: 6px;
        display: inline-flex;
        align-items: center;
      }
      .header-comp-container_dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: var(--primary-color);
        border-radius: 100px;
        margin-right: 8px;
        box-shadow: 0 0 2px 2px rgba(2, 178, 31, 0.9);
        animation: dot 1500ms linear infinite;
      }
      @keyframes dot {
        0% {
          box-shadow: 0 0 2px 2px rgba(2, 178, 31, 0.9);
        }
        50% {
          box-shadow: 0 0 0px 0px rgba(2, 178, 31, 0.4);
        }
        100% {
          box-shadow: 0 0 2px 2px rgba(2, 178, 31, 0.9);
        }
      }
    }
    //发行总量
    .header-comp-container_panel {
      position: relative;
      margin-top: 15px;
      line-height: 26px;
      text-align: left;
      color: var(--primary-color);
      padding: 10px 20px;
      background-color: #FFFFFF;
      border-radius: var(--mining-radius);
      &>div>span:first-child {
        margin-right: 10px;
      }
      img {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 100%;
      }
      &>div:nth-child(2) {
        display: flex;
        overflow: hidden;
        span {
          white-space: nowrap;
        }
        span:last-child {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  //圆弧背景色块
  .header-comp_background {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 120px;
    overflow: hidden;
    background-color: var(--primary-color);
  }
}
</style>
