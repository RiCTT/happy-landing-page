export const mockProps = {
  // 按钮的基本props
  text: {
    label: "按钮文本",
    type: String,
    required: true,
    ui: "text",
    default: "按钮",
  },
  openUrl: {
    type: String,
    label: "跳转链接",
    ui: "text",
    default: "",
    validator: (rules, value, cb) => {
      if (!value.test(/https|http/)) {
        return cb(new Error(cb("必须指定http/s协议类型的地址")));
      }
      cb();
    },
  },
};
