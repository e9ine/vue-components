import Vue from 'vue';
import App from './App.vue';
import router from '@/app/router';
import * as VueGoogleMaps from 'vue2-google-maps';
import jQuery from 'jquery';

import {store} from '@/app/store';
import '@/scss/app-style.scss';
import './filters';
Vue.config.productionTip = false;

window.$ = window.jQuery = jQuery;
Vue.use(VueGoogleMaps, {
    load: {
        key: import.meta.env.VUE_APP_GOOGLE_KEY,
        libraries: 'places'
    },
    installComponents: false
});
new Vue({
    render: (h) => h(App),
    router,
    store
}).$mount('#app');
