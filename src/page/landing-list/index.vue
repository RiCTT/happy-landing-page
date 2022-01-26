<template>
  <div class="landing-list">
    <HappyTable
      v-model:queryModel="queryModel"
      :table="table"
      :queryList="queryList"
      size="middle"
      @search="onQuery"
    />
  </div>
</template>

<script lang="tsx">
import HappyTable from "@/components/happy-table/index.vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useTable } from "./hooks/useTable.js";
import { useQuery } from "./hooks/useQuery.js";

export default defineComponent({
  components: {
    HappyTable,
  },
  setup() {
    const { table, setState } = useTable();
    const { queryList } = useQuery();
    const queryModel = ref({ pageIndex: 1, pageSize: 10 });

    const state = reactive({
      bordered: false,
    });

    onMounted(() => {
      onQuery();
    });

    const onQuery = () => {
      console.log(queryModel.value);
      setState("loading", true);
      setTimeout(() => {
        const len = Math.round(Math.random() * 10);
        const total = Math.round(Math.random() * 120);
        const data: any[] = [];
        for (let i = 0; i < len; i++) {
          data.push({
            key: i + 1 + "S",
            ID: Math.random().toString(),
            visitor: Math.round(Math.random() * 100000),
            name: "胡彦斌" + i + "号",
            time: Math.round(Math.random() * 100),
            updateTime: new Date().toLocaleDateString(),
            age: i + Math.random() * 10,
            status: Math.random() > 0.5 ? "pink" : "blue",
            address: "西湖区湖底公园1号" + i,
          });
        }
        setState("data", data);
        setState("total", total);
        setState("loading", false);
      }, 1500);
    };

    return {
      state,
      table,
      queryModel,
      onQuery,
      queryList,
    };
  },
});
</script>

<style lang="stylus" scoped>
.landing-list {
  padding: 20px 30px;
}
</style>
