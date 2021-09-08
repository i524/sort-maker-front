const state = {
    userId: 1,
};

const getters = {
    userId(state){
        return state.userId;
    }
};

const mutations = {
    setUserId(state, payload){
        state.userId = payload.userId;
    }
};

const actions = {
    doUpdate({ commit }, userId){
        commit('setUserId', { userId });
    }
};

const auth = {
    state,
    getters,
    mutations,
    actions
};

export default auth;