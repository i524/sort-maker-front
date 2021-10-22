import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#E73D1D',
                secondary: '#FEC81A',
                accent: '#306AA7',
                success: '#306AA7',
                warning: '#e30065',
            },
        },
    },
})
