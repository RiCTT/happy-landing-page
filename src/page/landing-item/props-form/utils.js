import { isArray, isObject } from "@/utils/index";

export const formatPropsData = (data, formData) => {
  let result;
  if (isArray(data)) {
    result = [];
    for (let i = 0; i < data.length; i++) {
      const val = data[i];
      const currentData = formData ? formData[i] : undefined;
      result[i] = formatPropsData(val, currentData);
    }
  } else if (isObject(data)) {
    result = {};
    Object.keys(data).forEach((key) => {
      const val = data[key];
      const initValue = getDefaultValue(val.default, val.type);
      const currentData = formData ? formData[key] : undefined;
      result[key] = formatPropsData(currentData || initValue, currentData);
    });
  } else {
    result = data;
  }
  return result;
};

const getDefaultValue = (initValue, type) => {
  if (initValue || typeof initValue === "boolean" || initValue === 0) {
    return initValue;
  }
  switch (type) {
    case "string":
      return "";
    case "array":
      return [];
    case "object":
      return {};
    case "boolean":
      return true;
    default:
      return undefined;
  }
};

console.log("test !!!");
console.log(
  formatPropsData(
    {
      imageList: {
        customAddAndSubtract: true,
        label: "图片列表",
        default: [
          {
            src: {
              label: "图片链接",
              ui: "text",
            },
            numbersList: {
              default: [
                {
                  num: {
                    label: "sss",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      imageList: [
        { src: "https://badiu.com", numbersList: [{ num: 124 }] },
        { src: "https://badiu.com2" },
        { src: "https://badiu.com3" },
      ],
    }
  )
);
