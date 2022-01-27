<template>
  <div class="happy-preview-wrapper">
    <div
      class="config-item"
      v-for="(item, i) in configList"
      :key="item.name"
      @click="onConfigItemClick(item, i, $event)"
      @mousedown="onConfigItemMouseDown"
      @mousemove="onConfigItemMouseMove"
    >
      <component
        :is="item.name"
        width="100%"
        height="100%"
        style="pointer-events: none; user-select: none"
        v-bind="item.data"
      />
    </div>
    <!-- <div class="config-item-mask" :style="maskStyle"></div> -->
  </div>
</template>

<script lang="ts">
// 该组件用来展示页面组件列表，如涉及样式处理，可在外层或者穿透
import { defineComponent, ref } from "vue";

const createMeta = () => {
  const meta = document.createElement("meta");
  meta.setAttribute("name", "viewport");
  meta.setAttribute(
    "content",
    "maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"
  );

  document.querySelector("head")?.appendChild(meta);
};

createMeta();

export default defineComponent({
  props: {
    configList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const maskStyle = ref({});
    const mouseState = ref({
      dragging: false,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
    });

    const onConfigItemClick = (config, index, e) => {
      const currentTarget = e.currentTarget;
      const offsetTop = currentTarget.offsetTop;
      const offsetHeight = currentTarget.offsetHeight;

      maskStyle.value = {
        top: offsetTop + "px",
        height: offsetHeight + "px",
      };
    };

    const onConfigItemMouseDown = (e) => {
      const { clientX, clientY } = e;
      const target = e.currentTarget;
      const offsetX = Number(target.getAttribute("offsetX"));
      const offsetY = Number(target.getAttribute("offsetY"));
      mouseState.value.startX = clientX;
      mouseState.value.startY = clientY;
      mouseState.value.offsetX = offsetX;
      mouseState.value.offsetY = offsetY;
      mouseState.value.dragging = true;
    };

    const onConfigItemMouseMove = (e) => {
      if (!mouseState.value.dragging) {
        return;
      }
      const { clientX, clientY } = e;
      const { startX, startY, offsetX, offsetY } = mouseState.value;
      const absX = Math.abs(startX - clientX);
      const absY = Math.abs(startY - clientY);
      const target = e.currentTarget;
      let resultX = absX;
      let resultY = absY;
      if (startX > clientX) {
        resultX = -resultX;
      }
      if (startY > clientY) {
        resultY = -resultY;
      }
      const style = `translate(${resultX}px, ${resultY}px)`;
      target.setAttribute("offsetX", resultX);
      target.setAttribute("offsetY", resultY);
      target.style.transform = style;
    };

    const onConfigItemMouseUp = (e) => {
      mouseState.value.dragging = false;
      mouseState.value.startX = 0;
      mouseState.value.startY = 0;
      mouseState.value.offsetX = 0;
      mouseState.value.offsetY = 0;
      console.log("drag end");
      console.log(e);
    };

    window.addEventListener("mouseup", onConfigItemMouseUp);

    return {
      maskStyle,
      mouseState,
      onConfigItemClick,
      onConfigItemMouseDown,
      onConfigItemMouseMove,
      onConfigItemMouseUp,
    };
  },
});
</script>

<style lang="stylus" scoped>
>>> .config-item img {
  display: block;
  width: 100%;
}

.happy-preview-wrapper {
  position: relative;
}

.config-item {
  box-sizing: border-box;
}
.config-item-mask {
  position: absolute;
  left: 0;
  right: 0;
  border: 2px solid #ff8000;
}
</style>
