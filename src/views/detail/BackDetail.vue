<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
    </scroll>
  </div>
</template>

<script>
// 引入详情页顶部导航栏
import DetailNavBar from "./childComps/DetailNavBar";

// 引入详情页轮播图
import DetailSwiper from "./childComps/DetailSwiper";

//引入请求商品的详细数据的模块
import { getDetailData, GoodsBaseInfo } from "network/detail";

//引入商品基本信息模块
import DetailBaseInfo from "./childComps/DetailBaseInfo";

//引入scroll模块
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      //顶部轮播图数据
      topImages: [],
      //商品基本信息数据
      goods: {},
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
  },
  methods: {},
  created() {
    //1. 保存传入的商品iid数据
    this.iid = this.$route.params.iid;

    //2. 根据传入的iid,请求详情数据
    getDetailData(this.iid).then((res) => {
      //2.1 保存顶部轮播图数据
      // console.log(res.result);
      const rdata = res.result;
      // this.topImages.push(...res.result.itemInfo.topImages);
      this.topImages.push(...rdata.itemInfo.topImages);
      // this.topImages = res.result.itemInfo.topImages;
      // console.log(this.topImages);

      // 2.2 获取商品基本信息
      this.goods = new GoodsBaseInfo(
        rdata.itemInfo,
        rdata.shopInfo,
        rdata.columns
      );
      console.log(this.goods);
    });
  },
  mounted() {},
};
</script>

<style scoped>
.detail {
  position: relative;
  height: 100vh;
  background-color: #fff;
  z-index: 9;
}
.content {
  background-color: #fff;
  height: calc(100%-44px);
}
</style>