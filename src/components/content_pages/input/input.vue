<template>
  <div class="input">
        <div class="page-bar">
            <ul class="page-breadcrumb">
                <li>
                    <span>电子病历系统</span>
                    <i class="fa fa-circle"></i>
                </li>
                <li v-if="mr">
                    <router-link to="/home/input" v-if="!mr._id">新增病历</router-link>
                    <router-link to="/home/query" v-else>病历列表</router-link>
                </li>
            </ul>
        </div>
        <h1 class="page-title"> 电子病历系统
            <small>病历录入、病历查询、病历编辑</small>
        </h1>
        <div class="m-heading-1 border-green m-bordered" v-if="mr">
            <h3 v-if="!mr._id">病历录入</h3>
            <h3 v-else>病历列表</h3>
            <p> 相关说明 </p>
        </div>
        <div class="portlet light " id="form_wizard_1">
            <div class="portlet-title">
                <div class="caption" v-if="mr">
                    <i class=" icon-layers font-red"></i>
                    <span class="caption-subject font-red bold uppercase"><span v-if="!mr._id">新增</span><span v-else>编辑</span>病历向导 -<span class="step-title"> 步骤 {{currentStep}} / {{steps.length}} </span></span>
                </div>
            </div>
            <div class="portlet-body form">
                <form class="form-horizontal" id="emrs_input_form" method="POST">
                    <div class="form-wizard">
                        <div class="form-body">
                            <ul class="nav nav-pills nav-justified steps">
                                <li v-for="step in steps" :key="step.id" :class="{active:currentStep===step.value, done: currentStep>step.value || isDone}">
                                    <a :href="step.href" data-toggle="tab" class="step">
                                        <span class="number">{{step.value}}</span>
                                        <span class="desc"><i class="fa fa-check"></i>{{step.title}}</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="progress progress-striped active">
                                <div class="progress-bar progress-bar-success" role="progressbar" :style="{width:currentStep*50+'%'}"></div>
                            </div>
                            <div class="tab-content">
                                <div class="tab-pane active" id="tab1" v-show="currentStep==1">
                                    <div class="portlet light">
                                        <div class="portlet-title">
                                            <div class="caption">
                                                <span class="bold uppercase">请填写患者病历基本信息</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body" v-if="mr">
                                            <!-- <router-view name="tab1" :basicInfo="mr.basicInfo"></router-view> -->
                                            <basic-info :basicInfo="mr.basicInfo"></basic-info>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane active" id="tab2" v-show="currentStep==2">
                                    <div class="portlet light">
                                        <div class="portlet-title">
                                            <div class="caption">
                                                <span class="bold uppercase">请填写患者病历详细信息</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="tabbable-custom">
                                                <ul class="nav nav-tabs">
                                                    <li @click="changeActiveTab(index)" v-for="(tab,index) in detailTabs" :key="tab.id" :class="{active:index+1==activeTab}"><a href="javascript:;" data-toggle="tab">{{tab.title}}</a></li>                                               
                                                </ul>                                                
                                                <div class="tab-content" v-if="mr">
                                                    <history-of-present-illness :activeTab="activeTab" :historyOfPresentIllness="mr.historyOfPresentIllness"></history-of-present-illness>
                                                    <anamnesis :activeTab="activeTab" :anamnesis="mr.anamnesis"></anamnesis>
                                                    <risk-factors :activeTab="activeTab" :riskFactors="mr.riskFactors"></risk-factors>
                                                    <family-history :activeTab="activeTab" :familyHistory="mr.familyHistory"></family-history>
                                                    <physical-examination :activeTab="activeTab" :physicalExamination="mr.physicalExamination"></physical-examination>
                                                    <routine-examination :activeTab="activeTab" :routineExamination="mr.routineExamination"></routine-examination>
                                                    <special-examination :activeTab="activeTab" :specialExamination="mr.specialExamination"></special-examination>
                                                    <admission-diagnosis :activeTab="activeTab" :admissionDiagnosis="mr.admissionDiagnosis"></admission-diagnosis>
                                                    <discharge-diagnosis :activeTab="activeTab" :dischargeDiagnosis="mr.dischargeDiagnosis"></discharge-diagnosis>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-2 button-previous" v-show="currentStep>1" @click="lastStep">
                                        <a href="javascript:;" class="btn btn-block default"><i class="fa fa-angle-left"></i> 返回 </a>
                                    </div>
                                    <div class="col-md-2 button-next  col-md-offset-2" v-show="currentStep<steps.length" @click="nextStep">
                                        <a href="javascript:;" class="btn btn-block green"> 继续 <i class="fa fa-angle-right"></i></a>
                                    </div>
                                    <div class="col-md-2 button-submit" v-show="currentStep===steps.length" @click="$refs.formSubmitConfirm.open();">
                                        <a href="javascript:;" class="btn btn-block green"> 提交 <i class="fa fa-check"></i></a>
                                    </div>
                                </div>
                            </div>     
                        </div>
                    </div>
                </form>
            </div>
        </div>    
        <sweet-modal icon="error" ref="errorModal">
            {{modalMessage}}
        </sweet-modal>
        <sweet-modal icon="warning" ref="formSubmitConfirm" @close="isDone=false;" @open="isDone=true;">
            是否提交病历内容？
            <sweet-button class="btn red" slot="button" v-on:click="$refs.formSubmitConfirm.close()">取消</sweet-button>
            <sweet-button class="btn green" slot="button" v-on:click="submitForm">确定</sweet-button>
        </sweet-modal>
        <sweet-modal ref="formSubmitting" icon="info" :blocking="true" :hide-close-button="true">
            正在提交病历内容，请耐心等待……
        </sweet-modal>
        <div class="clearfix"></div>        
    </div>
</template>

<script>
import SweetButton from 'sweet-modal-vue/docs/components/Button';
import utils from '@/utils/utils';
import mrApi from '@/api/mr';
import basicInfo from '@/components/content_pages/input/basic_info/basic_info';
import historyOfPresentIllness from '@/components/content_pages/input/history_of_present_illness/history_of_present_illness';
import anamnesis from '@/components/content_pages/input/anamnesis/anamnesis';
import riskFactors from '@/components/content_pages/input/risk_factors/risk_factors';
import familyHistory from '@/components/content_pages/input/family_history/family_history';
import physicalExamination from '@/components/content_pages/input/physical_examination/physical_examination';
import routineExamination from '@/components/content_pages/input/routine_examination/routine_examination';
import specialExamination from '@/components/content_pages/input/special_examination/special_examination';
import admissionDiagnosis from '@/components/content_pages/input/admission_diagnosis/admission_diagnosis';
import dischargeDiagnosis from '@/components/content_pages/input/discharge_diagnosis/discharge_diagnosis';

export default {
    name: 'input',
    data () {
        return {
            mr: null,          
            steps: [
                {
                    value: 1,
                    title: '基本信息',
                    href: '#tab1'
                },
                {
                    value: 2,
                    title: '详细诊断信息',
                    href: '#tab2'
                }
            ],
            currentStep: 1,
            isDone: false,
            detailTabs: [
                {
                    href: '#tab_2_1',
                    title: '现病史'
                },{
                    href: '#tab_2_2',
                    title: '既往病史'
                },{
                    href: '#tab_2_3',
                    title: '危险因素'
                },{
                    href: '#tab_2_4',
                    title: '家族史'
                },{
                    href: '#tab_2_5',
                    title: '体格检查'
                },{
                    href: '#tab_2_6',
                    title: '常规检查'
                },{
                    href: '#tab_2_7',
                    title: '特殊检查'
                },{
                    href: '#tab_2_8',
                    title: '入院诊断'
                },{
                    href: '#tab_2_9',
                    title: '出院诊断'
                }
            ],
            activeTab: 1,
            isFormValid: false,     //表单是否合法            
            modalMessage: ''
        }
    },
    methods: {
        nextStep () {
            // this.currentStep++;//测试用，后期注释掉
            this.$validator.validateAll().then((result) => {
                if(result){
                    this.currentStep++;
                }else{
                    this.modalMessage = '表单内容填写有误，请重新检查字段填写要求！';
                    this.$refs.errorModal.open();
                }
            });
        },
        lastStep () {
            this.currentStep--;
        },
        changeActiveTab (index) {
            this.activeTab = index+1;
        },
        submitForm () {
            this.$refs.formSubmitConfirm.close();
            this.$refs.formSubmitting.open();
            // console.log(this.mr);
            this.mr=this.emptyFieldCheck(this.mr, this.emptyMedicalRecord);
            if(this.mr._id&&this.mr._id!==''){
                //编辑
                mrApi.updateMedicalRecord({record:this.mr}).then(res=>{
                    this.$refs.formSubmitting.close();
                    if(res.status){
                        this.$router.push('/home/query');
                    }else{
                        console.log(res);
                        this.modalMessage = '保存病历数据失败，请稍后重试！';
                        this.$refs.errorModal.open();
                    }
                })
            }else{
                //新增
                mrApi.insertMedicalRecord({record:this.mr}).then(res=>{
                    this.$refs.formSubmitting.close();
                    if(res.status){
                        this.$router.push('/home/query');
                    }else{
                        console.log(res);
                        this.modalMessage = '保存病历数据失败，请稍后重试！';
                        this.$refs.errorModal.open();
                    }
                })
            }
        },
        emptyFieldCheck (mr, emptyMedicalRecord) {
            console.log(mr);
            //现病史
            if(!(mr.historyOfPresentIllness.careCauses.indexOf('1')>=0)){
                mr.historyOfPresentIllness.chestPain = emptyMedicalRecord.historyOfPresentIllness.chestPain;
            }else{
                if(!(mr.historyOfPresentIllness.chestPain.onsetTime.indexOf('5')>=0)){
                    mr.historyOfPresentIllness.chestPain.onsetTimeOthers='';
                }
                if(mr.historyOfPresentIllness.chestPain.diseaseBodyParts.length>0){
                    mr.historyOfPresentIllness.chestPain.diseaseBodyParts.forEach(function(ele){
                        if(ele.bodyPartName!='11'){
                            ele.bodyPartNameOthers='';
                        }
                        if(ele.qualityOfPain!='13'){
                            ele.qualityOfPainOthers='';
                        }
                        if(ele.durationOfPain!='6'){
                            ele.durationOfPainOthers='';
                        }
                    })
                }
                if(!(mr.historyOfPresentIllness.chestPain.relievingFactors.indexOf('5')>=0)){
                    mr.historyOfPresentIllness.chestPain.relievingFactorsOthers='';
                }
                if(!(mr.historyOfPresentIllness.chestPain.precipitatingFactors.indexOf('12')>=0)){
                    mr.historyOfPresentIllness.chestPain.precipitatingFactorsOthers='';
                }
                if(!(mr.historyOfPresentIllness.chestPain.radiationSites.indexOf('7')>=0)){
                    mr.historyOfPresentIllness.chestPain.radiationSitesOthers='';
                }
                if(!(mr.historyOfPresentIllness.chestPain.simultaneousPhenomena.indexOf('21')>=0)){
                    mr.historyOfPresentIllness.chestPain.simultaneousPhenomenonOthers='';
                }
            }
            if(!(mr.historyOfPresentIllness.careCauses.indexOf('2')>=0)){
                mr.historyOfPresentIllness.chestDistress = emptyMedicalRecord.historyOfPresentIllness.chestDistress;
            }else{
                if(!(mr.historyOfPresentIllness.chestDistress.onsetTime.indexOf('5')>=0)){
                    mr.historyOfPresentIllness.chestDistress.onsetTimeOthers='';
                }
                if(mr.historyOfPresentIllness.chestDistress.diseaseBodyParts.length>0){
                    mr.historyOfPresentIllness.chestDistress.diseaseBodyParts.forEach(function(ele){
                        if(ele.bodyPartName!='11'){
                            ele.bodyPartNameOthers='';
                        }
                        if(ele.qualityOfPain!='13'){
                            ele.qualityOfPainOthers='';
                        }
                        if(ele.durationOfPain!='6'){
                            ele.durationOfPainOthers='';
                        }
                    })
                }
                if(!(mr.historyOfPresentIllness.chestDistress.relievingFactors.indexOf('5')>=0)){
                    mr.historyOfPresentIllness.chestDistress.relievingFactorsOthers='';
                }
                if(!(mr.historyOfPresentIllness.chestDistress.precipitatingFactors.indexOf('12')>=0)){
                    mr.historyOfPresentIllness.chestDistress.precipitatingFactorsOthers='';
                }
                if(!(mr.historyOfPresentIllness.chestDistress.radiationSites.indexOf('7')>=0)){
                    mr.historyOfPresentIllness.chestDistress.radiationSitesOthers='';
                }
                if(!(mr.historyOfPresentIllness.chestDistress.simultaneousPhenomena.indexOf('21')>=0)){
                    mr.historyOfPresentIllness.chestDistress.simultaneousPhenomenonOthers='';
                }
            }
            if(!(mr.historyOfPresentIllness.careCauses.indexOf('3')>=0)){
                mr.historyOfPresentIllness.dyspnea = emptyMedicalRecord.historyOfPresentIllness.dyspnea;
            }else{
                if(!(mr.historyOfPresentIllness.dyspnea.onsetTime.indexOf('5')>=0)){
                    mr.historyOfPresentIllness.dyspnea.onsetTimeOthers='';
                }
            }
            if(!(mr.historyOfPresentIllness.careCauses.indexOf('4')>=0)){
                mr.historyOfPresentIllness.palpitation = emptyMedicalRecord.historyOfPresentIllness.palpitation;
            }else{
                if(!(mr.historyOfPresentIllness.palpitation.onsetTime.indexOf('5')>=0)){
                    mr.historyOfPresentIllness.palpitation.onsetTimeOthers='';
                }
            }
            if(!(mr.historyOfPresentIllness.careCauses.indexOf('5')>=0)){
                mr.historyOfPresentIllness.abnormalEcg = emptyMedicalRecord.historyOfPresentIllness.abnormalEcg;
            }else{
                if(!(mr.historyOfPresentIllness.palpitation.onsetTime.indexOf('5')>=0)){
                    mr.historyOfPresentIllness.palpitation.onsetTimeOthers='';
                }
            }
            if(!(mr.historyOfPresentIllness.careCauses.indexOf('6')>=0)){
                mr.historyOfPresentIllness.careCauseOthers = '';
            }
            //既往病史
            if(mr.anamnesis.isLipidAbnormality!='1'){
                mr.anamnesis.lipidAbnormalityType='';
                mr.anamnesis.lipidAbnormalityDuration='';
                mr.anamnesis.isLipidAbnormalityUnderTreatment='';
                mr.anamnesis.lipidAbnormalityDrugName='';
            }else{
                if(mr.anamnesis.isLipidAbnormalityUnderTreatment!='2'){
                    mr.anamnesis.lipidAbnormalityDrugName='';
                }
            }
            if(mr.anamnesis.isEssentialHypertension!='1'){
                mr.anamnesis.essentialHypertensionDuration='';
                mr.anamnesis.isEssentialHypertensionUnderTreatment='';
                mr.anamnesis.essentialHypertensionDrugName='';
            }else{
                if(mr.anamnesis.isEssentialHypertensionUnderTreatment!='2'){
                    mr.anamnesis.essentialHypertensionDrugName='';
                }
            }
            if(mr.anamnesis.isDysglycemia!='1'){
                mr.anamnesis.dysglycemiaType='';
            }
            if(mr.anamnesis.isDiabetesMellitus!='1'){
                mr.anamnesis.diabetesMellitusDuration='';
                mr.anamnesis.diabetesMellitusType='';
                mr.anamnesis.isDiabetesMellitusUnderTreatment='';
                mr.anamnesis.diabetesMellitusOralDrugName='';
            }else{
                if(mr.anamnesis.isDiabetesMellitusUnderTreatment!='1'&&mr.anamnesis.isDiabetesMellitusUnderTreatment!='2'){
                    mr.anamnesis.diabetesMellitusTreatmentMethod=[];
                    mr.anamnesis.diabetesMellitusOralDrugName='';
                }else{
                    if(!(mr.anamnesis.diabetesMellitusTreatmentMethod.indexOf('3')>=0)){
                        mr.anamnesis.diabetesMellitusOralDrugName='';
                    }
                }
            }
            if(mr.anamnesis.isGout!='1'){
                mr.anamnesis.goutDuration='';
            }
            if(mr.anamnesis.isRenalInsufficiency!='1'){
                mr.anamnesis.renalInsufficiencyDuration='';
                mr.anamnesis.renalInsufficiencyEtiology='';
            }
            if(mr.anamnesis.isOldMyocardialInfarction!='1'){
                mr.anamnesis.oldMyocardialInfarctionOnsetTimeYear='';
                mr.anamnesis.oldMyocardialInfarctionOnsetTimeMonth='';
                mr.anamnesis.oldMyocardialInfarctionOnsetFrequency='';
                mr.anamnesis.oldMyocardialInfarctionLocation=[];
                mr.anamnesis.oldMyocardialInfarctionLocationOthers='';
            }else{
                if(!(mr.anamnesis.oldMyocardialInfarctionLocation.indexOf('7')>=0)){
                    mr.anamnesis.oldMyocardialInfarctionLocationOthers='';
                }
            }
            if(mr.anamnesis.isOtherHeartDiseaseHistory!='1'){
                mr.anamnesis.otherHeartDiseaseType=[];              
                mr.anamnesis.otherHeartDiseaseTypeOthers='';
            }else{
                if(!(mr.anamnesis.otherHeartDiseaseType.indexOf('8')>=0)){
                    mr.anamnesis.otherHeartDiseaseTypeOthers='';
                }
            }
            if(mr.anamnesis.isDeepVenousThrombosis!='1'){
                mr.anamnesis.deepVenousThrombosisOnsetTimeYear='';
                mr.anamnesis.deepVenousThrombosisOnsetTimeMonth='';
                mr.anamnesis.deepVenousThrombosisInducements=[];              
                mr.anamnesis.deepVenousThrombosisSymptoms=[];              
                mr.anamnesis.deepVenousThrombosisDiagnosisResult='';              
            }else{
                if(!(mr.anamnesis.deepVenousThrombosisInducements.indexOf('5')>=0)){
                    mr.anamnesis.deepVenousThrombosisInducementsOthers='';
                }                
            }
            if(mr.anamnesis.isOldIschemicStroke!='1'){
                mr.anamnesis.oldIschemicStrokeTypes=[];
            }
            if(mr.anamnesis.isVascularDiseases!='1'){
                mr.anamnesis.vascularDiseasesTypes=[];
            }
            if(mr.anamnesis.isHemorrhage!='1'){
                mr.anamnesis.hemorrhageTypes=[];
            }
            if(mr.anamnesis.isBleeding!='1'){
                mr.anamnesis.bleedingCauses=[];
            }
            //危险因素
            if(mr.riskFactors.isSomking!='1'){
                mr.riskFactors.smokingDuration='';
                mr.riskFactors.piecesPerDay='';
                mr.riskFactors.cigretteType=[];
                mr.riskFactors.cigretteTypeOthers='';
                mr.riskFactors.isSmokingCessation='';
                mr.riskFactors.smokingCessationDuration='';
            }else{
                if(!(mr.riskFactors.cigretteType.indexOf('5')>=0)){
                    mr.riskFactors.cigretteTypeOthers='';
                }
                if(mr.riskFactors.isSmokingCessation!='1'){
                    mr.riskFactors.smokingCessationDuration='';
                }
            }
            if(mr.riskFactors.isDrinking!='1'){
                mr.riskFactors.drinkingDuration='';
                mr.riskFactors.talesPerDay='';
                mr.riskFactors.wineType=[];
                mr.riskFactors.wineTypeOthers='';
                mr.riskFactors.isTemperance='';
                mr.riskFactors.temperanceDuration='';
            }else{
                if(!(mr.riskFactors.wineType.indexOf('5')>=0)){
                    mr.riskFactors.wineTypeOthers='';
                }
                if(mr.riskFactors.isTemperance!='1'){
                    mr.riskFactors.temperanceDuration='';
                }
            }
            if(!(mr.riskFactors.exerciseMode.indexOf('3')>=0)){
                mr.riskFactors.exerciseModeOthers='';
            }
            if(mr.riskFactors.isCentralObesity!='1'){
                mr.riskFactors.centralObesityDuration='';
            }
            //家族史
            if(mr.familyHistory.prematureChd.isPrematureChd!='1'){
                mr.familyHistory.prematureChd.onsetMembers=[];
            }
            if(mr.familyHistory.myocardialInfarction.isMyocardialInfarction!='1'){
                mr.familyHistory.myocardialInfarction.onsetMembers=[];
            }
            if(mr.familyHistory.suddenDeath.isSuddenDeath!='1'){
                mr.familyHistory.suddenDeath.onsetMembers=[];
            }
            if(mr.familyHistory.ischemicStroke.isIschemicStroke!='1'){
                mr.familyHistory.ischemicStroke.onsetMembers=[];
            }
            if(mr.familyHistory.hemorrhagicStroke.isHemorrhagicStroke!='1'){
                mr.familyHistory.hemorrhagicStroke.onsetMembers=[];
            }
            //体格检查
            if(mr.physicalExamination.isBreathSoundsNormal!='0'){
                mr.physicalExamination.breathSoundsType='';
                mr.physicalExamination.breathSoundsPart='';
            }
            if(mr.physicalExamination.isLungWetRales!='1'){
                mr.physicalExamination.lungWetRalesRange='';
                mr.physicalExamination.lungWetRalesPart='';
            }
            if(mr.physicalExamination.isEarLobeLongitudinalCrack!='1'){
                mr.physicalExamination.earLobeLongitudinalCrackParts=[];
            }
            if(mr.physicalExamination.isSkinYellowPigmentTumor!='1'){
                mr.physicalExamination.skinYellowPigmentTumorParts=[];
            }
            if(mr.physicalExamination.isAlopecia!='1'){
                mr.physicalExamination.alopeciaParts=[];
            }

            //常规检查
            if(mr.routineExamination.isSerumMyocardialNecrosisMarkers!='1'){
                mr.routineExamination.myocardialCK='';
                mr.routineExamination.myocardialCKMB='';
                mr.routineExamination.myocardialCTnI='';
                mr.routineExamination.myocardialMb='';
            }
            if(mr.routineExamination.isInflammatoryMarkers!='1'){
                mr.routineExamination.inflammationHsCRP='';
                mr.routineExamination.inflammationIL6='';
                mr.routineExamination.inflammationIL1Beta='';
                mr.routineExamination.inflammationTNFAlpha='';
            }
            if(mr.routineExamination.isLiverFunction!='1'){
                mr.routineExamination.totalProtein='';
                mr.routineExamination.albumin='';
                mr.routineExamination.totalBilirubin='';
                mr.routineExamination.directBilirubin='';
                mr.routineExamination.indirectBilirubin='';
                mr.routineExamination.ALT='';
                mr.routineExamination.AST='';
            }
            if(mr.routineExamination.isRenalFunction!='1'){
                mr.routineExamination.Cr='';
                mr.routineExamination.UA='';
                mr.routineExamination.BUN='';
                mr.routineExamination.GFR='';
            }
            if(mr.routineExamination.isQualitativePlatelet!='1'){
                mr.routineExamination.PCPLT='';
                mr.routineExamination.PCMPV='';
                mr.routineExamination.PCPDW='';
                mr.routineExamination.PARADP='';
                mr.routineExamination.PAREpinephrine='';
                mr.routineExamination.PARArachidonicAcid='';
                mr.routineExamination.PARCollagen='';
                mr.routineExamination.PARRistocetin='';
            }                    
            
            //特殊检查
            if(mr.specialExamination.ecg.pathologicalQWave.isPathologicalQWave!='1'){
                mr.specialExamination.ecg.pathologicalQWave.qWaveLeads=[];
            }
            if(mr.specialExamination.ecg.stSegmentChange.isStSegmentChange!='1'){
                mr.specialExamination.ecg.stSegmentChange.stSegmentDepression=emptyMedicalRecord.specialExamination.ecg.stSegmentChange.stSegmentDepression;
                mr.specialExamination.ecg.stSegmentChange.stSegmentElevation=emptyMedicalRecord.specialExamination.ecg.stSegmentChange.stSegmentElevation;
            }else{
                if(mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.isStSegmentDepression!='1'){
                    mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.changeDetail=[];
                }
                if(mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.isStSegmentElevation!='1'){
                    mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.changeDetail=[];
                }
            }
            if(mr.specialExamination.ecg.tWaveChange.isTWaveChange!='1'){
                mr.specialExamination.ecg.tWaveChange.changeDetail=[];
            }
            if(mr.specialExamination.ecg.arrhythmia.isArrhythmia!='1'){
                mr.specialExamination.ecg.arrhythmia.arrhythmiaTypes=[];
            }else{
                if(!(mr.specialExamination.ecg.arrhythmia.arrhythmiaTypes.indexOf('11')>=0)){
                    mr.specialExamination.ecg.arrhythmia.arrhythmiaTypeOthers='';
                }
            }
            if(mr.specialExamination.exerciseEcg.stSegmentChange.isStSegmentChange!='1'){
                mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression=emptyMedicalRecord.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression;
                mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation=emptyMedicalRecord.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation;
            }else{
                if(mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression!='1'){
                    mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.duration='';
                    mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.changeDetail=[];
                }
                if(mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation!='1'){
                    mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.duration='';
                    mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.changeDetail=[];
                }
            }
            if(mr.specialExamination.exerciseEcg.tWaveChange.isTWaveChange!='1'){
                mr.specialExamination.exerciseEcg.tWaveChange.duration='';
                mr.specialExamination.exerciseEcg.tWaveChange.changeDetail=[];
            }
            if(mr.specialExamination.holterEcg.arrhythmia.isArrhythmia!='1'){
                mr.specialExamination.holterEcg.arrhythmia.frequentness='';
                mr.specialExamination.holterEcg.arrhythmia.totalAbnormalHeartbeats='';
                mr.specialExamination.holterEcg.arrhythmia.arrhythmiaTypes=[];
            }else{
                if(mr.specialExamination.holterEcg.arrhythmia.arrhythmiaTypes.length>0){
                    mr.specialExamination.holterEcg.arrhythmia.arrhythmiaTypes.forEach(function(ele){
                        if(ele.arrhythmiaType!='11'){
                            ele.arrhythmiaTypeOthers='';
                        }
                    })
                }
            }
            if(mr.specialExamination.holterEcg.pathologicalQWave.isPathologicalQWave!='1'){
                mr.specialExamination.holterEcg.pathologicalQWave.frequentness='';
                mr.specialExamination.holterEcg.pathologicalQWave.arrhythmiaTypes=[];
            }
            if(mr.specialExamination.holterEcg.stSegmentChange.isStSegmentChange!='1'){
                mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression=emptyMedicalRecord.specialExamination.holterEcg.stSegmentChange.stSegmentDepression;
                mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation=emptyMedicalRecord.specialExamination.holterEcg.stSegmentChange.stSegmentElevation;
            }else{
                if(mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression!='1'){
                    mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.frequentness='';
                    mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.changesDetail=[];
                }
                if(mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation!='1'){
                    mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.frequentness='';
                    mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.changesDetail=[];
                }
            }
            if(mr.specialExamination.holterEcg.tWaveChange.isTWaveChange!='1'){
                mr.specialExamination.holterEcg.tWaveChange.duration='';
                mr.specialExamination.holterEcg.tWaveChange.changesDetail=[];
            }
            if(mr.specialExamination.ucg.isLVEFLtFortyPercent!='1'){
                mr.specialExamination.ucg.ratioEToA='';
                mr.specialExamination.ucg.EF='';
            }
            if(mr.specialExamination.ucg.isLocalMotionAbnormality!='1'){
                mr.specialExamination.ucg.localMotionAbnormalityParts=[];
            }
            if(mr.specialExamination.ucg.isVntricularAneurysm!='1'){
                mr.specialExamination.ucg.vntricularAneurysmParts=[];
            }
            if(mr.specialExamination.ucg.isLeftVentricularThrombosis!='1'){
                mr.specialExamination.ucg.leftVentricularThrombosisParts=[];
            }
            if(!(mr.specialExamination.pci.contrastMedia.indexOf('5')>=0)){
                mr.specialExamination.pci.contrastMediaOthers='';
            }

            return mr;
        }
    },
    watch: {
        '$route': function (val, oldVal) {       
            if(val.path.indexOf('input')>=0){
                this.$store.dispatch('changeCurrentMedicalRecordId','');
                this.currentStep=1;
                this.$nextTick(function(){
                    this.$validator.reset();
                });
            }
        },
        recordId(val, oldVal) {
            if(val!=oldVal){
                mrApi.getMedicalRecord({recordId:this.recordId}).then(res=>{
                    if(res.status){
                        this.mr = res.data;                    
                        this.$nextTick(function(){
                            if(this.recordId!=''){this.$validator.validateAll();}
                        })
                    }else{
                        this.modalMessage = '获取病历数据失败，请稍后重试！';
                        this.$refs.errorModal.open();
                    }
                }) 
            }
        }
    },
    computed: {
        recordId () {
            return this.$store.state.currentMedicalRecordId;
        },
        emptyMedicalRecord () {
            return this.$store.state.emptyMedicalRecord;
        }
    },    
    created () {
        mrApi.getMedicalRecord({recordId:this.recordId}).then(res=>{
            if(res.status){
                this.mr = res.data;                
            }else{
                this.modalMessage = '获取病历数据失败，请稍后重试！';
                this.$refs.errorModal.open();
            }
        })
    },
    mounted () {
        utils.handleSidebarAndContentHeight();
        utils.handleGoTop();
    },
    components: {
        SweetButton,
        basicInfo,
        historyOfPresentIllness,
        anamnesis,
        riskFactors,
        familyHistory,
        physicalExamination,
        routineExamination,
        specialExamination,
        admissionDiagnosis,
        dischargeDiagnosis
    }
}

</script>

<style lang="stylus" scoped>
    a
        &.step
            pointer-events: none    //禁用点击
</style>


