import Vue from 'vue';
import App from './App.vue';
import router from '@/app/router';
import jQuery from 'jquery';

import {store} from '@/app/store';
import '@/scss/app-style.scss';
import './filters';
Vue.config.productionTip = false;

window.$ = window.jQuery = jQuery;
new Vue({
    render: (h) => h(App),
    router,
    store
}).$mount('#app');
