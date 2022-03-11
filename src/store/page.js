import { defineStore } from "pinia";
import Command from "@/utils/command";

export const usePageStore = defineStore("page", {
  state: () => {
    return {
      selectIndex: -1,
      configList: [],
      currentSelectProps: {},
      currentSelectPropsData: {},
      settings: { pageHeight: "100%" },
      c: new Command(),
    };
  },
  actions: {
    setConfigList(data) {
      this.configList = data;
      console.log('excute')
      this.c.execute(data);
    },
    setConfigListPure(data) {
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
  },
});
