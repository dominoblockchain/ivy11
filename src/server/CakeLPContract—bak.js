import { CAKE_LP_ABI, CAKE_LP_ABI_APPROVE, CAKE_LP_ABI_ALLOWANCE } from '@/server/CakeLP_ABI'
import Contract from 'web3-eth-contract'
import Web3 from 'web3'
import Eth from 'web3-eth'
import IVYContract from './IVYContract'
import config from '@data/config.json'
import { IVY_ABI_BALANCE_OF } from '@/server/IVY_ABI'

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
      const funcSign = IVYContract.web3.eth.abi.encodeFunctionSignature(IVY_ABI_BALANCE_OF)
      address = address.substring(2)
      address = Web3.utils.padLeft(address, 64)
      const data = funcSign + address
      window.ethereum.request({
        method: 'eth_call',
        params: [{
          form: address,
          QUANTITY: 'latest',
          to: CakeLPContract.CONTRACT_ADDRESS,
          data
        }]
      }).then(res => {
        resolve(Web3.utils.fromWei(res))
      }).catch(e => {
        reject(e)
      })
    })
  }

  /**
   * 授权
   * @param number lp数量
   */
  approve (number) {
    return new Promise((resolve, reject) => {
      const funcSign = IVYContract.web3.eth.abi.encodeFunctionSignature(CAKE_LP_ABI_APPROVE)
      number = Web3.utils.toHex(number.toString()).substring(2)
      number = Web3.utils.padLeft(number, 64)
      const data = funcSign + number
      window.ethereum.request({
        method: 'eth_call',
        params: [{
          QUANTITY: 'latest',
          to: IVYContract.CONTRACT_ADDRESS,
          data
        }]
      }).then(res => {
        resolve(Web3.utils.fromWei(res))
      }).catch(e => {
        reject(e)
      })
    })
  }

  /**
   * 查询授权
   */
  allowance (address = this.contract.options.from) {
    return new Promise((resolve, reject) => {
      const funcSign = IVYContract.web3.eth.abi.encodeFunctionSignature(CAKE_LP_ABI_ALLOWANCE)
      address = address.substring(2)
      address = Web3.utils.padLeft(address, 64)
      let address2 = IVYContract.CONTRACT_ADDRESS.substring(2)
      address2 = Web3.utils.padLeft(address, 64)
      const data = funcSign + address + address2
      window.ethereum.request({
        method: 'eth_call',
        params: [{
          QUANTITY: 'latest',
          to: IVYContract.CONTRACT_ADDRESS,
          data
        }]
      }).then(res => {
        resolve(Web3.utils.fromWei(res))
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export default CakeLPContract
