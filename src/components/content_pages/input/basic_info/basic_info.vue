<template>
  <div class="basic-info">
      {{basicInfo}}
    <div class="form-group">
        <label class="control-label col-md-2">姓名<span class="required"> * </span></label>
        <div class="col-md-4">
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
        <div class="col-md-4">
            <select name="doctor" id="doctor_list" class="form-control" v-model="basicInfo.doctorId">
                <option value="1">1</option>                                                                    
                <option value="2">2</option>                                                                    
                <option value="3">3</option>                                                                    
                <option value="4">4</option>                                                                    
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">记录者<span class="required"> * </span></label>
        <div class="col-md-4">
            <select name="recorder" id="recorder_list" class="form-control" v-model="basicInfo.recorderId">
                <option value="1">1</option>                                                                    
                <option value="2">2</option>                                                                    
                <option value="3">3</option>                                                                    
                <option value="4">4</option>                                                                    
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">民族</label>
        <div class="col-md-4">
            <select name="nationality" id="nationality_list" class="form-control" v-model="basicInfo.nationality">
                <option value="汉族">汉族</option>                                                                    
                <option value="回族">回族</option>                                                                    
            </select>
        </div>
    </div>
    <div class="form-group" id="birthPlace">
        <label class="control-label col-md-2">出生地</label>
        <div class="col-md-2">
            <select name="province" id="birth_province" class="form-control"></select>
            <span class="help-block">  </span>
        </div>
        <div class="col-md-2">
            <select name="city" id="birth_city" class="form-control"></select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">出生日期</label>
        <div class="col-md-4">
            <!-- <div class="input-group input-block date date-picker" id="birthday">
                <input type="text" class="form-control" readonly>
                <span class="input-group-btn"><button class="btn default" type="button"><i class="fa fa-calendar"></i></button></span>
            </div> -->
            <date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">职业</label>
        <div class="col-md-4">
            <select name="profession" id="profession_list" class="form-control">
                <option value=""></option>
            </select>
        </div>
    </div>
    <div class="form-group" id="addressPlace">
        <label class="control-label col-md-2">家庭住址</label>
        <div class="col-md-2">
            <select class="form-control" name="province" id="address_province"></select>
            <span class="help-block">  </span>
        </div>
        <div class="col-md-2">
            <select class="form-control" name="city" id="address_city"></select>
            <span class="help-block">  </span>
        </div>
        <div class="col-md-2">
            <select class="form-control" name="area" id="address_area"></select>
            <span class="help-block">  </span>
        </div>
        <div class="col-md-2">
            <select class="form-control" name="town" id="address_town"></select>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-2">详细住址</label>
        <div class="col-md-6">
            <textarea class="form-control" name="address" rows="4"></textarea>
            <span class="help-block"> 填写患者详细家庭住址 </span>
        </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import vDatepicker from 'vue-datepicker';

export default {
    name: 'basic_info',
    data () {
        return {
            basicInfo: {
                admissionNum: "1234567890",
                bedNum: "A楼310室10号床",
                doctorId: "",
                recorderId: "",
                name: "李鹏",
                medicalCardNum: "A32620985",
                idNum: "42063019880722040",
                cellphone1: "15424765412",
                cellphone2: "17754234489",
                telephone: "027-87563354",
                gender: "0",
                nationality: "汉族",
                birthProvince: "湖北省",
                birthCity: "武汉市",
                birthday: "1990-06-01",
                profession: "教师",
                addressProvince: "湖北省",
                addressCity: "武汉市",
                addressArea: "洪山区",
                addressTown: "珞南街道",
                address: "湖北省武汉市洪山区南湖山庄20栋3单元"
            },
            // for Vue 2.0 
            startTime: {
                time: ''
            },
            endtime: {
                time: ''
            },
 
            option: {
                type: 'day',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'YYYY-MM-DD',
                placeholder: 'when?',
                inputStyle: {
                'display': 'inline-block',
                'padding': '6px',
                'line-height': '22px',
                'font-size': '16px',
                'border': '2px solid #fff',
                'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
                'border-radius': '2px',
                'color': '#5F5F5F'
                },
                color: {
                header: '#ccc',
                headerText: '#f00'
                },
                buttons: {
                ok: 'Ok',
                cancel: 'Cancel'
                },
                overlayOpacity: 0.5, // 0.5 as default 
                dismissible: true // as true as default 
            },
            timeoption: {
                type: 'min',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'YYYY-MM-DD HH:mm'
            },
            multiOption: {
                type: 'multi-day',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format:"YYYY-MM-DD HH:mm"
            },
            limit: [{
                type: 'weekday',
                available: [1, 2, 3, 4, 5]
            },
            {
                type: 'fromto',
                from: '2016-02-01',
                to: '2016-02-20'
            }]
        }
    },
    components: {
        'date-picker': vDatepicker
    }
}
</script>

<style lang="stylus" scoped>

</style>