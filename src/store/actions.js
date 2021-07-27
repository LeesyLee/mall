
import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //1.查找cartList中有没有商品payload
      //1.1 for + if
      // var oldProduct = null;
      // for(let item in state.cartList){
      //   if(item.iid === payload.iid){
      //     oldProduct = item;
      //   }
      // }
      //1.2 Array的find()方法
      let oldProduct = context.state.cartList.find((item) => {
        return item.iid === payload.iid;
      })

      //2. 根据查找结果决定count和插入
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量+1');
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve('添加新的商品')

      }
    })
  }
}