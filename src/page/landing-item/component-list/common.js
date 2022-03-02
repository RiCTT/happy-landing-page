export const getBasicStyleProps = (keys) => {
  let data = {
    width: {
      type: "string",
      label: "宽度",
      ui: "text",
      default: "100",
      unit: "%",
    },
    backgroundColor: {
      type: "string",
      label: "背景颜色",
      ui: "colorPicker",
      default: "",
    },
    color: {
      type: "string",
      label: "字体颜色",
      ui: "colorPicker",
      default: "",
    },
    borderColor: {
      type: "string",
      label: "边框颜色",
      ui: "colorPicker",
      default: "#000000",
    },
    borderRadius: {
      type: "string",
      ui: "text",
      label: "圆角",
      default: "16",
      unit: "px",
    },
    padding: {
      type: "string",
      label: "组件间距",
      ui: "padding-box",
      default: "0",
    },
    fontSize: {
      type: "string",
      label: "字体大小",
      ui: "text",
      default: "14",
      unit: "px",
    },
    fontWeight: {
      type: "string",
      ui: "select",
      label: "字重",
      options: [
        { label: "400x400", value: 400 },
        { label: "500x500", value: 500 },
        { label: "600x600", value: 600 },
      ],
      default: 400,
    },
    textAlign: {
      type: "string",
      ui: "select",
      label: "文本对齐",
      options: [
        { label: "左对齐", value: "left" },
        { label: "居中对齐", value: "center" },
        { label: "右对齐", value: "right" },
      ],
    },
    lineHeight: {
      type: "string",
      ui: "select",
      label: "行高",
      options: [
        { label: "1", value: 1 },
        { label: "1.25", value: 1.25 },
        { label: "1.5", value: 1.5 },
        { label: "1.75", value: 1.75 },
        { label: "2", value: 2 },
        { label: "2.25", value: 2.25 },
        { label: "2.5", value: 2.5 },
        { label: "2.75", value: 2.75 },
        { label: "3", value: 3 },
      ],
    },
  };

  let result = {};

  if (keys) {
    keys.forEach((key) => {
      result[key] = data[key];
    });
  } else {
    result = { ...data };
  }

  return result;
};
