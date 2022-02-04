<template>
  <div class="landing-item-wrapper">
    <ComponentList @add-component="handleAddComponent" />
    <PreviewWrapper
      ref="prefviewWrp"
      :configList="configList"
      @config-change="handleConfigChange"
      @config-select="handleConfigSelect"
    />
    <PropsForm
      :form="currentProps"
      :data="currentPropsData"
      @data-change="handleDataChange"
      @submit="handleSaveSubmit"
    />
  </div>
</template>

<script lang="ts">
import ComponentList from "./component-list/index.vue";
import PreviewWrapper from "./preview-wrapper/index.vue";
import PropsForm from "./props-form/index.vue";
import { defineComponent, ref, computed } from "vue";
import { message } from "ant-design-vue";
import { getPageList, setPageList } from "./utils";
import { useRoute, useRouter } from "vue-router";
import { BasicComponents } from "./component-list/data";

export default defineComponent({
  components: {
    ComponentList,
    PropsForm,
    PreviewWrapper,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const pageId = computed(() => route.query.id);

    const currentProps = ref({});
    const currentPropsData = ref({});

    const prefviewWrp = ref();
    const configList: any = ref([
      // {
      //   id: 11111,
      //   name: "van-divider",
      //   data: {
      //     dashed: true,
      //   },
      // },
      // {
      //   id: 2222,
      //   name: "van-swipe-v2",
      //   data: {
      //     autoplay: 3000,
      //     images: [
      //       {
      //         src: "https://img.yzcdn.cn/vant/apple-1.jpg",
      //       },
      //       {
      //         src: "https://tse1-mm.cn.bing.net/th/id/R-C.a84831186bddfe9b44ca645f0a8c021b?rik=mVmIauj3YmAFmA&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi3%2f291799040%2fTB2WvkEEER1BeNjy0FmXXb0wVXa_!!291799040-0-item_pic.jpg&ehk=rTrMzjXT9yEy8ElfC5OjPXscZ35Sk93tYB5iNxWbWSI%3d&risl=&pid=ImgRaw&r=0",
      //       },
      //     ],
      //   },
      //   style: {
      //     height: "200px",
      //   },
      // },
      // {
      //   id: 123,
      //   name: "van-button",
      //   data: {
      //     text: "按钮",
      //   },
      //   style: {
      //     left: "10px",
      //     top: "100px",
      //   },
      // },
      // {
      //   id: 456,
      //   name: "van-image",
      //   data: {
      //     src: "https://image.huanghepiao.com/images/upload/20191224/15771484951260.jpg",
      //   },
      //   style: {
      //     left: "100px",
      //     top: "200px",
      //   },
      // },
      // {
      //   id: 789,
      //   name: "van-image",
      //   data: {
      //     src: "https://tse1-mm.cn.bing.net/th/id/R-C.a84831186bddfe9b44ca645f0a8c021b?rik=mVmIauj3YmAFmA&riu=http%3a%2f%2fimgx.xiawu.com%2fxzimg%2fi3%2f291799040%2fTB2WvkEEER1BeNjy0FmXXb0wVXa_!!291799040-0-item_pic.jpg&ehk=rTrMzjXT9yEy8ElfC5OjPXscZ35Sk93tYB5iNxWbWSI%3d&risl=&pid=ImgRaw&r=0",
      //   },
      //   style: {
      //     left: "210px",
      //     top: "140px",
      //   },
      // },
    ]);

    const handleSaveSubmit = () => {
      const list = getPageList();
      if (!pageId.value) {
        const id = Date.now();
        const page = {
          id,
          configList: [...configList.value],
        };
        list.push(page);
        setPageList(list);
        setTimeout(() => {
          router.go(-1);
        }, 300);
      } else {
        const index = list.findIndex((e) => String(e.id) === pageId.value);
        const data = list[index];
        data.configList = configList.value;
        setPageList(list);
      }
      message.info("保存成功");
    };

    const handleConfigChange = (data) => {
      configList.value = [...data];
    };

    // 赋值到对应的组件data上
    const handleDataChange = (data) => {
      const index = prefviewWrp.value.getCurrentIndex();
      const currentComp = configList.value[index];
      const oldData = currentComp.data;
      currentComp.data = Object.assign(oldData, data);
    };

    const handleAddComponent = (comp) => {
      console.log(comp);
      let data = initComponentDefaultValue(comp);
      message.info("添加成功!");
      configList.value.push(data);
    };

    const handleConfigSelect = (config) => {
      const { data, name } = config;
      const targetComp: any = BasicComponents.find((e) => e.name === name);
      const { props } = targetComp;
      currentProps.value = props;
      currentPropsData.value = data;
    };

    const initComponentDefaultValue = (comp) => {
      const id = Date.now();
      const { name } = comp;
      const result = { id, ...comp };
      if (!result.style) {
        result.style = {};
      }
      if (!result.data) {
        result.data = {};
      }
      if (name === "van-button") {
        result.data.text = "按钮";
      }
      if (name === "van-swipe-v2") {
        result.style.height = "200px";
      }
      result.style.left = "0";
      // result.style.top = "50%";
      result.style.top = "0";
      // result.style.transform = "translateY(-50%)";
      result.style.zIndex = configList.value.length + 11;
      return result;
    };

    if (pageId.value) {
      const pageList = getPageList();
      const data = pageList.find((e) => String(e.id) === pageId.value);
      if (data) {
        console.log(data);
        console.log("find");
        const { configList: result } = data;
        configList.value = result;
      }
    }

    return {
      configList,
      currentProps,
      currentPropsData,
      prefviewWrp,
      handleSaveSubmit,
      handleDataChange,
      handleConfigSelect,
      handleConfigChange,
      handleAddComponent,
    };
  },
});
</script>

<style lang="stylus" scoped>
.landing-item-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  height: calc(100vh - 80px);
}
</style>
