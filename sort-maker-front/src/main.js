import Vue from 'vue'
import App from './App.vue'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import { router } from './router/index'
import { vuetify } from './plugins'
import { store } from './store'

Vue.config.productionTip = false

Vue.use(Croppa)

new Vue({
    router,
    vuetify,
    store,
    render: (h) => h(App),
}).$mount('#app')
