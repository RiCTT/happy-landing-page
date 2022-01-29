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
        isWrapper="true"
        :index="i"
        :class="{ active: configIndex === i }"
        :style="item.style"
        v-for="(item, i) in configList"
        :key="item.id || item.name + i || i"
        @click="onConfigItemClick(item, i, $event)"
      >
        <component
          :is="item.name"
          width="100%"
          height="100%"
          style="pointer-events: none; user-select: none"
          v-bind="item.data"
        />
        <div
          v-if="configIndex === i"
          class="config-item-mask"
          style="pointer-events: none; user-select: none"
          :style="maskStyle"
        ></div>
      </div>
    </div>
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
  setup(props) {
    const maskStyle = ref({});
    const configIndex = ref(-1);
    const mouseState = ref({
      dragging: false,
      startX: 0,
      startY: 0,
      lastOffsetX: 0,
      lastOffsetY: 0,
      ele: null,
    });

    const onConfigItemClick = (config, index, e) => {
      configIndex.value = index;
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
      configIndex.value = Number(target.getAttribute("index"));
      const isWrapper = Boolean(target.getAttribute("isWrapper"));
      if (isWrapper) {
        mouseState.value.dragging = true;
      } else {
        mouseState.value.dragging = false;
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

    const getConfigList = () => {
      const list = [...props.configList];
      // 拿到所有的元素，更新对应的数据节点相应属性，比如transfrom
      const eleList = document.querySelectorAll(".config-item");
      for (let i = 0; i < list.length; i++) {
        const data: any = list[i];
        const currentEle = eleList[i];
        const x = Number(currentEle.getAttribute("offsetX"));
        const y = Number(currentEle.getAttribute("offsetY"));
        const style = {
          transform: `translate(${x}px, ${y}px);`,
          color: "red",
        };
        data.style = Object.assign(data.style || {}, style);
      }
      return list;
    };
    const getCurrentConfigIndex = () => {
      return configIndex.value;
    };

    window.addEventListener("mouseup", onConfigItemMouseUp);

    return {
      maskStyle,
      mouseState,
      configIndex,
      onConfigItemClick,
      onConfigItemMouseDown,
      onConfigItemMouseMove,
      onConfigItemMouseUp,
      getConfigList,
      getCurrentConfigIndex,
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
  width: 100%;
  min-height: 100%;
  overflow: hidden;

  .config-list-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.config-item {
  position: relative;
  box-sizing: border-box;
  .config-item-mask {
    position: absolute;
    inset: 0;
    border: 3px solid #ff8000;
  }
}
</style>
