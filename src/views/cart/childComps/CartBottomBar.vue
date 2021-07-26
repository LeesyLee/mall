<template>
  <div class="bottom-bar">
    <div class="check-area">
      <check-button
        class="checkbtn"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计: {{ totalPrice }}</div>

    <div class="calculate">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    //全选按钮
    isSelectAll() {
      //初始状态 - cartList为空
      if (!this.cartList.length) return false;
        //只有当过滤数组为0时，才返回true，而此时说明全选中了
        //先在cartList找没有被选中的商品
        //当过滤数组长度为0时，是说没有一个商品没有被选中，那么也就是全选中了
        //其他情况都会返回false
        // 1. filter
        // return !(this.cartList.filter((item) => !item.checked).length);

        // 2. find - 只要找到一个商品没有选中，立马返回结果
        return !this.cartList.find((item) => !item.checked);

      // 3. for - 循环遍历this.cartList，发现有商品没有被选中，返回结果
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //全选 - 点击全不选
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        //未全选 - 点击全选
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  z-index: 88;
  display: flex;
  height: 40px;
  background-color: #eee;
  text-align: center;
  align-items: center;
}

.check-area {
  flex: 1;
  padding-top: 10px;
  height: 40px;
}

.check-area .checkbtn {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  vertical-align: middle;
}

.check-area span {
}

.price {
  width: 200px;
}

.calculate {
  flex: 1;
  height: 40px;
  line-height: 40px;
  background-color: #ff1900;
  color: #fff;
  font-size: 16px;
}
</style>