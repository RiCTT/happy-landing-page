<template>
  <a-form
    :model="model"
    name="basic"
    autocomplete="off"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-row>
      <a-col
        v-for="queryItem in queryList"
        :key="queryItem.key"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        :xl="6"
      >
        <a-form-item :label="queryItem.label" :name="queryItem.name">
          <!-- 普通输入文本框 -->
          <a-input
            v-if="queryItem.type === 'text'"
            v-model:value="model[queryItem.key]"
          />

          <!-- 输入密码框 -->
          <a-input-password
            v-if="queryItem.type === 'password'"
            v-model:value="model[queryItem.key]"
          />
          <!-- 单选框 -->
          <a-checkbox
            v-if="queryItem.type === 'checkbox'"
            v-model:checked="model[queryItem.key]"
          ></a-checkbox>

          <!-- 下拉单选 -->
          <a-select
            v-if="queryItem.type === 'select'"
            v-model:value="model[queryItem.key]"
            style="width: 100%"
            :placeholder="queryItem.placeholder"
            :options="queryItem.options"
          ></a-select>

          <a-range-picker
            v-if="queryItem.type === 'datePicker'"
            v-model:value="model[queryItem.key]"
          />

          <!-- 多选框 -->
          <a-checkbox-group
            v-if="queryItem.type === 'checkboxGroup'"
            v-model:value="model[queryItem.key]"
            style="width: 100%"
          >
            <a-checkbox
              v-for="op in queryItem.options"
              :key="op.value"
              :value="op.value"
            >
              {{ op.label }}
            </a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>

  <div class="btns-wrapper">
    <a-button type="primary" @click="onQuery">查询</a-button>
    <a-button style="margin: 0 10px 10px 10px" @click="onReset">重置</a-button>
    <a-button type="primary" ghost @click="onExport">导出</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  emits: ["query", "reset", "export", "update:form"],
  props: {
    queryList: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const model = ref(props.form);
    const initModel = { ...model.value };

    watch(
      model,
      (val) => {
        context.emit("update:form", val);
      },
      { deep: true }
    );

    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const onQuery = () => {
      context.emit("query", model.value);
    };

    const onReset = () => {
      model.value = { ...initModel };
      context.emit("update:form", {});
      context.emit("reset");
    };

    const onExport = () => {
      context.emit("export");
    };

    return {
      model,
      onQuery,
      onReset,
      onExport,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
