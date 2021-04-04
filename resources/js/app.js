

import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import router from './router/index'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import '../css/app.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueFormulate from '@braid/vue-formulate'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

// @import 'vue-formulate/themes/snow/snow.scss';
Vue.component('v-select', vSelect)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Vuesax, {})
Vue.use(VueSweetalert2);
Vue.use(VueFormulate)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
