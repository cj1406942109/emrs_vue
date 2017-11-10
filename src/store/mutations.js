import mutationTypes from './mutation-types';
// import utils from '@/utils';

export default {
    // 获取页面使用到的索引记录
    [mutationTypes.GET_STATIC_INDEX](state, staticIndex) {
        state.staticIndex = staticIndex;
    },
    // 获取医生列表
    [mutationTypes.GET_DOCTOR_LIST](state, doctorList) {
        state.doctorList = doctorList;
    },
    // 获取记录者列表
    [mutationTypes.GET_RECORDER_LIST](state, recorderList) {
        state.recorderList = recorderList;
    },
}
