/* eslint-disable @typescript-eslint/no-unused-vars */
import { reactive, onMounted } from "vue";

export const useResizeSquare = ({ props, ctx, configIndex }) => {
  let boxWidth = 375;
  let percentWidth = boxWidth / 100;
  onMounted(() => {
    let wrapper = document.querySelector(".happy-preview-wrapper");
    boxWidth = wrapper.offsetWidth;
    percentWidth = boxWidth / 100;
    // console.log(wrapper.offsetWidth);
  });
  const state = reactive({
    dragging: false,
    startX: 0,
    startY: 0,
  });
  const maskSquareDown = (e) => {
    console.log("square down");
    const { clientX, clientY } = e;
    state.dragging = true;
    state.startX = clientX;
    state.startY = clientY;
    state.originWidth = "100%";
  };

  const maskSquareMove = (e) => {
    if (!state.dragging) {
      return;
    }
    console.log("square move");
    console.log(e);
    const { startX, startY } = state;
    const { clientX, clientY } = e;
    const absX = Math.abs(clientX - startX);
    const absY = Math.abs(clientY - startY);
    const index = configIndex.value;
    const current = props.configList[index];
    const style = current.data;
    console.log(
      parseInt(state.originWidth || "100%") -
        Number((absX / percentWidth).toFixed(2)) +
        "%"
    );
    style.width =
      parseInt(state.originWidth || "100%") -
      Number((absX / percentWidth).toFixed(2)) +
      "%";
    console.log("current");
    console.log(current);
    console.log(current.style);
    console.log(`absX: ${absX / percentWidth}, absY: ${absY}`);
  };

  const maskSquareUp = (e) => {
    state.dragging = false;
  };
  return {
    state,
    maskSquareDown,
    maskSquareMove,
    maskSquareUp,
  };
};
