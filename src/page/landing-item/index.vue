<template>
  <div class="landing-item-wrapper">
    <ComponentList />
    <PreviewWrapper
      :configList="configList"
      @config-change="handleConfigChange"
    />
    <PropsForm />
  </div>
</template>

<script lang="ts">
import ComponentList from "./component-list/index.vue";
import PreviewWrapper from "./preview-wrapper/index.vue";
import PropsForm from "./props-form/index.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    ComponentList,
    PropsForm,
    PreviewWrapper,
  },
  setup() {
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
      {
        id: 456,
        name: "van-image",
        data: {
          src: "https://image.huanghepiao.com/images/upload/20191224/15771484951260.jpg",
        },
        style: {
          left: "100px",
          top: "200px",
        },
      },
      {
        id: 789,
        name: "van-image",
        data: {
          src: "https://tse1-mm.cn.bing.net/th/id/R-C.a84831186bddfe9b44ca645f0a8c021b?rik=mVmIauj3YmAFmA&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi3%2f291799040%2fTB2WvkEEER1BeNjy0FmXXb0wVXa_!!291799040-0-item_pic.jpg&ehk=rTrMzjXT9yEy8ElfC5OjPXscZ35Sk93tYB5iNxWbWSI%3d&risl=&pid=ImgRaw&r=0",
        },
        style: {
          left: "210px",
          top: "140px",
        },
      },
    ]);

    const handleConfigChange = (data) => {
      configList.value = [...data];
    };
    return {
      configList,
      handleConfigChange,
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
</style>
