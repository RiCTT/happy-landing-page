const PAGE_LIST = "PAGE_LIST";

const stringifyHandleFun = (key, val) => {
  if (typeof val == "function") {
    return val.toString();
  } else {
    return val;
  }
};

const parseHandleFun = (key, val) => {
  if (
    // key === "type" &&
    // val.indexOf("function") === 0 &&
    // val.indexOf("native code") === -1
    key === "validator" &&
    val.indexOf("function") === 0
  ) {
    return Function('"use strict";return (' + val + ")")();
  } else {
    return val;
  }
};

export const getPageList = () => {
  let d = window.localStorage.getItem(PAGE_LIST);
  if (d) {
    return JSON.parse(d, parseHandleFun);
  }
  return [];
};

export const setPageList = (data) => {
  window.localStorage.setItem(
    PAGE_LIST,
    JSON.stringify(data, stringifyHandleFun)
  );
};
