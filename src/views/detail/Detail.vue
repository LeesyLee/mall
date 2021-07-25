<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="Hscroll" :probe-type="3" @scroll="contentScroll" @backTop="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-params-info :param-info="itemParams" ref="params"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top @click.native="backClick" v-show='isShowBackTop'></back-top>
  </div>
</template>

<script>
  // 引入详情页顶部导航栏
  import DetailNavBar from "./childComps/DetailNavBar";

  // 引入详情页轮播图
  import DetailSwiper from "./childComps/DetailSwiper";

  //引入请求商品的详细数据的模块 店铺信息模块 图片详情数据 商品尺寸等参数
  import {
    getDetailData,
    GoodsBaseInfo,
    ShopInfo,
    DetailInfo,
    GoodsParam,
    CommentInfo,
    getRecommend,
  } from "network/detail";

  //引入商品基本信息模块
  import DetailBaseInfo from "./childComps/DetailBaseInfo";

  //引入店铺信息模块
  import DetailShopInfo from "./childComps/DetailShopInfo";

  //引入下方图片详情
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

  //引入商品尺码参数信息
  import DetailParamsInfo from "./childComps/DetailParamsInfo";

  //引入商品评论模块
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  //引入底部导航栏
  import DetailBottomBar from "./childComps/DetailBottomBar";




  //引入scroll模块
  import Scroll from "components/common/scroll/Scroll";
  //导入防抖函数模块
  import { debounce } from "common/utils.js";
  //导入GoodsList组件展示推荐模块
  import GoodsList from "components/content/goods/GoodsList";
  //导入混入模块-实现推荐模块图片重加载
  import { itemListenerMixin, backTopMixin } from "common/mixin.js";

  import BackTop from 'components/common/backtop/BackTop';



  export default {
    name: "Detail",
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        //顶部轮播图数据
        topImages: [],
        //商品基本信息数据
        goods: {},
        //商铺信息
        shopInfo: {},
        //详情信息
        detailInfo: {},
        //商品参数信息
        itemParams: {},
        //评论信息
        commentInfo: {},
        //推荐数据
        recommends: [],
        // //全局事件回调函数
        // itemImgListener: null
        //存储使用了debounce的refresh
        newRefresh: null,
        //nav-bar按钮内容对应的y
        themeTopYs: [],
        getThemeTopY: null,
        //当前navbar对应的index
        currentIndex: 0,
      };
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    methods: {
      detailImageLoad() {
        // console.log('detail.vue收到GoodsInfo');
        //重新让detail.vue中的scroll组件计算滚动区域高度
        // this.$refs.Hscroll.refresh()
        this.newRefresh();

        //执行最终的offsetTop计算
        this.getThemeTopY();
      },
      titleClick(index) {
        // console.log(index);
        // console.log(this.$refs.Hscroll);
        this.$refs.Hscroll.scrollTo(0, this.themeTopYs[index], 1000);
      },
      //接收滚动事件
      contentScroll(position) {
        let positionY = position.y;
        let len = this.themeTopYs.length;
        for (let i = 0; i < len; i++) {
          // 1. 0-1 1-2 2-3 
          if (i < len - 1) {
            // console.log(this.currentIndex);
            if ((this.currentIndex !== i) && (positionY > this.themeTopYs[i + 1] && positionY <= this.themeTopYs[i])) {
              // console.log(i);
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex;
            }
          }
          // 2. i = len - 1
          if (i === len - 1) {
            // console.log(this.currentIndex);
            if ((this.currentIndex !== i) && positionY <= this.themeTopYs[i]) {
              // console.log(i);
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex;
            }
          }
        }

        //是否需要显示返回顶部按钮
        this.isShowBackTop = -positionY > 1000 ? true : false;

      },



    },
    created() {
      //1. 保存传入的商品iid数据
      this.iid = this.$route.params.iid;

      //2. 根据传入的iid,请求详情数据
      getDetailData(this.iid).then((res) => {
        //2.1 保存顶部轮播图数据
        // console.log(res.result);
        const rdata = res.result;
        // console.log(rdata);
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
        // console.log(this.goods);

        // 2.3 获取店铺信息
        this.shopInfo = new ShopInfo(rdata.shopInfo);

        // 2.4 获取下方详情信息
        this.detailInfo = new DetailInfo(rdata.detailInfo);

        // 2.5 获取商品参数信息
        this.itemParams = new GoodsParam(
          rdata.itemParams.info,
          rdata.itemParams.rule
        );

        // console.log(1, this.itemParams);

        // 2.6 获取评论信息
        this.commentInfo = new CommentInfo(rdata.rate.cRate, rdata.rate.list);
        // console.log(this.commentInfo);

        // 2.7 获取推荐数据

        //4. 所有数据请求完成后，计算详情页各个模块的offsetTop 但是图片不一定加载出来了，所以可能还是会出现错误
        // 我们不这样计算
        // this.$nextTick(() => {});
      });

      //3. 请求推荐数据
      getRecommend().then((res) => {
        // console.log(res);
        this.recommends = res.data.list;
      });

      //4. 给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];

        // console.log(this.$refs.recommend.$el.offsetTop); //481
        // console.log(this.$refs.params.$el);
        this.themeTopYs.push(0);
        this.themeTopYs.push(-this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      });
    },
    mounted() {
      // //用从utils.js中引入的debounce函数，不要this了
      // let refresh = debounce(this.$refs.Hscroll.refresh);
      // // //3. 监听item中图片加载完成 + 防抖函数实现
      // this.itemImgListener = () => {
      //   //  console.log(refresh);
      //   refresh();
      // }
      // this.$bus.$on('itemImgLoad', this.itemImgListener);
      // console.log('detail.vue');
    },
    destroyed() {
      //离开页面取消全局事件中的图片重加载函数
      this.$bus.$off("itemImgLoad", this.itemImgListener);
      // console.log("destroyed");
    },
    updated() { },
  };
</script>

<style scoped>
  .detail {
    position: relative;
    top: 44px;
    height: 100vh;
    background-color: #fff;
    z-index: 9;
  }

  .detail .content {
    background-color: #fff;
    height: calc(100% - 92px);
  }
</style>