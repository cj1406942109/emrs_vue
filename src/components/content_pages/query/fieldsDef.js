export default [
    // {
    //     name: '__checkbox',
    //     titleClass: 'text-center',
    //     dataClass: 'text-center'
    // },
    {
        name: '__sequence',
        title: '序号',
        titleClass: 'text-center',
        dataClass: 'text-center'
    },
    {
        name: 'name',
        sortField: 'name',
        title: '姓名',
        titleClass: 'text-center',
        dataClass: 'text-center',
    },
    {
        name: 'gender',
        sortField: 'gender',
        title: '性别',
        titleClass: 'text-center',
        dataClass: 'text-center',
        callback: 'genderLabel'
    },
    {
        name: 'age',
        sortField: 'age',
        title: '年龄',
        titleClass: 'text-center',
        dataClass: 'text-center',
    },
    {
        name: '__slot:contactInfo',
        title: '联系方式',
        titleClass: 'text-center',
        dataClass: 'text-center'
    },
    {
        name: 'idNum',
        // sortField: 'idNum',
        title: '身份证号',
        titleClass: 'text-center',
        dataClass: 'text-center',
    },
    {
        name: 'medicalCardNum',
        // sortField: 'medicalCardNum',
        title: '医保卡号',
        titleClass: 'text-center',
        dataClass: 'text-center',
    },
    {
        name: 'admissionNum',
        // sortField: 'medicalCardNum',
        title: '住院号',
        titleClass: 'text-center',
        dataClass: 'text-center',
    },
    {
        name: 'bedNum',
        // sortField: 'medicalCardNum',
        title: '床位号',
        titleClass: 'text-center',
        dataClass: 'text-center',
    },
    {
        name: 'doctor',
        // sortField: 'medicalCardNum',
        title: '主治医生',
        titleClass: 'text-center',
        dataClass: 'text-center',
        callback: 'showDoctorName'
    },
    // {
    //   name: '__component:custom-actions',
    //   title: 'Actions',
    //   titleClass: 'text-center',
    //   dataClass: 'text-center',
    // },
    {
        name: '__slot:actions',
        title: '操作',
        titleClass: 'text-center',
        dataClass: 'text-center',
    }
]
