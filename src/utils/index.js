export const isArray = (val) => {
  return Object.prototype.toString.call(val) === "[object Array]";
};

export const isObject = (val) => {
  return Object.prototype.toString.call(val) === "[object Object]";
};

export const stringifyFun = (data, keys = []) => {
  if (isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      stringifyFun(item, keys);
    }
  } else if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      const item = data[key];
      if (keys.indexOf(key) > -1) {
        data[key] = item.toString();
      } else {
        stringifyFun(item, keys);
      }
    });
  }
};

export const stringifyBackFun = (data, keys = []) => {
  if (isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      stringifyBackFun(item, keys);
    }
  } else if (isObject(data)) {
    Object.keys(data).forEach((key) => {
      const item = data[key];
      if (keys.indexOf(key) > -1) {
        data[key] = Function('"use strict";return (' + item + ")")();
      } else {
        stringifyBackFun(item, keys);
      }
    });
  }
};
