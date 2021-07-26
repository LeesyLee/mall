<template>
  <div class="cart">

    <nav-bar class="nav-bar">
      <div slot="center" class="nav-bar-title">购物车({{cartLength}})</div>
    </nav-bar>

    <cart-list></cart-list>

    <cart-bottom-bar></cart-bottom-bar>

  </div>
</template>

<script>
  //1. 视图组件模块
  //1.1 引入导航栏
  import NavBar from 'components/common/navbar/NavBar'
  //1.2 引入购物车商品列表
  import CartList from './childComps/CartList'
  //1.3 数量、价格汇总模块
  import CartBottomBar from './childComps/CartBottomBar'

  //2. 基础功能模块组件
  //2.1 使用mapGetters,实现批量getters.js中方法导入
  import { mapGetters } from 'vuex'


  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // cartLength(){
      //   return this.$store.getters.cartLength;
      // }
      ...mapGetters([
        'cartLength'
      ])
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    z-index: 3;
  }


</style>