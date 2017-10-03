import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/content_pages/index/index';
import input from '@/components/content_pages/input/input';

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/index'
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
