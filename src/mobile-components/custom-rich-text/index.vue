<template>
  <div class="rich-text-wrapper" v-bind="$attrs">
    <div class="rich-text-inner" v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "custom-rich-text",
  props: {
    content: {
      type: String,
      default: "<div><h3>富文本框</h3><p>富文本内容</p></div>",
    },
  },
});
</script>

<style lang="stylus" scoped></style>
