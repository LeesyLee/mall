<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner = "banner"></home-swiper>



  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./homeComps/HomeSwiper"
import {getHomeMultidata} from "network/home"


export default {
  name: "Home",
  data(){
    return {
      banner: [],
      recommend: []
    }
  },
  components: {
    NavBar,
    HomeSwiper
  },
  created(){
    //1.请求多个数据
    getHomeMultidata().then(res => {
      this.banner = res.data.banner.list;
      this.recommend = res.data.recommend.list;
    })
  }
};
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff
}
</style>