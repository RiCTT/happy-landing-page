<template>
  <div class="preview-wrapper">
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
import { defineComponent, ref } from "vue";
import { getPageItem } from "@/api/landing-page";
import { getUrlParamValue } from "@/utils/url";

export default defineComponent({
  components: {
    HappyPreview,
  },
  setup() {
    const configList = ref([]);
    const settings = ref({});
    const pageId = getUrlParamValue("id");

    if (pageId) {
      getPageItem({ id: pageId }).then((res: any) => {
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

<style>
body,
html {
  height: 100%;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

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
