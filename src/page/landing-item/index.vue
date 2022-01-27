<template>
  <div class="landing-item-wrapper">
    <ComponentList />
    <PreviewWrapper />
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
        name: "van-button",
        data: {
          text: "按钮",
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
.landing-item-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  height: calc(100vh - 80px);
}
</style>
