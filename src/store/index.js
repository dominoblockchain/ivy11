import { createStore } from 'vuex'
import contract from './modules/contract'
import notice from './modules/notice'
import transaction from './modules/transaction'

// const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    contract,
    notice,
    transaction
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
