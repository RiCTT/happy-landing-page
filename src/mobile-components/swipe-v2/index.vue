<template>
  <van-swipe v-bind="$attrs" style="height: 100%">
    <van-swipe-item v-for="(image, i) in imageList" :key="i">
      <img style="height: 100%" v-if="image.src" :src="image.src" />
      <span v-if="image.text">{{ image.text || "" }}</span>
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

interface ImageItem {
  src?: string;
  text?: string;
  redirectUrl?: string;
}

const staticImageList = [
  { src: "https://img.yzcdn.cn/vant/apple-1.jpg" },
  { src: "https://img.yzcdn.cn/vant/apple-2.jpg" },
];

export default defineComponent({
  name: "van-swipe-v2",
  props: {
    images: {
      type: Array as PropType<ImageItem[]>,
      default: () => [],
    },
  },
  setup(props) {
    const imageList = computed(() => {
      if (!props.images || props.images.length === 0) {
        return staticImageList;
      }
      return props.images;
    });
    return { imageList };
  },
});
</script>

<style lang="stylus" scoped></style>
