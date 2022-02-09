<template>
  <div class="preview-wrapper">
    <div class="preview-inner" :style="{ height: settings.pageHeight }">
      <HappyPreview :configList="configList" mode="show" />
    </div>
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
    const settings = ref({});
    const route = useRoute();
    const pageId = computed(() => route.query.id);
    if (pageId.value) {
      const pageList = getPageList();
      const data = pageList.find((e) => String(e.id) === pageId.value);
      if (data) {
        console.log(data);
        console.log("find");
        const { configList: result, settings: originSettings } = data;
        configList.value = result;
        settings.value = originSettings;
      }
    }
    return {
      configList,
      settings,
    };
  },
});
</script>

<style lang="stylus" scoped>
.preview-wrapper {
  width: 100%;
  height: 100%;
  max-height: 667px;
  overflow: auto;
  .preview-inner {
    max-width: 375px;
    width: 100%;
    height: 100%;
    margin: 40px auto;
    background-color: #fff;
    overflow: auto;
  }
}
</style>
