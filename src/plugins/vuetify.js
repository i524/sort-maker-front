import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.orange.accent4,
                secondary: colors.lightGreen.accent4
            }
        }
    }
});

export default vuetify;