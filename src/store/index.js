import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

// 1.安装插件
Vue.use(Vuex)

const state = {
  //存储添加的商品信息
  cartList: []
}

// 2.创建Store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions
})


// 3.将store对象挂载到Vue实例上
export default store