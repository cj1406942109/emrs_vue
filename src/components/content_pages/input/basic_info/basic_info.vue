<template>
  <div class="basic-info">
    <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('name')}">姓名<span class="required"> * </span></label>
        <div class="col-md-2" :class="{ 'control': true }">
            <input v-validate="'required'" :class="{'input': true, 'border-red': errors.has('name') }" class="form-control" name="name" v-model="basicInfo.name">
            <span v-show="errors.has('name')" class="help-block font-red">{{ errors.first('name') }}</span>
            <span class="help-block" :class="{'font-red':errors.has('name')}"> 填写患者姓名 </span>
        </div>
    </div>   
    <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('medical_card_number')}">就诊卡号<span class="required"> * </span></label>
        <div class="col-md-4" :class="{ 'control': true }">
            <input v-validate="'required|digits:10'" :class="{'input': true, 'border-red': errors.has('medical_card_number') }" class="form-control" name="medical_card_number" v-model="basicInfo.medicalCardNum">
            <span v-show="errors.has('medical_card_number')" class="help-block font-red">{{ errors.first('medical_card_number') }}</span>
            <span class="help-block" :class="{'font-red':errors.has('medical_card_number')}"> 填写患者就诊卡号 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('id_number')}">身份证号<span class="required"> * </span></label>
        <div class="col-md-4">
            <input v-validate="{required: true, regex: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/}" :class="{'input': true, 'border-red': errors.has('id_number') }" class="form-control" name="id_number" v-model="basicInfo.idNum">
            <span v-show="errors.has('id_number')" class="help-block font-red">{{ errors.first('id_number') }}</span>
            <span class="help-block" :class="{'font-red':errors.has('id_number')}"> 填写患者身份证号 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('cellphone_1')||errors.has('cellphone_2')||errors.has('telephone')}">联系方式<span class="required"> * </span></label>
        <div class="col-md-3">
            <input v-validate="{required:phone23, regex:/^1[34578]\d{9}$/}" :class="{'input': true, 'border-red': errors.has('cellphone_1')}" class="form-control" name="cellphone_1" v-model="basicInfo.cellphone1">
            <span v-show="errors.has('cellphone_1')" class="help-block font-red">{{ errors.first('cellphone_1') }}</span>
            <span class="help-block" :class="{'font-red':errors.has('cellphone_1')}"> 填写患者手机号1 </span>
        </div>
        <div class="col-md-3">
            <input v-validate="{required:phone13, regex:/^1[34578]\d{9}$/}" :class="{'input': true, 'border-red': errors.has('cellphone_2')}" class="form-control" name="cellphone_2" v-model="basicInfo.cellphone2">
            <span v-show="errors.has('cellphone_2')" class="help-block font-red">{{ errors.first('cellphone_2') }}</span>
            <span class="help-block" :class="{'font-red':errors.has('cellphone_2')}"> 填写患者手机号2 </span>
        </div>
        <div class="col-md-3">
            <input v-validate="{required:phone12}" :class="{'input': true, 'border-red': errors.has('telephone') }" class="form-control" name="telephone" v-model="basicInfo.telephone">
            <span v-show="errors.has('telephone')" class="help-block font-red">{{ errors.first('telephone') }}</span>
            <span class="help-block" :class="{'font-red':errors.has('telephone')}"> 填写患者固定电话 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('gender')}">性别<span class="required"> * </span></label>
        <div class="col-md-4">
            <div>
                <label><radio v-validate="{radioRequired: basicInfo.gender}" :class="{'input': true, 'border-red': errors.has('gender') }" data-vv-delay="500" value="男" v-model="basicInfo.gender" name="gender">男</radio></label>
                <label><radio v-validate="{radioRequired: basicInfo.gender}" :class="{'input': true, 'border-red': errors.has('gender') }" data-vv-delay="500" value="女" v-model="basicInfo.gender" name="gender">女</radio></label>
            </div>
            <span v-show="errors.has('gender')" class="help-block font-red">{{ errors.first('gender') }}</span>
        </div>        
    </div>            
    <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('age')}">年龄<span class="required"> * </span></label>
        <div class="col-md-3">
            <input v-validate="{required:true,numeric:true,min_value:0,max_value:200}" :class="{'input': true, 'border-red': errors.has('age') }" class="form-control" name="age" v-model="basicInfo.age">
            <span v-show="errors.has('age')" class="help-block font-red">{{ errors.first('age') }}</span>
            <span class="help-block" :class="{'font-red':errors.has('age')}"> 填写患者年龄 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('admission_num')}">住院号<span class="required"> * </span></label>
        <div class="col-md-3">
            <input v-validate="{required:true}" :class="{'input': true, 'border-red': errors.has('admission_num') }" class="form-control" name="admission_num" v-model="basicInfo.admissionNum">
            <span v-show="errors.has('admission_num')" class="help-block font-red">{{ errors.first('admission_num') }}</span>
            <span class="help-block" :class="{'font-red':errors.has('admission_num')}"> 填写患者住院号 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('bed_num')}">床位号<span class="required"> * </span></label>
        <div class="col-md-3">
            <input v-validate="{required:true}" :class="{'input': true, 'border-red': errors.has('bed_num') }" class="form-control" name="bed_num" v-model="basicInfo.bedNum">
            <span v-show="errors.has('bed_num')" class="help-block font-red">{{ errors.first('bed_num') }}</span>
            <span class="help-block" :class="{'font-red':errors.has('bed_num')}"> 填写患者床位号 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('doctor')}">主治医生<span class="required"> * </span></label>
        <div class="col-md-3">
            <select v-validate="{required:true}" name="doctor" :class="{'input': true, 'border-red': errors.has('doctor') }" class="form-control" v-model="basicInfo.doctor">
                <option :value="null" disabled selected>请选择主治医生</option>
                <option v-for="doctor in doctorList" :key="doctor.id" :value="doctor">{{doctor.name}}</option>
            </select>
            <span v-show="errors.has('doctor')" class="help-block font-red">{{ errors.first('doctor') }}</span>
        </div>
    </div>
    <!-- <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('recorder')}">记录者<span class="required"> * </span></label>
        <div class="col-md-3">
            <select v-validate="{required:true}" name="recorder" :class="{'input': true, 'border-red': errors.has('recorder') }" class="form-control" v-model="basicInfo.recorder">
                <option :value="null" disabled selected>请选择记录者</option>
                <option v-for="recorder in recorderList" :key="recorder.id" :value="recorder">{{recorder.name}}</option>
            </select>
            <span v-show="errors.has('recorder')" class="help-block font-red">{{ errors.first('recorder') }}</span>
        </div>
    </div> -->
    <div class="form-group">
        <label class="control-label col-md-2" :class="{'font-red':errors.has('recorder')}">记录者<span class="required"> * </span></label>
        <div class="col-md-3">
            <input v-validate="{required:true}" :class="{'input': true, 'border-red': errors.has('recorder') }" class="form-control" name="recorder" v-model="basicInfo.recorder">
            <span v-show="errors.has('recorder')" class="help-block font-red">{{ errors.first('recorder') }}</span>
            <span class="help-block" :class="{'font-red':errors.has('recorder')}"> 填写记录者 </span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">职业</label>
        <div class="col-md-3">
            <select name="profession" class="form-control" v-model="basicInfo.profession">
                <option value="" disabled selected>请选择职业</option>
                <option v-for="profession in staticIndex.professionList" :key="profession.id" :value="profession.id">{{profession.text}}</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">民族</label>
        <div class="col-md-3">
            <select name="nationality" class="form-control" v-model="basicInfo.nationality">
                <option value="" disabled selected>请选择职业</option>
                <option v-for="nationality in staticIndex.nationalityList" :key="nationality.id" :value="nationality.id">{{nationality.text}}</option>
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
            },
            dict: {
                zh_CN: {
                    attributes: {
                        name: '姓名',
                        medical_card_number: '就诊卡号',
                        id_number: '身份证号',
                        cellphone_1: '手机号1',
                        cellphone_2: '手机号2',
                        telephone: '固定电话',
                        gender: '性别',
                        age: '年龄',
                        admission_num: '住院号',
                        bed_num: '床位号',
                        doctor: '主治医生',
                        recorder: '记录者'
                    },
                    custom: {
                        cellphone_1: {
                            required: ()=>"至少填写一个联系方式."
                        },
                        cellphone_2: {
                            required: ()=>"至少填写一个联系方式."
                        },
                        telephone: {
                            required: ()=>"至少填写一个联系方式."
                        }
                    }
                }
            },
            radioRequired: {
                messages: {
                    zh_CN: (field, args) => {
                        return `${field} 是必须的.`
                    }
                },
                validate(value, args) {
                    if(args.length){
                        if(args[0]!==''){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return false;
                    }
                }
            }
        }
    },
    computed: {
        staticIndex () {
            return this.$store.state.staticIndex;
        },
        doctorList () {
            return this.$store.state.doctorList;
        },
        recorderList () {
            return this.$store.state.recorderList;
        },
        phone12 () {
            return this.basicInfo.cellphone1===''&&this.basicInfo.cellphone2==='';
        },
        phone13 () {
            return this.basicInfo.cellphone1===''&&this.basicInfo.telephone==='';
        },
        phone23 () {
            return this.basicInfo.cellphone2===''&&this.basicInfo.telephone==='';
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
        },
        '$route' (val) {
            if(val.path.indexOf('edit')>=0){
                let vm = this;
                setTimeout(function(){
                    vm.birthday = {time: vm.basicInfo.birthday};
                    vm.birthPlace = {province: vm.basicInfo.birthProvince, city: vm.basicInfo.birthCity};
                    vm.address = {province:vm.basicInfo.addressProvince, city:vm.basicInfo.addressCity, area:vm.basicInfo.addressArea, town:vm.basicInfo.addressTown};
                },300);
            }
        }
    },
    created () {        
        let vm = this;
        setTimeout(function(){
            vm.birthday = {time: vm.basicInfo.birthday};
            vm.birthPlace = {province: vm.basicInfo.birthProvince, city: vm.basicInfo.birthCity};
            vm.address = {province:vm.basicInfo.addressProvince, city:vm.basicInfo.addressCity, area:vm.basicInfo.addressArea, town:vm.basicInfo.addressTown};
        },300);  
        
        this.$validator.updateDictionary(this.dict);
        this.$validator.extend('radioRequired', this.radioRequired);
    },
    inject: {
        $validator: '$validator'    //获取父组件的validator实例，将子组件验证的属性注册到该实例上
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
        },
        updateSex () {

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