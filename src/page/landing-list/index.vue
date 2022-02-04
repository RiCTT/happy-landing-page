<template>
  <div class="landing-list">
    <HappyTable
      v-model:queryModel="queryModel"
      :table="table"
      :queryList="queryList"
      size="middle"
      @search="onQuery"
    >
      <template v-slot:table-button>
        <a-button type="primary" @click="goToCreate">新增</a-button>
      </template>
    </HappyTable>
  </div>
</template>

<script lang="tsx">
import HappyTable from "@/components/happy-table/index.vue";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useTable } from "./hooks/useTable.js";
import { useQuery } from "./hooks/useQuery.js";
import { getPageList } from "../landing-item/utils";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    HappyTable,
  },
  setup() {
    const { table, setState } = useTable();
    const { queryList } = useQuery();
    const queryModel = ref({ pageIndex: 1, pageSize: 10 });
    const router = useRouter();

    const state = reactive({
      bordered: false,
    });

    onMounted(() => {
      onQuery();
    });

    const onQuery = () => {
      console.log(queryModel.value);
      console.log(getPageList());
      console.log("getPageList");
      setState("loading", true);
      setTimeout(() => {
        const data = getPageList().map((e, i) => {
          return {
            ...e,
            visitor: Math.round(Math.random() * 100000),
            key: i + 1 + "S",
            name: "胡彦斌" + i + "号",
            time: Math.round(Math.random() * 100),
            updateTime: new Date().toLocaleDateString(),
            age: i + Math.random() * 10,
            status: Math.random() > 0.5 ? "pink" : "blue",
            address: "西湖区湖底公园1号" + i,
          };
        });
        setState("data", data);
        setState("total", 1200);
        setState("loading", false);
      }, 1500);
    };

    const goToCreate = () => {
      router.push({
        name: "LandingItem",
      });
    };

    return {
      state,
      table,
      queryModel,
      queryList,
      onQuery,
      goToCreate,
    };
  },
});
</script>

<style lang="stylus" scoped>
.landing-list {
  padding: 20px 30px;
}
</style>
