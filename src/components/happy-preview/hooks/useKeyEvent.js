export const useKeyEvent = ({ configIndex, configList, mode, layout }) => {
  const onKeyDown = (e) => {
    const index = configIndex.value;
    if (index === -1) {
      return;
    }
    if (mode.value === "show" || layout.value === "block") {
      return;
    }
    const current = configList.value[index];
    const style = current.style;
    const key = e.key;
    const moveStep = 1;

    switch (key) {
      case "ArrowDown":
        move("top", parseInt(style.top) + moveStep + "px");
        break;
      case "ArrowUp":
        move("top", parseInt(style.top) - moveStep + "px");
        break;
      case "ArrowLeft":
        move("left", parseInt(style.left) - moveStep + "px");
        break;
      case "ArrowRight":
        move("left", parseInt(style.left) + moveStep + "px");
        break;
    }

    // e.preventDefault();
  };

  const move = (direction, value) => {
    const index = configIndex.value;
    const current = configList.value[index];
    current.style[direction] = value;
  };
  return {
    onKeyDown,
  };
};
