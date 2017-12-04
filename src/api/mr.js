import axios from 'axios';
import config from '@/config';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = config.apiHost;

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export default {
    getStaticIndex() {
        return fetch('/index/getIndex');
    },
    getDoctorList() {
        return fetch('/user/getAllDoctorIdAndName');
    },
    getRecorderList() {
        return fetch('/user/getAllDoctorIdAndName');
    },
    getMedicalRecord(recordId) {
        return fetch('./record/getRecord', recordId);
    },
    getMedicalRecordList() {
        return fetch('./record/getPartOfAllRecords');
    },
    insertMedicalRecord(record) {
        return fetch('./record/insertRecord', record)
    },
    updateMedicalRecord(record) {
        return fetch('./record/updateRecord', record)
    },
}
