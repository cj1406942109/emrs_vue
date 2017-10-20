<template>
  <div class="basic-info">
    <div class="form-group">
        <label class="control-label col-md-2">姓名<span class="required"> * </span></label>
        <div class="col-md-2">
            <input type="text" class="form-control" name="name" v-model="basicInfo.name">
            <span class="help-block"> 填写患者姓名 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">就诊卡号<span class="required"> * </span></label>
        <div class="col-md-4">
            <input type="text" class="form-control" name="medical_card_number" v-model="basicInfo.medicalCardNum">
            <span class="help-block"> 填写患者就诊卡号 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">身份证号<span class="required"> * </span></label>
        <div class="col-md-4">
            <input type="text" class="form-control" name="id_number" v-model="basicInfo.idNum">
            <span class="help-block"> 填写患者身份证号 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">联系方式<span class="required"> * </span></label>
        <div class="col-md-3">
            <input type="text" class="form-control phone-group" name="cellphone_1" v-model="basicInfo.cellphone1">
            <span class="help-block"> 填写患者手机号1 </span>
        </div>
        <div class="col-md-3">
            <input type="text" class="form-control phone-group" name="cellphone_2" v-model="basicInfo.cellphone2">
            <span class="help-block"> 填写患者手机号2 </span>
        </div>
        <div class="col-md-3">
            <input type="text" class="form-control phone-group" name="telephone" v-model="basicInfo.telephone">
            <span class="help-block"> 填写患者固定电话 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">性别<span class="required"> * </span></label>
        <div class="col-md-4">
            <div class="icheck-inline">
                <label><input type="radio" name="gender" value="0" data-title="男" v-model="basicInfo.gender"> 男 </label>
                <label><input type="radio" name="gender" value="1" data-title="女" v-model="basicInfo.gender"> 女 </label>
            </div>            
            <div id="form_gender_error"></div>
        </div>
    </div>            
    <div class="form-group">
        <label class="control-label col-md-2">住院号<span class="required"> * </span></label>
        <div class="col-md-3">
            <input type="text" class="form-control" name="admission_num" v-model="basicInfo.admissionNum">
            <span class="help-block"> 填写患者住院号 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">床位号<span class="required"> * </span></label>
        <div class="col-md-3">
            <input type="text" class="form-control" name="bed_num" v-model="basicInfo.bedNum">
            <span class="help-block"> 填写患者床位号 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">主治医生<span class="required"> * </span></label>
        <div class="col-md-3">
            <v-select label="name" :searchable="true" placeholder="请选择主治医生" v-model="basicInfo.doctor" :options="pagedata.doctorList"></v-select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">记录者<span class="required"> * </span></label>
        <div class="col-md-3">
            <v-select label="name" :searchable="true" placeholder="请选择记录者" v-model="basicInfo.recorder" :options="pagedata.recorderList"></v-select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">职业</label>
        <div class="col-md-3">
            <v-select label="text" :searchable="true" placeholder="请选择职业" v-model="basicInfo.profession" :options="pagedata.professionList"></v-select>            
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">民族</label>
        <div class="col-md-3">
            <v-select label="text" :searchable="true" placeholder="请选择民族" v-model="basicInfo.nationality" :options="pagedata.nationalityList"></v-select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">出生日期</label>
        <div class="col-md-2">            
            <date-picker :date="birthday" :option="option" :limit="limit" v-model="basicInfo.birthday" class="from-control"></date-picker>
        </div>
    </div>
    <div class="form-group" id="birthPlace">
        <label class="control-label col-md-2">出生地</label>
        <location-picker :location="birthPlace" :grade="2" :className="'col-md-2'"></location-picker>
    </div>
    <div class="form-group" id="addressPlace">
        <label class="control-label col-md-2">家庭住址</label>
        <location-picker :location="address" :grade="4" :className="'col-md-2'"></location-picker>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">详细住址</label>
        <div class="col-md-6">
            <textarea class="form-control" name="address" rows="4" v-model="basicInfo.address"></textarea>
            <span class="help-block"> 填写患者详细家庭住址 </span>
        </div>
    </div>    
  </div>
</template>

<script>
import moment from 'moment';
import vDatepicker from 'vue-datepicker';
import vSelect from 'vue-select';
import utils from '@/utils/utils';
import locationPicker from '@/components/location_picker/location_picker';

export default {
    name: 'basic_info',
    props: {
        pagedata: {
            type: Object
        }
    },
    data () {
        return {
            basicInfo: {
                admissionNum: "1234567890",
                bedNum: "A楼310室10号床",
                doctor: "",
                recorder: "",
                name: "李鹏",
                medicalCardNum: "A32620985",
                idNum: "42063019880722040",
                cellphone1: "15424765412",
                cellphone2: "17754234489",
                telephone: "027-87563354",
                gender: "0",
                nationality: "",
                birthProvince: "湖北省",
                birthCity: "武汉市",
                birthday: "1990-06-01",
                profession: "",
                addressProvince: "湖北省",
                addressCity: "武汉市",
                addressArea: "洪山区",
                addressTown: "珞南街道",
                address: "湖北省武汉市洪山区南湖山庄20栋3单元"
            },
            //datePicker
            option: utils.datepickerOption,
            limit: [{
                type: 'fromto',
                from: '',
                to: (new Date()).toUTCString()
            }],
            birthday: {
                time:''
            },
            birthPlace: {
                province: '',
                city: ''
            },
            address: {
                province: '',
                city: '',
                area: '',
                town: ''
            }
        }
    },    
    watch: {
        'birthday':{
            handler: 'updateBirthday',
            deep: true
        },
        'birthPlace':{
            handler: 'updateBirthPlace',
            deep: true
        },
        'address':{
            handler: 'updateAddress',
            deep: true
        }
    },
    created () {        
        this.birthday.time = this.basicInfo.birthday;
        this.birthPlace.province = this.basicInfo.birthProvince;
        this.birthPlace.city = this.basicInfo.birthCity;
        this.address.province = this.basicInfo.addressProvince;
        this.address.city = this.basicInfo.addressCity;
        this.address.area = this.basicInfo.addressArea;
        this.address.town = this.basicInfo.addressTown;        
    },
    methods: {
        updateBirthday (val, oldVal) {
            this.basicInfo.birthday = val.time;
        },
        updateBirthPlace (val, oldVal) {
            this.basicInfo.birthProvince = val.province;
            this.basicInfo.birthCity = val.city;
        },
        updateAddress (val, oldVal) {
            this.basicInfo.addressProvince = val.province;
            this.basicInfo.addressCity = val.city;
            this.basicInfo.addressArea = val.area;
            this.basicInfo.addressTown = val.town;
        }
    },
    components: {
        'date-picker': vDatepicker,
        locationPicker,
        vSelect,
    }
}
</script>

<style lang="stylus" scoped>

</style>