<template>
  <p class="simple-text" v-bind="$attrs" v-text="text"></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "simple-text",
  props: {
    text: {
      type: String,
      default: "普通文本",
    },
  },
});
</script>

<style lang="stylus" scoped>
.simple-text {
  color: #000;
  margin: 0;
  font-size: 14px;
}
</style>
