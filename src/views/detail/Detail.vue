<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images = "topImages"></detail-swiper>
  </div>
</template>

<script>
// 引入详情页顶部导航栏
import DetailNavBar from "./childComps/DetailNavBar";

// 引入详情页轮播图
import DetailSwiper from "./childComps/DetailSwiper";

//引入请求商品的详细数据的模块
import { getDetailData } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      //顶部轮播图数据
      topImages: [],
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  methods: {},
  created() {
    //1. 保存传入的商品iid数据
    this.iid = this.$route.params.iid;

    //2. 根据传入的iid,请求详情数据
    getDetailData(this.iid).then((res) => {
      //2.1 保存顶部轮播图数据
      // console.log(res.result.itemInfo.topImages);
      this.topImages.push(...res.result.itemInfo.topImages);
      // this.topImages = res.result.itemInfo.topImages;
      // console.log(this.topImages);
    });
  },
  mounted() {},
};
</script>

<style>
</style>