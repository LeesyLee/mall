<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
  .nav-bar {
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    box-shadow: 0px 1px 2px rgba(100, 100, 100, .3);
  }
  .left, .right {
    width: 60px;
    /* background-color: aqua; */
  }
  .center {
    flex: 1;
    /* background-color: red; */
  }
</style>