const state = () => ({
  pledge: false,
  pickup: false,
  redeem: false
})

// getters
const getters = {
  getPledge (state) {
    return state.pledge
  },
  getPickup (state) {
    return state.pickup
  },
  getRedeem (state) {
    return state.redeem
  }
}

// mutations
const mutations = {
  setPledge (state, status) {
    state.pledge = status
  },
  setPickup (state, status) {
    state.pickup = status
  },
  setRedeem (state, status) {
    state.redeem = status
  }
}

const actions = {
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
