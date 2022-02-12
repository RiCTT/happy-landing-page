<template>
  <div class="preview-wrapper">
    <div class="preview-inner">
      <HappyPreview
        ref="previewWrp"
        :configList="pageStore.configList"
        :boxHeight="pageStore.settings.pageHeight"
        :layout="$attrs.layout"
        @config-select="handleConfigSelect"
        @config-change="handleConfigChange"
      />
    </div>
    <div class="preview-menu">
      <div class="menu-item" @click="onMoveUpBtn">
        <up-circle-two-tone :two-tone-color="twoToneColor" />
      </div>
      <div class="menu-item" @click="onMoveDownBtn">
        <down-circle-two-tone :two-tone-color="twoToneColor" />
      </div>
      <div class="menu-item" @click="onRemoveBtn">
        <delete-two-tone :two-tone-color="twoToneColor" />
      </div>
      <div class="menu-item" @click="onAddHeightBtn">
        <plus-square-two-tone :two-tone-color="twoToneColor" />
      </div>
      <div class="menu-item" @click="onMinusHeightBtn">
        <minus-square-two-tone :two-tone-color="twoToneColor" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import HappyPreview from "@/components/happy-preview/index.vue";
import {
  UpCircleTwoTone,
  DownCircleTwoTone,
  DeleteTwoTone,
  PlusSquareTwoTone,
  MinusSquareTwoTone,
} from "@ant-design/icons-vue";
import { usePageStore } from "@/store/page";
import { BasicComponents } from "../component-list/data";

export default defineComponent({
  components: {
    HappyPreview,
    UpCircleTwoTone,
    DownCircleTwoTone,
    DeleteTwoTone,
    PlusSquareTwoTone,
    MinusSquareTwoTone,
  },
  setup() {
    const pageStore = usePageStore();
    const previewWrp: any = ref({});
    const twoToneColor = ref("#ff8000");

    // 提高层级
    const onMoveUpBtn = () => {
      const index = previewWrp.value.getCurrentConfigIndex();
      const currentConfigList = previewWrp.value.getConfigList();
      // if (index === -1) {
      //   return;
      // }
      if (index === -1 || index === 0) {
        return;
      }
      // 块布局的处理
      const temp = currentConfigList[index];
      currentConfigList[index] = currentConfigList[index - 1];
      currentConfigList[index - 1] = temp;
      emitConfigChange([...currentConfigList]);
      previewWrp.value.setConfigIndex(index - 1);
      pageStore.setSelectIndex(index - 1);

      // 定位布局时的zIndex处理
      // const current = currentConfigList[index];
      // const zIndex = current.zIndex || 10;
      // current.zIndex = zIndex + 1;
      // emitConfigChange([...currentConfigList]);
    };
    // 降低层级
    const onMoveDownBtn = () => {
      const index = previewWrp.value.getCurrentConfigIndex();
      const currentConfigList = previewWrp.value.getConfigList();
      // if (index === -1) {
      //   return;
      // }
      if (index === currentConfigList.length - 1) {
        return;
      }
      const temp = currentConfigList[index];
      currentConfigList[index] = currentConfigList[index + 1];
      currentConfigList[index + 1] = temp;
      emitConfigChange([...currentConfigList]);
      previewWrp.value.setConfigIndex(index + 1);
      pageStore.setSelectIndex(index + 1);

      // const current = currentConfigList[index];
      // const zIndex = current.zIndex || 10;
      // current.zIndex = zIndex - 1;
      // emitConfigChange([...currentConfigList]);
    };
    const onRemoveBtn = () => {
      const index = previewWrp.value.getCurrentConfigIndex();
      if (index === -1) {
        return;
      }
      const currentConfigList = previewWrp.value.getConfigList();
      currentConfigList.splice(index, 1);
      emitConfigChange([...currentConfigList]);
    };

    const onAddHeightBtn = () => {
      const val = parseInt(pageStore.settings.pageHeight) + 20 + "px";
      pageStore.setPageHeight(val);
    };

    const onMinusHeightBtn = () => {
      const val = parseInt(pageStore.settings.pageHeight) - 20 + "px";
      pageStore.setPageHeight(val);
    };

    const getCurrentIndex = () => {
      return previewWrp.value.getCurrentConfigIndex();
    };

    const handleConfigChange = (data) => {
      pageStore.setConfigList(data);
    };

    const emitConfigChange = (data) => {
      pageStore.setConfigList(data);
    };

    const handleConfigSelect = (config, index) => {
      const { data, name } = config;
      const targetComp: any = BasicComponents.find((e) => e.name === name);
      const { props } = targetComp;
      pageStore.setCurProps({ ...props });
      pageStore.setCurPropsData(data);
      pageStore.setSelectIndex(index);
    };

    onMounted(() => {
      const el = previewWrp.value.$el;
      const val = pageStore.settings.pageHeight;
      if (val === "100%" || !val) {
        pageStore.setPageHeight(el.offsetHeight + "px");
      }
    });
    return {
      pageStore,
      getCurrentIndex,
      previewWrp,
      twoToneColor,
      onMoveUpBtn,
      onMoveDownBtn,
      onRemoveBtn,
      onAddHeightBtn,
      onMinusHeightBtn,
      handleConfigChange,
      handleConfigSelect,
    };
  },
});
</script>

<style lang="stylus" scoped>
@import "~@/style/variables.styl"

.preview-wrapper {
  position: relative;
  width: 375px;
  height: 667px;
  min-width: 375px;
  min-height: 667px;
  background-image: url('./phone.png');
  background-size: 100% 100%;
  padding: 55px 10px 75px 12px;

  .preview-inner {
    width: 100%;
    height: 100%;
    border: 2px solid #f2f2f2;
    box-sizing: border-box;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
  }

  .preview-menu {
    position: absolute;
    top: 55px;
    // right: -52px;
    right: 0;
    transform: translateX(100%);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 8px 16px;
    .menu-item {
      font-size: 28px;
      cursor pointer;
      margin-bottom: 5px;
    }
  }
}
</style>
