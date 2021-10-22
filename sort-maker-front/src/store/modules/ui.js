const state = {
    isShowAlert: false,
    message: '',
}

const getters = {
    isShowAlert(state) {
        return state.isShowAlert
    },
    message(state) {
        return state.message
    },
}

const mutations = {
    setIsShowAlert(state, payload) {
        state.isShowAlert = payload.isShowAlert
    },
    setMessage(state, payload) {
        state.message = payload.message
    },
}

const actions = {
    updateIsShowAlert({ commit }, isShowAlert) {
        commit('setIsShowAlert', { isShowAlert })
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
