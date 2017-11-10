import mutationsTypes from './mutation-types';
import mrApi from '@/api/mr';

export default {
    //获取所有的静态索引数据
    getStaticIndex({ commit }) {
        mrApi.getStaticIndex().then((res) => {
            commit(mutationsTypes.GET_STATIC_INDEX, res.data);
        }, () => {
            console.log('获取静态索引数据失败！');
        });
    },
    //获取医生列表
    getDoctorList({ commit }) {
        mrApi.getDoctorList().then((res) => {
            commit(mutationsTypes.GET_DOCTOR_LIST, res.data);
        }, () => {
            console.log('获取医生列表失败！');
        });
    },
    //获取记录者列表
    getRecorderList({ commit }) {
        mrApi.getRecorderList().then((res) => {
            commit(mutationsTypes.GET_RECORDER_LIST, res.data);
        }, () => {
            console.log('获取记录者列表失败！');
        });
    }
}
