<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  //1. 视图组件
  //1.1 购物车商品条目
  import CartListItem from './CartListItem'

  //2. 基础功能模块组件
  //2.1 使用mapGetters,实现批量getters.js中方法导入
  import { mapGetters } from "vuex";
  //2.2 滚动模块引入
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "Cartlist",
    components: {
      CartListItem,
      Scroll,
    },
    computed: {
      ...mapGetters(["cartLength", "cartList"]),
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  };
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);

  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>