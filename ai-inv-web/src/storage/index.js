// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    interviewHistory: [],
  },
  mutations: {
    setInterviewHistory(state, history) {
      state.interviewHistory = history;
    },
  },
  actions: {
    updateInterviewHistory({ commit }, history) {
      commit('setInterviewHistory', history);
    },
  },
});
