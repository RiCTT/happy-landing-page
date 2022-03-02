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
            v-for="(val, key) in pageStore.currentSelectProps"
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
                  >
                    添加
                  </a-button>
                  <a-button
                    type="text"
                    danger
                    @click="removeItem(model[key], $index, val.typeInterface)"
                  >
                    删除
                  </a-button>
                </div>
              </div>
            </template>
            <!-- 表单控件 -->
            <template v-if="val.isFormControl">
              <div v-if="model[key]" class="field-wrapper">
                <div
                  v-for="field in model[key]"
                  class="field-item"
                  :key="field.key"
                >
                  <minus-circle-filled
                    :style="{ fontSize: '18px', cursor: 'pointer' }"
                  />
                  <span class="field-item-label">{{ field.label }}</span>
                  <arrow-up-outlined
                    :style="{
                      fontSize: '18px',
                      marginRight: '10px',
                      cursor: 'pointer',
                    }"
                  />
                  <edit-filled
                    @click="onClikEditIcon(field)"
                    :style="{ fontSize: '18px', cursor: 'pointer' }"
                  />
                </div>
                <div>
                  <a-button round block @click="addFormField">添加</a-button>
                </div>
              </div>
            </template>
            <a-input
              v-if="val.ui === 'text'"
              v-model:value="model[key]"
              :addon-after="val.unit"
            />
            <a-switch v-if="val.ui === 'switch'" v-model:checked="model[key]" />
            <!-- <input
              v-if="val.ui === 'colorPicker'"
              type="color"
              v-model="model[key]"
              :key="key"
            /> -->
            <a-select
              v-if="val.ui === 'select'"
              v-model:value="model[key]"
              style="width: 120px"
            >
              <a-select-option
                v-for="op in val.options"
                :value="op.value"
                :key="op.value"
              >
                {{ op.label }}
              </a-select-option>
            </a-select>
            <HappyColorPicker
              v-if="val.ui === 'colorPicker'"
              v-model="model[key]"
            />
            <HappyPaddingBox
              v-if="val.ui === 'padding-box'"
              v-model="model[key]"
            />
            <HappyUpload v-if="val.ui === 'upload'" v-model="model[key]" />
            <HappyRichText
              v-if="val.ui === 'richtext'"
              v-model="model[key]"
              :key="key"
            />
            <!-- <p v-if="!val.ui && !val.customAddAndSubtract">
              {{ val }}
            </p> -->
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

    <FieldsModalForm
      v-model="modalVisible"
      :field="currentField"
      @on-save="handleFieldsModalFormSave"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import PageForm from "./page-form.vue";
import FieldsModalForm from "./fields-modal-form.vue";
import { formatPropsData } from "./utils";
import {
  MinusCircleFilled,
  ArrowUpOutlined,
  EditFilled,
} from "@ant-design/icons-vue";
import { usePageStore } from "@/store/page";
import HappyUpload from "@/components/happy-upload/index.vue";
import HappyRichText from "@/components/happy-rich-text/index.vue";
import HappyPaddingBox from "@/components/happy-padding-box/index.vue";
import HappyColorPicker from "@/components/happy-color-picker/index.vue";

export default defineComponent({
  components: {
    PageForm,
    FieldsModalForm,
    MinusCircleFilled,
    ArrowUpOutlined,
    EditFilled,
    HappyUpload,
    HappyRichText,
    HappyPaddingBox,
    HappyColorPicker,
  },
  props: {},
  setup(props, ctx) {
    const pageStore = usePageStore();
    const activeKey = ref("1");
    const model: any = ref({});
    const rules = ref({});
    const modalVisible = ref(false);
    const currentField = ref({});

    watch(
      () => pageStore.currentSelectProps,
      (val = {}) => {
        const propsData: any = pageStore.currentSelectPropsData;
        const result = formatPropsData(val, propsData);
        const rulesResult = {};
        Object.keys(val).forEach((key) => {
          const { required, validator } = val[key];
          rulesResult[key] = [];
          if (required) {
            rulesResult[key].push({ required: true, message: "不能为空" });
          }
          if (validator) {
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

    const getNestedRules = (subItem) => {
      // eslint-disable-next-line no-undef
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

    const onClikEditIcon = (field) => {
      if (!field.id) {
        field.id = Date.now();
      }
      currentField.value = { ...field };
      modalVisible.value = true;
    };

    const addFormField = () => {
      currentField.value = {};
      modalVisible.value = true;
    };

    const handleFieldsModalFormSave = (data) => {
      console.log("model");
      const fields = model.value.fields;
      const { id } = data;
      if (!id) {
        model.value.fields.push({ id: Date.now(), ...data });
      } else {
        const index = fields.findIndex(
          (e) => e.id && Number(e.id) === Number(id)
        );
        if (index !== -1) {
          model.value.fields.splice(index, 1, { ...fields[index], ...data });
        }
      }
      console.log(model.value);
    };

    return {
      pageStore,
      model,
      rules,
      activeKey,
      modalVisible,
      currentField,
      getNestedRules,
      addNewItem,
      removeItem,
      onClikEditIcon,
      handleFieldsModalFormSave,
      addFormField,
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
  max-width: 500px;
  min-width: 400px;
  height: 100%;
  min-height: 667px;
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

.field-wrapper {
  padding: 0 10px;
  .field-item {
    display: flex;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid #f2f2f2;

    .field-item-label {
      padding: 0 20px;
      flex: 1;
      text-align: left;
      font-size: 16px;
    }
  }
}
</style>
