<template>
  <van-form @submit="onSubmit">
    <template v-for="field in fields" :key="field.key">
      <van-field
        v-if="field.ui === 'text'"
        :label="field.label"
        :key="field.ui"
        v-model="model[field.key]"
        :required="field.required"
        :rules="getFieldRules(field)"
        :placeholder="field.placeholder"
      ></van-field>
      <van-field
        v-if="field.ui === 'password'"
        type="password"
        :key="field.ui"
        :label="field.label"
        :required="field.required"
        v-model="model[field.key]"
        :rules="getFieldRules(field)"
        :placeholder="field.placeholder"
      ></van-field>
      <van-field
        v-if="field.ui === 'checkbox'"
        :label="field.label"
        :key="field.ui"
        :required="field.required"
        :rules="getFieldRules(field)"
      >
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
        name="radio"
        :rules="getFieldRules(field)"
        :required="field.required"
        :label="field.label"
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

    const getFieldRules = (field) => {
      const { required, validator } = field;
      const rules: Array<RulesItem> = [];
      if (required) {
        rules.push({ required: true, message: "不能为空" });
      }
      if (validator) {
        rules.push({ validator });
      }
      console.log(rules);
      return rules;
    };
    return {
      model,
      onSubmit,
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
