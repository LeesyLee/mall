<template>
  <div class="recommend">
    <div v-for="(item,key) in recommend" :key="key" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommend: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
.recommend {
  display: flex;
  padding: 15px 0 15px;
  border-bottom: 4px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 12px;
}

.recommend-item img {
  width: 67.25px;
  height: 67.25px;
  margin-bottom: 6px;
}
</style>