const state = {
    isDisplayAlert: false,
    message: '',
}

const getters = {
    isDisplayAlert(state) {
        return state.isDisplayAlert
    },
    message(state) {
        return state.message
    },
}

const mutations = {
    setIsDisplayAlert(state, payload) {
        state.isDisplayAlert = payload.isDisplayAlert
    },
    setMessage(state, payload) {
        state.message = payload.message
    },
}

const actions = {
    updateIsDisplayAlert({ commit }, isDisplayAlert) {
        commit('setIsDisplayAlert', { isDisplayAlert })
    },
    updateMessage({ commit }, message) {
        commit('setMessage', { message })
    },
}

const auth = {
    state,
    getters,
    mutations,
    actions,
}

export default auth
