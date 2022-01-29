<template>
  <div class="preview-wrapper">
    <div class="preview-inner">
      <HappyPreview ref="previewWrp" :configList="configList" />
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
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    HappyPreview,
    UpCircleTwoTone,
    DownCircleTwoTone,
    DeleteTwoTone,
  },
  setup() {
    const previewWrp: any = ref({});
    const twoToneColor = ref("#ff8000");
    const configList = ref([
      {
        id: 123,
        name: "van-button",
        data: {
          text: "按钮",
        },
      },
      {
        id: 456,
        name: "van-image",
        data: {
          src: "https://image.huanghepiao.com/images/upload/20191224/15771484951260.jpg",
        },
      },
      {
        id: 789,
        name: "van-image",
        data: {
          src: "https://tse1-mm.cn.bing.net/th/id/R-C.a84831186bddfe9b44ca645f0a8c021b?rik=mVmIauj3YmAFmA&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi3%2f291799040%2fTB2WvkEEER1BeNjy0FmXXb0wVXa_!!291799040-0-item_pic.jpg&ehk=rTrMzjXT9yEy8ElfC5OjPXscZ35Sk93tYB5iNxWbWSI%3d&risl=&pid=ImgRaw&r=0",
        },
      },
    ]);

    const onMoveUpBtn = () => {
      const index = previewWrp.value.getCurrentConfigIndex();
      const currentConfigList = previewWrp.value.getConfigList();
      if (index === -1 || index === 0) {
        return;
      }
      const temp = currentConfigList[index - 1];
      currentConfigList[index - 1] = currentConfigList[index];
      currentConfigList[index] = temp;
      configList.value = [...currentConfigList];
    };
    const onMoveDownBtn = () => {
      const index = previewWrp.value.getCurrentConfigIndex();
      const currentConfigList = previewWrp.value.getConfigList();
      if (index === -1 || index === currentConfigList.length - 1) {
        return;
      }
      const temp = currentConfigList[index + 1];
      currentConfigList[index + 1] = currentConfigList[index];
      currentConfigList[index] = temp;
      configList.value = [...currentConfigList];
    };
    const onRemoveBtn = () => {
      const index = previewWrp.value.getCurrentConfigIndex();
      if (index === -1) {
        return;
      }
      const currentConfigList = previewWrp.value.getConfigList();
      currentConfigList.splice(index, 1);
      configList.value = [...currentConfigList];
    };

    onMounted(() => {
      console.log(previewWrp.value); // Proxy {…}
    });
    return {
      previewWrp,
      configList,
      twoToneColor,
      onMoveUpBtn,
      onMoveDownBtn,
      onRemoveBtn,
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
