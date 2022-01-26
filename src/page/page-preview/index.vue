<template>
  <div>
    <HappyPreview :configList="configList" />
  </div>
</template>

<script lang="ts">
import HappyPreview from "@/components/happy-preview/index.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    HappyPreview,
  },
  setup() {
    const configList = ref([
      {
        name: "a-button",
      },
      {
        name: "a-image",
      },
    ]);
    return {
      configList,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
