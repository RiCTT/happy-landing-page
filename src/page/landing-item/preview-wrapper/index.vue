<template>
  <div class="preview-wrapper">
    <div class="preview-inner">
      <HappyPreview
        ref="previewWrp"
        :configList="configList"
        :boxHeight="boxHeight"
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

export default defineComponent({
  props: {
    configList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    HappyPreview,
    UpCircleTwoTone,
    DownCircleTwoTone,
    DeleteTwoTone,
    PlusSquareTwoTone,
    MinusSquareTwoTone,
  },
  setup(props, ctx) {
    const previewWrp: any = ref({});
    const boxHeight = ref("100%");
    const twoToneColor = ref("#ff8000");

    // 提高层级
    const onMoveUpBtn = () => {
      const index = previewWrp.value.getCurrentConfigIndex();
      const currentConfigList = previewWrp.value.getConfigList();
      if (index === -1) {
        return;
      }
      const current = currentConfigList[index];
      const zIndex = current.zIndex || 10;
      current.zIndex = zIndex + 1;
      // configList.value = [...currentConfigList];
      // ctx.emit("config-change", [...currentConfigList]);
      emitConfigChange([...currentConfigList]);
    };
    // 降低层级
    const onMoveDownBtn = () => {
      const index = previewWrp.value.getCurrentConfigIndex();
      const currentConfigList = previewWrp.value.getConfigList();
      if (index === -1) {
        return;
      }
      const current = currentConfigList[index];
      const zIndex = current.zIndex || 10;
      current.zIndex = zIndex - 1;
      // ctx.emit("config-change", [...currentConfigList]);
      emitConfigChange([...currentConfigList]);
      // configList.value = [...currentConfigList];
    };
    const onRemoveBtn = () => {
      const index = previewWrp.value.getCurrentConfigIndex();
      if (index === -1) {
        return;
      }
      const currentConfigList = previewWrp.value.getConfigList();
      currentConfigList.splice(index, 1);
      // ctx.emit("config-change", [...currentConfigList]);
      emitConfigChange([...currentConfigList]);
      // configList.value = [...currentConfigList];
    };

    const onAddHeightBtn = () => {
      boxHeight.value = parseInt(boxHeight.value) + 20 + "px";
    };

    const onMinusHeightBtn = () => {
      boxHeight.value = parseInt(boxHeight.value) - 20 + "px";
    };

    const handleConfigChange = (data) => {
      // configList.value = [...data];
      // ctx.emit("config-change", [...data]);
      emitConfigChange(data);
    };

    const emitConfigChange = (data) => {
      ctx.emit("config-change", data);
    };

    onMounted(() => {
      const el = previewWrp.value.$el;
      boxHeight.value = el.offsetHeight + "px";
    });
    return {
      boxHeight,
      previewWrp,
      twoToneColor,
      onMoveUpBtn,
      onMoveDownBtn,
      onRemoveBtn,
      onAddHeightBtn,
      onMinusHeightBtn,
      handleConfigChange,
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
