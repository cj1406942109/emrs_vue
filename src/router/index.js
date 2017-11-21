import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login/login';
import home from '@/components/home/home';
import index from '@/components/content_pages/index/index';

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
            }]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if(user) {
            console.log(user);
            // if(user.expireTime > new Date().getTime()) {
            //     next();
            // } else {
            //     sessionStorage.clear('user');
            //     next({
            //         path: '/login'
            //     })
            // }
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
