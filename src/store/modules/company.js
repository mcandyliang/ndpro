const my = {
  state: {
    offerList: [],
    companyList: []
  },

  mutations: {
    setoffer(state, offerList) {
      state.offerList = offerList;
    },
    setcompany(state, companyList) {
      state.companyList = companyList;
    }
  },

  actions: {
    commitToken(context) {
      context.commit("setoffer");
      context.commit("setcompany");
    }
  },
  getters: {
    getofferList(state) {
      state.offerList = localStorage.getItem("offerList");
      return state.offerList;
    },
    getcompanyList(state) {
      state.companyList = localStorage.getItem("companyList");
      return state.companyList;
    }
  }
};

export default my;
