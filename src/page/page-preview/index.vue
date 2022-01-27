<template>
  <div>
    <HappyPreview :configList="configList" />
  </div>
</template>

<script lang="ts">
import HappyPreview from "@/components/happy-preview/index.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    HappyPreview,
  },
  setup() {
    const configList = ref([
      {
        name: "van-button",
        data: {
          text: "button",
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

<style lang="stylus" scoped></style>
