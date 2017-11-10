<template>
  <div class="input">
        <div class="page-bar">
            <ul class="page-breadcrumb">
                <li>
                    <span>电子病历系统</span>
                    <i class="fa fa-circle"></i>
                </li>
                <li>
                    <router-link to="/home/input">病历录入</router-link>
                </li>
            </ul>
        </div>
        <h1 class="page-title"> 电子病历系统
            <small>病历录入、病历查询</small>
        </h1>
        <div class="m-heading-1 border-green m-bordered">
            <h3>病历录入</h3>
            <p> 相关说明 </p>
        </div>
        <div class="portlet light " id="form_wizard_1">
            <div class="portlet-title">
                <div class="caption">
                    <i class=" icon-layers font-red"></i>
                    <span class="caption-subject font-red bold uppercase"> 病历录入向导 -<span class="step-title"> 步骤 {{currentStep}} / {{steps.length}} </span></span>
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
                                <div class="alert" :class="[isFormValid?'alert-danger':'alert-success']" v-show="showAlert">
                                    <button class="close" data-dismiss="alert"></button> <span v-if="isFormValid">表单填写错误，请重新检查字段填写要求！</span><span v-else>表单格式验证成功！</span>
                                </div>
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
        <sweet-modal icon="error" ref="formError">
            表单内容填写有误，请重新检查字段填写要求！
        </sweet-modal>
        <sweet-modal icon="warning" ref="formSubmitConfirm" @close="isDone=false;" @open="isDone=true;">
            是否提交病历内容？
            <sweet-button class="btn red" slot="button" v-on:click="$refs.formSubmitConfirm.close()">取消</sweet-button>
            <sweet-button class="btn green" slot="button" v-on:click="submitForm">确定</sweet-button>
        </sweet-modal>
        <sweet-modal ref="formSubmitting" icon="success" :blocking="true" :hide-close-button="false">
            病历内容已提交，即将自动跳转到病历详情页！
        </sweet-modal>
        <div class="clearfix"></div>
    </div>
</template>

<script>
import SweetButton from 'sweet-modal-vue/docs/components/Button';
import config from '@/config';
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
            // mr: {
            //     basicInfo: {
            //         admissionNum: "",
            //         bedNum: "",
            //         doctor: {},
            //         recorder: {},
            //         name: "",
            //         medicalCardNum: "",
            //         idNum: "",
            //         cellphone1: "",
            //         cellphone2: "",
            //         telephone: "",
            //         gender: "",
            //         nationality: "",
            //         birthProvince: "",
            //         birthCity: "",
            //         birthday: "",
            //         profession: "",
            //         addressProvince: "",
            //         addressCity: "",
            //         addressArea: "",
            //         addressTown: "",
            //         address: ""
            //     },
            //     historyOfPresentIllness: {
            //         careCauses: [],
            //         careCauseOthers: "",
            //         chestPain: {
            //             timesPerDay: "",
            //             timesPerWeek: "",
            //             timesPerMonth: "",
            //             timesPerYear: "",
            //             onsetTime: [],
            //             onsetTimeOthers: "",
            //             diseaseBodyParts: [],
            //             relievingFactors: [],
            //             relievingDuration: "",
            //             relievingFactorsOthers: "",
            //             precipitatingFactors: [],
            //             precipitatingFactorsOthers: "",
            //             radiationSites: [],
            //             radiationSitesOthers: "",
            //             simultaneousPhenomena: [],
            //             simultaneousPhenomenonOthers: ""
            //         },
            //         chestDistress: {
            //             timesPerDay: "",
            //             timesPerWeek: "",
            //             timesPerMonth: "",
            //             timesPerYear: "",
            //             onsetTime: [],
            //             onsetTimeOthers: "",
            //             diseaseBodyParts: [],
            //             relievingFactors: [],
            //             relievingDuration: "",
            //             relievingFactorsOthers: "",
            //             precipitatingFactors: [],
            //             precipitatingFactorsOthers: "",
            //             radiationSites: [],
            //             radiationSitesOthers: "",
            //             simultaneousPhenomena: [],
            //             simultaneousPhenomenonOthers: ""
            //         },
            //         dyspnea: {
            //             timesPerDay: "",
            //             timesPerWeek: "",
            //             timesPerMonth: "",
            //             timesPerYear: "",
            //             onsetTime: [],
            //             onsetTimeOthers: ""
            //         },
            //         palpitation: {
            //             timesPerDay: "",
            //             timesPerWeek: "",
            //             timesPerMonth: "",
            //             timesPerYear: "",
            //             onsetTime: [],
            //             onsetTimeOthers: ""
            //         },
            //         abnormalEcg: {
            //             timesPerDay: "",
            //             timesPerWeek: "",
            //             timesPerMonth: "",
            //             timesPerYear: "",
            //             onsetTime: [],
            //             onsetTimeOthers: ""
            //         }
            //     },
            //     anamnesis: {
            //         isLipidAbnormality: "",
            //         lipidAbnormalityType: "",
            //         lipidAbnormalityDuration: "",
            //         isLipidAbnormalityUnderTreatment: "",
            //         lipidAbnormalityDrugName: "",
            //         isEssentialHypertension: "",
            //         essentialHypertensionDuration: "",
            //         maximumBP: { SBP: '', DBP: '' },
            //         ordinaryBP: { SBP: '', DBP: '' },
            //         isEssentialHypertensionUnderTreatment: "",
            //         essentialHypertensionDrugName: "",
            //         isDysglycemia: "",
            //         dysglycemiaDuration: "",
            //         dysglycemiaType: "",
            //         isDiabetesMellitus: "",
            //         diabetesMellitusDuration: "",
            //         diabetesMellitusType: "",
            //         isDiabetesMellitusUnderTreatment: "",
            //         diabetesMellitusTreatmentMethod: [],
            //         diabetesMellitusOralDrugName: "",
            //         isGout: "",
            //         goutDuration: "",
            //         serumUricAcidLevel: "",
            //         isRenalInsufficiency: "",
            //         renalInsufficiencyDuration: "",
            //         maximumCr: "",
            //         recentCr: "",
            //         renalInsufficiencyEtiology: "",
            //         isOldMyocardialInfarction: "",
            //         oldMyocardialInfarctionOnsetTimeYear: "",
            //         oldMyocardialInfarctionOnsetTimeMonth: "",
            //         oldMyocardialInfarctionOnsetFrequency: "",
            //         oldMyocardialInfarctionLocation: [],
            //         oldMyocardialInfarctionLocationOthers: "",
            //         isPciHistory: "",
            //         isCabgHistory: "",
            //         isCasGt50History: "",
            //         isAtrialFibrillation: "",
            //         isOtherHeartDiseaseHistory: "",
            //         otherHeartDiseaseType: [],
            //         otherHeartDiseaseTypeOthers: "",
            //         isDeepVenousThrombosis: "",
            //         deepVenousThrombosisOnsetTimeYear: "",
            //         deepVenousThrombosisOnsetTimeMonth: "",
            //         deepVenousThrombosisInducements: [],
            //         deepVenousThrombosisSymptoms: [],
            //         deepVenousThrombosisDiagnosisResult: "",
            //         isOldIschemicStroke: "",
            //         oldIschemicStrokeTypes: [],
            //         isVascularDiseases: "",
            //         vascularDiseasesTypes: [],
            //         isHemorrhage: "",
            //         hemorrhageTypes: [],
            //         isBleeding: "",
            //         bleedingCauses: []
            //     },
            //     riskFactors: {
            //         isSomking: "",
            //         smokingDuration: "",
            //         piecesPerDay: "",
            //         cigretteType: [],
            //         cigretteTypeOthers: "",
            //         isSmokingCessation: "",
            //         smokingCessationDuration: "",
            //         isDrinking: "",
            //         drinkingDuration: "",
            //         talesPerDay: "",
            //         wineType: [],
            //         wineTypeOthers: "",
            //         isTemperance: "",
            //         temperanceDuration: "",
            //         drinkingAmount: "",
            //         paddyPotato: "",
            //         grainMixedBeans: "",
            //         potato: "",
            //         vegetables: "",
            //         fruits: "",
            //         livestockMeat: "",
            //         aquaticProducts: "",
            //         eggs: "",
            //         milkProducts: "",
            //         soybeansNuts: "",
            //         salt: "",
            //         sugar: "",
            //         oil: "",
            //         fatMeat: "",
            //         visceral: "",
            //         bloodType: "",
            //         isLongtermPsychologicalStress: "",
            //         isDepression: "",
            //         exerciseType: "",
            //         exerciseDuration: "",
            //         exerciseMode: [],
            //         exerciseModeOthers: "",
            //         isCentralObesity: "",
            //         centralObesityDuration: "",
            //         height: "",
            //         weight: "",
            //         BMI: "",
            //         waistline: "",
            //         neckCircumference: "",
            //         hipline: ""
            //     },
            //     familyHistory: {
            //         prematureChd: {
            //             isPrematureChd: "",
            //             onsetMembers: []
            //         },
            //         myocardialInfarction: {
            //             isMyocardialInfarction: "",
            //             onsetMembers: []
            //         },
            //         suddenDeath: {
            //             isSuddenDeath: "",
            //             onsetMembers: []
            //         },
            //         ischemicStroke: {
            //             isIschemicStroke: "",
            //             onsetMembers: []
            //         },
            //         hemorrhagicStroke: {
            //             isHemorrhagicStroke: "",
            //             onsetMembers: []
            //         }
            //     },
            //     physicalExamination: {
            //         bodyTemperature: "",
            //         respiratoryRate: "",
            //         isBreathSoundsNormal: "",
            //         breathSoundsType: "",
            //         breathSoundsPart: "",
            //         isLungWetRales: "",
            //         lungWetRalesRange: "",
            //         lungWetRalesPart: "",
            //         heartRate: "",
            //         cardiacRhythm: "",
            //         heartSoundS1Result: "",
            //         isS3S4GallopRhythm: "",
            //         pulse: "",
            //         BP: { SBP: '', DBP: '' },
            //         isEarLobeLongitudinalCrack: "",
            //         earLobeLongitudinalCrackParts: [],
            //         isSkinYellowPigmentTumor: "",
            //         skinYellowPigmentTumorParts: [],
            //         isAlopecia: "",
            //         alopeciaParts: []
            //     },
            //     routineExamination: {
            //         TC: "",
            //         TG: "",
            //         LDL: "",
            //         HDL: "",
            //         notHDL: "",
            //         APOA1: "",
            //         APOB: "",
            //         bloodGlucoseFasting: "",
            //         isSerumMyocardialNecrosisMarkers: "",
            //         myocardialCK: "",
            //         myocardialCKMB: "",
            //         myocardialCTnI: "",
            //         myocardialMb: "",
            //         isInflammatoryMarkers: "",
            //         inflammationHsCRP: "",
            //         inflammationIL6: "",
            //         inflammationIL1Beta: "",
            //         inflammationTNFAlpha: "",
            //         heartFailureNTproBNP: "",
            //         electrolyteNa: "",
            //         electrolyteK: "",
            //         electrolyteCa: "",
            //         electrolyteCl: "",
            //         isLiverFunction: "",
            //         totalProtein: "",
            //         albumin: "",
            //         totalBilirubin: "",
            //         directBilirubin: "",
            //         indirectBilirubin: "",
            //         ALT: "",
            //         AST: "",
            //         isRenalFunction: "",
            //         Cr: "",
            //         UA: "",
            //         BUN: "",
            //         GFR: "",
            //         isHepatorenalDisease: "",
            //         APTT: "",
            //         PT: "",
            //         TT: "",
            //         FIB: "",
            //         dDimer: "",
            //         INR: "",
            //         isINRStable: "",
            //         redBloodCellCount: "",
            //         redBloodCellSpecificVolume: "",
            //         HGB: "",
            //         leukocyteCount: "",
            //         neutrophil: "",
            //         eosinophil: "",
            //         basophil: "",
            //         lymphocyte: "",
            //         monocyte: "",
            //         isQualitativePlatelet: "",
            //         PCPLT: "",
            //         PCMPV: "",
            //         PCPDW: "",
            //         PARADP: "",
            //         PAREpinephrine: "",
            //         PARArachidonicAcid: "",
            //         PARCollagen: "",
            //         PARRistocetin: ""
            //     },
            //     specialExamination: {
            //         ecg: {
            //             pathologicalQWave: {
            //                 isPathologicalQWave: "",
            //                 qWaveLeads: []
            //             },
            //             stSegmentChange: {
            //                 isStSegmentChange: "",
            //                 stSegmentDepression: {
            //                     isStSegmentDepression: "",
            //                     changeDetail: []
            //                 },
            //                 stSegmentElevation: {
            //                     isStSegmentElevation: "",
            //                     changeDetail: []
            //                 }
            //             },
            //             tWaveChange: {
            //                 isTWaveChange: "",
            //                 changeDetail: []
            //             },
            //             arrhythmia: {
            //                 isArrhythmia: "",
            //                 arrhythmiaTypes: [],
            //                 arrhythmiaTypeOthers: ""
            //             },
            //             isResultNormal: "",
            //             findings: ""
            //         },
            //         exerciseEcg: {
            //             exerciseDuration: "",
            //             isExerciseAngina: "",
            //             maximumBP: { SBP: '', DBP: '' },
            //             minimumBP: { SBP: '', DBP: '' },
            //             stSegmentChange: {
            //                 isStSegmentChange: "",
            //                 stSegmentDepression: {
            //                     isStSegmentDepression: "",
            //                     duration: "",
            //                     changeDetail: []
            //                 },
            //                 stSegmentElevation: {
            //                     isStSegmentElevation: "",
            //                     duration: "",
            //                     changeDetail: []
            //                 }
            //             },
            //             tWaveChange: {
            //                 isTWaveChange: "",
            //                 duration: "",
            //                 changeDetail: []
            //             },
            //             result: "",
            //             findings: ""
            //         },
            //         holterEcg: {
            //             totalHeartbeats: "",
            //             averageHeartRate: "",
            //             maximalHeartRate: "",
            //             maximalHeartRateOccurrenceTime: "",
            //             minimalHeartRate: "",
            //             minimalHeartRateOccurrenceTime: "",
            //             arrhythmia: {
            //                 isArrhythmia: "",
            //                 frequentness: "",
            //                 totalAbnormalHeartbeats: "",
            //                 arrhythmiaTypes: []
            //             },
            //             pathologicalQWave: {
            //                 isPathologicalQWave: "",
            //                 frequentness: "",
            //                 qWaveLeadsDetail: []
            //             },
            //             stSegmentChange: {
            //                 isStSegmentChange: "",
            //                 stSegmentDepression: {
            //                     isStSegmentDepression: "",
            //                     frequentness: "",
            //                     changesDetail: []
            //                 },
            //                 stSegmentElevation: {
            //                     isStSegmentElevation: "",
            //                     frequentness: "",
            //                     changesDetail: []
            //                 }

            //             },
            //             tWaveChange: {
            //                 isTWaveChange: "",
            //                 frequentness: "",
            //                 changesDetail: []
            //             },
            //             findings: ""
            //         },
            //         ucg: {
            //             LVD: "",
            //             EDV: "",
            //             LVS: "",
            //             ESV: "",
            //             LAD: "",
            //             LVPW: "",
            //             IVST: "",
            //             isLVEFLtFortyPercent: "",
            //             ratioEToA: "",
            //             EF: "",
            //             isLocalMotionAbnormality: "",
            //             localMotionAbnormalityParts: [],
            //             isVntricularAneurysm: "",
            //             vntricularAneurysmParts: [],
            //             isLeftVentricularThrombosis: "",
            //             leftVentricularThrombosisParts: [],
            //             findings: "",
            //         },
            //         pci: {
            //             num: "",
            //             date: "",
            //             pciType: "",
            //             thrombolysisInterval: "",
            //             onsetIntervalDay: "",
            //             onsetIntervalHour: "",
            //             stayTimePrehospital: "",
            //             stayTimeEmergencyCall: "",
            //             stayTimeCCU: "",
            //             stayTimeConduitRoom: "",
            //             contrastMedia: [],
            //             contrastMediaOthers: "",
            //             coronaryDistributionType: "",
            //             isCoronaryMalformations: "",
            //             isGrade3Lesions: "",
            //             isBloodFlowTIMIGrade0to2: "",
            //             isCTO: "",
            //             isCollateralCirculation: "",
            //             pciPaths: [],
            //             implantedBracketCountLAD: "",
            //             implantedBracketCountLCX: "",
            //             implantedBracketCountRCA: "",
            //             implantedBracketCountLM: "",
            //             segmentalLesions: []
            //         }
            //     },
            //     admissionDiagnosis: {
            //         isSilentMyocardialIschemia: "",
            //         isCoronaryMicrovascularDisease: "",
            //         isMyocardialInfarction: "",
            //         myocardialInfarctionType: "",
            //         myocardialInfarctionPart: "",
            //         isAngina: "",
            //         anginaType: "",
            //         anginaCcs: "",
            //         isIschemicCardiomyopathy: "",
            //         isSuddenCoronaryDeath: "",
            //         isChestPainOfUnknownOrigin: "",
            //         isDiagnosisOthers: "",
            //         diagnosisOthers: ""
            //     },
            //     dischargeDiagnosis: {
            //         isSilentMyocardialIschemia: "",
            //         isCoronaryMicrovascularDisease: "",
            //         isMyocardialInfarction: "",
            //         myocardialInfarctionType: "",
            //         myocardialInfarctionPart: "",
            //         isAngina: "",
            //         anginaType: "",
            //         anginaCcs: "",
            //         isIschemicCardiomyopathy: "",
            //         isSuddenCoronaryDeath: "",
            //         isChestPainOfUnknownOrigin: "",
            //         isDiagnosisOthers: "",
            //         diagnosisOthers: ""
            //     }
            // },
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
            showAlert: false,          //是否显示出错信息
        }
    },
    methods: {
        nextStep () {
            this.currentStep++;//测试用，后期注释掉
            this.$validator.validateAll().then((result) => {
                if(result){
                    this.currentStep++;
                }else{
                    this.$refs.formError.open();
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
            this.$refs.formSubmitting.open();
        }
    },
    created () {
        mrApi.getMedicalRecord().then(res=>{
            if(res.status){
                this.mr = res.data;
            }else{
                console.log('获取病历数据失败！');
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


