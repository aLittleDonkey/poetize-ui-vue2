import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toolbar: JSON.parse(localStorage.getItem("toolbar") || '{"visible": false, "enter": true}'),
    sortInfo: JSON.parse(localStorage.getItem("sortInfo") || '[]'),
    currentUser: JSON.parse(localStorage.getItem("currentUser") || '{}'),
    currentAdmin: JSON.parse(localStorage.getItem("currentAdmin") || '{}'),
    webInfo: JSON.parse(localStorage.getItem("webInfo") || '{"webName": "", "webTitle": [], "notices": [], "footer": "", "backgroundImage": "", "avatar": ""}')
  },
  getters: {
    articleTotal: state => {
      if (state.sortInfo !== null && state.sortInfo.length !== 0) {
        if (state.sortInfo.length === 1) {
          return state.sortInfo[0].countOfSort;
        } else {
          return state.sortInfo.reduce((prev, curr) => {
            if (typeof prev === "number") {
              return prev + curr.countOfSort;
            } else {
              return prev.countOfSort + curr.countOfSort;
            }
          });
        }
      } else {
        return 0;
      }
    },
    navigationBar: state => {
      if (state.sortInfo !== null && state.sortInfo.length !== 0) {
        return state.sortInfo.filter(f => f.sortType === 0);
      } else {
        return [];
      }
    }
  },
  mutations: {
    changeToolbarStatus(state, toolbarState) {
      state.toolbar = toolbarState;
      localStorage.setItem("toolbar", JSON.stringify(toolbarState));
    },
    loadSortInfo(state, sortInfo) {
      if (sortInfo !== null && sortInfo.length !== 0) {
        state.sortInfo = sortInfo.sort((s1, s2) => s1.priority - s2.priority);
        localStorage.setItem("sortInfo", JSON.stringify(sortInfo.sort((s1, s2) => s1.priority - s2.priority)));
      }
    },
    loadCurrentUser(state, user) {
      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },
    loadCurrentAdmin(state, user) {
      state.currentAdmin = user;
      localStorage.setItem("currentAdmin", JSON.stringify(user));
    },
    loadWebInfo(state, webInfo) {
      webInfo.webTitle = webInfo.webTitle.split('');
      webInfo.notices = JSON.parse(webInfo.notices);
      state.webInfo = webInfo;
      localStorage.setItem("webInfo", JSON.stringify(webInfo));
    }
  },
  actions: {},
  modules: {},
  plugins: []
})
