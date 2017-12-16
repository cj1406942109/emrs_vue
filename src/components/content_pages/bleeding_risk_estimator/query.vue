<template>
    <div class="bre-query">
        <div class="page-bar">
            <ul class="page-breadcrumb">
                <li>
                    <span>Bleeding Risk Estimator</span>
                    <i class="fa fa-circle"></i>
                </li>
                <li>
                    <router-link to="/home/bre_query">Result List</router-link>
                </li>
            </ul>                     
        </div>
        <h1 class="page-title"> Bleeding Risk Estimator
            <small>Dispaly the result list below</small>        
        </h1>
        <div class="portlet light">
            <div class="portlet-title">
                <div class="caption font-dark">
                    <i class="icon-list font-dark"></i>
                    <span class="caption-subject bold uppercase"> Result List </span>
                </div>
            </div>
            <div class="portlet-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th rowspan="2" colspan="2">Index</th>
                            <th rowspan="2" class="col-md-2">Raw Data</th>
                            <th rowspan="2" class="col-md-4">Result Data</th>
                            <th colspan="2" class="col-md-4">Follow-up Information</th>                            
                            <th rowspan="2">Creation Time</th>
                        </tr>
                        <tr>
                            <th>After 1 Month</th>
                            <th>After 2nd visit to hospital OPD</th>
                        </tr>
                    </thead>
                    <tbody class="text-center" v-if="recordList.length>0">
                        <tr v-for="(item, index) in recordList" :key="item.id">
                            <td>{{index+1}}</td>
                            <td>
                                <span @click="toggleCollapse(index+1)">
                                    <i title="collapse" class="fa fa-plus-square-o" aria-hidden="true" v-if="!checkCollapseStatus(index+1)"></i>
                                    <i title="collapse" class="fa fa-minus-square-o" aria-hidden="true" v-else></i>
                                </span>
                            </td>
                            <td v-show="!checkCollapseStatus(index+1)"><span class="bold">Patiend ID:</span> {{item.rawData.basicInfo.patientId}} &nbsp;&nbsp; <span class="bold">Name:</span> {{item.rawData.basicInfo.name}}</td>
                            <td colspan="3" v-show="!checkCollapseStatus(index+1)" class="font-blue">Click the collapse button left to view detail information</td>
                            <td v-show="checkCollapseStatus(index+1)">
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">Basic Information</th></tr></thead>
                                    <tbody>
                                        <tr><td>Patient ID</td><td>{{item.rawData.basicInfo.patientId}}</td></tr>
                                        <tr><td>Name</td><td>{{item.rawData.basicInfo.name}}</td></tr>
                                        <tr><td>Phone Number</td><td>{{item.rawData.basicInfo.phone}}</td></tr>
                                        <tr><td>Sex</td><td>{{item.rawData.basicInfo.sex}}</td></tr>
                                        <tr><td>Age</td><td>{{item.rawData.basicInfo.age}}<span> years</span></td></tr>
                                        <tr><td>Weight</td><td>{{item.rawData.basicInfo.weight}}<span> kg</span></td></tr>
                                        <tr><td>Height</td><td>{{item.rawData.basicInfo.height}}<span> cm</span></td></tr>
                                        <tr><td>Address</td><td>{{item.rawData.basicInfo.address}}</td></tr>
                                        <tr><td>Chief Complain</td><td>{{item.rawData.basicInfo.chiefComplain}}</td></tr>
                                        <tr><td>Provisonal Diagnosis</td><td>{{item.rawData.basicInfo.provisonalDiagnosis}}</td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">Risk Factors</th></tr></thead>
                                    <tbody>
                                        <tr><td>Cigarette Smoking</td><td>{{getBooleanText(item.rawData.riskFactors.cigaretteSmoking)}}</td></tr>
                                        <tr><td>Prior Alcohol Usage History(≥ 8 per week)</td><td>{{getBooleanText(item.rawData.riskFactors.alcoholUsageHistory)}}</td></tr>                                        
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">Medical History</th></tr></thead>
                                    <tbody>
                                        <tr><td>Congestive Hearts Failure</td><td>{{getBooleanText(item.rawData.medicalHistory.congestiveHeartsFailure)}}</td></tr>
                                        <tr><td>Left Ventricular Systolic Dysfunction</td><td>{{getBooleanText(item.rawData.medicalHistory.leftVentricularSystolicDysfunction)}}</td></tr>                                        
                                        <tr><td>Diabetes Mellitus</td><td>{{getBooleanText(item.rawData.medicalHistory.diabetesMellitus)}}</td></tr>                                        
                                        <tr><td>Prior Vascular Disease</td><td>{{getBooleanText(item.rawData.medicalHistory.priorVascularDisease)}}</td></tr>                                        
                                        <tr><td>MI at Presentation</td><td>{{getBooleanText(item.rawData.medicalHistory.mIAtPresentation)}}</td></tr>                                        
                                        <tr><td>Prior PCI</td><td>{{getBooleanText(item.rawData.medicalHistory.priorPCI)}}</td></tr>                                        
                                        <tr><td>Prior MI</td><td>{{getBooleanText(item.rawData.medicalHistory.priorMI)}}</td></tr>                                        
                                        <tr><td>Prior History Bleeding</td><td>{{getOptionText('bleedingOption',item.rawData.medicalHistory.priorHistoryBleeding)}}</td></tr>                                        
                                        <tr><td>Medication Usage Predisposing to Bleeding</td><td>{{getBooleanText(item.rawData.medicalHistory.medicationUsagePredisposingToBleeding)}}</td></tr>
                                        <tr><td>Treated Hypertension on Medication</td><td>{{getBooleanText(item.rawData.medicalHistory.treatedHypertensionOnMedication)}}</td></tr>
                                        <tr><td>Prior Stroke or TIA or Thromboembolism</td><td>{{getBooleanText(item.rawData.medicalHistory.priorStrokeOrTIAOrThromboembolism)}}</td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">Physical Examination</th></tr></thead>
                                    <tbody>
                                        <tr><td>Heart Rate</td><td>{{item.rawData.physicalExamination.heartRate}}<span> bpm</span></td></tr>
                                        <tr><td>Systolic Blood pressure</td><td>{{item.rawData.physicalExamination.systolicBloodPressure}}<span> mmHg</span></td></tr>
                                        <tr><td>Diastolic Blood pressure</td><td>{{item.rawData.physicalExamination.diastolicBloodPressure}}<span> mmHg</span></td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">Special Examination</th></tr></thead>
                                    <tbody>
                                        <tr><td>Paclitaxel-eluting Stent</td><td>{{getBooleanText(item.rawData.specialExamination.paclitaxelElutingStent)}}</td></tr>
                                        <tr><td>Stent Diameter</td><td>{{item.rawData.specialExamination.stentDiameter}}<span> mm</span></td></tr>
                                        <tr><td>LVEF</td><td>{{item.rawData.specialExamination.lvef}}<span> %</span></td></tr>
                                        <tr><td>Vein Graft Stent</td><td>{{getBooleanText(item.rawData.specialExamination.veinGraftStent)}}</td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">Lab Examination (Part I)</th></tr></thead>
                                    <tbody>
                                        <tr><td>Hematocrit</td><td>{{item.rawData.labExamination.hematocrit}}<span> %</span></td></tr>
                                        <tr><td>GFR: Cockcroft-Gault</td><td>{{item.rawData.labExamination.hematocrit.GFR}}<span> mL/min</span></td></tr>
                                        <tr><td>Haemoglobin</td><td>{{item.rawData.labExamination.haemoglobin}}<span> g/dL</span></td></tr>
                                        <tr><td>White Blood Cells</td><td>{{item.rawData.labExamination.whiteBloodCells}}<span> ×10<sup>9</sup>/L</span></td></tr>
                                        <tr><td>Abnormal Renal Function</td><td>{{getBooleanText(item.rawData.labExamination.abnormalRenalFunction)}}</td></tr>
                                        <tr><td>Abnormal Liver Function</td><td>{{getBooleanText(item.rawData.labExamination.abnormalLiverFunction)}}</td></tr>
                                        <tr><td>Labile INR</td><td>{{getBooleanText(item.rawData.labExamination.labileINR)}}</td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">Lab Examination (Part II)</th></tr></thead>
                                    <tbody>
                                        <tr><td>High Sensitivity Cardiac Troponin I (HSTNI)</td><td>{{item.rawData.labExamination2.highSensitivityCardiacTroponinI}}<span> pg/mL</span></td></tr>
                                        <tr><td>N-Terminal Pro-Brain Natriuretic Peptide</td><td>{{item.rawData.labExamination2.nTerminalProBrainNatriureticPeptide}}<span> pg/mL</span></td></tr>
                                        <tr><td>Urea</td><td>{{item.rawData.labExamination2.urea}}<span> mmol/L</span></td></tr>
                                        <tr><td>Cr</td><td>{{item.rawData.labExamination2.cr}}<span> μmol/L</span></td></tr>
                                        <tr><td>Uric Acid</td><td>{{item.rawData.labExamination2.uricAcid}}<span> μmol/L</span></td></tr>
                                        <tr><td>Total Cholesterol (TC)</td><td>{{item.rawData.labExamination2.totalCholesterol}}<span> mmol/L</span></td></tr>
                                        <tr><td>Triglyceride (TG)</td><td>{{item.rawData.labExamination2.triglyceride}}<span> mmol/L</span></td></tr>
                                        <tr><td>HDL</td><td>{{item.rawData.labExamination2.HDL}}<span> mmol/L</span></td></tr>
                                        <tr><td>LDL</td><td>{{item.rawData.labExamination2.LDL}}<span> mmol/L</span></td></tr>
                                        <tr><td>hs-CRP</td><td>{{item.rawData.labExamination2.hsCRP}}<span> mg/L</span></td></tr>
                                        <tr><td>Glucose</td><td>{{item.rawData.labExamination2.glucose}}<span> mmol/L</span></td></tr>
                                        <tr><td>D-Dimer</td><td>{{item.rawData.labExamination2.dDimer}}<span> μg/mL</span></td></tr>
                                        <tr><td>Platelets Count</td><td>{{item.rawData.labExamination2.plateletsCount}}<span> ×10<sup>9</sup>/L</span></td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">Drugs for Treatment</th></tr></thead>
                                    <tbody>
                                        <tr><td>Antiplatelets</td><td>{{getBooleanText(item.rawData.drugsForTreatment.antiplatelets)}}</td></tr>
                                        <tr><td>B-blocker</td><td>{{getBooleanText(item.rawData.drugsForTreatment.bBlocker)}}</td></tr>
                                        <tr><td>CCB</td><td>{{getBooleanText(item.rawData.drugsForTreatment.CCB)}}</td></tr>
                                        <tr><td>ACEI/ARB</td><td>{{getBooleanText(item.rawData.drugsForTreatment.ACEIARB)}}</td></tr>
                                        <tr><td>Statin</td><td>{{getBooleanText(item.rawData.drugsForTreatment.statin)}}</td></tr>
                                        <tr><td>Digoxin</td><td>{{getBooleanText(item.rawData.drugsForTreatment.digoxin)}}</td></tr>
                                        <tr><td>Diuretic</td><td>{{getBooleanText(item.rawData.drugsForTreatment.diuretic)}}</td></tr>
                                        <tr><td>Warfarin</td><td>{{getBooleanText(item.rawData.drugsForTreatment.warfarin)}}</td></tr>
                                        <tr><td>Other Drugs</td><td>{{item.rawData.drugsForTreatment.otherDrugs}}</td></tr>
                                        <tr><td>Echocardiogram/Angiography Report</td><td>{{item.rawData.drugsForTreatment.echocardiogramAngiographyReport}}</td></tr>
                                    </tbody>
                                </table>
                            </td>
                            <td v-show="checkCollapseStatus(index+1)">
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">DAPT Score Calculator</th></tr></thead>
                                    <tbody>
                                        <tr><td>Age</td><td>{{item.resultData.DAPTScore.age}}<span> years</span></td></tr>
                                        <tr><td>Cigarette Smoking Within Last Two Years</td><td>{{getBooleanText(item.resultData.DAPTScore.cigaretteSmoking)}}</td></tr>
                                        <tr><td>Diabetes Mellitus</td><td>{{getBooleanText(item.resultData.DAPTScore.diabetesMellitus)}}</td></tr>
                                        <tr><td>Prior Myocardial Infarction or Percutaneous Coronary Intervention</td><td>{{getBooleanText(item.resultData.DAPTScore.priorMIOrPriorPCI)}}</td></tr>
                                        <tr><td>History of CHF or LVEF < 30%</td><td>{{getBooleanText(item.resultData.DAPTScore.historyOfCHFOrLevflt30)}}</td></tr>
                                        <tr><td>Myocardial Infarction at Presentation</td><td>{{getBooleanText(item.resultData.DAPTScore.mIAtPresentation)}}</td></tr>
                                        <tr><td>Vein Graft Stent</td><td>{{getBooleanText(item.resultData.DAPTScore.veinGraftStent)}}</td></tr>
                                        <tr><td>Paclitaxel-eluting Stent</td><td>{{getBooleanText(item.resultData.DAPTScore.paclitaxelElutingStent)}}</td></tr>
                                        <tr><td>Stent Diameter < 3mm</td><td>{{getBooleanText(item.resultData.DAPTScore.stentDiameterlt3)}}</td></tr>
                                        <tr><td class="font-red">DAPT Score</td><td><b>{{item.resultData.DAPTScore.result.value}}&nbsp;&nbsp;{{item.resultData.DAPTScore.result.desc}}</b></td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">Bleeding Score Calculator</th></tr></thead>
                                    <tbody>
                                        <tr><td>Baseline Hematocrit</td><td>{{getOptionText('hematocritOption', item.resultData.BleedingScore.hematocrit)}}<span> HCT(%)</span></td></tr>
                                        <tr><td>GFR: Cockcroft-Gault</td><td>{{getOptionText('GFROption', item.resultData.BleedingScore.GFR)}}<span> mL/min</span></td></tr>
                                        <tr><td>Heart rate on admission</td><td>{{getOptionText('heartRateOption', item.resultData.BleedingScore.heartRate)}}<span> bpm</span></td></tr>
                                        <tr><td>Systolic blood pressure on admission</td><td>{{getOptionText('systolicBloodPressureOption', item.resultData.BleedingScore.systolicBloodPressure)}}<span> mmHg</span></td></tr>
                                        <tr><td>Prior Vascular Disease</td><td>{{getOptionText('priorVascularDiseaseOption', item.resultData.BleedingScore.priorVascularDisease)}}</td></tr>
                                        <tr><td>Diabetes Mellitus</td><td>{{getOptionText('diabetesMellitusOption', item.resultData.BleedingScore.diabetesMellitus)}}</td></tr>
                                        <tr><td>Signs of CHF on admission</td><td>{{getOptionText('congestiveHeartsFailureOption', item.resultData.BleedingScore.congestiveHeartsFailure)}}</td></tr>
                                        <tr><td>Sex</td><td>{{getOptionText('sexOption', item.resultData.BleedingScore.sex)}}</td></tr>
                                        <tr><td class="font-red">CRUSADE Bleeding Score</td><td><b>{{item.resultData.BleedingScore.result.value}}&nbsp;&nbsp;{{item.resultData.BleedingScore.result.desc}}</b></td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">HAS-BLED Score Calculator</th></tr></thead>
                                    <tbody>
                                        <tr><td>Hypertension: (uncontrolled, >160 mmHg systolic)</td><td>{{getBooleanText(item.resultData.HASBLEDScore.hypertension)}}</td></tr>
                                        <tr><td>Abnormal renal function: Dialysis, transplant, Cr >2.26 mg/dL or >200 µmol/L</td><td>{{getBooleanText(item.resultData.HASBLEDScore.abnormalRenalFunction)}}</td></tr>
                                        <tr><td>Abnormal liver function: Cirrhosis or Bilirubin >2x Normal or AST/ALT/AP >3x Normal</td><td>{{getBooleanText(item.resultData.HASBLEDScore.abnormalLiverFunction)}}</td></tr>
                                        <tr><td>Stroke: Prior history of stroke</td><td>{{getBooleanText(item.resultData.HASBLEDScore.priorStroke)}}</td></tr>
                                        <tr><td>Bleeding: Prior Major Bleeding or Predisposition to Bleeding</td><td>{{getBooleanText(item.resultData.HASBLEDScore.priorMajorBleedingOrPredisposingToBleeding)}}</td></tr>
                                        <tr><td>Labile INR: (Unstable/high INR), Time in Therapeutic Range < 60%</td><td>{{getBooleanText(item.resultData.HASBLEDScore.labileINR)}}</td></tr>
                                        <tr><td>Elderly: age > 65 years</td><td>{{getBooleanText(item.resultData.HASBLEDScore.elderly)}}</td></tr>
                                        <tr><td>Prior Alcohol Usage History (≥ 8 drinks/week)</td><td>{{getBooleanText(item.resultData.HASBLEDScore.alcoholUsageHistory)}}</td></tr>
                                        <tr><td>Medication Usage Predisposing to Bleeding: (Antiplatelet agents, NSAIDs)</td><td>{{getBooleanText(item.resultData.HASBLEDScore.medicationUsagePredisposingToBleeding)}}</td></tr>
                                        <tr><td class="font-red">HAS-BLED Score</td><td><b>{{item.resultData.HASBLEDScore.result.value}}&nbsp;&nbsp;{{item.resultData.HASBLEDScore.result.desc}}</b></td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">CHA<sub>2</sub>DS<sub>2</sub>–VASc Score Calculator</th></tr></thead>
                                    <tbody>
                                        <tr><td>Congestive heart failure (or Left ventricular systolic dysfunction)</td><td>{{getBooleanText(item.resultData.CHADSVASScore.chfOrLvsd)}}</td></tr>
                                        <tr><td>Hypertension: blood pressure consistently above 140/90 mmHg (or treated hypertension on medication)</td><td>{{getBooleanText(item.resultData.CHADSVASScore.hypertension)}}</td></tr>
                                        <tr><td>Age</td><td>{{getOptionText('ageOption', item.resultData.CHADSVASScore.age)}}</td></tr>
                                        <tr><td>Diabetes Mellitus</td><td>{{getBooleanText(item.resultData.CHADSVASScore.diabetesMellitus)}}</td></tr>
                                        <tr><td>Prior Stroke or TIA or Thromboembolism</td><td>{{getOptionText('priorStrokeTIAThromboembolismOption', item.resultData.CHADSVASScore.priorStrokeOrTIAOrThromboembolism)}}</td></tr>
                                        <tr><td>Vascular disease (e.g. peripheral artery disease, myocardial infarction, aortic plaque)</td><td>{{getBooleanText(item.resultData.CHADSVASScore.vascularDisease)}}</td></tr>
                                        <tr><td>Sex category (i.e. female sex)</td><td>{{getBooleanText(item.resultData.CHADSVASScore.sexCategory)}}</td></tr>
                                        <tr><td class="font-red">CHA2DS2–VASc Score</td><td><b>{{item.resultData.CHADSVASScore.result.value}}</b></td></tr>
                                        <tr><td class="font-red">CHA2DS2–VASc Risk</td><td><b>{{item.resultData.CHADSVASScore.result.risk}}</b></td></tr>
                                        <tr><td class="font-red">CHA2DS2–VASc Therapy</td><td><b>{{item.resultData.CHADSVASScore.result.therapy}}</b></td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead><tr><th colspan="2">PRECISE-DAPT Score Calculator</th></tr></thead>
                                    <tbody>
                                        <tr><td>Haemoglobin</td><td>{{item.resultData.PreciseDaptScore.haemoglobin}}<span> g/dL</span></td></tr>
                                        <tr><td>Age</td><td>{{item.resultData.PreciseDaptScore.age}}<span> years</span></td></tr>
                                        <tr><td>White Blood Cells</td><td>{{item.resultData.PreciseDaptScore.whiteBloodCells}}<span> x10<sup>9</sup>/L</span></td></tr>
                                        <tr><td>Creatinine Clearance</td><td>{{item.resultData.PreciseDaptScore.creatinineClearance}}<span> mL/min</span></td></tr>
                                        <tr><td>Prior Bleeding</td><td>{{getBooleanText(item.resultData.PreciseDaptScore.priorBleeding)}}</td></tr>
                                        <tr><td class="font-red">PRECISE-DAPT Score</td><td><b>{{item.resultData.PreciseDaptScore.result.value}}</b></td></tr>
                                        <tr><td class="font-red">Cluster of Risk</td><td><b>{{item.resultData.PreciseDaptScore.result.risk}}</b></td></tr>
                                        <tr><td class="font-red">12 months risk of TIMI major or minor Bleeding</td><td><b>{{item.resultData.PreciseDaptScore.result.riskOfMajorOrMinorBleeding>4.14?'>4.14%':item.resultData.PreciseDaptScore.result.riskOfMajorOrMinorBleeding+'%'}}</b></td></tr>
                                        <tr><td class="font-red">12 months risk of TIMI Major Bleeding</td><td><b>{{item.resultData.PreciseDaptScore.result.riskOfMajorBleeding>2.06?'>2.06%':item.resultData.PreciseDaptScore.result.riskOfMajorBleeding+'%'}}</b></td></tr>
                                        <tr>
                                            <td colspan="2">
                                                <img :src="`http://www.precisedaptscore.com/simpleplot.php?value=${item.resultData.PreciseDaptScore.result.value>36.0?36.0:resultData.PreciseDaptScore.result.value}`">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <div v-if="item.resultData.PreciseDaptScore.result.value>=25">
                                                    <img src="./scoremagg25.jpg">
                                                    <div><font size= "1" >In patients with high PRECISE-DAPT score (Score >= 25) a short DAPT (3-6 months) as compared with a long DAPT (12-24 months) was associated with lower TIMI major and minor bleeding and similar rate of the composite ischemic endpoint.</font></div>
                                                </div>
                                                <div v-if="item.resultData.PreciseDaptScore.result.value<25">
                                                    <img src="./scoremin25.jpg">
                                                    <div><font size= "1" >In patients without high PRECISE-DAPT score (Score < 25) a long DAPT (12-24 months) as compared with a short DAPT (3-6 months) was associated with a lower rate of the composite ischemic endpoint and similar TIMI major and minor bleeding.</font></div>                               
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td v-show="checkCollapseStatus(index+1)">
                                <table class="table table-bordered table-hover">
                                    <tbody>
                                        <tr><td><label class="control-label bold">Bleeding: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[0].bleeding"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Stroke: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[0].stroke"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">MI: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[0].mi"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Heart Failure: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[0].heartFailure"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Death: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[0].death"></textarea></td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr><th>Lab Report</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td><label class="control-label bold">LFT(liver function Test): </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[0].liverFunctionTest"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">RFT(renal  function Test): </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[0].renalFunctionTest"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Platele Function: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[0].plateleFunction"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Lipid Profile: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[0].lipidProfile"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Echocardiography/CT/ Angiography report: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[0].echocardiogramCTAngiographyReport"></textarea></td></tr>
                                    </tbody>
                                </table>
                                <button class="btn btn-block green btn-primary" @click="showConfrim(item)">Save</button>
                            </td>
                            <td v-show="checkCollapseStatus(index+1)">
                                <table class="table table-bordered table-hover">
                                    <tbody>
                                        <tr><td><label class="control-label bold">Bleeding: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[1].bleeding"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Stroke: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[1].stroke"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">MI: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[1].mi"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Heart Failure: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[1].heartFailure"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Death: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[1].death"></textarea></td></tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr><th>Lab Report</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td><label class="control-label bold">LFT(liver function Test): </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[1].liverFunctionTest"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">RFT(renal  function Test): </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[1].renalFunctionTest"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Platele Function: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[1].plateleFunction"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Lipid Profile: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[1].lipidProfile"></textarea></td></tr>
                                        <tr><td><label class="control-label bold">Echocardiography/CT/ Angiography report: </label><textarea class="form-control" rows="5" v-model="item.followUpInfo[1].echocardiogramCTAngiographyReport"></textarea></td></tr>
                                    </tbody>
                                </table>
                                <button class="btn btn-block green btn-primary" @click="showConfrim(item)">Save</button>
                            </td>
                            <td>{{item.createTime}}</td>
                        </tr>
                    </tbody>
                    <tbody v-if="recordList.length==0">
                        <tr><td colspan="6">No data available!</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <sweet-modal ref="errorModal" icon="error" :blocking="true" :hide-close-button="false">
            {{errorMessage}}
        </sweet-modal>
        <sweet-modal ref="saveDataConfirm" icon="warning">
            Save the data?
            <sweet-button class="btn red" slot="button" v-on:click="$refs.saveDataConfirm.close()">取消</sweet-button>
            <sweet-button class="btn green" slot="button" v-on:click="SaveData(currentItem)">确定</sweet-button>
        </sweet-modal>      
        <sweet-modal ref="dataSaving" icon="info" :blocking="true" :hide-close-button="true">
            Saveing your data, please wait for a while……
        </sweet-modal>
  </div>
</template>

<script>
import SweetButton from 'sweet-modal-vue/docs/components/Button';
import utils from '@/utils/utils';
import config from '@/config';
export default {
    data () {
        return {
            collapseList: [1],
            recordList: [],
            errorMessage: '',
            optionList: {
                bleedingOption: [
                    {val: 1, text: 'Spontaneous Bleeding'},
                    {val: 2, text: 'Major Bleeding'},
                    {val: 3, text: 'Predisposition to Bleeding'},
                    {val: 4, text: 'No'}
                ],
                hematocritOption: [
                    {val:0, text: '> 39.9'},
                    {val:2, text: '37-39.9'},
                    {val:3, text: '34-36.9'},
                    {val:7, text: '31-33.9'},
                    {val:9, text: '< 31'}
                ],
                GFROption: [
                    {val:0, text: '> 120'},
                    {val:7, text: '91-120'},
                    {val:17, text: '61-90'},
                    {val:28, text: '31-60'},
                    {val:35, text: '16-30'},
                    {val:39, text: '< 16'}
                ],
                heartRateOption: [
                    {val:0, text: '< 71'},
                    {val:1, text: '71-80'},
                    {val:3, text: '81-90'},
                    {val:6, text: '91-100'},
                    {val:8, text: '101-110'},
                    {val:10, text: '111-120'},
                    {val:11, text: '> 120'},
                ],
                systolicBloodPressureOption: [
                    {val:10, text: '< 91'},
                    {val:8, text: '91-100'},
                    {val:5, text: '101-120 or >200'},
                    {val:3, text: '181-200'},
                    {val:1, text: '121-180'}
                ],
                ageOption: [
                    {val:0, text: '< 65'},
                    {val:1, text: '65-74'},
                    {val:2, text: '≥ 75'}
                ],
                priorVascularDiseaseOption: [
                    {val:0, text: 'No'},
                    {val:6, text: 'Yes'}
                ],
                diabetesMellitusOption: [
                    {val:0, text: 'No'},
                    {val:6, text: 'Yes'}
                ],
                congestiveHeartsFailureOption: [
                    {val:0, text: 'No'},
                    {val:7, text: 'Yes'}
                ],
                sexOption: [
                    {val:0, text: 'Male'},
                    {val:8, text: 'Female'}
                ],
                priorStrokeTIAThromboembolismOption: [
                    {val:0, text: 'No'},
                    {val:2, text: 'Yes'}
                ]
            },
            currentItem: ''
        }
    },
    methods: {
        toggleCollapse(i){
            let eleInList = false;
            let eleIndex = null;
            this.collapseList.forEach(function(ele, index){
                if(ele === i){
                    eleIndex = index;
                    eleInList = true;
                }
            });
            
            if(eleInList){
                this.collapseList.splice(eleIndex, 1);
            }else{
                this.collapseList.push(i);
            }
        },
        checkCollapseStatus(i){
            let eleInList = false;
            this.collapseList.forEach(function(ele){
                if(ele === i){
                    eleInList = true;
                }
            })
            return eleInList;
        },
        getBooleanText(val){
            if(val==0){
                return 'No';
            }else if(val==1){
                return 'Yes';
            }else{
                return '';
            }
        },
        getOptionText(arrayName, val){
            let text = '';
            let array = this.optionList[arrayName];
            array.forEach(function(item){
                if(item.val==val){
                    text=item.text;
                }
            })
            return text;
        },
        showConfrim(item){
            this.$refs.saveDataConfirm.open();
            this.currentItem = item;
        },
        SaveData (item) {
            this.$refs.saveDataConfirm.close();
            this.$refs.dataSaving.open();
            this.$http.post(config.apiHost + '/dp/updatePrediction',{predictionId: item._id, followUpInfo: item.followUpInfo}).then(response => {
                this.$refs.dataSaving.close();
                let responseData = response.body;
                if (responseData.status) {            
                    this.getRecordList(this);
                } else {
                    this.errorMessage = 'Save data failed, please try again!';
                    this.$refs.errorModal.open();
                }
            }, response => {
                this.errorMessage = 'Save data failed, please try again!';
                this.$refs.errorModal.open();
            });
        },
        getRecordList(vm){
            vm.$http.post(config.apiHost + '/dp/getAllPredictionsByUserId', {userId: JSON.parse(sessionStorage.getItem('user'))._id}).then(response => {
                let responseData = response.body;
                if (responseData.status) {            
                    vm.recordList=responseData.data;
                } else {
                    vm.errorMessage = 'Get the result data failed, please try again!';
                    vm.$refs.errorModal.open();
                }
            }, response => {
                vm.errorMessage = 'Get the result data failed, please try again!';
                vm.$refs.errorModal.open();
            });
        }
    },
    watch: {
        '$route' () {
            this.getRecordList(this);
        }
    },
    created () {
        this.getRecordList(this);
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
    .bre-query
        table         
            thead,th
                vertical-align middle
                font-weight bold
                color #000
            thead,th
            tbody,td                
                    text-align center   
                    .fa
                        font-size 16px
                        cursor pointer                        
                    
        .table-hover
            td:nth-child(1)                
                font-weight bold
                color #666
            td:nth-child(2)                
                color #000
                span 
                    color #666         
            img
                max-width:100%
</style>


