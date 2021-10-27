import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { auth, common, ui } from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        common,
        ui,
    },
    plugins: [
        createPersistedState({
            key: 'sortMaker',
            paths: ['auth', 'common', 'ui'],
            storage: window.localStorage,
        }),
    ],
})

export default store
