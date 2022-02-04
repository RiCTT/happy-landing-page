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
      <a-form-item label="页面标题" name="title">
        <a-input v-model:value="model.title" />
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
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup(props, ctx) {
    const model = ref({});
    const rules = ref({});

    const onFinish = (value) => {
      ctx.emit("page-submit", value);
    };

    return {
      model,
      rules,
      onFinish,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
