export const getBasicStyleProps = (keys) => {
  let data = {
    width: {
      type: "string",
      label: "宽度",
      ui: "text",
      default: "100%",
    },
    backgroundColor: {
      type: "string",
      label: "背景颜色",
      ui: "colorPicker",
      default: "#000000",
    },
    color: {
      type: "string",
      label: "字体颜色",
      ui: "colorPicker",
      default: "#000",
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
      default: "16px",
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

export const BasicComponents = [
  {
    name: "van-button-v2",
    label: "按钮",
    iconSrc: require("./images/button.png"),
    props: {
      text: {
        label: "按钮文本",
        type: "string",
        required: true,
        ui: "text",
        default: "按钮",
      },
      url: {
        type: "string",
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
      ...getBasicStyleProps(),
    },
  },
  {
    name: "simple-text",
    label: "普通文本",
    iconSrc: require("./images/button.png"),
    props: {
      text: {
        type: "string",
        label: "文本内容",
        ui: "text",
        default: "普通文本",
      },
      ...getBasicStyleProps(["width", "color"]),
    },
  },
  {
    name: "van-swipe-v2",
    label: "轮播",
    iconSrc: require("./images/coursel.png"),
    props: {
      images: {
        type: "array",
        customAddAndSubtract: true,
        label: "图片列表",
        typeInterface: {
          src: {
            label: "图片链接",
            type: "string",
            ui: "text",
            validator: (rules, value) => {
              if (!value) {
                return Promise.reject("图片不能为空");
              }
              return Promise.resolve();
            },
          },
        },
        default: [
          {
            src: "https://tse1-mm.cn.bing.net/th/id/R-C.9ddfed8e610becdbf648aea893a446c8?rik=IIWdIDd6UKLKOw&riu=http%3a%2f%2fwww.gplcw.com%2fUploadFiles%2f2013%2f2%2f20131212114521233.jpg&ehk=1ZCnzBipwCb8CzY%2blmcTuJ8urPYashFDBxn%2fyHeLHlo%3d&risl=&pid=ImgRaw&r=0",
          },
          {
            src: "https://img.yzcdn.cn/vant/apple-2.jpg",
          },
        ],
      },
      autoplay: {
        type: "number",
        label: "自动轮播间隔",
        ui: "text",
        default: 2000,
      },
      loop: {
        type: "boolean",
        label: "开启循环",
        default: true,
        ui: "switch",
      },
      duration: {
        type: "number",
        label: "动画时长",
        ui: "text",
        default: 1000,
      },
    },
  },
  {
    name: "van-image-v2",
    label: "图片",
    iconSrc: require("./images/image.png"),
    props: {
      src: {
        type: "string",
        label: "图片链接",
        ui: "upload",
        required: true,
      },
      href: {
        type: "string",
        label: "跳转链接",
        ui: "text",
      },
    },
  },
  {
    name: "van-count-down-v2",
    label: "倒计时",
    iconSrc: require("./images/countdown.png"),
  },
  {
    name: "van-divider-v2",
    label: "分割线",
    iconSrc: require("./images/divider.png"),
  },
  {
    name: "van-form-v2",
    label: "表单",
    iconSrc: require("./images/form.png"),
    props: {
      fields: {
        isFormControl: true,
        type: "array",
        label: "表单控件",
        typeInterface: {
          ui: {
            type: "string",
            label: "控件类型",
            default: "text",
          },
          key: {
            type: "string",
            label: "英文字段名称（提交关联字段）",
          },
          label: {
            type: "string",
            label: "字段名称",
          },
          required: {
            type: "boolean",
            label: "是否必填",
          },
          options: {
            type: "array",
            label: "选项",
          },
        },
        default: [
          {
            ui: "text",
            key: "username",
            label: "姓名",
            required: true,
            validator: (rules, value) => {
              console.log(value);
              return Promise.reject("ssss");
            },
            rules: [
              { required: true, message: "请填写用户名" },
              {
                validator: (rules, value) => {
                  console.log(value);
                  return Promise.reject("ssss");
                },
              },
            ],
          },
          {
            ui: "password",
            key: "password",
            label: "密码",
            required: true,
            rules: [{ required: true, message: "请填写密码" }],
          },
          {
            ui: "checkbox",
            key: "city",
            label: "所在城市",
            required: true,
            options: ["广州", "佛山", "厦门", "福州", "苏州", "扬州"],
          },
          {
            ui: "radio",
            key: "gender",
            label: "性别",
            required: true,
            options: ["男", "女", "未知"],
          },
        ],
      },
    },
  },
  {
    name: "van-sticky-v2",
    label: "置底按钮",
    iconSrc: require("./images/divider.png"),
  },
  {
    name: "van-notice-bar-v2",
    label: "通知栏",
    iconSrc: require("./images/divider.png"),
    props: {
      text: {
        label: "文本",
        type: "string",
        ui: "text",
        default:
          "无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。",
      },
      leftIcon: {
        label: "左侧图标",
        type: "string",
        ui: "text",
        default: "volume-o",
      },
    },
  },
  {
    name: "custom-rich-text",
    label: "富文本",
    iconSrc: require("./images/form.png"),
    props: {
      content: {
        label: "内容",
        type: "string",
        ui: "richtext",
        default: "<div><h3>富文本框</h3><p>富文本内容</p></div>",
      },
    },
  },
].map((e) => {
  const obj = e;
  const data = {};
  if (e.props) {
    Object.keys(e.props).forEach((key) => {
      const prop = e.props[key];
      data[key] = prop.default;
    });
  }
  obj.data = data;
  return obj;
});

// eslint-disable-next-line prettier/prettier
export const fields = [
  { ui: "text", label: "普通文本" },
  { ui: "password", label: "密码框" },
  { ui: "switch", label: "开关" },
  { ui: "select", label: "下拉单选框" },
  { ui: "checkbox", label: "复选框" },
  { ui: "radio", label: "单选框" },
];

export const fieldsOps = fields.map((e) => {
  return {
    label: e.label,
    value: e.ui,
  };
});
