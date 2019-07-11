import {
  reqAddress,
  reqCategorys,
  reqShops
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'

export default {
  // 异步获取地址
  async getAddress({commit,state}) {
    const { longitude, latitude } = state
    const result = await reqAddress(longitude, latitude)
    if(result.code===0){
      const address = result.data
      commit(RECEIVE_ADDRESS,address)
    }
  },
  // 异步获取分类列表
  async getCategorys({commit},callback) {

    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)

      typeof callback === 'function' && callback()
    }
  },
  // 异步获取商家列表
  async getShops({commit,state}) {
    const { longitude, latitude } = state
    const result = await reqShops({longitude, latitude})
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
}
