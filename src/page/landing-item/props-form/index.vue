<template>
  <div class="props-form-wrapper">
    <a-tabs v-model:activeKey="activeKey" centered>
      <a-tab-pane key="1" tab="组件属性">
        <a-form
          v-if="form"
          :model="model"
          :rules="rules"
          layout="vertical"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            v-for="(val, key) in form"
            :key="key"
            :label="val.label"
            :name="key"
          >
            <a-input v-if="val.ui === 'text'" v-model:value="model[key]" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">保存</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="动画效果">动画效果</a-tab-pane>
      <a-tab-pane key="3" tab="其他">其他</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    form: {
      type: Object,
    },
    data: {
      type: Object,
    },
  },
  setup(props, ctx) {
    const activeKey = ref("1");
    const model = ref({});
    const rules = ref({});

    watch(
      () => props.form,
      (val = {}) => {
        const propsData: any = props.data;
        const result = {};
        const rulesResult = {};
        Object.keys(val).forEach((key) => {
          const { default: initValue, required, validator } = val[key];
          result[key] = propsData[key] || initValue || "";
          rulesResult[key] = [];
          if (required) {
            rulesResult[key].push({ required: true, message: "不能为空" });
          }
          if (validator) {
            console.log("typeof validao");
            console.log(typeof validator);
            console.log(validator);
            rulesResult[key].push({ validator });
          }
        });
        rules.value = rulesResult;
        model.value = result;
      }
    );

    watch(
      model,
      (e) => {
        console.log("model change");
        console.log(e);
        ctx.emit("data-change", e);
      },
      { deep: true }
    );

    const onFinish = (value) => {
      console.log(value);
      ctx.emit("submit", value);
    };

    const onFinishFailed = ({ values, errorFields }) => {
      console.log("value fail");
      console.log(values);
      console.log("errorFields");
      console.log(errorFields);
      console.log("error");
    };

    return {
      model,
      rules,
      activeKey,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>

<style lang="stylus" scoped>
@import "~@/style/variables.styl"

.props-form-wrapper {
  width: 30%;
  max-width: 400px;
  min-width: 300px;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px;
  overflow: auto;
  scrollBar();
}
</style>
