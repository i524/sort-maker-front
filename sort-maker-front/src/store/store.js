import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { auth } from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
    },
    plugins: [
        createPersistedState({
            key: 'sortMaker',
            paths: ['auth.userId'],
            storage: window.localStorage,
        }),
    ],
})

export default store
