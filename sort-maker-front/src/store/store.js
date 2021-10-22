import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { auth, ui } from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        ui,
    },
    plugins: [
        createPersistedState({
            key: 'sortMaker',
            paths: ['auth', 'ui'],
            storage: window.localStorage,
        }),
    ],
})

export default store
