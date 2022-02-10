import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      selectIndex: -1,
      configList: [],
      settings: {},
    };
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
