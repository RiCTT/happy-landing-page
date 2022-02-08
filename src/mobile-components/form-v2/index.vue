<template>
  <van-form @submit="onSubmit">
    <template v-for="field in fields" :key="field.key">
      <van-field
        v-if="field.ui === 'text'"
        :label="field.label"
        :key="field.ui"
        v-model="model[field.key]"
        :placeholder="field.placeholder"
      ></van-field>
      <van-field
        v-if="field.ui === 'password'"
        type="password"
        :key="field.ui"
        :label="field.label"
        v-model="model[field.key]"
        :placeholder="field.placeholder"
      ></van-field>
    </template>
    <!-- <van-field
      v-model="model.username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="model.password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    /> -->
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "van-form-v2",
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const model = ref({});
    const onSubmit = () => {
      console.log("submit", model.value);
    };
    return {
      model,
      onSubmit,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
