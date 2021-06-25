<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true
    });
    // 监听滚动事件-实现返回顶部
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("backTop", position);
    });
    // this.scroll.scrollTo(0 , 0 , time = 800);

    // 监听滚动上拉事件-事件上拉加载
    this.scroll.on("pullingUp",() => {
      // console.log('上拉加载');
      // pullingUp.finish();

      this.$emit('pullingUp');
    })
  },
  methods: {
    // 包装scrollTo方法
    scrollTo(x = 0, y = 0, time = 800) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 包装finishPullUp方法
    finishPullUp(){
      // console.log('finish');
      this.scroll && this.scroll.finishPullUp();
    },
    // 包装refresh方法
    refresh() {
      console.log('refresh');
      this.scroll && this.scroll.refresh();
    }
  },
};
</script>

<style scoped>
</style>