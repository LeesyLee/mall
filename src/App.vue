<template>
  <div id="app">
    <keep-alive exclude= "Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  //导入tabbar
  import MainTabBar from 'components/content/mainTabbar/mainTabBar.vue'

  export default {
    name: "App",
    components: {
      MainTabBar
    },
  };
</script>

<style>
  /* @import "./assets/base.css" */
  /* @import "assets/css/base.css" */
  @import "assets/css/base.css";
</style>