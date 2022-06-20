const state = () => ({
  message: ''
})

// getters
const getters = {
  getNotice (state) {
    return state.message
  }
}

// mutations
const mutations = {
  setNotice (state, notice) {
    state.message = notice
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
