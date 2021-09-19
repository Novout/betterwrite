import { createStore } from "vuex";
import context from "@/store/module/context";

export default createStore({
  state() {
    return {
      count: 0 as number,
    };
  },
  actions: {},
  mutations: {
    increment(state: any) {
      state.count++;
    },
  },
  modules: {
    context,
  },
});
