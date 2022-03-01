<template>
  <div class="preview-wrapper">
    <!-- <div class="preview-inner" :style="{ height: settings.pageHeight }"> -->
    <div class="preview-inner">
      <HappyPreview
        :configList="configList"
        :settings="settings"
        mode="show"
        :layout="settings.layout || 'block'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import HappyPreview from "@/components/happy-preview/index.vue";
import { defineComponent, ref, computed } from "vue";
import { getPageItem } from "@/api/landing-page";
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
      console.log("get Page item");
      getPageItem({ id: pageId.value }).then((res: any) => {
        console.log("page result");
        console.log(res);
        const { configList: result, settings: originSettings } = res;
        configList.value = result;
        settings.value = originSettings;
      });
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
  .preview-inner {
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: auto;
  }
}
</style>
