<template>
  <div>
    <div class="config-item" v-for="item in configList" :key="item.name">
      <component :is="item.name" />
    </div>
  </div>
</template>

<script lang="ts">
// 该组件用来展示页面组件列表，如涉及样式处理，可在外层或者穿透
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    configList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" scoped></style>
