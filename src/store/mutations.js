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
    // 获取空病历
    [mutationTypes.GET_EMPTY_MEDICAL_RECORD](state, emptyMedicalRecord) {
        state.emptyMedicalRecord = emptyMedicalRecord;
    },
    // 获取病历列表
    [mutationTypes.GET_MEDICAL_RECORD_LIST](state, medicalRecordList) {
        state.medicalRecordList = medicalRecordList;
    },
    // 更改当前正在修改的病历id
    [mutationTypes.CHANGE_CURRENT_MEDICAL_RECORD_ID](state, currentMedicalRecordId) {
        state.currentMedicalRecordId = currentMedicalRecordId;
    },
}
