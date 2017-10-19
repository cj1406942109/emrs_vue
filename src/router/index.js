import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login/login';
import home from '@/components/home/home';
import index from '@/components/content_pages/index/index';
import query from '@/components/content_pages/query/query';
import input from '@/components/content_pages/input/input';
import basicInfo from '@/components/content_pages/input/basic_info/basic_info';
import historyOfPresentIllness from '@/components/content_pages/input/history_of_present_illness/history_of_present_illness';

Vue.use(Router)

const router = new Router({
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
            path: '/home',
            meta: { requiresAuth: true },
            component: home,
            children: [{
                path: '',
                redirect: 'index'
            }, {
                path: 'index',
                component: index
            }, {
                path: 'input',
                component: input,
                children: [{
                    path: '',
                    redirect: 'basic_info'
                }, {
                    path: 'basic_info',
                    components: {
                        tab1: basicInfo
                    }
                }, {
                    path: 'history_of_present_illness',
                    components: {
                        tab2: historyOfPresentIllness
                    }
                }]
            }, {
                path: 'query',
                component: query
            }]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        next();
    } else {
        next();
    }
});

export default router;
