<template>
  <div id="app">
    <router-view></router-view>
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
