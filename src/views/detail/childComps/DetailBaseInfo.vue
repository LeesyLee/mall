<template>
  <!-- <div class="base-info"> -->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <!-- <div class="info-desc"></div> -->
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <!-- <span v-if="goods.discount" class="discount">{{goods.discount}}</span> -->
      <span
        v-if="goods.discount"
        class="discount"
        :style="{ backgroundColor: goods.discountBgColor }"
      >
        {{ goods.discount }}
      </span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index].icon" alt="" />
        <span>{{ goods.services[index].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  data() {
    return {};
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {},
  methods: {},
  mounted() {},
};
</script>

<style>
.base-info {
  margin-top: 15px;
  padding: 0 8px 5px;
  font-size: var(--font-size);
  color: #999
}

.info-title {
  font-size: 20px;
  /* line-height: 23px; */
  color: var(--color-text);
}

.info-price {
  margin-top: 10px;
}

.n-price {
  color: var(--color-high-text);
  font-size: 24px;
}

.o-price {
  margin-left: 5px;
  color: #999;
  text-decoration: line-through;
}

.discount {
  position: relative;
  top: -8px;
  color: #fff;
  font-size: 12px;
  margin-left: 5px;
  /* background-color: var(--color-high-text); */
  /* 动态改变折扣背景颜色 */

  /* border-bottom-left-radius: 8px; */
  border-radius: 8px;
  padding: 2px 5px;
}

.info-other {
  display: flex;
  /* flex-wrap: nowrap; */
  margin-top: 15px;
  padding-bottom: 1px;
  color: #999;
  line-height: 30px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-other span {
  /* flex: 1; */
}

.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  flex-wrap: wrap;
}

.info-service-item {
  /* flex: 0 0 33.3333%; */
}

.info-service img {
  width: 14px;
  height: 14px;
}
</style>