const state = {
    name: '',
    resultOfSort: [],
}

const getters = {
    name(state) {
        return state.name
    },
    resultOfSort(state) {
        return state.resultOfSort
    },
}

const mutations = {
    setName(state, payload) {
        state.name = payload.name
    },
    setResultOfSort(state, payload) {
        state.resultOfSort = payload.resultOfSort
    },
}

const actions = {
    updateName({ commit }, name) {
        commit('setName', { name })
    },
    updateResultOfSort({ commit }, resultOfSort) {
        commit('setResultOfSort', { resultOfSort })
    },
}

const sort = {
    state,
    getters,
    mutations,
    actions,
}

export default sort
