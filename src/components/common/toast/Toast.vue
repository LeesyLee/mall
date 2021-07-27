<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: "",
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data(){
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message = 'OK', duration = 2000) {
      //message - 弹窗信息 duration - 弹窗持续时间
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
}
</style>