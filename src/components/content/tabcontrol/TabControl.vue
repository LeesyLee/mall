<template>
  <div class="tab-control">
    <div
      v-for="(item, key) in titles"
      :key="key"
      class="tab-control-item"
      :class="{ 'active-item': key === itemActive }"
      @click = 'itemClick(key)'
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      itemActive: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.itemActive = index;
      this.$emit('tabClick',index);
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  z-index: 99
}
.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px
}

.active-item {
  color: var(--color-high-text);
}

.active-item span {
  border-bottom: 2px solid var(--color-high-text);
}

</style>