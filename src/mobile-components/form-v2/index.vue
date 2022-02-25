<template>
  <van-form @submit="onSubmit">
    <template v-for="field in fields" :key="field.key">
      <van-field
        v-if="field.ui === 'text'"
        v-bind="getFieldAttrs(field)"
        v-model="model[field.key]"
      ></van-field>
      <van-field
        v-if="field.ui === 'password'"
        type="password"
        v-bind="getFieldAttrs(field)"
        v-model="model[field.key]"
      ></van-field>
      <van-field v-if="field.ui === 'checkbox'" v-bind="getFieldAttrs(field)">
        <template #input>
          <van-checkbox-group v-model="model[field.key]" direction="horizontal">
            <template v-if="field.options">
              <van-checkbox
                v-for="(op, i) in field.options"
                :key="i"
                :name="op"
              >
                {{ op }}
              </van-checkbox>
            </template>
          </van-checkbox-group>
        </template>
      </van-field>
      <van-field
        v-if="field.ui === 'radio'"
        v-bind="getFieldAttrs(field)"
        name="radio"
      >
        <template #input>
          <van-radio-group v-model="model[field.key]" direction="horizontal">
            <template v-if="field.options">
              <van-radio v-for="(op, i) in field.options" :name="op" :key="i">
                {{ op }}
              </van-radio>
            </template>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-if="field.ui === 'select'"
        v-model="model[field.key]"
        v-bind="getFieldAttrs(field)"
        @click="onSelectFieldClick(field)"
      ></van-field>
    </template>

    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="pickerColumns"
        @confirm="onPickerConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>

    <div style="padding: 16px">
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
    const showPicker = ref(false);
    const pickerColumns = ref([]);
    const currentPickerField = ref("");
    const onSubmit = () => {
      console.log("submit", model.value);
    };
    const onPickerConfirm = (value) => {
      console.log(currentPickerField.value);
      model.value[currentPickerField.value] = value;
      showPicker.value = false;
    };
    const onSelectFieldClick = (field) => {
      const { options, key } = field;
      currentPickerField.value = key;
      pickerColumns.value = options;
      showPicker.value = true;
    };

    const getFieldAttrs = (field) => {
      const { ui, label, key, placeholder, required } = field;
      const attrs: any = { label, key, ui, placeholder, required };
      if (ui === "password") {
        attrs.type = "password";
      }
      if (ui === "select") {
        attrs.name = "picker";
        attrs.readonly = true;
      }
      attrs.rules = getFieldRules(field);

      return attrs;
    };

    const getFieldRules = (field) => {
      const { required, validator } = field;
      const rules: Array<RulesItem> = [];
      if (required) {
        rules.push({ required: true, message: "不能为空" });
      }
      if (validator) {
        rules.push({ validator });
      }
      return rules;
    };
    return {
      model,
      showPicker,
      pickerColumns,
      currentPickerField,
      onSubmit,
      onPickerConfirm,
      onSelectFieldClick,
      getFieldAttrs,
      getFieldRules,
    };
  },
});
</script>

<style lang="stylus" scoped>
>>> .van-checkbox--horizontal {
  margin-bottom: 8px;
}
</style>
