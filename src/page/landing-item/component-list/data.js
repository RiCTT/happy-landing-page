export const BasicComponents = [
  {
    name: "van-button",
    label: "按钮",
    iconSrc: require("./images/button.png"),
    props: {
      text: {
        label: "按钮文本",
        type: String,
        required: true,
        ui: "text",
        default: "按钮",
      },
      url: {
        type: String,
        label: "跳转链接",
        ui: "text",
        default: "",
        validator: (rules, value) => {
          if (value && !/https|http/.test(value)) {
            return Promise.reject("必须指定http/s协议类型的地址");
          }
          return Promise.resolve();
        },
      },
    },
  },
  {
    name: "van-swipe-v2",
    label: "轮播",
    iconSrc: require("./images/coursel.png"),
  },
  {
    name: "van-image",
    label: "图片",
    iconSrc: require("./images/image.png"),
    props: {
      src: {
        type: String,
        label: "图片链接",
        ui: "text",
        required: true,
      },
    },
  },
  {
    name: "van-count-down",
    label: "倒计时",
    iconSrc: require("./images/countdown.png"),
  },
  {
    name: "van-divider",
    label: "分割线",
    iconSrc: require("./images/divider.png"),
  },
];
