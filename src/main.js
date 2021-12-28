import Vue from 'vue'
import App from './App.vue'
import Croppa from 'vue-croppa'
import VueMq from 'vue-mq'
import 'vue-croppa/dist/vue-croppa.css'
import { router } from './router/index'
import { vuetify } from './plugins'
import { store } from './store'

Vue.config.productionTip = false

Vue.use(Croppa)
Vue.use(VueMq, {
    breakpoints: {
        md: 768,
        lg: Infinity,
    },
    defaultBreakpoint: 'lg',
})

new Vue({
    router,
    vuetify,
    store,
    render: (h) => h(App),
}).$mount('#app')
