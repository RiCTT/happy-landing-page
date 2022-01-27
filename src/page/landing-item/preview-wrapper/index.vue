<template>
  <div class="preview-wrapper">
    <div class="preview-inner">
      <HappyPreview :configList="configList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HappyPreview from "@/components/happy-preview/index.vue";

export default defineComponent({
  components: {
    HappyPreview,
  },
  setup() {
    const configList = ref([
      {
        name: "van-button",
        data: {
          text: "按钮",
        },
      },
      {
        name: "van-image",
        data: {
          src: "https://tse1-mm.cn.bing.net/th/id/R-C.a84831186bddfe9b44ca645f0a8c021b?rik=mVmIauj3YmAFmA&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi3%2f291799040%2fTB2WvkEEER1BeNjy0FmXXb0wVXa_!!291799040-0-item_pic.jpg&ehk=rTrMzjXT9yEy8ElfC5OjPXscZ35Sk93tYB5iNxWbWSI%3d&risl=&pid=ImgRaw&r=0",
        },
      },
      {
        name: "van-image",
        data: {
          src: "https://tse1-mm.cn.bing.net/th/id/R-C.a84831186bddfe9b44ca645f0a8c021b?rik=mVmIauj3YmAFmA&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi3%2f291799040%2fTB2WvkEEER1BeNjy0FmXXb0wVXa_!!291799040-0-item_pic.jpg&ehk=rTrMzjXT9yEy8ElfC5OjPXscZ35Sk93tYB5iNxWbWSI%3d&risl=&pid=ImgRaw&r=0",
        },
      },
    ]);
    return {
      configList,
    };
  },
});
</script>

<style lang="stylus" scoped>
@import "~@/style/variables.styl"

.preview-wrapper {
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
}
</style>
