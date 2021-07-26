import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {

  //mutations唯一的目的就是修改state状态
  //mutations中的每个方法尽可能完成的事件要比较单一
  //将添加至购物车功能分开
  //part1 payload已经存在于cartList中
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  //part2 payload对于cartList来说是新物品
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }

}