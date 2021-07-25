import { debounce } from './utils';

export const itemListenerMixin = {
  data() {
    return {
      //全局事件回调函数
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.Hscroll.refresh, 100);
    this.newRefresh = refresh;
    // console.log('混入实现图片重加载');
    // 监听item中图片加载完成 + 防抖函数实现
    this.itemImgListener = () => {
      //  console.log(refresh);
      this.newRefresh();
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener);
  }
}


//返回顶部功能的混入

import BackTop from 'components/common/backtop/BackTop';
export const backTopMixin = {
  components: {
    BackTop
  }
  ,
  data() {
    return { isShowBackTop: false }
  },
  methods: {
    //返回顶部按钮事件
    backClick() {
      this.$refs.Hscroll.scrollTo(0, 0, 1000);
    }
  }
}