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
  components: {
    HappyPreview,
    UpCircleTwoTone,
    DownCircleTwoTone,
    DeleteTwoTone,
    PlusSquareTwoTone,
    MinusSquareTwoTone,
  },
  setup() {
    const previewWrp: any = ref({});
    const boxHeight = ref("100%");
    const twoToneColor = ref("#ff8000");
    const configList = ref([
      {
        id: 11111,
        name: "van-divider",
        data: {
          dashed: true,
        },
      },
      {
        id: 2222,
        name: "van-swipe-v2",
        data: {
          autoplay: 3000,
          images: [
            {
              src: "https://img.yzcdn.cn/vant/apple-1.jpg",
            },
            {
              src: "https://tse1-mm.cn.bing.net/th/id/R-C.a84831186bddfe9b44ca645f0a8c021b?rik=mVmIauj3YmAFmA&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi3%2f291799040%2fTB2WvkEEER1BeNjy0FmXXb0wVXa_!!291799040-0-item_pic.jpg&ehk=rTrMzjXT9yEy8ElfC5OjPXscZ35Sk93tYB5iNxWbWSI%3d&risl=&pid=ImgRaw&r=0",
            },
          ],
        },
        style: {
          height: "200px",
        },
      },
      {
        id: 123,
        name: "van-button",
        data: {
          text: "按钮",
        },
        style: {
          left: "10px",
          top: "100px",
        },
      },
      // {
      //   id: 456,
      //   name: "van-image",
      //   data: {
      //     src: "https://image.huanghepiao.com/images/upload/20191224/15771484951260.jpg",
      //   },
      //   style: {
      //     left: "100px",
      //     top: "200px",
      //   },
      // },
      // {
      //   id: 789,
      //   name: "van-image",
      //   data: {
      //     src: "https://tse1-mm.cn.bing.net/th/id/R-C.a84831186bddfe9b44ca645f0a8c021b?rik=mVmIauj3YmAFmA&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi3%2f291799040%2fTB2WvkEEER1BeNjy0FmXXb0wVXa_!!291799040-0-item_pic.jpg&ehk=rTrMzjXT9yEy8ElfC5OjPXscZ35Sk93tYB5iNxWbWSI%3d&risl=&pid=ImgRaw&r=0",
      //   },
      //   style: {
      //     left: "210px",
      //     top: "140px",
      //   },
      // },
    ]);
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
      configList.value = [...currentConfigList];
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

    const onAddHeightBtn = () => {
      boxHeight.value = parseInt(boxHeight.value) + 20 + "px";
    };

    const onMinusHeightBtn = () => {
      boxHeight.value = parseInt(boxHeight.value) - 20 + "px";
    };

    const handleConfigChange = (data) => {
      configList.value = [...data];
    };

    onMounted(() => {
      const el = previewWrp.value.$el;
      boxHeight.value = el.offsetHeight + "px";
    });
    return {
      boxHeight,
      previewWrp,
      configList,
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
