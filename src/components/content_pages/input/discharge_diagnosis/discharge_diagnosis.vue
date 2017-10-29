<template>
  <div class="tab-pane active portlet">
    <div class="portlet-title">
        <div class="caption">
            <span class="caption-subject bold font-dark uppercase">出院诊断</span>
        </div>
    </div>
    <div class="porlet-body">
        <div class="form-group">
            <label class="control-label bold col-md-2">无痛性心肌缺血</label>            
            <div class="col-md-4">
                <div>
                    <label><radio value="0" v-model="dischargeDiagnosis.isSilentMyocardialIschemia">否</radio></label>
                    <label><radio value="1" v-model="dischargeDiagnosis.isSilentMyocardialIschemia">是</radio></label>
                </div>
            </div>
        </div>        
        <div class="form-group">
            <label class="control-label bold col-md-2">冠脉微血管病变</label>            
            <div class="col-md-4">
                <div>
                    <label><radio value="0" v-model="dischargeDiagnosis.isCoronaryMicrovascularDisease">否</radio></label>
                    <label><radio value="1" v-model="dischargeDiagnosis.isCoronaryMicrovascularDisease">是</radio></label>
                </div>
            </div>            
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-2">心肌梗死</label>            
            <div class="col-md-3">
                <div>
                    <label><radio value="0" v-model="dischargeDiagnosis.isMyocardialInfarction">否</radio></label>
                    <label><radio value="1" v-model="dischargeDiagnosis.isMyocardialInfarction">是</radio></label>
                </div>
            </div>
            <div v-if="dischargeDiagnosis.isMyocardialInfarction=='1'">
                <label class="control-label col-md-1">类型</label>
                <div class="col-md-2">
                    <select class="form-control" v-model="dischargeDiagnosis.myocardialInfarctionType">
                        <option value="" disabled selected>选择</option>
                        <option v-for="myocardialInfarctionType in pagedata.myocardialInfarctionTypes" :key="myocardialInfarctionType.id" :value="myocardialInfarctionType.id">{{myocardialInfarctionType.text}}</option>
                    </select>
                </div>
                <label class="control-label col-md-1">部位</label>
                <div class="col-md-2">
                    <input class="form-control input-inline" v-model="dischargeDiagnosis.myocardialInfarctionPart">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-2">心绞痛</label>            
            <div class="col-md-3">
                <div>
                    <label><radio value="0" v-model="dischargeDiagnosis.isAngina">否</radio></label>
                    <label><radio value="1" v-model="dischargeDiagnosis.isAngina">是</radio></label>
                </div>
            </div>
            <div v-if="dischargeDiagnosis.isAngina=='1'">
                <label class="control-label col-md-1">类型</label>
                <div class="col-md-2">
                    <select class="form-control" v-model="dischargeDiagnosis.anginaType">
                        <option value="" disabled selected>选择</option>
                        <option v-for="anginaType in pagedata.anginaTypes" :key="anginaType.id" :value="anginaType.id">{{anginaType.text}}</option>
                    </select>
                </div>
                <label class="control-label col-md-1">CCS分级</label>
                <div class="col-md-2">
                    <select class="form-control" v-model="dischargeDiagnosis.anginaCcs">
                        <option value="" disabled selected>选择</option>
                        <option value="1">I</option>
                        <option value="2">II</option>
                        <option value="3">III</option>
                        <option value="4">IV</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-2">缺血性心肌病</label>            
            <div class="col-md-4">
                <div>
                    <label><radio value="0" v-model="dischargeDiagnosis.isIschemicCardiomyopathy">否</radio></label>
                    <label><radio value="1" v-model="dischargeDiagnosis.isIschemicCardiomyopathy">是</radio></label>
                </div>
            </div>            
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-2">冠心病猝死</label>            
            <div class="col-md-4">
                <div>
                    <label><radio value="0" v-model="dischargeDiagnosis.isSuddenCoronaryDeath">否</radio></label>
                    <label><radio value="1" v-model="dischargeDiagnosis.isSuddenCoronaryDeath">是</radio></label>
                </div>
            </div>            
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-2">胸痛原因待查</label>            
            <div class="col-md-4">
                <div>
                    <label><radio value="0" v-model="dischargeDiagnosis.isChestPainOfUnknownOrigin">否</radio></label>
                    <label><radio value="1" v-model="dischargeDiagnosis.isChestPainOfUnknownOrigin">是</radio></label>
                </div>
            </div>            
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-2">其他</label>            
            <div class="col-md-3">
                <div>
                    <label><radio value="0" v-model="dischargeDiagnosis.isDiagnosisOthers">否</radio></label>
                    <label><radio value="1" v-model="dischargeDiagnosis.isDiagnosisOthers">是</radio></label>
                </div>
            </div>          
            <div v-if="dischargeDiagnosis.isDiagnosisOthers=='1'">
                <label class="control-label col-md-1">其他诊断</label>
                <div class="col-md-2">
                    <input class="form-control input-inline" v-model="dischargeDiagnosis.diagnosisOthers">
                </div>
            </div>  
        </div>
    </div>
  </div>
</template>

<script>
import {Checkbox, Radio} from 'vue-checkbox-radio';
export default {
    name: 'discharge_diagnosis',
    props: {
        pagedata: {
            type: Object
        },
        dischargeDiagnosis: {
            type: Object
        }
    },
    data () {
        return {}
    },
    components: {
        Checkbox, Radio
    }
}
</script>

<style lang="stylus" scoped>

</style>