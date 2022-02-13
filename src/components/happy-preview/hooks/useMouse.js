import { ref } from "vue";

const OFFSET_X_KEY = "offsetX";
const OFFSET_Y_KEY = "offsetY";

export const useMouse = ({ props, ctx, configIndex }) => {
  const mouseState = ref({
    dragging: false,
    startX: 0,
    startY: 0,
    lastOffsetX: 0,
    lastOffsetY: 0,
    ele: null,
  });
  const onConfigItemMouseDown = (e) => {
    if (props.mode !== "edit") {
      return;
    }
    const { clientX, clientY } = e;
    const target = e.target;
    const offsetX = Number(target.getAttribute(OFFSET_X_KEY));
    const offsetY = Number(target.getAttribute(OFFSET_Y_KEY));
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
    console.log("outt tmove");
    if (props.mode !== "edit" || props.layout === "block") {
      return;
    }
    if (!mouseState.value.dragging) {
      return;
    }
    if (!mouseState.value.ele) {
      return;
    }
    console.log("move ing !");

    const { clientX, clientY } = e;
    const { startX, startY, lastOffsetX, lastOffsetY, ele } = mouseState.value;
    const absX = Math.abs(startX - clientX);
    const absY = Math.abs(startY - clientY);
    console.log("absX: ", absX);
    console.log("absY: ", absY);
    const target = ele;
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
  };

  const onConfigItemMouseUp = () => {
    if (props.mode !== "edit") {
      return;
    }
    mouseState.value.dragging = false;
    mouseState.value.startX = 0;
    mouseState.value.startY = 0;
    mouseState.value.lastOffsetX = 0;
    mouseState.value.lastOffsetY = 0;
    mouseState.value.ele = null;
    console.log("drag end");
    // console.log(JSON.stringify(props.configList));
    const list = getConfigList();
    ctx.emit("config-change", list);
    return false;
  };

  const getConfigList = () => {
    const list = [...props.configList];
    // 拿到所有的元素，更新对应的数据节点相应属性，比如transfrom
    const eleList = document.querySelectorAll(".config-item");
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      const currentEle = eleList[i];
      const x = Number(currentEle.getAttribute(OFFSET_X_KEY));
      const y = Number(currentEle.getAttribute(OFFSET_Y_KEY));
      const style = {
        // transform: `translate(${x}px, ${y}px);`,
        left: `${x}px`,
        top: `${y}px`,
        zIndex: data.zIndex || 10 + i,
      };
      // data.style = Object.assign(data.style || {}, style);
      data.data = Object.assign(data.data || {}, style);
    }
    return list;
  };
  return {
    onConfigItemMouseDown,
    onConfigItemMouseMove,
    onConfigItemMouseUp,
  };
};
