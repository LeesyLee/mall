<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, key) in banner" :key="key">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImgLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
  name: "HomeSwiper",
  data(){
    return {
      isEmit: false
    }
  },
  props: {
    banner: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImgLoad() {
      if(!this.isEmit)
      console.log('swiper');
      this.isEmit = !this.isEmit;
      console.log(this.isEmit);
      this.$emit('swiperImgLoad');
    }
  }
};
</script>

<style>
</style>