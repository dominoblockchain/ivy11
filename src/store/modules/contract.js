// 合约
import IVYContract from '@/server/IVYContract'
import CakeLPContract from '@/server/CakeLPContract'

const state = () => ({
  ivyContract: null,
  cakeLPContract: null,
  lpBalance: 0, // LP余额
  ivyBalance: 0, // IVY余额
  miningVol: 0, // 个人挖矿量
  miningAllTotal: 0, // 已挖矿总量
  pledgeVol: 0, // 个人质押量
  pledgeTotal: 0 // 质押总量
})

// getters
const getters = {
  getIVYContract (state) {
    return state.ivyContract
  },
  getCakeLPContract (state) {
    return state.cakeLPContract
  },
  getLpBalance (state) {
    return state.lpBalance
  },
  getIvyBalance (state) {
    return state.ivyBalance
  },
  getMiningVol (state) {
    return state.miningVol
  },
  getMiningAllTotal (state) {
    return state.miningAllTotal
  },
  getPledgeVol (state) {
    return state.pledgeVol
  },
  getPledgeTotal (state) {
    return state.pledgeTotal
  }
}

// mutations
const mutations = {
  setIVYContract (state, contract) {
    state.ivyContract = contract
  },
  setCakeLPContract (state, contract) {
    state.cakeLPContract = contract
  },
  setLpBalance (state, lpBalance) {
    state.lpBalance = lpBalance
  },
  setIvyBalance (state, ivyBalance) {
    state.ivyBalance = ivyBalance
  },
  setMiningVol (state, miningVol) {
    state.miningVol = miningVol
  },
  setMiningAllTotal (state, miningAllTotal) {
    state.miningAllTotal = miningAllTotal
  },
  setPledgeVol (state, pledgeVol) {
    state.pledgeVol = pledgeVol
  },
  setPledgeTotal (state, pledgeTotal) {
    state.pledgeTotal = pledgeTotal
  }
}

const actions = {
  initialize ({ commit, state }, account) {
    const ivyContract = IVYContract.getInstanceof(account)
    const lpContract = CakeLPContract.getInstanceof(account)
    commit('setIVYContract', ivyContract)
    commit('setCakeLPContract', lpContract)
    const qry = () => {
      lpContract.getBalanceInfo().then(res => {
        // console.log('LP余额:', res)
        commit('setLpBalance', res)
      }).catch(e => {
        console.log(e)
      })
      ivyContract.getBalanceInfo().then(res => {
        console.log('IVY余额:', res)
        commit('setIvyBalance', res)
      }).catch(e => {
        console.log(e)
      })
      ivyContract.getMiningNumber().then(res => {
        // console.log('个人挖矿量:', res)
        commit('setMiningVol', res)
      }).catch(e => {
        console.log(e)
      })
      // ivyContract.getMiningTotal().then(res => {
      //   console.log('已挖矿量:', res)
      //   commit('setMiningAllTotal', res)
      // }).catch(e => {
      //   console.log(e)
      // })
      ivyContract.getPledgeTotal().then(res => {
        // console.log('个人质押量:', res)
        commit('setPledgeVol', res)
      }).catch(e => {
        console.log(e)
      })
      ivyContract.getPledgeAllTotal().then(res => {
        // console.log('全部质押量:', res)
        commit('setPledgeTotal', res)
      }).catch(e => {
        console.log(e)
      })
    }
    qry()
    setInterval(() => {
      qry()
    }, 5000)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
  }
}
