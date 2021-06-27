<template>
  <swiper class="detail-swiper">
    <swiper-item
      class="swiper-item"
      v-for="(item, key) in topImages"
      :key="key"
    >
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  data() {
    return {};
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {},
  mounted() {},
};
</script>

<style>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>