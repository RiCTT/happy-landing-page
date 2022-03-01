import { ref, watch } from "vue";

interface Params {
  props: any;
  ctx: any;
  valueKey?: string;
  propsKey: string;
}

export default function useModelValue({
  props,
  ctx,
  valueKey = "value",
  propsKey = "modelValue",
}: Params) {
  const state = ref(props[propsKey]);

  watch(
    () => props[propsKey],
    (val) => {
      state.value = val;
    },
    {
      immediate: true,
    }
  );

  watch(
    () => state.value,
    (val) => {
      ctx.emit("update:modelValue", val);
    }
  );

  return {
    [valueKey]: state,
  };
}
