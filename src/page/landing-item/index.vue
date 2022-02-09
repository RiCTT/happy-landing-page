<template>
  <div class="landing-item-wrapper">
    <ComponentList @add-component="handleAddComponent" />
    <div>
      <div class="landing-item-operation">
        <a-button @click="goBackToList">返回列表</a-button>
        <a-button type="primary" @click="goToPreview">预览页面</a-button>
      </div>
      <PreviewWrapper
        ref="prefviewWrp"
        :configList="configList"
        :pageHeight="settings.pageHeight"
        @config-change="handleConfigChange"
        @config-select="handleConfigSelect"
      />
    </div>
    <PropsForm
      :pageSettings="currentPage.pageSettings"
      :form="currentProps"
      :data="currentPropsData"
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
import { getPageList, setPageList } from "./utils";
import { useRoute, useRouter } from "vue-router";
import { BasicComponents } from "./component-list/data";

export default defineComponent({
  components: {
    ComponentList,
    PropsForm,
    PreviewWrapper,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const pageId = computed(() => route.query.id);

    const currentPage = ref({ pageSettings: {} });
    const currentProps = ref({});
    const currentPropsData = ref({});

    const prefviewWrp = ref();
    const configList: any = ref([]);
    const settings = ref({ pageHeight: "100%" });

    const getSettingsData = (data?) => {
      const result = data ? Object.assign(data) : {};
      const pageHeight = prefviewWrp.value.boxHeight;
      result.pageHeight = pageHeight;
      return result;
    };

    const handleSaveSubmit = () => {
      const list = getPageList();
      if (!pageId.value) {
        const id = Date.now();
        const page = {
          id,
          settings: getSettingsData(),
          configList: [...configList.value],
        };
        list.push(page);
        setPageList(list);
        setTimeout(() => {
          router.go(-1);
        }, 300);
      } else {
        const index = list.findIndex((e) => String(e.id) === pageId.value);
        const data = list[index];
        data.configList = configList.value;
        data.settings = getSettingsData(data.settings);
        console.log(data);
        setPageList(list);
      }
      message.info("保存成功");
    };

    const handleConfigChange = (data) => {
      configList.value = [...data];
    };

    // 赋值到对应的组件data上
    const handleDataChange = (data) => {
      const index = prefviewWrp.value.getCurrentIndex();
      const currentComp = configList.value[index];
      const oldData = currentComp.data;
      currentComp.data = Object.assign(oldData, data);
    };

    const handleAddComponent = (comp) => {
      console.log(comp);
      let data = initComponentDefaultValue(comp);
      message.info("添加成功!");
      configList.value.push(data);
    };

    const handleConfigSelect = (config) => {
      const { data, name } = config;
      const targetComp: any = BasicComponents.find((e) => e.name === name);
      const { props } = targetComp;
      currentProps.value = props;
      currentPropsData.value = data;
    };

    const initComponentDefaultValue = (comp) => {
      const id = Date.now();
      const { name } = comp;
      const result = { id, ...comp };
      if (!result.style) {
        result.style = {};
      }
      if (!result.data) {
        result.data = {};
      }
      if (name === "van-button") {
        result.data.text = "按钮";
      }
      if (name === "van-swipe-v2") {
        result.style.height = "200px";
      }
      result.style.left = "0";
      // result.style.top = "50%";
      result.style.top = "0";
      // result.style.transform = "translateY(-50%)";
      result.style.zIndex = configList.value.length + 11;
      return result;
    };

    if (pageId.value) {
      const pageList = getPageList();
      const data: any = pageList.find((e) => String(e.id) === pageId.value);
      currentPage.value = data;
      if (data) {
        console.log("find item !");
        console.log(data);
        const { configList: result, settings: originSettings } = data;
        configList.value = result;
        settings.value = originSettings || { pageHeight: "100%" };
      }
    }

    const handlePageFormSubmit = (data) => {
      console.log("pageform");
      console.log(data);
      currentPage.value.pageSettings = data;
      handleSaveSubmit();
    };

    const goBackToList = () => {
      router.push({
        name: "LandingList",
      });
    };

    const goToPreview = () => {
      const url = window.location.origin + `/page-preview?id=${pageId.value}`;
      window.open(url, "_blank");
    };

    return {
      currentPage,
      configList,
      settings,
      currentProps,
      currentPropsData,
      prefviewWrp,
      goBackToList,
      goToPreview,
      handlePageFormSubmit,
      handleSaveSubmit,
      handleDataChange,
      handleConfigSelect,
      handleConfigChange,
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
