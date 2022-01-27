<template>
  <div>
    <div class="config-item" v-for="item in configList" :key="item.name">
      <component
        :is="item.name"
        width="100%"
        height="100%"
        v-bind="item.data"
      />
    </div>
  </div>
</template>

<script lang="ts">
// 该组件用来展示页面组件列表，如涉及样式处理，可在外层或者穿透
import { defineComponent } from "vue";

const createMeta = () => {
  const meta = document.createElement("meta");
  meta.setAttribute("name", "viewport");
  meta.setAttribute(
    "content",
    "maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"
  );

  document.querySelector("head")?.appendChild(meta);
};

createMeta();

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

<style lang="stylus" scoped>
>>> .config-item img {
  display: block;
  width: 100%;
}
</style>
