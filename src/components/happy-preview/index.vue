<template>
  <div ref="wrapper" class="happy-preview-wrapper">
    <div
      class="config-list-wrapper"
      :style="{ height: boxHeight }"
      @mousedown.stop="onConfigItemMouseDown"
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
        :key="item.id"
        @click.stop="onConfigItemClick(item, i, $event)"
      >
        <component
          :is="item.name"
          :width="wrapperWidth"
          height="100%"
          style="pointer-events: none; user-select: none"
          v-bind="item.data"
        />
        <div
          v-if="configIndex === i"
          class="config-item-mask"
          style="pointer-events: none; user-select: none"
          :style="maskStyle"
        >
          <span class="square left-top"></span>
          <span class="square left-bottom"></span>
          <span class="square right-top"></span>
          <span class="square right-bottom"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 该组件用来展示页面组件列表，如涉及样式处理，可在外层或者穿透
import { defineComponent, effect, onMounted, ref, watch } from "vue";

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

const OFFSET_X_KEY = "offsetX";
const OFFSET_Y_KEY = "offsetY";

export default defineComponent({
  props: {
    configList: {
      type: Array,
      default: () => [],
    },
    boxHeight: {
      type: [String, Number],
      default: "100%",
    },
  },
  setup(props, ctx) {
    const wrapper = ref();
    const wrapperWidth = ref();
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

    onMounted(() => {
      wrapperWidth.value = wrapper.value.offsetWidth;
    });

    const onConfigItemClick = (config, index, e) => {
      configIndex.value = index;
    };

    const onConfigItemMouseDown = (e) => {
      const { clientX, clientY } = e;
      const target = e.target;
      const offsetX = Number(target.getAttribute(OFFSET_X_KEY));
      const offsetY = Number(target.getAttribute(OFFSET_Y_KEY));
      console.log("down!");
      console.log(offsetX);
      console.log(offsetY);
      mouseState.value.startX = clientX;
      mouseState.value.startY = clientY;
      mouseState.value.lastOffsetX = offsetX;
      mouseState.value.lastOffsetY = offsetY;
      configIndex.value = target.getAttribute("index")
        ? Number(target.getAttribute("index"))
        : -1;
      const isWrapper = Boolean(target.getAttribute("isWrapper"));
      if (isWrapper) {
        mouseState.value.dragging = true;
        mouseState.value.ele = target;
      } else {
        mouseState.value.dragging = false;
        mouseState.value.ele = null;
      }
    };

    const onConfigItemMouseMove = (e) => {
      if (!mouseState.value.dragging) {
        return;
      }
      if (!mouseState.value.ele) {
        return;
      }
      console.log("move ing !");

      const { clientX, clientY } = e;
      const { startX, startY, lastOffsetX, lastOffsetY, ele } =
        mouseState.value;
      const absX = Math.abs(startX - clientX);
      const absY = Math.abs(startY - clientY);
      console.log("absX: ", absX);
      console.log("absY: ", absY);
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
      console.log(`resultX: ${resultX}, resultY: ${resultY};`);
      // const style = `translate(${resultX}px, ${resultY}px)`;
      target.setAttribute(OFFSET_X_KEY, resultX);
      target.setAttribute(OFFSET_Y_KEY, resultY);
      // target.style.transform = style;
      target.style.left = resultX + "px";
      target.style.top = resultY + "px";
      console.log("drag move");
      console.log(JSON.stringify(props.configList));
    };

    const onConfigItemMouseUp = () => {
      mouseState.value.dragging = false;
      mouseState.value.startX = 0;
      mouseState.value.startY = 0;
      mouseState.value.lastOffsetX = 0;
      mouseState.value.lastOffsetY = 0;
      mouseState.value.ele = null;
      console.log("drag end");
      console.log(JSON.stringify(props.configList));
      const list = getConfigList();
      ctx.emit("config-change", list);
      return false;
    };

    const getConfigList = () => {
      const list = [...props.configList];
      // 拿到所有的元素，更新对应的数据节点相应属性，比如transfrom
      const eleList = document.querySelectorAll(".config-item");
      for (let i = 0; i < list.length; i++) {
        const data: any = list[i];
        const currentEle = eleList[i];
        const x = Number(currentEle.getAttribute(OFFSET_X_KEY));
        const y = Number(currentEle.getAttribute(OFFSET_Y_KEY));
        const style = {
          // transform: `translate(${x}px, ${y}px);`,
          left: `${x}px`,
          top: `${y}px`,
          zIndex: data.zIndex || 10 + i,
        };
        data.style = Object.assign(data.style || {}, style);
      }
      return list;
    };

    const getCurrentConfigIndex = () => {
      return configIndex.value;
    };

    const setEleAttribute = () => {
      const list = [...props.configList];
      // 拿到所有的元素，更新对应的数据节点相应属性，比如transfrom
      const eleList = document.querySelectorAll(".config-item");
      if (!eleList || eleList.length === 0) {
        return;
      }
      for (let i = 0; i < list.length; i++) {
        const data: any = list[i];
        const currentEle = eleList[i];
        if (data.style) {
          const { left, top } = data.style;
          if (left) {
            currentEle.setAttribute(OFFSET_X_KEY, parseInt(left) + "");
          }
          if (top) {
            currentEle.setAttribute(OFFSET_Y_KEY, parseInt(top) + "");
          }
        }
      }
    };

    effect(() => {
      setTimeout(() => {
        console.log("run");
        console.log(JSON.stringify(props.configList));
        setEleAttribute();
      });
    });

    window.addEventListener("mouseup", onConfigItemMouseUp);

    return {
      wrapper,
      wrapperWidth,
      maskStyle,
      mouseState,
      configIndex,
      setEleAttribute,
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
  // position: relative;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  box-sizing: border-box;
  .config-item-mask {
    position: absolute;
    inset: 0;
    border: 3px solid #ff8000;

    .square {
      position: absolute;
      border: 1px solid #ff8000;
      padding: 4px;
      background-color: #fff;
      cursor: pointer;

      &.left-top {
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
      }
      &.left-bottom {
        left: 0;
        bottom: 0;
        transform: translate(-50%, 50%);
      }
      &.right-top {
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
      }
      &.right-bottom {
        right: 0;
        bottom: 0;
        transform: translate(50%, 50%);
      }
    }
  }
}
</style>
