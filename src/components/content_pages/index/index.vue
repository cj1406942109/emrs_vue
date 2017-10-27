<template>
  <div class="index">
    <div class="page-bar">
        <ul class="page-breadcrumb">
            <li>
                <span>Home</span>
                <i class="fa fa-circle"></i>
            </li>
            <li>
                <span>Dashboard</span>
            </li>
        </ul>            
    </div>
    <h1 class="page-title"> Bleeding Score Calculator
        <small>statistics, charts, recent events and reports</small>
    </h1> 
    <div class="row">
        <div class="col-md-6">
            <div class="portlet box red">
                <div class="portlet-title">
                    <div class="caption">DAPT Score Calculator</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                
                <div class="portlet-body form-horizontal">     
                    <h3>Patient Characteristics</h3>
                    <div class="form-group">
                        <label class="control-label col-md-1 bold">Age</label>
                        <div class="col-md-10">
                            <input class="form-control input-inline" type="number" min="18" max="100" v-model="DAPTScore.age"></span>
                            <span class="help-inline">Must be between 18-100</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-10">Diabetes Mellitus</label>
                        <div class="col-md-2">
                            <div><label><checkbox v-model="DAPTScore.DM" :value="1"></checkbox></label></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-10">Cigarette Smoking Within Last Two Years</label>
                        <div class="col-md-2">
                            <div><label><checkbox v-model="DAPTScore.CS" :value="1"></checkbox></label></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-10">Prior Myocardial Infarction or Percutaneous Coronary Intervention</label>
                        <div class="col-md-2">
                            <div><label><checkbox v-model="DAPTScore.PMIPCI" :value="1"></checkbox></label></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-10">History of Congestive Heart Failure or Left Ventricular Ejection Fraction < 30%</label>
                        <div class="col-md-2">
                            <div><label><checkbox v-model="DAPTScore.CHFLEVF" :value="2"></checkbox></label></div>
                        </div>
                    </div>     
                    <div class="form-group">
                        <label class="control-label bold col-md-10">Hypertension</label>
                        <div class="col-md-2">
                            <div><label><checkbox v-model="DAPTScore.Hypertension" value="1"></checkbox></label></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-10">Renal Insufficiency</label>
                        <div class="col-md-2">
                            <div><label><checkbox v-model="DAPTScore.RI" value="1"></checkbox></label></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-10">Peripheral Arterial Disease</label>
                        <div class="col-md-2">
                            <div><label><checkbox v-model="DAPTScore.PAD" value="1"></checkbox></label></div>
                        </div>
                    </div>        
                    <h3>Procedure Characteristics</h3>
                    <div class="form-group">
                        <label class="control-label bold col-md-10">Myocardial Infarction at Presentation</label>
                        <div class="col-md-2">
                            <div><label><checkbox v-model="DAPTScore.MIP" :value="1"></checkbox></label></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-10">Stenting of Vein of Graft</label>
                        <div class="col-md-2">
                            <div><label><checkbox v-model="DAPTScore.SVG" :value="2"></checkbox></label></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-10">Stent Diameter < 3mm</label>
                        <div class="col-md-2">
                            <div><label><checkbox v-model="DAPTScore.SD" :value="1"></checkbox></label></div>
                        </div>
                    </div>                 
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="portlet box blue">
                    <div class="portlet-title">
                        <div class="caption">Bleeding Score Calculator</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body form-horizontal">
                        <div class="form-group">
                            <label class="control-label bold col-md-5">Baseline Hematocrit</label>
                            <div class="col-md-4">
                                <select class="form-control input-inline" v-model="BleedingScore.BH">
                                    <option value="" disabled selected>--select--</option>
                                    <option :value="0">> 39.9</option>
                                    <option :value="2">37-39.9</option>
                                    <option :value="3">34-36.9</option>
                                    <option :value="7">31-33.9</option>
                                    <option :value="9">< 31</option>
                                </select>
                                <span class="help-inline">HCT(%)</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-5">GFR: Cockcroft-Gault</label>
                            <div class="col-md-4">
                                <select class="form-control input-inline" v-model="BleedingScore.GFR">
                                    <option value="" disabled selected>--select--</option>
                                    <option :value="0">> 120</option>
                                    <option :value="7">91-120</option>
                                    <option :value="17">61-90</option>
                                    <option :value="28">31-60</option>
                                    <option :value="35">16-30</option>
                                    <option :value="39">< 16</option>
                                </select>
                                <span class="help-inline">mL/min</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-5">Heart rate on admission</label>
                            <div class="col-md-4">
                                <select class="form-control input-inline" v-model="BleedingScore.HR">
                                    <option value="" disabled selected>--select--</option>
                                    <option :value="0">< 71</option>
                                    <option :value="1">71-80</option>
                                    <option :value="3">81-90</option>
                                    <option :value="6">91-100</option>
                                    <option :value="8">101-110</option>
                                    <option :value="10">111-120</option>
                                    <option :value="11">> 120</option>
                                </select>
                                <span class="help-inline">bpm</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-5">Systolic blood pressure on admission</label>
                            <div class="col-md-6">
                                <select class="form-control input-inline" v-model="BleedingScore.SBP">
                                    <option value="" disabled selected>--select--</option>
                                    <option :value="10">< 91 </option>
                                    <option :value="8">91-100 </option>
                                    <option :value="5">101-120 </option>
                                    <option :value="1">121-180 </option>
                                    <option :value="3">181-200 </option>
                                    <option :value="5">> 200 </option>
                                </select>
                                <span class="help-inline">mmHg</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-5">Prior Vascular Disease</label>
                            <div class="col-md-6">
                                <select class="form-control input-inline" v-model="BleedingScore.PVD">
                                    <option value="" disabled selected>--select--</option>
                                    <option :value="6">Yes</option>
                                    <option :value="0">No</option>
                                </select>
                                <span class="help-inline"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-5">Diabetes Mellitus</label>
                            <div class="col-md-6">
                                <select class="form-control input-inline" v-model="BleedingScore.DM">
                                    <option value="" disabled selected>--select--</option>
                                    <option :value="6">Yes</option>
                                    <option :value="0">No</option>
                                </select>
                                <span class="help-inline"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-5">Signs of CHF on admission</label>
                            <div class="col-md-6">
                                <select class="form-control input-inline" v-model="BleedingScore.SoCHF">
                                    <option value="" disabled selected>--select--</option>
                                    <option :value="7">Yes</option>
                                    <option :value="0">No</option>
                                </select>
                                <span class="help-inline"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-5">Sex</label>
                            <div class="col-md-6">
                                <select class="form-control input-inline" v-model="BleedingScore.Sex">
                                    <option value="" disabled selected>--select--</option>
                                    <option :value="0">Male</option>
                                    <option :value="8">Female</option>
                                </select>
                                <span class="help-inline"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-5 font-red">CRUSADE Bleeding Score</label>
                            <div class="col-md-7">
                                <input class="form-control input-inline bold" readonly :value="BleedingScoreResult.value"></span>
                                <span class="help-inline font-red bold">{{BleedingScoreResult.desc}}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-5 font-red">Risk of In-Hospital Major Bleeding</label>
                            <div class="col-md-7">
                                <input class="form-control input-inline bold" readonly></span>
                                <span class="help-inline font-red bold">Unknown</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>        
  </div>
</template>

<script>
import utils from '@/utils/utils';
import {Checkbox, Radio} from 'vue-checkbox-radio';

export default {
    name: 'index',
    data () {
        return {
            BleedingScore: {
                BH: '',
                GFR: '',
                HR: '',
                SBP: '',
                PVD: '',
                DM: '',
                SoCHF: '',
                Sex: ''
            },
            DAPTScore: {
                age: '',
                DM:'',
                CS: '',
                PMIPCI: '',
                CHFLEVF: '',
                Hypertension: '',
                RI: '',
                PAD: '',
                MI: '',
                SVG: '',
                SD: ''
            }
        }
    },
    computed: {
        BleedingScoreResult: function() {
            let BleedingScore = this.BleedingScore;
            if(BleedingScore.BH && BleedingScore.GFR && BleedingScore.HR && BleedingScore.SBP && BleedingScore.PVD && BleedingScore.DM && BleedingScore.SoCHF && BleedingScore.Sex) {
                let value = BleedingScore.BH + BleedingScore.GFR + BleedingScore.HR + BleedingScore.SBP + BleedingScore.PVD + BleedingScore.DM + BleedingScore.SoCHF + BleedingScore.Sex;
                let desc = '';
                if(value<21){
                    desc = 'Very Low Risk';
                }else if(value<31) {
                    desc = 'Low Risk';
                }else if(value<41) {
                    desc = 'Moderate Risk';
                }else if(value<51) {
                    desc = 'High Risk';
                }else {
                    desc = 'Very High Risk';
                }
                return {
                        value: value,
                        desc: desc
                    };
            }else {
                return {
                    value: '',
                    desc: 'Enter all fields above'
                };
            }
            // return this.BleedingScore.BH+this.BleedingScore.GFR+this.BleedingScore.HR+this.BleedingScore.SBP+this.BleedingScore.PVD+this.BleedingScore.DM+this.BleedingScore.SoCHF+this.BleedingScore.Sex;
        }
    },
    mounted () {
        utils.handleSidebarAndContentHeight();
    },
    components: {
        Checkbox, Radio
    }
}
</script>

<style lang="stylus" scoped>
    .index
        .input-inline
            max-width 100%
</style>


