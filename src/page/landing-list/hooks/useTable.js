import { reactive, toRefs, ref } from "vue";

export const useTable = () => {
  const columns = ref([
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
      customRender: ({ record }) => {
        const { address } = record;
        return <div>{address}</div>;
      },
    },
  ]);

  const data = ref();

  const state = reactive({});

  const table = ref({
    columns: columns.value,
    data: data.value,
    loading: false,
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  });

  const setState = (key, data) => {
    table.value[key] = data;
  };

  return {
    table,
    setState,
    ...toRefs(state),
  };
};
