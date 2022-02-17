<template>
  <a-modal
    v-model:visible="listVisible"
    title="图片列表"
    :width="800"
    :maskClosable="false"
    :keyboard="false"
  >
    <template #footer>
      <a-button key="back" @click="listVisible = false">Return</a-button>
      <a-button key="submit" type="primary">Submit</a-button>
    </template>
    <div class="img-list-wrapper">
      <div class="img-list">
        <div
          class="img-item"
          v-for="item in fileList"
          :key="item.key"
          @click="onClickImg(item)"
        >
          <img :src="item.src" alt="" width="200" />
        </div>
      </div>
      <div class="list-pagination">
        <a-button
          type="primary"
          :disabled="!lastMarker"
          @click="getFiles(lastMarker)"
        >
          上一页
        </a-button>
        <a-button
          type="primary"
          :disabled="!nextMarker"
          style="margin-left: 10px"
          @click="getFiles(nextMarker)"
        >
          下一页
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, toRefs, onMounted } from "vue";
import { getFileList } from "@/api/file";
import { fileHost } from "@/config";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      listVisible: props.modelValue,
      fileList: [],
      lastMarker: "",
      nextMarker: "",
    });

    onMounted(() => {
      getFiles();
    });

    const getFiles = () => {
      getFileList({
        marker: state.nextMarker,
      }).then((res: any) => {
        console.log(res);
        if (!res) return;
        state.lastMarker = state.nextMarker;
        state.nextMarker = res ? res.marker : "";
        const items = res ? res.items : [];
        state.fileList = items.map((e) => {
          return {
            ...e,
            src: fileHost + "/" + e.key,
          };
        });
      });
    };

    const onClickImg = (img) => {
      const { src } = img;
      ctx.emit("on-select", src);
      state.listVisible = false;
    };

    watch(
      () => props.modelValue,
      (val) => {
        state.listVisible = val;
      }
    );

    watch(
      () => state.listVisible,
      (val) => {
        ctx.emit("update:modelValue", val);
      }
    );
    return {
      ...toRefs(state),
      getFiles,
      onClickImg,
    };
  },
});
</script>

<style lang="stylus" scoped>
.img-list-wrapper {
  padding: 10px 15px;
}

.list-pagination {
  text-align: right;
}

.img-list {
  display: flex;
  flex-wrap: wrap;

  .img-item {
    width: 130px;
    height: 150px;
    margin-bottom: 10px;
    margin-right: 14px;
    overflow: hidden;
    border-radius: 10px;
    background-color: #f2f2f2;
    cursor: pointer;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
