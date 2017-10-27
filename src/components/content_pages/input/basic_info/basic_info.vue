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
            <div>
                <label><radio value="男" v-model="basicInfo.gender" name="gender">男</radio></label>
                <label><radio value="女" v-model="basicInfo.gender" name="gender">女</radio></label>
            </div>
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
            <select name="body_part_name" class="form-control" v-model="basicInfo.doctor">
                <option :value="{}" disabled selected>请选择主治医生</option>
                <option v-for="doctor in pagedata.doctorList" :key="doctor.id" :value="doctor">{{doctor.name}}</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">记录者<span class="required"> * </span></label>
        <div class="col-md-3">
            <select name="body_part_name" class="form-control" v-model="basicInfo.recorder">
                <option :value="{}" disabled selected>请选择记录者</option>
                <option v-for="recorder in pagedata.recorderList" :key="recorder.id" :value="recorder">{{recorder.name}}</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">职业</label>
        <div class="col-md-3">
            <select name="body_part_name" class="form-control" v-model="basicInfo.profession">
                <option value="" disabled selected>请选择职业</option>
                <option v-for="profession in pagedata.professionList" :key="profession.id" :value="profession.id">{{profession.text}}</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">民族</label>
        <div class="col-md-3">
            <select name="body_part_name" class="form-control" v-model="basicInfo.nationality">
                <option value="" disabled selected>请选择职业</option>
                <option v-for="nationality in pagedata.nationalityList" :key="nationality.id" :value="nationality.id">{{nationality.text}}</option>
            </select>
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
import vDatepicker from 'vue-datepicker';
import {Radio} from 'vue-checkbox-radio';
import utils from '@/utils/utils';
import locationPicker from '@/components/location_picker/location_picker';

export default {
    name: 'basic_info',
    props: {
        pagedata: {
            type: Object
        },
        basicInfo: {
            type: Object
        }
    },
    data () {
        return {
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
        Radio
    }
}
</script>

<style lang="stylus" scoped>

</style>