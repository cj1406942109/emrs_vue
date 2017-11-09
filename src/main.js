// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Resource from 'vue-resource';
import VModal from 'vue-js-modal';

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

import '@/directives/select.js';

Vue.config.productionTip = false;
Vue.use(Resource);
Vue.use(VModal, { dialog: true });

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
