<template>
  <a-modal v-model:visible="visible" title="表单组件属性">
    <a-form
      :model="model"
      :rules="rules"
      layout="vertical"
      name="basic"
      autocomplete="off"
    >
      <a-form-item label="控件类型" name="ui">
        <a-select
          v-model:value="model.ui"
          style="width: 200px"
          :options="uiOptions"
        ></a-select>
      </a-form-item>
      <a-form-item label="控件名称" name="label">
        <a-input v-model:value="model.label" />
      </a-form-item>
      <a-form-item
        v-if="showItem(['text', 'password'])"
        label="提示文本"
        name="placeholder"
      >
        <a-input v-model:value="model.placeholder" />
      </a-form-item>
      <a-form-item label="是否必填" name="required">
        <a-switch v-model:checked="model.required" />
      </a-form-item>
      <a-form-item
        v-if="showItem(['checkbox', 'radio'])"
        label="选项"
        name="options"
      >
        <div v-if="model.options">
          <a-input
            style="margin-bottom: 10px"
            v-for="(op, i) in model.options"
            :key="i"
            v-model:value="model.options[i]"
          />
        </div>
        <a-button type="primary" @click="addOption">新增选项</a-button>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button key="back" @click="handleCancel">Return</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        Submit
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { fieldsOps } from "@/page/landing-item/component-list/data";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    field: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const uiOptions = ref(fieldsOps);
    const visible = ref(props.modelValue);
    const loading = ref(false);
    const model: any = ref({});
    const rules = ref({});

    watch(
      () => props.modelValue,
      (val) => {
        visible.value = val;
      }
    );

    watch(visible, (val) => {
      ctx.emit("update:modelValue", val);
    });

    watch(
      () => props.field,
      (val) => {
        model.value = { ...val };
      }
    );

    const showItem = (flags: string[]) => {
      const ui: string = model.value.ui;
      if (!ui) {
        return false;
      }
      return flags.indexOf(ui) > -1;
    };

    const handleCancel = () => {
      loading.value = false;
      visible.value = false;
    };

    const handleOk = () => {
      loading.value = true;
      setTimeout(() => {
        ctx.emit("on-save", model.value);
        loading.value = false;
        visible.value = false;
      }, 1000);
    };

    const addOption = () => {
      if (!model.value.options) {
        model.value.options = [];
      }
      model.value.options.push("选项");
      console.log(model);
    };

    return {
      uiOptions,
      model,
      rules,
      visible,
      loading,
      addOption,
      showItem,
      handleCancel,
      handleOk,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
