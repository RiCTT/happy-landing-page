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
    </template>
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

    const getFieldAttrs = (field) => {
      const { ui, label, key, placeholder, required } = field;
      const attrs: any = { label, key, ui, placeholder, required };
      if (ui === "password") {
        attrs.type = "password";
      }
      attrs.rules = getFieldRules(field);

      return attrs;
    };

    const getFieldRules = (field) => {
      const { required, validator } = field;
      // eslint-disable-next-line no-undef
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
      onSubmit,
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
