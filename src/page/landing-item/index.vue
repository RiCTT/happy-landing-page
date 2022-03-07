<template>
  <div class="landing-item-wrapper">
    <ComponentList @add-component="handleAddComponent" />
    <div>
      <div class="landing-item-operation">
        <a-button @click="goBackToList">返回列表</a-button>
        <a-button type="primary" @click="goToPreview">预览页面</a-button>
      </div>
      <PreviewWrapper ref="prefviewWrp" :layout="pageStore.settings.layout" />
    </div>
    <PropsForm
      @data-change="handleDataChange"
      @submit="handleSaveSubmit"
      @page-submit="handlePageFormSubmit"
    />
  </div>
</template>

<script lang="ts">
import ComponentList from "./component-list/index.vue";
import PreviewWrapper from "./preview-wrapper/index.vue";
import PropsForm from "./props-form/index.vue";
import { defineComponent, ref, computed } from "vue";
import { message } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import {
  getPageItem,
  createPageItem,
  updatePageItem,
} from "@/api/landing-page";
import { usePageStore } from "@/store/page";

export default defineComponent({
  components: {
    ComponentList,
    PropsForm,
    PreviewWrapper,
  },
  setup() {
    const pageStore = usePageStore();
    const route = useRoute();
    const router = useRouter();
    const pageId = computed(() => route.query.id);

    if (pageId.value) {
      getPageItem({
        id: pageId.value,
      }).then((res: any) => {
        if (res) {
          const { configList: result, settings: originSettings } = res;
          pageStore.setConfigList(result);
          pageStore.setSettings(originSettings || { pageHeight: "100%" });
        }
      });
    } else {
      pageStore.setConfigList([]);
      pageStore.setSettings({ pageHeight: "100%" });
    }

    const prefviewWrp = ref();

    const handleSaveSubmit = () => {
      const action = pageId.value ? updatePageItem : createPageItem;
      const page: any = {
        settings: { ...pageStore.settings },
        configList: [...pageStore.configList],
      };
      if (pageId.value) {
        page.id = pageId.value;
      }
      action(page).then((res: any) => {
        message.info("保存成功");
        if (res && res._id) {
          setTimeout(() => {
            let baseHref = window.location.href;
            baseHref += `?id=${res._id}`;
            window.location.replace(baseHref);
          }, 300);
        }
      });
    };

    // 赋值到对应的组件data上
    const handleDataChange = (data) => {
      // const index = prefviewWrp.value.getCurrentIndex();
      const index = pageStore.selectIndex;
      if (index !== -1) {
        const currentComp: any = pageStore.configList[index];
        const oldData = currentComp.data;
        const newData = Object.assign(oldData, data);
        currentComp.data = newData;
        pageStore.setCurPropsData(newData);
      }
    };

    const handleAddComponent = (comp) => {
      let data = initComponentDefaultValue(comp);
      message.info("添加成功!");
      const list: any[] = pageStore.configList;
      list.push(data);
      pageStore.setConfigList(list);
    };

    const initComponentDefaultValue = (comp) => {
      const id = Date.now();
      const { name } = comp;
      const result = { id, ...comp };
      if (!result.data) {
        result.data = {};
      }
      if (name === "van-button") {
        result.data.text = "按钮";
      }
      if (name === "van-swipe-v2") {
        result.data.height = "200px";
      }
      result.data.left = "0";
      result.data.top = "0";
      result.data.zIndex = pageStore.configList.length + 11;
      // return JSON.parse(JSON.stringify(result));
      return result;
    };

    const handlePageFormSubmit = (data) => {
      pageStore.setSettings(Object.assign(pageStore.settings, data));
      handleSaveSubmit();
    };

    const goBackToList = () => {
      router.push({
        name: "LandingList",
      });
    };

    const goToPreview = () => {
      // const url = window.location.origin + `/page-preview?id=${pageId.value}`;
      const url = window.location.origin + `/preview.html?id=${pageId.value}`;
      window.open(url, "_blank");
    };

    return {
      pageStore,
      prefviewWrp,
      goBackToList,
      goToPreview,
      handlePageFormSubmit,
      handleSaveSubmit,
      handleDataChange,
      handleAddComponent,
    };
  },
});
</script>

<style lang="stylus" scoped>
.landing-item-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  height: calc(100vh - 80px);
}

.landing-item-operation {
  margin-bottom: 6px;
  >>> .ant-btn {
    margin-right: 10px;
    &::last-child {
      margin-right: 0;
    }
  }
}
</style>
