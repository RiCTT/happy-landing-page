<template>
  <div>
    <a-form
      :model="model"
      :rules="rules"
      layout="vertical"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item label="页面布局" name="layout">
        <a-radio-group v-model:value="model.layout" defaultValue="block">
          <a-radio value="block">块布局</a-radio>
          <a-radio value="position">定位布局</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="页面标题" name="title">
        <a-input v-model:value="model.title" />
      </a-form-item>
      <a-form-item label="页面高度" name="pageHeight">
        <a-input v-model:value="model.pageHeight" suffix="px" />
      </a-form-item>
      <a-form-item label="页面背景颜色" name="backgroundColor">
        <a-input v-model:value="model.backgroundColor" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { usePageStore } from "@/store/page";

export default defineComponent({
  setup(props, ctx) {
    const pageStore = usePageStore();
    const model = ref({});
    const rules = ref({});

    const onFinish = (value) => {
      ctx.emit("page-submit", value);
      console.log("value");
      console.log(value);
    };

    watch(
      () => pageStore.settings,
      (val: any) => {
        model.value = val || {};
      },
      {
        immediate: true,
      }
    );

    return {
      model,
      rules,
      pageStore,
      onFinish,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
