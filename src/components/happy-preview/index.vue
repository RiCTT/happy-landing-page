<template>
  <div class="happy-preview-wrapper">
    <div
      class="config-list-wrapper"
      @mousedown="onConfigItemMouseDown"
      @mousemove.stop="onConfigItemMouseMove"
      @mouseup.stop.prevent="onConfigItemMouseUp"
    >
      <div
        class="config-item"
        v-for="(item, i) in configList"
        :key="item.name"
        :id="i + 1"
        @click="onConfigItemClick(item, i, $event)"
      >
        <component
          :is="item.name"
          width="100%"
          height="100%"
          style="pointer-events: none; user-select: none"
          v-bind="item.data"
        />
      </div>
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
      lastOffsetX: 0,
      lastOffsetY: 0,
      ele: null,
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
      const target = e.target;
      const offsetX = Number(target.getAttribute("offsetX"));
      const offsetY = Number(target.getAttribute("offsetY"));
      mouseState.value.ele = target;
      mouseState.value.startX = clientX;
      mouseState.value.startY = clientY;
      mouseState.value.lastOffsetX = offsetX;
      mouseState.value.lastOffsetY = offsetY;
      if (!target.className || target.className.indexOf("config-item") === -1) {
        mouseState.value.dragging = false;
      } else {
        mouseState.value.dragging = true;
      }
    };

    const onConfigItemMouseMove = (e) => {
      if (!mouseState.value.dragging) {
        return;
      }
      if (!mouseState.value.ele) {
        return;
      }

      const { clientX, clientY } = e;
      const { startX, startY, lastOffsetX, lastOffsetY, ele } =
        mouseState.value;
      const absX = Math.abs(startX - clientX);
      const absY = Math.abs(startY - clientY);
      const target: any = ele;
      // 1、首先获取本身的偏移量
      // 2、计算当前移动的绝对值
      // 3、判断方向进行处理
      let resultX = 0;
      let resultY = 0;
      if (startX < clientX) {
        // 往下走，transformx应该是正直
        resultX = absX + lastOffsetX;
      } else {
        resultX = -absX + lastOffsetX;
      }

      if (startY < clientY) {
        // 往右走
        resultY = absY + lastOffsetY;
      } else {
        resultY = -absY + lastOffsetY;
      }
      // console.log(`resultX: ${resultX}, resultY: ${resultY};`);
      const style = `translate(${resultX}px, ${resultY}px)`;
      target.setAttribute("offsetX", resultX);
      target.setAttribute("offsetY", resultY);
      target.style.transform = style;
    };

    const onConfigItemMouseUp = () => {
      mouseState.value.dragging = false;
      mouseState.value.startX = 0;
      mouseState.value.startY = 0;
      mouseState.value.lastOffsetX = 0;
      mouseState.value.lastOffsetY = 0;
      mouseState.value.ele = null;
      console.log("drag end");
      return false;
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
  overflow: hidden;

  .config-list-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
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
