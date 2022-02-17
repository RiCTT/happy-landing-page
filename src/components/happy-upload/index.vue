<template>
  <a-spin :spinning="spinning">
    <a-input v-model:value="src" v-bind="$attrs">
      <template #addonAfter>
        <span style="cursor: pointer" @click="onClickuploadFile">上传图片</span>
        <input
          id="uploadFileInput"
          type="file"
          style="display: none"
          @change="onUploadChange"
        />
      </template>
    </a-input>
    <a-button type="primary" style="margin: 10px 0" @click="listVisible = true">
      图片列表
    </a-button>
  </a-spin>
  <ImgList v-model="listVisible" @on-select="onSelectImage" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import axios from "axios";
import { message } from "ant-design-vue";
import ImgList from "./img-list.vue";
import { getUploadToken } from "@/api/file";
import { fileHost, uploadHost } from "@/config";

/**
 * 组件设计
 * 1、支持直接粘贴、填写图片链接
 * 2、支持上传图片
 * 3、有个图片预览列表，支持选择某张图片
 */

let inputEl: HTMLElement;
export default defineComponent({
  components: {
    ImgList,
  },
  props: {
    modelValue: {
      type: String,
    },
  },
  setup(props, ctx) {
    const src = ref(props.modelValue);
    const spinning = ref(false);
    const listVisible = ref(false);
    const fileList = ref([]);

    watch(
      () => props.modelValue,
      (val) => {
        src.value = val;
      }
    );

    watch(src, (val) => {
      ctx.emit("update:modelValue", val);
    });

    const onClickuploadFile = () => {
      inputEl = document.querySelector("#uploadFileInput") as HTMLElement;
      inputEl?.click();
    };

    const onUploadChange = (e) => {
      const files = e.target.files;
      const file = files[0];
      spinning.value = true;
      new Promise((resolve, reject) => {
        getUploadToken().then((res) => {
          const token: any = res;
          if (!token) {
            reject();
            return message.error("token获取失败");
          }
          const formData = new FormData();
          formData.append("file", file);
          formData.append("fileName", file.name);
          formData.append("token", token);
          axios
            .post(uploadHost, formData)
            .then((res) => {
              if (res.status === 200) {
                const data = res.data;
                const key = data.key;
                src.value = fileHost + "/" + key;
                message.info("上传成功");
              } else {
                message.error("上传失败");
              }
            })
            .finally(() => {
              resolve("");
            });
        });
      }).finally(() => {
        spinning.value = false;
      });
    };

    const onSelectImage = (val) => {
      src.value = val;
    };

    return {
      src,
      spinning,
      fileList,
      listVisible,
      onClickuploadFile,
      onUploadChange,
      onSelectImage,
    };
  },
});
</script>

<style lang="stylus" scoped></style>
