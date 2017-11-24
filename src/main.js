// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import SweetModal from 'sweet-modal-vue/src/plugin.js';
import Resource from 'vue-resource';
import VeeValidate from 'vee-validate';
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

Vue.config.productionTip = false;
Vue.use(Resource);
Vue.use(VeeValidate);
Vue.use(SweetModal);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
