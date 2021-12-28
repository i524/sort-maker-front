import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { auth, sort, ui } from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        sort,
        ui,
    },
    plugins: [
        createPersistedState({
            key: 'sortMaker',
            paths: ['auth', 'sort', 'ui'],
            storage: window.localStorage,
        }),
    ],
})

export default store
