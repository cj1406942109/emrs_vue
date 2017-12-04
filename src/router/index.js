import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login/login';
import home from '@/components/home/home';
import index from '@/components/content_pages/index/index';
import query from '@/components/content_pages/query/query';
import input from '@/components/content_pages/input/input';
import detail from '@/components/content_pages/detail/detail';

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
        }, {
            path: '/logout',
            name: 'logout'
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
                component: input
            }, {
                path: 'edit/:id',
                component: input
            }, {
                path: 'query',
                component: query
            }, {
                path: 'detail/:id',
                component: detail
            }]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if(user) {
            next();
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        if(to.name == 'logout') {
            sessionStorage.clear('user');
            next({
                path: '/login'
            });
        } else {
            next();
        }
    }
});

export default router;
