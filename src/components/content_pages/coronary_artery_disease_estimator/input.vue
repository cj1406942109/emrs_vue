<template>
  <div class="input">
    <div class="page-bar">
        <ul class="page-breadcrumb">
            <li>
                <span>Coronary Artery Disease Estimator</span>
                <i class="fa fa-circle"></i>
            </li>
            <li>
                <router-link to="/home/cad_input">Input Data</router-link>
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
                </ul>
            </div>
        </div>            
    </div>
    <h1 class="page-title"> Coronary Artery Disease Estimator
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
                        <label class="control-label bold col-md-4">Gender</label>
                        <div class="col-md-8">
                            <select class="form-control input-inline" v-model="patientInfo.gender">
                                <option value="" disabled selected>--select--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
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
            <div class="portlet box blue">
                <div class="portlet-title">
                    <div class="caption">Symptom</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">     
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Location</label>
                        <div class="col-md-8">
                            <checkbox name="location" value="Substernal" v-model="patientInfo.location">
                                Substernal
                            </checkbox>
                            <checkbox name="location" value="Epigastrium" v-model="patientInfo.location">
                                Epigastrium
                            </checkbox>
                            <checkbox name="location" value="Apex" v-model="patientInfo.location">
                                Apex
                            </checkbox>
                            <checkbox name="location" value="Radiated to the lower jaw or teeth" v-model="patientInfo.location">
                                Radiated to the lower jaw or teeth
                            </checkbox>
                            <checkbox name="location" value="Radiated to the right side of the chest" v-model="patientInfo.location">
                                Radiated to the right side of the chest
                            </checkbox>
                            <checkbox name="location" value="Radiated to the back of the scapular" v-model="patientInfo.location">
                                Radiated to the back of the scapular
                            </checkbox>
                            <checkbox name="location" value="Radiated to arm to the wrist and fingers" v-model="patientInfo.location">
                                Radiated to arm to the wrist and fingers
                            </checkbox>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Characteristic</label>
                        <div class="col-md-8">
                            <checkbox name="characteristic" value="Pressure" v-model="patientInfo.characteristic">
                                Pressure
                            </checkbox>
                            <checkbox name="characteristic" value="Tightness" v-model="patientInfo.characteristic">
                                Tightness
                            </checkbox>
                            <checkbox name="characteristic" value="Burning" v-model="patientInfo.characteristic">
                                Burning
                            </checkbox>
                            <checkbox name="characteristic" value="Strangling" v-model="patientInfo.characteristic">
                                Strangling
                            </checkbox>
                            <checkbox name="characteristic" value="Just discomfort" v-model="patientInfo.characteristic">
                                Just discomfort
                            </checkbox>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Duration</label>
                        <div class="col-md-8">
                            <select class="form-control input-inline" v-model="patientInfo.duration">
                                <option value="" disabled selected>--select--</option>
                                <option value="< 10 minutes">< 10 minutes</option>
                                <option value="> 15 minutes">> 15 minutes</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Precipitation Factors</label>
                        <div class="col-md-8">
                            <checkbox name="precipitationFactors" value="Exertion" v-model="patientInfo.precipitationFactors">
                                Exertion 
                            </checkbox>
                            <checkbox name="precipitationFactors" value="Emotional stress" v-model="patientInfo.precipitationFactors">
                                Emotional stress
                            </checkbox>
                            <checkbox name="precipitationFactors" value="Big meal" v-model="patientInfo.precipitationFactors">
                                Big meal
                            </checkbox>
                            <checkbox name="precipitationFactors" value="At rest" v-model="patientInfo.precipitationFactors">
                                At rest
                            </checkbox>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Relief Factors</label>
                        <div class="col-md-8">
                            <checkbox name="reliefFactors" value="Rest" v-model="patientInfo.reliefFactors">
                                Rest
                            </checkbox>
                            <checkbox name="reliefFactors" value="Nitrates" v-model="patientInfo.reliefFactors">
                                Nitrates
                            </checkbox>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('relieftime')}">Relief Time(minutes)</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true}" :class="{'input': true, 'border-red': errors.has('relieftime')}" class="form-control input-inline" min="1" max="1111" v-model="patientInfo.reliefTime" name="relieftime">
                            <span v-show="errors.has('relieftime')" class="help-block font-red">{{ errors.first('relieftime') }}</span>
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
                        <label class="control-label bold col-md-4">Age:</label>
                        <div class="col-md-8">
                            <input class="form-control input-inline" :value="patientInfo.age" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Gender:</label>
                        <div class="col-md-8">
                            <input class="form-control input-inline" :value="patientInfo.gender" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Symptom status:</label>
                        <div class="col-md-8">
                            <input class="form-control input-inline" :value="resultData.symptomStatus" disabled>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Probability:</label>
                        <div class="col-md-8">
                            <input class="form-control input-inline" :value="resultData.probability" disabled>
                            <span class="help-inline">{{resultData.percent}}</span>
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
import {Checkbox} from 'vue-checkbox-radio';
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
                gender: '',
                phone: '',
                address: '',
                other: '',
                location: [],
                characteristic: [],
                duration: '',
                precipitationFactors: [],
                reliefFactors: [],
                reliefTime: ''
            },
            errorMessage: '',
            successMsg: ''
        }
    },
    computed: {
        resultData: function() {
            let returnValue = {};
            let typical = 'typical';
            let atypical = 'atypical';
            let nonangianl = 'nonangianl';
            let noSymptom = 'no symptom';
            let veryLow = 'very low';
            let low = 'low';
            let intermediate = 'intermediate';
            let high = 'high';

            this.$set(returnValue, 'symptomStatus',setSymptomStatus(this.patientInfo, this.$validator));
            this.$set(returnValue, 'probability',setProbability(this.patientInfo, returnValue.symptomStatus));
            // this.$set(returnValue, 'probability','dd');
            this.$set(returnValue, 'percent',setPercent(returnValue.probability));

            function setSymptomStatus(patientInfo, validator) {
                if (validator.errors.has('relieftime')||validator.errors.has('age')||_.isEmpty(patientInfo.name)){
                    return '';
                }
                let score = 0;
                if(!_.isEmpty(patientInfo.location)){
                    score++;
                }
                if(!_.isEmpty(patientInfo.characteristic)) {
                    score++;
                }
                if(!_.isEmpty(patientInfo.duration)) {
                    score++;
                }
                if(!_.isEmpty(patientInfo.precipitationFactors)) {
                    score++;
                }
                if(!_.isEmpty(patientInfo.reliefFactors)) {
                    let reliefT = parseInt(patientInfo.reliefTime);
                    if(reliefT>=3 && reliefT<=5){
                        score++;
                    }
                }
                if(score>=4&&score<=5) {
                    return typical;
                } else if(score>=2&&score<=3){
                    return atypical;
                } else if(score === 1) {
                    return nonangianl;
                } else if(score === 0){
                    return noSymptom;
                } else {
                    return '';
                }
            }
            function setProbability(patientInfo, symptomStatus) {
                if(_.isEmpty(symptomStatus)) {
                    return '';
                }
                let age = parseInt(patientInfo.age);
                let gender = patientInfo.gender.toUpperCase();
                let male = 'MALE';
                let female = 'FEMALE';
                if(age>=30 && age<=39) {
                    switch (gender) {
                        case male:
                            switch (symptomStatus) {
                                case typical:
                                    return intermediate;
                                    break;
                                case atypical:          
                                    return intermediate;                          
                                    break;
                                case nonangianl:    
                                    return low;                            
                                    break;
                                case noSymptom:      
                                    return veryLow;                  
                                    break;
                                default:
                                    return '';
                                    break;
                            }                         
                            break;
                        case female:
                            switch (symptomStatus) {
                                case typical:
                                    return intermediate;                                 
                                    break;
                                case atypical:
                                    return veryLow;                                   
                                    break;
                                case nonangianl:   
                                    return veryLow;                                 
                                    break;
                                case noSymptom:
                                    return veryLow;                                   
                                    break;
                                default:
                                    return '';
                                    break;
                            }                                   
                            break;                   
                        default:
                            return '';
                            break;
                    }
                } else if (age>=40 && age<=49){
                    switch (gender) {
                        case male:
                            switch (symptomStatus) {
                                case typical:
                                    return high;
                                    break;
                                case atypical:
                                    return intermediate;                                  
                                    break;
                                case nonangianl:
                                    return intermediate;                                    
                                    break;
                                case noSymptom:
                                    return low;                                    
                                    break;
                                default:
                                    return '';
                                    break;
                            }                         
                            break;
                        case female:
                            switch (symptomStatus) {
                                case typical:
                                    return intermediate;                                  
                                    break;
                                case atypical:
                                    return low;                                   
                                    break;
                                case nonangianl:
                                    return veryLow;                                    
                                    break;
                                case noSymptom:
                                    return veryLow;                                   
                                    break;
                                default:
                                    return '';
                                    break;
                            }                                   
                            break;                   
                        default:
                            return '';
                            break;
                    }
                } else if (age>=50 && age<=59){
                    switch (gender) {
                        case male:
                            switch (symptomStatus) {
                                case typical:
                                    return high;
                                    break;
                                case atypical:
                                    return intermediate;                                    
                                    break;
                                case nonangianl:
                                    return intermediate;                                    
                                    break;
                                case noSymptom:
                                    return low;                                    
                                    break;
                                default:
                                    return '';
                                    break;
                            }                         
                            break;
                        case female:
                            switch (symptomStatus) {
                                case typical:
                                    return intermediate;                                
                                    break;
                                case atypical:
                                    return intermediate;                                    
                                    break;
                                case nonangianl:
                                    return low;                                    
                                    break;
                                case noSymptom:
                                    return veryLow;                                   
                                    break;
                                default:
                                    return '';
                                    break;
                            }                                   
                            break;                   
                        default:
                            return '';
                            break;
                    }
                } else if (age>=60 && age<=69){
                    switch (symptomStatus) {
                        case typical:
                            return high;
                            break;
                        case atypical:
                            return intermediate;                                    
                            break;
                        case nonangianl:
                            return intermediate;                                    
                            break;
                        case noSymptom: 
                            return low;                                   
                            break;
                        default:
                            return '';
                            break;
                    }                         
                } else {
                    return '';
                }
            }
            function setPercent(probability) {
                switch (probability) {
                    case veryLow: 
                        return '<5%';                       
                        break;
                    case low:  
                        return '<10%';                       
                        break;
                    case intermediate: 
                        return '10%-90%';                        
                        break;
                    case high: 
                        return '>90%';                        
                        break;                
                    default:
                        return '';
                        break;
                }
            }
            return returnValue;
        }
    },
    methods: {
        checkData () {
            if(this.resultData.symptomStatus ===''||this.resultData.probability ===''||this.resultData.percent ===''){
                this.errorMessage = 'Please fill in all the blanks and get the result data!';
                this.$refs.dataError.open();
            }else{
                this.$refs.saveDataConfirm.open();            
            }
        },
        SaveData () {
            this.$refs.saveDataConfirm.close();
            this.$refs.dataSaving.open();
            console.log({
                prediction: {
                patientInfo: this.patientInfo, 
                resultData: this.resultData, 
                userId: JSON.parse(sessionStorage.getItem('user'))._id,
                createTime: '',
                lastUpdateTime: ''
            }});   
            this.$http.post(config.apiHost + '/dp/insertCADPrediction', {prediction: {
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
        SweetButton,
        Checkbox
    },
    mounted () {
        utils.handleSidebarAndContentHeight();
        // utils.handleGoTop();
    }
}
</script>

<style lang="stylus" scoped>
    .index
        .input-inline
            max-width 100%
</style>