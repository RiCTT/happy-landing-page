import { reactive, toRefs, ref } from "vue";
export const useQuery = () => {
  const queryList = ref([
    {
      label: "发布时间",
      type: "datePicker",
      key: "name",
    },
    {
      label: "状态",
      type: "select",
      key: "psd",
      options: [
        { value: 1, label: "未发布" },
        { value: 2, label: "已发布" },
        { value: 3, label: "已结束" },
      ],
    },
    {
      label: "落地页ID",
      type: "text",
      key: "gender",
    },
  ]);
  const data = reactive({});

  return {
    ...toRefs(data),
    queryList,
  };
};
