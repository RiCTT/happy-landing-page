import { defineStore } from "pinia";

export const usePageStore = defineStore("page", {
  state: () => {
    return {
      selectIndex: -1,
      configList: [],
      currentSelectProps: {},
      currentSelectPropsData: {},
      settings: { pageHeight: "100%" },
    };
  },
  actions: {
    setConfigList(data) {
      this.configList = data;
    },
    setSettings(data) {
      this.settings = Object.assign(this.settings, data);
    },
    setPageHeight(data) {
      this.settings.pageHeight = data;
    },
    setCurProps(data) {
      this.currentSelectProps = data;
    },
    setCurPropsData(data) {
      this.currentSelectPropsData = data;
    },
    setSelectIndex(data) {
      this.selectIndex = data;
    },
    increment() {
      this.count++;
    },
  },
});
