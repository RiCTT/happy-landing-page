<template>
  <div ref="wrapper" class="happy-preview-wrapper">
    <div
      class="config-list-wrapper"
      :style="{ height: boxHeight }"
      tabindex="1"
      @keydown="onKeyDown"
      @mousedown.stop="onConfigItemMouseDown"
      @mousemove.stop="onConfigItemMouseMove"
      @mouseup.stop.prevent="onConfigItemMouseUp"
    >
      <div
        class="config-item"
        isWrapper="true"
        :index="i"
        :class="{ active: configIndex === i, isBlock: layout === 'block' }"
        v-for="(item, i) in configList"
        :key="item.id"
        :style="getConfigWrapperStyle(item.style)"
        @click.stop="onConfigItemClick(item, i, $event)"
      >
        <component
          :is="item.name"
          :width="wrapperWidth"
          height="100%"
          :style="getConfigWrapperInnerStyle(item.style)"
          v-bind="item.data"
        />
        <div
          v-if="configIndex === i && mode === 'edit'"
          class="config-item-mask"
          :class="{ isBlock: layout === 'block' }"
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
import { defineComponent, onMounted, ref, onUpdated, computed } from "vue";
import { useKeyEvent } from "./hooks/useKeyEvent";
import { useResizeSquare } from "./hooks/useResizeSquare";
import { useMouse } from "./hooks/useMouse";
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
    mode: {
      type: String,
      // edit, show
      default: "edit",
    },
    layout: {
      type: String,
      // block, position
      default: "block",
    },
  },
  setup(props, ctx) {
    const wrapper = ref();
    const wrapperWidth = ref();
    const maskStyle = ref({});
    const configIndex = ref(-1);

    const { maskSquareDown, maskSquareMove, maskSquareUp } = useResizeSquare({
      props,
      ctx,
      configIndex,
    });

    const { onKeyDown } = useKeyEvent({
      configIndex,
      configList: computed(() => props.configList),
      mode: computed(() => props.mode),
      layout: computed(() => props.layout),
    });

    const {
      onConfigItemMouseDown,
      onConfigItemMouseMove,
      onConfigItemMouseUp,
    } = useMouse({ props, ctx, configIndex });

    onMounted(() => {
      wrapperWidth.value = wrapper.value.offsetWidth;
    });

    const onConfigItemClick = (config, index) => {
      if (props.mode === "edit") {
        configIndex.value = index;
        ctx.emit("config-select", config, index);
      }
    };

    const setConfigIndex = (index) => {
      configIndex.value = index;
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

    const getConfigWrapperStyle = (style) => {
      // 只关心组件一些逻辑样式，不需要业务样式
      const { top, left, zIndex, width } = style;
      if (props.layout === "position") {
        return {
          top,
          left,
          zIndex,
        };
      }
      return {
        width,
        zIndex,
      };
    };

    const getConfigWrapperInnerStyle = (style = {}) => {
      const base = { pointerEvents: "none", userSelect: "none" };
      const pureStyle: any = { ...style };
      let result = pureStyle;
      // 因为容器定位的样式跟业务样式绑定在一块，所以这里要剔除掉
      delete pureStyle.top;
      delete pureStyle.width;
      delete pureStyle.left;
      delete pureStyle.zIndex;
      if (props.mode === "edit") {
        result = Object.assign(base, pureStyle);
      }
      return result;
    };

    onUpdated(() => {
      setTimeout(() => {
        setEleAttribute();
      });
    });

    if (props.mode === "edit") {
      window.addEventListener("mouseup", onConfigItemMouseUp);
    }

    return {
      wrapper,
      wrapperWidth,
      maskStyle,
      configIndex,
      onKeyDown,
      maskSquareDown,
      maskSquareMove,
      maskSquareUp,
      setConfigIndex,
      getConfigWrapperStyle,
      getConfigWrapperInnerStyle,
      setEleAttribute,
      onConfigItemClick,
      onConfigItemMouseDown,
      onConfigItemMouseMove,
      onConfigItemMouseUp,
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
    outline: none;
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

  &.isBlock {
    position: relative;
  }

  .config-item-mask {
    position: absolute;
    inset: 0;
    border: 3px solid #ff8000;
    pointer-events: none;
    user-select: none;

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
