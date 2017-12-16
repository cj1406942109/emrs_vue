<template>
  <div class="input">
    <div class="page-bar">
        <ul class="page-breadcrumb">
            <li>
                <span>Framingham Risk Score Calculator</span>
                <i class="fa fa-circle"></i>
            </li>
            <li>
                <router-link to="/home/frs_input">Input Data</router-link>
            </li>
        </ul>
        <div class="page-toolbar">
            <div class="btn-group pull-right">
                <button type="button" class="btn green btn-outline btn-sm dropdown-toggle" data-toggle="dropdown"> Actions
                    <i class="fa fa-angle-down"></i>
                </button>
                <ul class="dropdown-menu pull-right" role="menu">
                    <li class="divider"> </li>
                    <li>
                        <a href="javascritp:;" @click="checkData()"><i class="fa fa-floppy-o" aria-hidden="true"></i> Save Data</a> 
                    </li>
                    <li>
                        <a href="javascritp:;" @click="resetData()"><i class="fa fa-floppy-o" aria-hidden="true"></i> Reset Data</a> 
                    </li>
                </ul>
            </div>
        </div>            
    </div>
    <h1 class="page-title"> Framingham Risk Score Calculator
        <small>Enter all the fields below</small>        
    </h1>  
    <div class="row">
        <div class="col-md-6">
            <div class="portlet box blue">
                <div class="portlet-title">
                    <div class="caption">Patient Information</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">     
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Patient ID</label>
                        <div class="col-md-8">
                            <input class="form-control input-inline" v-model="patientInfo.id">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Name</label>
                        <div class="col-md-8">
                            <input class="form-control input-inline" v-model="patientInfo.name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('age')}">Age</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true}" :class="{'input': true, 'border-red': errors.has('age')}" class="form-control input-inline" min="20" max="79" v-model="patientInfo.age" name="age">
                            <span v-show="errors.has('age')" class="help-block font-red">{{ errors.first('age') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Sex</label>
                        <div class="col-md-8">
                            <select class="form-control input-inline" v-model="patientInfo.sex">
                                <option value="" disabled selected>--select--</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('phone')}">Phone Number</label>
                        <div class="col-md-8">
                            <input v-validate="{regex:/^1[34578]\d{9}$/}" :class="{'input': true, 'border-red': errors.has('phone')}" class="form-control input-inline" v-model="patientInfo.phone" name="phone">
                            <span v-show="errors.has('phone')" class="help-block font-red">{{ errors.first('phone') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Smoke</label>
                        <div class="col-md-8">
                            <select class="form-control input-inline" v-model="patientInfo.smoke">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('tc')}">TC</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true}" :class="{'input': true, 'border-red': errors.has('tc')}" class="form-control input-inline" v-model="patientInfo.TC" name="tc">
                            <span class="help-inline" :class="{'font-red':errors.has('tc')}">mg/dL</span>
                            <span v-show="errors.has('tc')" class="help-block font-red">{{ errors.first('tc') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('hdl-c')}">HDL-C</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true}" :class="{'input': true, 'border-red': errors.has('hdl-c')}" class="form-control input-inline" v-model="patientInfo.HDL_C" name="hdl-c">
                            <span class="help-inline" :class="{'font-red':errors.has('hdl-c')}">mg/dL</span>
                            <span v-show="errors.has('hdl-c')" class="help-block font-red">{{ errors.first('hdl-c') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('sbp')}">SBP</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true}" :class="{'input': true, 'border-red': errors.has('sbp')}" class="form-control input-inline" v-model="patientInfo.SBP" name="sbp">
                            <span class="help-inline" :class="{'font-red':errors.has('sbp')}">mmHg</span>
                            <span v-show="errors.has('sbp')" class="help-block font-red">{{ errors.first('sbp') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Is SBP treated</label>
                        <div class="col-md-8">
                            <select class="form-control input-inline" v-model="patientInfo.SBP_Treated">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Address</label>
                        <div class="col-md-7">
                            <textarea rows="3" class="form-control" v-model="patientInfo.address"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Other</label>
                        <div class="col-md-7">
                            <textarea rows="3" class="form-control" v-model="patientInfo.other"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="portlet box green-dark">
                <div class="portlet-title">
                    <div class="caption">Result</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal"> 
                    <div class="form-group">
                        <label class="control-label bold col-md-3">Age:</label>
                        <div class="col-md-3">
                            <input class="form-control input-inline" :value="patientInfo.age" disabled>
                        </div>
                        <label class="control-label bold col-md-1">Score:</label>
                        <div class="col-md-3">
                            <input class="form-control input-inline" :value="resultData.ageScore" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-3">TC(mg/dL):</label>
                        <div class="col-md-3">
                            <input class="form-control input-inline" :value="patientInfo.TC" disabled>
                        </div>
                        <label class="control-label bold col-md-1">Score:</label>
                        <div class="col-md-3">
                            <input class="form-control input-inline" :value="resultData.TCScore" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-3">Smoke:</label>
                        <div class="col-md-3">
                            <input class="form-control input-inline" :value="patientInfo.smoke == '1'?'Yes':'No'" disabled>
                        </div>
                        <label class="control-label bold col-md-1">Score:</label>
                        <div class="col-md-3">
                            <input class="form-control input-inline" :value="resultData.smokeScore" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-3">HDL-C(mg/dL):</label>
                        <div class="col-md-3">
                            <input class="form-control input-inline" :value="patientInfo.HDL_C" disabled>
                        </div>
                        <label class="control-label bold col-md-1">Score:</label>
                        <div class="col-md-3">
                            <input class="form-control input-inline" :value="resultData.HDL_CScore" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-3">SBP(mmHg):</label>
                        <div class="col-md-3">
                            <input class="form-control input-inline" type="number" :value="patientInfo.SBP" disabled>
                        </div>
                        <label class="control-label bold col-md-1">Score:</label>
                        <div class="col-md-3">
                            <input class="form-control input-inline" :value="resultData.SBPScore" disabled>
                        </div>
                    </div>   
                    <div class="form-group">
                        <label class="control-label col-md-6 font-red bold">Total Score</label>
                         <div class="col-md-6">
                            <input class="form-control input-inline bold" :value="resultData.totalScore" disabled>
                        </div>
                    </div>                                                                          
                    <div class="form-group">
                        <label class="control-label col-md-6 font-red bold">Framingham Risk Score</label>
                         <div class="col-md-6">
                            <input class="form-control input-inline bold" :value="resultData.FRScore" disabled>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <sweet-modal ref="saveDataConfirm" icon="warning">
        Save the input data and the result data?
        <sweet-button class="btn red" slot="button" v-on:click="$refs.saveDataConfirm.close()">取消</sweet-button>
        <sweet-button class="btn green" slot="button" v-on:click="SaveData()">确定</sweet-button>
    </sweet-modal>
    <sweet-modal ref="dataError" icon="error" :blocking="true" :hide-close-button="false">
        {{errorMessage}}
    </sweet-modal>
    <sweet-modal ref="dataSaving" icon="success" :blocking="true" :hide-close-button="true">
        {{successMsg}}
    </sweet-modal>    
  </div>
</template>

<script>
import SweetButton from 'sweet-modal-vue/docs/components/Button';
import utils from '@/utils/utils';
import config from '@/config';
import _ from 'lodash';

export default {
    data () {
        return {
            patientInfo: {
                id: '',
                name: '',
                age: '',
                sex: '',
                phone: '',
                smoke: '',
                TC: '',
                HDL_C: '',
                SBP: '',
                SBP_Treated: '',
                address: '',
                other: ''
            },
            errorMessage: '',
            successMsg: 'Saving your data, please wait for a while……'
        }
    },
    computed: {
        resultData: function() {
            let returnValue = {};

            this.$set(returnValue, 'ageScore',setAgeScore(this.patientInfo, this.$validator));
            this.$set(returnValue, 'TCScore',setTCScore(this.patientInfo, this.$validator));
            this.$set(returnValue, 'smokeScore',setSmokeScore(this.patientInfo, this.$validator));
            this.$set(returnValue, 'HDL_CScore',setHDL_CScore(this.patientInfo, this.$validator));
            this.$set(returnValue, 'SBPScore',setSBPScore(this.patientInfo, this.$validator));
            this.$set(returnValue, 'totalScore',setTotalScore(returnValue));
            this.$set(returnValue, 'FRScore',setFRScore(this.patientInfo, returnValue.totalScore));

            function setAgeScore(patientInfo, validator) {
                if(!validator.errors.has('age') && !_.isEmpty(patientInfo.age) && !_.isEmpty(patientInfo.sex)){
                    let age = parseInt(patientInfo.age);
                    let returnScore = '';
                    if(age>=20 && age<=34){
                        switch (patientInfo.sex.toUpperCase()) {
                            case 'M':
                                returnScore = -9;
                                break;
                            case 'F':
                                returnScore = -7;
                                break;
                        }
                    } else if(age>=20 && age<=34){
                        switch (patientInfo.sex.toUpperCase()) {
                            case 'M':
                                returnScore = -9;
                                break;
                            case 'F':
                                returnScore = -7;
                                break;
                        }
                    } else if(age>=35 && age<=39){
                        switch (patientInfo.sex.toUpperCase()) {
                            case 'M':
                                returnScore = -4;
                                break;
                            case 'F':
                                returnScore = -3;
                                break;
                        }
                    } else if(age>=40 && age<=44){
                        returnScore = 0;
                    } else if(age>=45 && age<=49){
                        returnScore = 3;
                    } else if(age>=50 && age<=54){
                        returnScore = 6;
                    } else if(age>=55 && age<=59){
                        returnScore = 8;
                    } else if(age>=60 && age<=64){
                        returnScore = 10;
                    } else if(age>=65 && age<=69){
                        switch (patientInfo.sex.toUpperCase()) {
                            case 'M':
                                returnScore = 11;
                                break;
                            case 'F':
                                returnScore = 12;
                                break;
                        }
                    } else if(age>=70 && age<=74){
                        switch (patientInfo.sex.toUpperCase()) {
                            case 'M':
                                returnScore = 12;
                                break;
                            case 'F':
                                returnScore = 14;
                                break;
                        }
                    } else if(age>=75 && age<=79){
                        switch (patientInfo.sex.toUpperCase()) {
                            case 'M':
                                returnScore = 13;
                                break;
                            case 'F':
                                returnScore = 16;
                                break;
                        }
                    }
                    return returnScore;
                } else {
                    return '';
                }
            }
            function setTCScore(patientInfo, validator) {
                if(!validator.errors.has('age') && !_.isEmpty(patientInfo.age) && !_.isEmpty(patientInfo.sex) && !_.isEmpty(patientInfo.TC)){
                    let age = parseInt(patientInfo.age);
                    let TC = parseInt(patientInfo.TC);
                    let returnScore = '';
                    if (TC < 160){
                        returnScore = 0;
                    } else if(TC>=160 && TC<=199){
                        if(age>=20 && age<=39){
                            returnScore = 4;
                        } else if(age>=40 && age<=49){
                            returnScore = 3;
                        } else if(age>=50 && age<=59){
                            returnScore = 2;
                        } else if(age>=60 && age<=69){
                            returnScore = 1;
                        } else if(age>=70 && age<=79){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 0;
                                    break;
                                case 'F':
                                    returnScore = 1;
                                    break;
                            }
                        }
                    } else if(TC>=200 && TC<=239){
                        if(age>=20 && age<=39){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 7;
                                    break;
                                case 'F':
                                    returnScore = 8;
                                    break;
                            }
                        } else if(age>=40 && age<=49){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 5;
                                    break;
                                case 'F':
                                    returnScore = 6;
                                    break;
                            }
                        } else if(age>=50 && age<=59){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 3;
                                    break;
                                case 'F':
                                    returnScore = 4;
                                    break;
                            }
                        } else if(age>=60 && age<=69){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 1;
                                    break;
                                case 'F':
                                    returnScore = 2;
                                    break;
                            }
                        } else if(age>=70 && age<=79){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 0;
                                    break;
                                case 'F':
                                    returnScore = 1;
                                    break;
                            }
                        } 
                    } else if(TC>=240 && TC<=279){
                        if(age>=20 && age<=39){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 9;
                                    break;
                                case 'F':
                                    returnScore = 11;
                                    break;
                            }
                        } else if(age>=40 && age<=49){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 6;
                                    break;
                                case 'F':
                                    returnScore = 8;
                                    break;
                            }
                        } else if(age>=50 && age<=59){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 4;
                                    break;
                                case 'F':
                                    returnScore = 5;
                                    break;
                            }
                        } else if(age>=60 && age<=69){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 2;
                                    break;
                                case 'F':
                                    returnScore = 3;
                                    break;
                            }
                        } else if(age>=70 && age<=79){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 1;
                                    break;
                                case 'F':
                                    returnScore = 2;
                                    break;
                            }
                        } 
                    } else if(TC>=280){
                        if(age>=20 && age<=39){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 11;
                                    break;
                                case 'F':
                                    returnScore = 13;
                                    break;
                            }
                        } else if(age>=40 && age<=49){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 8;
                                    break;
                                case 'F':
                                    returnScore = 10;
                                    break;
                            }
                        } else if(age>=50 && age<=59){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 5;
                                    break;
                                case 'F':
                                    returnScore = 7;
                                    break;
                            }
                        } else if(age>=60 && age<=69){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 3;
                                    break;
                                case 'F':
                                    returnScore = 4;
                                    break;
                            }
                        } else if(age>=70 && age<=79){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 1;
                                    break;
                                case 'F':
                                    returnScore = 2;
                                    break;
                            }
                        } 
                    }
                    return returnScore;
                } else {
                    return '';
                }
            }
            function setSmokeScore(patientInfo, validator) {
                if(!validator.errors.has('age') && !_.isEmpty(patientInfo.age) && !_.isEmpty(patientInfo.sex) && !_.isEmpty(patientInfo.smoke)){
                    let age = parseInt(patientInfo.age);
                    let isSmoke = patientInfo.smoke === '1';
                    let returnScore = '';
                    if (isSmoke){
                        if(age>=20 && age<=39){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 8;
                                    break;
                                case 'F':
                                    returnScore = 9;
                                    break;
                            }
                        } else if(age>=40 && age<=49){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 5;
                                    break;
                                case 'F':
                                    returnScore = 7;
                                    break;
                            }
                        } else if(age>=50 && age<=59){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 3;
                                    break;
                                case 'F':
                                    returnScore = 4;
                                    break;
                            }
                        } else if(age>=60 && age<=69){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 1;
                                    break;
                                case 'F':
                                    returnScore = 2;
                                    break;
                            }
                        } if(age>=70 && age<=79){                       
                            returnScore = 1;
                        } 
                    } else {
                        returnScore = 0;
                    }
                    return returnScore;
                } else {
                    return '';
                }
            }
            function setHDL_CScore(patientInfo, validator) {
                if(!_.isEmpty(patientInfo.HDL_C)){
                    let HDL_C = parseInt(patientInfo.HDL_C);
                    let returnScore = '';
                    if(HDL_C < 40) {
                        returnScore = 2;
                    } else if (HDL_C >= 40 && HDL_C <= 49){
                        returnScore = 1;
                    } else if (HDL_C >= 50 && HDL_C <= 59){
                        returnScore = 0;
                    } else if (HDL_C >= 60){
                        returnScore = -1;
                    }
                    return returnScore;
                } else {
                    return '';
                }
            }
            function setSBPScore(patientInfo, validator) {
                if(!_.isEmpty(patientInfo.SBP) && !_.isEmpty(patientInfo.SBP_Treated) && !_.isEmpty(patientInfo.sex)){
                    let SBP = parseInt(patientInfo.SBP);
                    let isSBPTreated = patientInfo.SBP_Treated === '1';
                    let returnScore = '';
                    if(SBP < 120){
                        returnScore = 0;
                    } else if(SBP >= 120 && SBP <= 129){
                        if(isSBPTreated){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 1;
                                    break;
                                case 'F':
                                    returnScore = 3;
                                    break;
                            }
                        } else {
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 0;
                                    break;
                                case 'F':
                                    returnScore = 1;
                                    break;
                            }
                        }
                    } else if(SBP >= 130 && SBP <= 139){
                        if(isSBPTreated){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 2;
                                    break;
                                case 'F':
                                    returnScore = 4;
                                    break;
                            }
                        } else {
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 1;
                                    break;
                                case 'F':
                                    returnScore = 2;
                                    break;
                            }
                        }
                    } else if(SBP >= 140 && SBP <= 159){
                        if(isSBPTreated){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 2;
                                    break;
                                case 'F':
                                    returnScore = 5;
                                    break;
                            }
                        } else {
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 1;
                                    break;
                                case 'F':
                                    returnScore = 3;
                                    break;
                            }
                        }
                    } else if(SBP >= 160){
                        if(isSBPTreated){
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 3;
                                    break;
                                case 'F':
                                    returnScore = 6;
                                    break;
                            }
                        } else {
                            switch (patientInfo.sex.toUpperCase()) {
                                case 'M':
                                    returnScore = 2;
                                    break;
                                case 'F':
                                    returnScore = 4;
                                    break;
                            }
                        }
                    }
                    return returnScore;
                } else {
                    return '';
                }
            }
            function setTotalScore(returnValue) {
                if(returnValue.ageScore ==='' || returnValue.TCScore==='' || returnValue.smokeScore==='' || returnValue.HDL_CScore==='' || returnValue.SBPScore===''){
                    return '';
                } else {
                    return returnValue.ageScore + returnValue.TCScore + returnValue.smokeScore + returnValue.HDL_CScore + returnValue.SBPScore;
                }
            }
            function setFRScore(patientInfo, totalScore){
                if( totalScore!='' && !_.isEmpty(patientInfo.sex)){
                    let resultValue = '';
                    switch (patientInfo.sex.toUpperCase()) {
                        case 'M':
                            if(totalScore<0){
                                resultValue = '<1';
                            } else if(totalScore>0 && totalScore<5){
                                resultValue = '1';
                            } else if(totalScore>4 && totalScore<7){
                                resultValue = '2';
                            } else if(totalScore===7){
                                resultValue = '3';
                            } else if(totalScore===8){
                                resultValue = '4';
                            } else if(totalScore===9){
                                resultValue = '5';
                            } else if(totalScore===10){
                                resultValue = '6';
                            } else if(totalScore===11){
                                resultValue = '8';
                            } else if(totalScore===12){
                                resultValue = '10';
                            } else if(totalScore===13){
                                resultValue = '12';
                            } else if(totalScore===14){
                                resultValue = '16';
                            } else if(totalScore===15){
                                resultValue = '20';
                            } else if(totalScore===16){
                                resultValue = '25';
                            } else if(totalScore > 16){
                                resultValue = '≥30';
                            }
                            break;
                        case 'F':
                            if(totalScore<9){
                                resultValue = '<1';
                            } else if(totalScore>8 && totalScore<13){
                                resultValue = '1';
                            } else if(totalScore>12 && totalScore<15){
                                resultValue = '2';
                            } else if(totalScore===15){
                                resultValue = '3';
                            } else if(totalScore===16){
                                resultValue = '4';
                            } else if(totalScore===17){
                                resultValue = '5';
                            } else if(totalScore===18){
                                resultValue = '6';
                            } else if(totalScore===19){
                                resultValue = '8';
                            } else if(totalScore===20){
                                resultValue = '11';
                            } else if(totalScore===21){
                                resultValue = '14';
                            } else if(totalScore===22){
                                resultValue = '17';
                            } else if(totalScore===23){
                                resultValue = '22';
                            } else if(totalScore===24){
                                resultValue = '27';
                            } else if(totalScore > 25){
                                resultValue = '≥30';
                            }
                            break;
                    }
                    return resultValue + '%';
                } else {
                    return '';
                }
            }
            return returnValue;
        }
    },
    methods: {
        resetData () {
            let resetInfo = this.patientInfo;
            resetInfo.id = '';
            resetInfo.name = '';
            resetInfo.age = '';
            resetInfo.sex = '';
            resetInfo.phone = '';
            resetInfo.smoke = '';
            resetInfo.TC = '';
            resetInfo.HDL_C = '';
            resetInfo.SBP = '';
            resetInfo.SBP_Treated = '';
            resetInfo.address = '';
            resetInfo.other = '';
        },
        checkData () {
            if(this.resultData.ageScore===''||this.resultData.TCScore===''||this.resultData.smokeScore===''||this.resultData.HDL_CScore===''||this.resultData.SBPScore===''){
                this.errorMessage = 'Please fill in all the blanks and get the result data!';
                this.$refs.dataError.open();
            }else{
                this.$refs.saveDataConfirm.open();            
            }
        },
        SaveData () {
            this.$refs.saveDataConfirm.close();
            this.$refs.dataSaving.open();         
            this.$http.post(config.apiHost + '/dp/insertFRSPrediction', {prediction: {
                patientInfo: this.patientInfo, 
                resultData: this.resultData, 
                userId: JSON.parse(sessionStorage.getItem('user'))._id,
                createTime: '',
                lastUpdateTime: ''
            }}).then(response => {
                let responseData = response.body;
                if (responseData.status) {
                    this.successMsg = 'Save your data successfully';
                    var dataSavingModal = this.$refs.dataSaving;
                    setTimeout(function () {
                        dataSavingModal.close();
                    },1500);
                } else {
                    this.$refs.dataSaving.close();
                    this.errorMessage = 'Save your data failed, please try again!';
                    this.$refs.dataError.open();
                }
            }, response => {
                this.$refs.dataSaving.close();
                this.errorMessage = 'Save your data failed, please try again!';
                this.$refs.dataError.open();
            });
        }
    },
    components: {
        SweetButton
    },
    mounted () {
        utils.handleSidebarAndContentHeight();
        utils.handleGoTop();
    }
}
</script>

<style lang="stylus" scoped>
    .index
        .input-inline
            max-width 100%
    .result-input
        max-width: 100px
</style>