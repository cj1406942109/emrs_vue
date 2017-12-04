// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueBus from 'vue-bus';
import store from '@/store';
import App from './App';
import router from './router';
import SweetModal from 'sweet-modal-vue/src/plugin.js';
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';

import 'font-awesome/css/font-awesome.min.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@/../static/plugins/bootstrap/css/bootstrap.min.css';
import '@/../static/css/family=Open+Sans.css';
import '@/../static/plugins/simple-line-icons/simple-line-icons.min.css';
import '@/../static/plugins/jquery-slimscroll/jquery.slimscroll.min';


import '@/assets/global/css/components-rounded.css';
import '@/assets/global/css/plugins.css';

import '@/assets/layout/css/layout.css';
import '@/assets/layout/css/themes/darkblue.css';
import '@/assets/layout/css/custom.css';

import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
// import '@/../static/plugins/bootstrap/js/bootstrap.min.js';

// import '@/assets/global/js/app.js';
// import '@/assets/layout/js/layout.js';
// import '@/assets/layout/js/demo.js';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueBus);
Vue.use(SweetModal);
Validator.localize('zh_CN', zh_CN);
Vue.use(VeeValidate, {
    locale: 'zh_CN',
    fieldsBagName: 'veeFormFields'
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
