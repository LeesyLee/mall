<template>

  <div id="home">

    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 吸顶功能中的tab-control替代品 -->
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control-copy" @tabClick="tabClick" ref="tabControlCopy"
      v-show="isTabFixed"></tab-control>


    <!-- 用scroll包裹实现顺滑滚动 -->
    <scroll class="scroll-content" ref="Hscroll" :probe-type="3" :pull-up-load="true" @backTop="showBackTop"
      @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" ref="tabControl">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>



    <back-top @click.native="backClick" v-show='isShowBackTop'></back-top>



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
  import { debounce } from 'common/utils.js';


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
        bscroll: null,
        isShowBackTop: false,
        isTabFixed: false,
        tabOffsetTop: 0,
        positionY: 0
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
      // setTimeout(() => {
      //   this.mgetHomeGoods("pop");

      // }, 2000);
      this.mgetHomeGoods("pop");
      this.mgetHomeGoods("new");
      this.mgetHomeGoods("sell");
      //3. 监听item中图片加载完成
      // this.$bus.$on('itemImgLoad', () => {
      //   this.$refs.Hscroll.refresh();
      // })

    },
    activated(){
      // console.log(this.$refs.Hscroll.getScrollY());
      this.$refs.Hscroll.scrollTo(0,-this.positionY,0);
      this.$refs.Hscroll.refresh();
    },
    deactivated(){
      // console.log(this.$refs.Hscroll.getScrollY());
      this.positionY = this.$refs.Hscroll.getScrollY();
    },
    mounted() {
      // console.log(this.$refs.wrapper);
      // this.bscroll = new BTscroll(this.$refs.wrapper, {
      // })
      //3. 监听item中图片加载完成
      // this.$bus.$on('itemImgLoad', () => {
      //   this.$refs.Hscroll.refresh();
      // })

      //防抖函数返回的函数
      // const refresh = this.debounce(this.$refs.Hscroll.refresh);
      //用从utils.js中引入的debounce函数，不要this了
      const refresh = debounce(this.$refs.Hscroll.refresh);

      //3. 监听item中图片加载完成 + 防抖函数实现
      this.$bus.$on('itemImgLoad', () => {
        //  console.log(refresh);
        refresh();
      })

    },
    destroyed() {
      console.log('Home.vue destroyed');
    }
    , methods: {
      /**
       * 事件监听相关方法
       */


      // 类型切换点击事件监听
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
        this.$refs.tabControl.itemActive = index;
        this.$refs.tabControlCopy.itemActive = index;
      },

      //返回顶部
      backClick() {
        // console.log(this.$refs);
        //选中scroll组件标签
        // console.log(this.$refs.Hscroll);
        //选中scroll组件中的better-scroll对象
        // console.log(this.$refs.Hscroll.scroll);
        //利用scroll对象的scrollTo方法实现返回顶部
        //x y time 的默认值分别为 0 0 800
        // this.$refs.Hscroll.scroll.scrollTo( 0, 0, 800);

        this.$refs.Hscroll.scrollTo(0, 0, 1000);
      },
      showBackTop(position) {
        //1. 判断backup是否显示
        // console.log(this.isShowBackTop);
        // console.log(position);
        this.isShowBackTop = -position.y > 1000 ? true : false;

        //2. 判断tabcontrol是否吸顶-position:fixed
        this.isTabFixed = -position.y > this.tabOffsetTop ? true : false;
      },

      //上拉加载更多
      // 上拉加载更多-防抖函数
      // 封装到/commom/utils.js
      // debounce(func, delay) {
      //   let timer = null;
      //   return function (...args) {
      //     if (timer) clearTimeout(timer);
      //     timer = setTimeout(() => {
      //       // console.log(this);
      //       // console.log(args);
      //       func.apply(this, args);
      //     }, delay)
      //   }
      // },

      loadMore() {
        console.log('loadMore');
        this.mgetHomeGoods(this.currentType);
      },

      //吸顶功能
      swiperImgLoad() {
        // console.log('HswiperImgLoad');
        console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
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

          //完成此次上拉加载
          this.$refs.Hscroll.finishPullUp();
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
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0; */
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

  /* .tabFixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  } */

  .tab-control-copy {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
</style>