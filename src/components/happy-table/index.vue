<template>
  <div class="happy-table">
    <a-spin :spinning="table.loading">
      <!-- 查询条件 -->
      <div class="happy-querylist">
        <QueryForm
          v-bind="$attrs"
          v-model:form="queryListModel"
          :queryList="queryList"
          @query="emitSearch"
        />
      </div>
      <div class="before-table-header">
        <slot name="table-button" />
      </div>
      <!-- 查询表格 -->
      <div class="happy-table-data">
        <a-table
          v-bind="attrs"
          :dataSource="tableData"
          :columns="columns"
          :pagination="false"
          :size="size"
        />
      </div>
      <!-- 查询分页 -->
      <div class="happy-pagination">
        <a-pagination
          v-model:current="queryListModel.pageIndex"
          v-model:pageSize="queryListModel.pageSize"
          :total="table.total"
          show-size-changer
          @change="onPaginationChange"
          @showSizeChange="onShowSizeChange"
        />
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import QueryForm from "./query-form.vue";

export default defineComponent({
  emits: ["update:queryModel", "search"],
  components: {
    QueryForm,
  },
  props: {
    queryList: Array,
    queryModel: Object,
    size: {
      type: String,
      // default | middle | small
      default: "default",
    },
    table: {
      type: Object,
      default: () => null,
    },
    page: Object,
  },
  setup(props, context) {
    const tableData = computed(() => {
      return props.table.data;
    });

    const columns = computed(() => {
      return props.table.columns;
    });

    const attrs = computed(() => {
      const { attrs } = context;
      const { bordered = true, ...rest } = attrs;
      return {
        bordered,
        ...rest,
      };
    });

    const queryListModel = ref(props.queryModel);

    watch(
      queryListModel,
      (val) => {
        console.log("val change!");
        console.log(val);
        context.emit("update:queryModel", val);
      },
      { deep: true }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onPaginationChange = (page, pageSize) => {
      emitSearch(queryListModel);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onShowSizeChange = (page, pageSize) => {
      emitSearch(queryListModel);
    };

    const emitSearch = (ops) => {
      context.emit("search", ops);
    };

    return {
      tableData,
      columns,
      attrs,
      queryListModel,
      emitSearch,
      onPaginationChange,
      onShowSizeChange,
    };
  },
});
</script>

<style lang="stylus" scoped>
.happy-table {
  padding: 20px 15px;
  border-radius: 10px;
  background-color: #fff;
  margin: 10px 0;
}

.happy-pagination {
  text-align: right;
  margin: 10px 0;
}

.before-table-header {
  text-align: right;
  margin-bottom: 10px;

  >>> .ant-btn {
    margin-right: 10px;
    &::last-child {
      margin-right: 0;
    }
  }
}
</style>
