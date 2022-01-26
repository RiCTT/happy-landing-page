import { reactive, toRefs, ref } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

export const useTable = () => {
  const columns = ref([
    {
      title: "落地页名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "落地页ID",
      dataIndex: "ID",
    },
    {
      title: "访问量",
      dataIndex: "visitor",
      sorter: (a, b) => a.visitor - b.visitor,
      sortDirections: ["descend"],
    },
    {
      title: "平均访问时长",
      dataIndex: "time",
    },
    {
      title: "最后更新时间",
      dataIndex: "updateTime",
    },
    {
      title: "状态",
      dataIndex: "status",
      customRender: ({ record }) => {
        const { status } = record;
        return <a-tag color={status || "pink"}>{status}</a-tag>;
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      customRender: ({ record }) => {
        const slots = {
          overlay: () => {
            return (
              <a-menu>
                <div>
                  <a-button type="link">预览</a-button>
                </div>
                <div>
                  <a-button type="link">删除</a-button>
                </div>
                <div>
                  <a-button type="link">下架</a-button>
                </div>
              </a-menu>
            );
          },
        };

        const gotoLandingItemPage = () => {
          router.push({
            name: "LandingItem",
            query: {
              ID: record.ID,
            },
          });
        };
        return (
          <div>
            <a-button type="link" onClick={gotoLandingItemPage}>
              编辑
            </a-button>
            <a-dropdown trigger={["click"]} v-slots={slots}>
              <a class="ant-dropdown-link">
                更多
                <DownOutlined />
              </a>
            </a-dropdown>
          </div>
        );
      },
    },
  ]);

  const router = useRouter();

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
