import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify/lib/framework';

Vue.config.productionTip = false

Vue.use(Vuetify);
const vuetify = new Vuetify({});

new Vue({
    router,
    // vuetify,
    vuetify,
    render: h => h(App),
}).$mount('#app')
