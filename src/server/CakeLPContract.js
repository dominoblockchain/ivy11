import { CAKE_LP_ABI } from '@/server/CakeLP_ABI'
import Contract from 'web3-eth-contract'
import Web3 from 'web3'
import Eth from 'web3-eth'
import IVYContract from './IVYContract'
import config from '@data/config.json'

class CakeLPContract {
  static instanceofObj = null

  // 合约地址
  static CONTRACT_ADDRESS = config.contract.Cake_LP.address

  /**
   * 获取实例对象
   */
  static getInstanceof (address) {
    if (CakeLPContract.instanceofObj) {
      return CakeLPContract.instanceofObj
    } else {
      CakeLPContract.instanceofObj = new CakeLPContract(address)
      return CakeLPContract.instanceofObj
    }
  }

  /**
   * 初始化合约构造器
   * @param address 钱包地址
   */
  constructor (address) {
    Contract.setProvider(Eth.givenProvider)
    this.contract = new Contract(CAKE_LP_ABI, CakeLPContract.CONTRACT_ADDRESS)
    this.contract.options.jsonInterface = CAKE_LP_ABI
    this.contract.options.address = CakeLPContract.CONTRACT_ADDRESS
    this.contract.options.from = address
  }

  /**
   * 获取余额
   * @param address 钱包地址
   */
  getBalanceInfo (address = this.contract.options.from) {
    return new Promise((resolve, reject) => {
      this.contract.methods.balanceOf(address).call({
      }).then(res => {
        resolve(Web3.utils.fromWei(res))
      }).catch(err => {
        reject(err)
      })
    })
  }

  /**
   * 授权
   * @param number lp数量
   */
  approve (number) {
    return new Promise((resolve, reject) => {
      this.contract.methods.approve(IVYContract.CONTRACT_ADDRESS, (number + '')).send({
      }, () => {
        resolve()
      })
    })
  }

  /**
   * 查询授权
   */
  allowance (address = this.contract.options.from) {
    return new Promise((resolve, reject) => {
      this.contract.methods.allowance(address, IVYContract.CONTRACT_ADDRESS).call({
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default CakeLPContract
