import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login/login';
import index from '@/components/content_pages/index/index';
import input from '@/components/content_pages/input/input';

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/input',
            name: 'input',
            component: input
        }
    ]
})
