<template>
  <!-- <van-sticky position="bottom"> -->
  <div class="sticky-v2">
    <van-button type="primary">置底按钮</van-button>
  </div>
  <!-- </van-sticky> -->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "van-sticky-v2",
  setup() {
    onMounted(() => {
      let dom: any = document.querySelector(".config-list-wrapper");
      if (dom) {
        dom.style.transform = `translate(0, 0)`;
      }
    });
    return {};
  },
});
</script>

<style lang="stylus" scoped>
.sticky-v2 {
  position: fixed;
  bottom: 0;
}
</style>
