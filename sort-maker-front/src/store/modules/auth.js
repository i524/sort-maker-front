const state = {
    uid: null,
    displayName: null,
    photoURL: null,
}

const getters = {
    uid(state) {
        return state.uid
    },
    displayName(state) {
        return state.displayName
    },
    photoURL(state) {
        return state.photoURL
    },
}

const mutations = {
    setUid(state, payload) {
        state.uid = payload.uid
    },
    setDisplayName(state, payload) {
        state.displayName = payload.displayName
    },
    setPhotoURL(state, payload) {
        state.photoURL = payload.photoURL
    },
}

const actions = {
    updateUid({ commit }, uid) {
        commit('setUid', { uid })
    },
    updateDisplayName({ commit }, displayName) {
        commit('setDisplayName', { displayName })
    },
    updatePhotoURL({ commit }, photoURL) {
        commit('setPhotoURL', { photoURL })
    },
}

const auth = {
    state,
    getters,
    mutations,
    actions,
}

export default auth
