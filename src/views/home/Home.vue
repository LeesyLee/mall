<template>

  <div id="home">

    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 用scroll包裹实现顺滑滚动 -->
    <scroll class="scroll-content" ref = "Hscroll">
      <home-swiper :banner="banner"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native = "backClick"></back-top>



    <!-- <goods-list :goods="goods[this.currentType].list"></goods-list> -->




    <!-- 暂时放这里占位 -->
    <!-- <ul>
      <li>1count</li>
      <li>2count</li>
      <li>3count</li>
      <li>4count</li>
      <li>5count</li>
      <li>6count</li>
      <li>7count</li>
      <li>8count</li>
      <li>9count</li>
      <li>10count</li>
      <li>5count</li>
      <li>6count</li>
      <li>7count</li>
      <li>8count</li>
      <li>9count</li>
      <li>10count</li>
      <li>5count</li>
      <li>6count</li>
      <li>7count</li>
      <li>8count</li>
      <li>9count</li>
      <li>10count</li>
      <li>8count</li>
      <li>9count</li>
      <li>10count</li>
      <li>8count</li>
      <li>9count</li>
      <li>10count</li>
      <li>8count</li>
      <li>9count</li>
      <li>10count</li>
      <li>8count</li>
      <li>9count</li>
      <li>10count</li>
      <li>8count</li>
      <li>9count</li>
      <li>10count</li>
    </ul> -->
  </div>
</template>

<script>
  import HomeSwiper from "./homeComps/HomeSwiper";
  import RecommendView from "./homeComps/RecommendView";
  import FeatureView from "./homeComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BTscroll from 'better-scroll';
  import BackTop from 'components/common/backtop/BackTop';

  import { getHomeMultidata, getHomeGoods } from "network/home";

  export default {
    name: "Home",
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] },
        },
        currentType: "pop",
        bscroll: null
      };
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      //1.请求多个数据
      this.mgetHomeMultidata();
      //2. 请求商品数据
      this.mgetHomeGoods("pop");
      this.mgetHomeGoods("new");
      this.mgetHomeGoods("sell");
    },
    mounted() {
      // console.log(this.$refs.wrapper);
      // this.bscroll = new BTscroll(this.$refs.wrapper, {
      // })
    },
    methods: {
      /**
       * 事件监听相关方法
       */

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break;
        }
      },

      backClick() {
        this.scrollTo(0,0,1000);
      },
      //辅助backClick实现点击返回顶部功能
      scrollTo(x = 0,y = 0,time = 800){
        //x y time 的默认值分别为 0 0 800
        // console.log(this.$refs);
        //选中scroll组件标签
        console.log(this.$refs.Hscroll);
        //选中scroll组件中的better-scroll对象
        console.log(this.$refs.Hscroll.scroll);
        //利用scroll对象的scrollTo方法实现返回顶部
        this.$refs.Hscroll.scroll.scrollTo(x,y,time);
      },
      



      /**
       * 网络请求相关方法
       */
      //1.请求多个数据
      mgetHomeMultidata() {
        getHomeMultidata().then((res) => {
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        });
      },
      //2. 请求商品数据
      mgetHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then((res) => {
          //保存-请求到的所有type类型数据res中
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        });
      },
    },
  };
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }

  .home-nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 3;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }


  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
    left: 0;
    right: 0;
    /* height: 100%; */
  }

  /* .scroll-content {
    margin-top: 44px;
    height: calc(100% - 44px - 49px);
    overflow: hidden
  } */
</style>