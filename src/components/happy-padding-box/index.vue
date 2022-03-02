<template>
  <div class="input-list-wrap">
    <a-input
      v-model:value="top"
      addon-before="上间距"
      @change="onInputChange"
    />
    <span class="wrap-item-space"></span>
    <a-input
      v-model:value="bottom"
      addon-before="下间距"
      @change="onInputChange"
    />
  </div>
  <div class="input-list-wrap">
    <a-input
      v-model:value="left"
      addon-before="左间距"
      @change="onInputChange"
    />
    <span class="wrap-item-space"></span>
    <a-input
      v-model:value="right"
      addon-before="右间距"
      @change="onInputChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const state = reactive({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    });

    watch(
      () => props.modelValue,
      (val) => {
        const paddings = val.split(" ");
        state.top = parseInt(paddings[0]) || 0;
        state.right = parseInt(paddings[1]) || 0;
        state.bottom = parseInt(paddings[2]) || 0;
        state.left = parseInt(paddings[3]) || 0;
      },
      {
        immediate: true,
      }
    );

    const onInputChange = () => {
      const { top, left, right, bottom } = state;
      const result = `${top}px ${right || 0}px ${bottom || 0}px ${left || 0}px`;
      ctx.emit("update:modelValue", result);
    };

    return {
      ...toRefs(state),
      onInputChange,
    };
  },
});
</script>

<style lang="stylus" scoped>
.input-list-wrap {
  display: flex;
  margin-bottom: 10px;
  .wrap-item-space {
    width: 20px;
  }
}
</style>
