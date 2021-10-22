const state = {
    isShowAlert: false,
    message: '',
    color: 'warning',
}

const getters = {
    isShowAlert(state) {
        return state.isShowAlert
    },
    message(state) {
        return state.message
    },
    color(state) {
        return state.color
    },
}

const mutations = {
    setIsShowAlert(state, payload) {
        state.isShowAlert = payload.isShowAlert
    },
    setMessage(state, payload) {
        state.message = payload.message
    },
    setColor(state, payload) {
        state.color = payload.color
    },
}

const actions = {
    updateIsShowAlert({ commit }, isShowAlert) {
        commit('setIsShowAlert', { isShowAlert })
    },
    updateMessage({ commit }, message) {
        commit('setMessage', { message })
    },
    updateColor({ commit }, color) {
        commit('setColor', { color })
    },
}

const ui = {
    state,
    getters,
    mutations,
    actions,
}

export default ui
