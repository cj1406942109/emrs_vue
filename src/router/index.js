import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login/login';
import home from '@/components/home/home';
import index from '@/components/content_pages/index/index';
import query from '@/components/content_pages/query/query';
import input from '@/components/content_pages/input/input';
import basicInfo from '@/components/content_pages/input/basic_info/basic_info';
import historyOfPresentIllness from '@/components/content_pages/input/history_of_present_illness/history_of_present_illness';
import anamnesis from '@/components/content_pages/input/anamnesis/anamnesis';
import riskFactors from '@/components/content_pages/input/risk_factors/risk_factors';
import familyHistory from '@/components/content_pages/input/family_history/family_history';
import physicalExamination from '@/components/content_pages/input/physical_examination/physical_examination';
import routineExamination from '@/components/content_pages/input/routine_examination/routine_examination';
import specialExamination from '@/components/content_pages/input/special_examination/special_examination';
import admissionDiagnosis from '@/components/content_pages/input/admission_diagnosis/admission_diagnosis';
import dischargeDiagnosis from '@/components/content_pages/input/discharge_diagnosis/discharge_diagnosis';

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
                }, {
                    path: 'anamnesis',
                    components: {
                        tab2: anamnesis
                    }
                }, {
                    path: 'risk_factors',
                    components: {
                        tab2: riskFactors
                    }
                }, {
                    path: 'family_history',
                    components: {
                        tab2: familyHistory
                    }
                }, {
                    path: 'physical_examination',
                    components: {
                        tab2: physicalExamination
                    }
                }, {
                    path: 'routine_examination',
                    components: {
                        tab2: routineExamination
                    }
                }, {
                    path: 'special_examination',
                    components: {
                        tab2: specialExamination
                    }
                }, {
                    path: 'admission_diagnosis',
                    components: {
                        tab2: admissionDiagnosis
                    }
                }, {
                    path: 'discharge_diagnosis',
                    components: {
                        tab2: dischargeDiagnosis
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
