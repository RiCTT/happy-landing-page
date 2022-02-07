<template>
  <div class="props-form-wrapper">
    <a-tabs v-model:activeKey="activeKey" centered>
      <a-tab-pane key="1" tab="组件属性">
        <a-form
          :model="model"
          :rules="rules"
          layout="vertical"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <!-- form是object类型 -->
          <a-form-item
            v-for="(val, key) in form"
            :key="key"
            :label="val.label"
            :name="[key]"
            :class="`form-item-${val.ui}`"
          >
            <!-- 自定义加减的组件，应该是array类型 -->
            <template v-if="val.customAddAndSubtract">
              <div
                class="nested-form-item"
                v-for="(subItem, $index) in model[key]"
                :key="$index + 1"
              >
                <a-form-item
                  v-for="(subVal, subKey) in val.typeInterface"
                  :key="subKey"
                  :label="subVal.label + ($index + 1)"
                  :name="[key, $index, subKey]"
                  :rules="getNestedRules(subVal)"
                >
                  <a-input
                    v-if="subVal.ui === 'text'"
                    v-model:value="model[key][$index][subKey]"
                  />
                </a-form-item>
                <div class="nested-form-menu">
                  <a-button
                    type="text"
                    @click="addNewItem(model[key], $index, val.typeInterface)"
                    >添加</a-button
                  >
                  <a-button
                    type="text"
                    danger
                    @click="removeItem(model[key], $index, val.typeInterface)"
                    >删除</a-button
                  >
                </div>
              </div>
            </template>
            <a-input v-if="val.ui === 'text'" v-model:value="model[key]" />
            <a-switch v-if="val.ui === 'switch'" v-model:checked="model[key]" />
            <p v-if="!val.ui && !val.customAddAndSubtract">
              {{ val }}
            </p>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">保存</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="动画效果">动画效果</a-tab-pane>
      <a-tab-pane key="3" tab="其他">
        <PageForm @page-submit="$emit('page-submit', $event)" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import PageForm from "./page-form.vue";
import { formatPropsData } from "./utils";

export default defineComponent({
  components: {
    PageForm,
  },
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
        const result = formatPropsData(val, propsData);
        const rulesResult = {};
        Object.keys(val).forEach((key) => {
          const { required, validator } = val[key];
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

    const handlePageFormSubmit = (data) => {
      console.log("pageform");
      console.log(data);
    };

    const getNestedRules = (subItem) => {
      const rules: Array<RulesItem> = [];
      const { required, validator } = subItem;
      if (required) {
        rules.push({ required: true, message: "不能为空" });
      }
      if (validator) {
        rules.push({ validator });
      }
      return rules;
    };

    const addNewItem = (model, index) => {
      model.splice(index + 1, 0, {});
    };

    const removeItem = (model, index) => {
      model.splice(index, 1);
    };

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
      handlePageFormSubmit,
      getNestedRules,
      addNewItem,
      removeItem,
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

.form-item-switch {
  text-align: left;
}

.nested-form-item {
  padding-left: 10px;
}
</style>
