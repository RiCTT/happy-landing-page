<template>
  <div class="preview-wrapper">
    <HappyPreview :configList="configList" mode="show" />
  </div>
</template>

<script lang="ts">
import HappyPreview from "@/components/happy-preview/index.vue";
import { defineComponent, ref, computed } from "vue";
import { getPageList } from "../landing-item/utils";
import { useRoute } from "vue-router";
export default defineComponent({
  components: {
    HappyPreview,
  },
  setup() {
    const configList = ref([]);
    const route = useRoute();
    const pageId = computed(() => route.query.id);
    if (pageId.value) {
      const pageList = getPageList();
      const data = pageList.find((e) => String(e.id) === pageId.value);
      if (data) {
        console.log(data);
        console.log("find");
        const { configList: result } = data;
        configList.value = result;
      }
    }
    return {
      configList,
    };
  },
});
</script>

<style lang="stylus" scoped>
.preview-wrapper {
  width: 100%;
  height: 100%;
}
</style>
