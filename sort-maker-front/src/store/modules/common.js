const state = {
    resultOfSort: [],
}

const getters = {
    resultOfSort(state) {
        return state.resultOfSort
    },
}

const mutations = {
    setResultOfSort(state, payload) {
        state.resultOfSort = payload.resultOfSort
    },
}

const actions = {
    updateResultOfSort({ commit }, resultOfSort) {
        commit('setResultOfSort', { resultOfSort })
    },
}

const common = {
    state,
    getters,
    mutations,
    actions,
}

export default common
