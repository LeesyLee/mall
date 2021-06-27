<template>
  <div>
    <nav-bar class="detail-item">
      <div class="back" slot="left" @click="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div class="title" slot="center">
        <div
          v-for="(item, key) in titles"
          :key="key"
          class="title-item"
          @click="titleClick(key)"
          :class="{ activeTitle: key === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
//导入导航栏
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      // iid: null,
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar
  },
  methods: {
    //点击title-商品 参数 评论
    titleClick(index){
      this.currentIndex = index;
    },
    //返回上一页
    back() {
      this.$router.back();
    }
  },
  created() {
    // this.iid = this.$route.params.iid;
  },
  mounted() {},
};
</script>

<style>
.title {
  display: flex;
}

.title-item {
  flex: 1;
}

.detail-item img {
  margin-top: 10px;
}

.activeTitle {
  color: var(--color-high-text);
}
</style>