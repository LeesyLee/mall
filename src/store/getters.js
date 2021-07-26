export default {
  //1. 获取添加的商品种类数量
  cartLength(state){
    return state.cartList.length;
  },
  //2. 获取购物车中的商品数据
  cartList(state){
    return state.cartList;
  }
}