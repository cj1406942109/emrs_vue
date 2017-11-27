<template>
  <div class="input">
    <div class="page-bar">
        <ul class="page-breadcrumb">
            <li>
                <span>Bleeding Risk Estimator</span>
                <i class="fa fa-circle"></i>
            </li>
            <li>
                <router-link to="/home/brs_input">Input Data</router-link>
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
    <h1 class="page-title"> Bleeding Risk Estimator
        <small>Enter all the fields below</small>        
    </h1>
    <div class="row">
        <div class="col-md-6">
            <div class="portlet box blue">
                <div class="portlet-title">
                    <div class="caption">Basic Information</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">     
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Patient ID</label>
                        <div class="col-md-8">
                            <input class="form-control input-inline" v-model="rawdata.basicInfo.patientId">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Name</label>
                        <div class="col-md-8">
                            <input class="form-control input-inline" v-model="rawdata.basicInfo.name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('phone')}">Phone Number</label>
                        <div class="col-md-8">
                            <input v-validate="{regex:/^1[34578]\d{9}$/}" :class="{'input': true, 'border-red': errors.has('phone')}" class="form-control input-inline" v-model="rawdata.basicInfo.phone" name="phone">
                            <span v-show="errors.has('phone')" class="help-block font-red">{{ errors.first('phone') }}</span>
                        </div>
                    </div>                    
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Sex</label>
                        <div class="col-md-8">
                            <select class="form-control input-inline" v-model="rawdata.basicInfo.sex">
                                <option value="" disabled selected>--select--</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('age')}">Age</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true,min_value:0,max_value:140}" :class="{'input': true, 'border-red': errors.has('age')}" class="form-control input-inline" v-model="rawdata.basicInfo.age" name="age">
                            <span class="help-inline" :class="{'font-red':errors.has('age')}">years</span>
                            <span v-show="errors.has('age')" class="help-block font-red">{{ errors.first('age') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('weight')}">Weight</label>
                        <div class="col-md-8">
                            <input v-validate="{decimal:2,min_value:0}" :class="{'input': true, 'border-red': errors.has('weight')}" class="form-control input-inline" v-model="rawdata.basicInfo.weight" name="weight">
                            <span class="help-inline" :class="{'font-red':errors.has('weight')}">kg</span>
                            <span v-show="errors.has('weight')" class="help-block font-red">{{ errors.first('weight') }}</span>
                        </div>                    
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('height')}">Height</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true,max:3,min_value:0}" :class="{'input': true, 'border-red': errors.has('height')}" class="form-control input-inline" v-model="rawdata.basicInfo.height" name="height">
                            <span class="help-inline" :class="{'font-red':errors.has('height')}">cm</span>
                            <span v-show="errors.has('height')" class="help-block font-red">{{ errors.first('height') }}</span>
                        </div>                    
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Address</label>
                        <div class="col-md-7">
                            <textarea rows="3" class="form-control" v-model="rawdata.basicInfo.address"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Chief Complain</label>
                        <div class="col-md-7">
                            <textarea rows="5" class="form-control" v-model="rawdata.basicInfo.chiefComplain"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4">Provisonal Diagnosis</label>
                        <div class="col-md-7">
                            <textarea rows="5" class="form-control" v-model="rawdata.basicInfo.provisonalDiagnosis"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portlet box blue">
                <div class="portlet-title">
                    <div class="caption">Risk Factors</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">     
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Cigarette Smoking</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  v-model="rawdata.riskFactors.cigaretteSmoking">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div> 
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior Alcohol Usage History(≥ 8 per week)</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  v-model="rawdata.riskFactors.alcoholUsageHistory">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portlet box blue">
                <div class="portlet-title">
                    <div class="caption">Medical History</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">     
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Congestive Hearts Failure</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  v-model="rawdata.medicalHistory.congestiveHeartsFailure">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div> 
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Left Ventricular Systolic Dysfunction</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  v-model="rawdata.medicalHistory.leftVentricularSystolicDysfunction">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Diabetes Mellitus</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  v-model="rawdata.medicalHistory.diabetesMellitus">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior Vascular Disease</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.medicalHistory.priorVascularDisease">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">MI at Presentation</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.medicalHistory.mIAtPresentation">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior PCI</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.medicalHistory.priorPCI">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior MI</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.medicalHistory.priorMI">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior History Bleeding</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.medicalHistory.priorHistoryBleeding">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Spontaneous Bleeding</option>
                                <option value="2">Major Bleeding</option>
                                <option value="3">Predisposition to Bleeding</option>
                                <option value="4">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Medication Usage Predisposing to Bleeding</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.medicalHistory.medicationUsagePredisposingToBleeding">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Treated Hypertension on Medication</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.medicalHistory.treatedHypertensionOnMedication">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior Stroke or TIA or Thromboembolism</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.medicalHistory.priorStrokeOrTIAOrThromboembolism">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="portlet box blue">
                <div class="portlet-title">
                    <div class="caption">Physical Examination</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">     
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('heart-rate')}">Heart Rate</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true,min_value:0,max_value:160}" :class="{'input': true, 'border-red': errors.has('heart-rate')}" class="form-control input-inline" v-model="rawdata.physicalExamination.heartRate" name="heart-rate">
                            <span class="help-inline" :class="{'font-red':errors.has('heart-rate')}">bpm</span>
                            <span v-show="errors.has('heart-rate')" class="help-block font-red">{{ errors.first('heart-rate') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('systolic-blood-pressure')}">Systolic Blood pressure</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true,max:3,min_value:0}" :class="{'input': true, 'border-red': errors.has('systolic-blood-pressure')}" class="form-control input-inline" v-model="rawdata.physicalExamination.systolicBloodPressure" name="systolic-blood-pressure">
                            <span class="help-inline" :class="{'font-red':errors.has('systolic-blood-pressure')}">mmHg</span>
                            <span v-show="errors.has('systolic-blood-pressure')" class="help-block font-red">{{ errors.first('systolic-blood-pressure') }}</span>
                        </div>
                    </div>          
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('diastolic-blood-pressure')}">Diastolic Blood pressure</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true,max:3,min_value:0}" :class="{'input': true, 'border-red': errors.has('diastolic-blood-pressure')}" class="form-control input-inline" v-model="rawdata.physicalExamination.diastolicBloodPressure" name="diastolic-blood-pressure">
                            <span class="help-inline" :class="{'font-red':errors.has('diastolic-blood-pressure')}">mmHg</span>
                            <span v-show="errors.has('diastolic-blood-pressure')" class="help-block font-red">{{ errors.first('diastolic-blood-pressure') }}</span>
                        </div>
                    </div>     
                </div>
            </div>
            <div class="portlet box blue">
                <div class="portlet-title">
                    <div class="caption">Lab Examination</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">     
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('hematocrit')}">Hematocrit</label>
                        <div class="col-md-8">
                            <input v-validate="{decimal:2,min_value:0,max_value:100}" :class="{'input': true, 'border-red': errors.has('hematocrit')}" class="form-control input-inline" v-model="rawdata.labExamination.hematocrit" name="hematocrit">
                            <span class="help-inline" :class="{'font-red':errors.has('hematocrit')}">%</span>
                            <span v-show="errors.has('hematocrit')" class="help-block font-red">{{ errors.first('hematocrit') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('cr')}">Cr</label>
                        <div class="col-md-8">
                            <input v-validate="{decimal:2,min_value:0}" :class="{'input': true, 'border-red': errors.has('cr')}" class="form-control input-inline" v-model="rawdata.labExamination.cr" name="cr">
                            <span class="help-inline" :class="{'font-red':errors.has('cr')}">mg/dL</span>
                            <span v-show="errors.has('cr')" class="help-block font-red">{{ errors.first('cr') }}</span>
                        </div>
                    </div>                     
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('GFR')}">GFR: Cockcroft-Gault</label>
                        <div class="col-md-8">
                            <input v-validate="{decimal:2,min_value:0,max_value:200}" :class="{'input': true, 'border-red': errors.has('GFR')}" class="form-control input-inline" v-model="rawdata.labExamination.GFR" name="GFR">
                            <span class="help-inline" :class="{'font-red':errors.has('GFR')}">mL/min</span>
                            <span v-show="errors.has('GFR')" class="help-block font-red">{{ errors.first('GFR') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('haemoglobin')}">Haemoglobin</label>
                        <div class="col-md-8">
                            <input v-validate="{decimal:2,min_value:0}" :class="{'input': true, 'border-red': errors.has('haemoglobin')}" class="form-control input-inline" v-model="rawdata.labExamination.haemoglobin" name="haemoglobin">
                            <span class="help-inline" :class="{'font-red':errors.has('haemoglobin')}">g/dL</span>
                            <span v-show="errors.has('haemoglobin')" class="help-block font-red">{{ errors.first('haemoglobin') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('white-blood-cells')}">White Blood Cells</label>
                        <div class="col-md-8">
                            <input v-validate="{decimal:2,min_value:0}" :class="{'input': true, 'border-red': errors.has('white-blood-cells')}" class="form-control input-inline" v-model="rawdata.labExamination.whiteBloodCells" name="white-blood-cells">
                            <span class="help-inline" :class="{'font-red':errors.has('white-blood-cells')}">× 10<sup>9</sup>/L</span>
                            <span v-show="errors.has('white-blood-cells')" class="help-block font-red">{{ errors.first('white-blood-cells') }}</span>
                        </div>
                    </div>     
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Abnormal Renal Function</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.labExamination.abnormalRenalFunction">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>  
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Abnormal Liver Function</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.labExamination.abnormalLiverFunction">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>  
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Labile INR</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.labExamination.labileINR">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>     
                </div>
            </div>
            <div class="portlet box blue">
                <div class="portlet-title">
                    <div class="caption">Special Examination</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal"> 
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Paclitaxel-eluting Stent</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.specialExamination.paclitaxelElutingStent">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>    
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('stent-diameter')}">Stent Diameter</label>
                        <div class="col-md-8">
                            <input v-validate="{decimal:2,min_value:0}" :class="{'input': true, 'border-red': errors.has('stent-diameter')}" class="form-control input-inline" v-model="rawdata.specialExamination.stentDiameter" name="stent-diameter">
                            <span class="help-inline" :class="{'font-red':errors.has('stent-diameter')}">mm</span>
                            <span v-show="errors.has('stent-diameter')" class="help-block font-red">{{ errors.first('stent-diameter') }}</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-4" :class="{'font-red':errors.has('lvef')}">LVEF</label>
                        <div class="col-md-8">
                            <input v-validate="{numeric:true,min_value:0,max_value:100}" :class="{'input': true, 'border-red': errors.has('lvef')}" class="form-control input-inline" v-model="rawdata.specialExamination.lvef" name="lvef">
                            <span class="help-inline" :class="{'font-red':errors.has('lvef')}">%</span>
                            <span v-show="errors.has('lvef')" class="help-block font-red">{{ errors.first('lvef') }}</span>
                        </div>
                    </div>                     
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Vein Graft Stent</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" v-model="rawdata.specialExamination.veinGraftStent">
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="portlet box green-dark">
                <div class="portlet-title">
                    <div class="caption">DAPT Score Calculator</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">     
                    <h3>Patient Characteristics</h3>
                    <div class="form-group">
                        <label class="control-label col-md-6 bold">Age</label>
                        <div class="col-md-6">
                            <input class="form-control input-inline" type="number" min="18" max="100" :value="resultData.DAPTScore.age" disabled></span>
                            <span class="help-inline">years</span>
                            <span class="help-block">must be between 18-100</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Cigarette Smoking Within Last Two Years</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.DAPTScore.cigaretteSmoking" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Diabetes Mellitus</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  :value="resultData.DAPTScore.diabetesMellitus" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior Myocardial Infarction or Percutaneous Coronary Intervention</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  :value="resultData.DAPTScore.priorMIOrPriorPCI" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">History of CHF or LVEF < 30%</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  :value="resultData.DAPTScore.historyOfCHFOrLevflt30" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="2">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>                            
                    <h3>Procedure Characteristics</h3>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Myocardial Infarction at Presentation</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  :value="resultData.DAPTScore.mIAtPresentation" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Vein Graft Stent</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  :value="resultData.DAPTScore.veinGraftStent" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="2">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Paclitaxel-eluting Stent</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  :value="resultData.DAPTScore.paclitaxelElutingStent" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Stent Diameter < 3mm</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline"  :value="resultData.DAPTScore.stentDiameterlt3" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>    
                    <div class="form-group" v-if="resultData.DAPTScore.result">
                        <label class="control-label col-md-6 font-red bold">DAPT Score</label>
                         <div class="col-md-6">
                            <input class="form-control input-inline bold" type="number" min="-2" max="10" :value="resultData.DAPTScore.result.value" disabled>
                            <span class="help-inline font-red bold">{{resultData.DAPTScore.result.desc}}</span>
                        </div>
                    </div>       
                </div>
            </div>
            <div class="portlet box green-dark">
                <div class="portlet-title">
                    <div class="caption">Bleeding Score Calculator</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Baseline Hematocrit</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.BleedingScore.hematocrit" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="0">> 39.9</option>
                                <option value="2">37-39.9</option>
                                <option value="3">34-36.9</option>
                                <option value="7">31-33.9</option>
                                <option value="9">< 31</option>
                            </select>
                            <span class="help-inline">HCT(%)</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">GFR: Cockcroft-Gault</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.BleedingScore.GFR" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="0">> 120</option>
                                <option value="7">91-120</option>
                                <option value="17">61-90</option>
                                <option value="28">31-60</option>
                                <option value="35">16-30</option>
                                <option value="39">< 16</option>
                            </select>
                            <span class="help-inline">mL/min</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Heart rate on admission</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.BleedingScore.heartRate" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="0">< 71</option>
                                <option value="1">71-80</option>
                                <option value="3">81-90</option>
                                <option value="6">91-100</option>
                                <option value="8">101-110</option>
                                <option value="10">111-120</option>
                                <option value="11">> 120</option>
                            </select>
                            <span class="help-inline">bpm</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Systolic blood pressure on admission</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.BleedingScore.systolicBloodPressure" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="10">< 91 </option>
                                <option value="8">91-100 </option>
                                <!-- <option value="5">101-120 </option> -->
                                <option value="5">101-120 or >200 </option>
                                <option value="1">121-180 </option>
                                <option value="3">181-200 </option>
                                <!-- <option value="5">> 200 </option> -->
                            </select>
                            <span class="help-inline">mmHg</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior Vascular Disease</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.BleedingScore.priorVascularDisease" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="6">Yes</option>
                                <option value="0">No</option>
                            </select>
                            <span class="help-inline"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Diabetes Mellitus</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.BleedingScore.diabetesMellitus" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="6">Yes</option>
                                <option value="0">No</option>
                            </select>
                            <span class="help-inline"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Signs of CHF on admission</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.BleedingScore.congestiveHeartsFailure" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="7">Yes</option>
                                <option value="0">No</option>
                            </select>
                            <span class="help-inline"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Sex</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.BleedingScore.sex" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="0">Male</option>
                                <option value="8">Female</option>
                            </select>
                            <span class="help-inline"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6 font-red">CRUSADE Bleeding Score</label>
                        <div class="col-md-6">
                            <input class="form-control input-inline bold" type="number" min="0" max="100" :value="resultData.BleedingScore.result.value" disabled>
                            <span class="help-inline font-red bold">{{resultData.BleedingScore.result.desc}}</span>
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="portlet box green-dark">
                <div class="portlet-title">
                    <div class="caption">HAS-BLED Score Calculator</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Hypertension: (uncontrolled, >160 mmHg systolic)</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.HASBLEDScore.hypertension" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Abnormal renal function: Dialysis, transplant, Cr >2.26 mg/dL or >200 µmol/L</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.HASBLEDScore.abnormalRenalFunction" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Abnormal liver function: Cirrhosis or Bilirubin >2x Normal or AST/ALT/AP >3x Normal</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.HASBLEDScore.abnormalLiverFunction" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Stroke: Prior history of stroke</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.HASBLEDScore.priorStroke" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Bleeding: Prior Major Bleeding or Predisposition to Bleeding</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.HASBLEDScore.priorMajorBleedingOrPredisposingToBleeding" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Labile INR: (Unstable/high INR), Time in Therapeutic Range < 60%</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.HASBLEDScore.labileINR" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Elderly: age > 65 years</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.HASBLEDScore.elderly" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior Alcohol Usage History (≥ 8 drinks/week)</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.HASBLEDScore.alcoholUsageHistory" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Medication Usage Predisposing to Bleeding: (Antiplatelet agents, NSAIDs)</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.HASBLEDScore.medicationUsagePredisposingToBleeding" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6 font-red">HAS-BLED Score</label>
                        <div class="col-md-6">  
                            <input class="form-control input-inline bold" type="number" min="0" max="9" :value="resultData.HASBLEDScore.result.value" disabled>
                            <span class="help-inline font-red bold">{{resultData.HASBLEDScore.result.desc}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portlet box green-dark">
                <div class="portlet-title">
                    <div class="caption">CHA<sub>2</sub>DS<sub>2</sub>–VASc Score Calculator</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Congestive heart failure (or Left ventricular systolic dysfunction)</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.CHADSVASScore.chfOrLvsd" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Hypertension: blood pressure consistently above 140/90 mmHg (or treated hypertension on medication)</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.CHADSVASScore.hypertension" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                            <label class="control-label bold col-md-6">Age</label>
                            <div class="col-md-6">
                                <select class="form-control input-inline" :value="resultData.CHADSVASScore.age" disabled>
                                    <option value="" disabled selected>--select--</option>
                                    <option value="2"> ≥ 75 </option>
                                    <option value="1"> 65-74 </option>
                                    <option value="0"> < 65 </option>
                                </select>                                
                            </div>
                        </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Diabetes Mellitus</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.CHADSVASScore.diabetesMellitus" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior Stroke or TIA or Thromboembolism</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.CHADSVASScore.priorStrokeOrTIAOrThromboembolism" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="2">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Vascular disease (e.g. peripheral artery disease, myocardial infarction, aortic plaque)</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.CHADSVASScore.vascularDisease" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Sex category (i.e. female sex)</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.CHADSVASScore.sexCategory" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>                    
                    <div class="form-group">
                        <label class="control-label bold col-md-6 font-red">CHA<sub>2</sub>DS<sub>2</sub>–VASc Score</label>
                        <div class="col-md-6">
                            <input class="form-control input-inline bold" type="number" min="0" max="10" :value="resultData.CHADSVASScore.result.value" disabled>
                            <span class="help-inline font-red bold">{{resultData.CHADSVASScore.result.desc}}</span>
                        </div>
                    </div>
                    <div v-if="resultData.CHADSVASScore.result.desc===''">
                        <div class="form-group">
                            <label class="control-label bold col-md-6 font-red" style="padding-top: 0">Stroke Risk</label>
                            <label class="bold col-md-6">{{resultData.CHADSVASScore.result.risk}}</label>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-6 font-red" style="padding-top: 0">Anticoagulation Therapy</label>
                            <label class="bold col-md-6">{{resultData.CHADSVASScore.result.therapy}}</label>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="portlet box green-dark">
                <div class="portlet-title">
                    <div class="caption">PRECISE-DAPT Score Calculator</div>
                    <div class="tools">
                        <a href="javascript:;" class="collapse"> </a>
                    </div>
                </div>
                <div class="portlet-body form-horizontal">
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Haemoglobin</label>
                        <div class="col-md-6">
                            <input class="form-control input-inline" :value="resultData.PreciseDaptScore.haemoglobin" disabled>
                            <span class="help-inline">g/dL</span>
                            <span class="help-block">must be between 3-20</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Age</label>
                        <div class="col-md-6">
                            <input type="number" min="10" max="120" class="form-control input-inline" :value="resultData.PreciseDaptScore.age" disabled>
                            <span class="help-inline">years</span>
                            <span class="help-block">must be between 10-120</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">White Blood Cells</label>
                        <div class="col-md-6">
                            <input class="form-control input-inline" :value="resultData.PreciseDaptScore.whiteBloodCells" disabled>
                            <span class="help-inline">10<sup>9</sup>/L</span>
                            <span class="help-block">must be between 0-100</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Creatinine Clearance</label>
                        <div class="col-md-6">
                            <input class="form-control input-inline" :value="resultData.PreciseDaptScore.creatinineClearance" disabled>
                            <span class="help-inline">mL/min</span>
                            <span class="help-block">must be smaller than 200</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6">Prior Bleeding</label>
                        <div class="col-md-6">
                            <select class="form-control input-inline" :value="resultData.PreciseDaptScore.priorBleeding" disabled>
                                <option value="" disabled selected>--select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-12 text-center">
                            <img :src="`http://www.precisedaptscore.com/simpleplot.php?value=${resultData.PreciseDaptScore.result.value>36.0?36.0:resultData.PreciseDaptScore.result.value}`" style="margin: 20px 0">
                            <div v-if="resultData.PreciseDaptScore.result.value!==''">
                                <div v-if="resultData.PreciseDaptScore.result.value>=25">
                                    <img src="./scoremagg25.jpg" style="border:1px dotted #ccc;margin-bottom:10px">
                                    <div><font size= "1" >In patients with high PRECISE-DAPT score (Score >= 25) a short DAPT (3-6 months) as compared with a long DAPT (12-24 months) was associated with lower TIMI major and minor bleeding and similar rate of the composite ischemic endpoint.</font></div>
                                </div>
                                <div v-if="resultData.PreciseDaptScore.result.value<25">
                                    <img src="./scoremin25.jpg" style="border:1px dotted #ccc;margin-bottom:10px">
                                    <div><font size= "1" >In patients without high PRECISE-DAPT score (Score < 25) a long DAPT (12-24 months) as compared with a short DAPT (3-6 months) was associated with a lower rate of the composite ischemic endpoint and similar TIMI major and minor bleeding.</font></div>                               
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label bold col-md-6 font-red">PRECISE-DAPT Score</label>
                        <div class="col-md-6">  
                            <input class="form-control input-inline bold" :value="resultData.PreciseDaptScore.result.value" disabled>
                            <span class="help-inline font-red bold">{{resultData.PreciseDaptScore.result.desc}}</span>
                        </div>
                    </div>
                    <div v-if="resultData.PreciseDaptScore.result.desc===''">
                        <div class="form-group">
                            <label class="control-label bold col-md-6 font-red" style="padding-top: 0">Cluster of Risk</label>
                            <label class="bold col-md-6">{{resultData.PreciseDaptScore.result.risk}}</label>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-6 font-red" style="padding-top: 0">12 months risk of TIMI major or minor Bleeding</label>
                            <label class="bold col-md-6">{{resultData.PreciseDaptScore.result.riskOfMajorOrMinorBleeding>4.14?'>4.14%':resultData.PreciseDaptScore.result.riskOfMajorOrMinorBleeding+'%'}}</label>                        
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-6 font-red" style="padding-top: 0">12 months risk of TIMI Major Bleeding</label>
                            <label class="bold col-md-6">{{resultData.PreciseDaptScore.result.riskOfMajorBleeding>2.06?'>2.06%':resultData.PreciseDaptScore.result.riskOfMajorBleeding+'%'}}</label>
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
        Please fill in all the blanks and get the result data!
    </sweet-modal>
    <sweet-modal ref="dataSaving" icon="success" :blocking="true" :hide-close-button="false">
        All your data are saved, redirecting to the result list page!
    </sweet-modal>
  </div>
</template>

<script>
import SweetButton from 'sweet-modal-vue/docs/components/Button';
import utils from '@/utils/utils';

export default {
    data () {
        return {
            rawdata: {
                basicInfo: {
                    patientId: '',
                    name: '',
                    sex: '',
                    phone: '',
                    age: '',
                    weight: '',
                    height: '',
                    address: '',
                    chiefComplain: '',
                    provisonalDiagnosis: ''
                },
                riskFactors: {
                    cigaretteSmoking: '',
                    alcoholUsageHistory: ''
                },
                medicalHistory: {
                    congestiveHeartsFailure: '',
                    leftVentricularSystolicDysfunction: '',
                    diabetesMellitus: '',
                    priorVascularDisease: '',
                    mIAtPresentation: '',
                    priorPCI: '',
                    priorMI: '',
                    priorHistoryBleeding: '',
                    medicationUsagePredisposingToBleeding: '',
                    treatedHypertensionOnMedication: '',
                    priorStrokeOrTIAOrThromboembolism: ''
                },
                physicalExamination: {
                    heartRate: '',
                    systolicBloodPressure: '',
                    diastolicBloodPressure: ''
                },
                labExamination: {
                    hematocrit: '',
                    cr: '',
                    GFR: '',
                    haemoglobin: '',
                    whiteBloodCells: '',
                    abnormalRenalFunction: '',
                    abnormalLiverFunction: '',
                    labileINR: ''
                },
                specialExamination: {
                    paclitaxelElutingStent: '',
                    stentDiameter: '',
                    lvef: '',
                    veinGraftStent: ''
                }
            }
        }
    },
    computed: {
        resultData: function() {
            let returnValue = {};
            
            //计算GFR
            // if(!this.$validator.errors.has('age')&&!this.$validator.errors.has('weight')&&!this.$validator.errors.has('cr')){
            //     if(this.rawdata.basicInfo.age!=''&&this.rawdata.basicInfo.weight!=''&&this.rawdata.basicInfo.sex!=''&&this.rawdata.labExamination.cr!=''){
            //         let GFRResult = GFRCaculator(this.rawdata.basicInfo.age, this.rawdata.basicInfo.weight,this.rawdata.labExamination.cr,this.rawdata.basicInfo.sex);
            //         returnValue.GFR = GFRResult;
            //     }
            // }

            this.$set(returnValue, 'DAPTScore',setDAPTScore(this.rawdata, this.$validator));
            this.$set(returnValue, 'BleedingScore',setBleedingScore(this.rawdata, this.$validator));
            this.$set(returnValue, 'HASBLEDScore',setHASBLEDScore(this.rawdata, this.$validator));
            this.$set(returnValue, 'CHADSVASScore',setCHADSVASScore(this.rawdata, this.$validator));
            this.$set(returnValue, 'PreciseDaptScore',setPreciseDaptScore(this.rawdata, this.$validator));

            function setPreciseDaptScore(rawdata, validator) {
                let PreciseDaptScore = {
                    haemoglobin: '',
                    age: '',
                    whiteBloodCells: '',
                    creatinineClearance: '',
                    priorBleeding: ''
                }
                if(!validator.errors.has('haemoglobin')&&rawdata.labExamination.haemoglobin!=''){
                    let haemoglobin = parseFloat(rawdata.labExamination.haemoglobin);
                    if(haemoglobin>=3&&haemoglobin<=20){
                        PreciseDaptScore.haemoglobin = haemoglobin;
                    }
                }
                if(!validator.errors.has('age')&&rawdata.basicInfo.age!=''){
                    let age = parseInt(rawdata.basicInfo.age);
                    if(age>=10&&age<=120){
                        PreciseDaptScore.age = age;
                    }
                }
                if(!validator.errors.has('white-blood-cells')&&rawdata.labExamination.whiteBloodCells!=''){
                    let whiteBloodCells = parseFloat(rawdata.labExamination.whiteBloodCells);
                    if(whiteBloodCells>=0&&whiteBloodCells<=100){
                        PreciseDaptScore.whiteBloodCells = whiteBloodCells;
                    }
                }
                if(!validator.errors.has('GFR')&&rawdata.labExamination.GFR!=''){
                    let GFR = parseFloat(rawdata.labExamination.GFR);
                    if(GFR<200){
                        PreciseDaptScore.creatinineClearance=GFR;
                    }
                }                
                if(rawdata.medicalHistory.priorHistoryBleeding=='1'||rawdata.medicalHistory.priorHistoryBleeding=='2'||rawdata.medicalHistory.priorHistoryBleeding=='3'){
                    PreciseDaptScore.priorBleeding=1;
                }else if(rawdata.medicalHistory.priorHistoryBleeding=='4'){
                    PreciseDaptScore.priorBleeding=0;
                }                

                let PreciseDaptScoreStatus=true;
                for(let ele in PreciseDaptScore) {
                    if(PreciseDaptScore[ele]===''){
                        PreciseDaptScoreStatus = false;
                    }
                }
                if(PreciseDaptScoreStatus){
                    //临时变量用于计算
                    let tempHaemoglobin = PreciseDaptScore.haemoglobin;
                    let tempAge = PreciseDaptScore.age;
                    let tempCreatinineClearance = PreciseDaptScore.creatinineClearance;
                    let tempWhiteBloodCells = PreciseDaptScore.whiteBloodCells;
                    let tempPriorBleeding = PreciseDaptScore.priorBleeding;
                    if(tempHaemoglobin<10){
                        tempHaemoglobin=10;
                    }else if(tempHaemoglobin>12){
                        tempHaemoglobin=12;
                    }
                    if(tempAge<50){
                        tempAge=50;
                    }else if(tempAge>90){
                        tempAge=90;
                    }
                    if(tempCreatinineClearance>100){
                        tempCreatinineClearance=100;
                    }
                    if(tempWhiteBloodCells<5){
                        tempWhiteBloodCells=5;
                    }else if(tempWhiteBloodCells>20){
                        tempWhiteBloodCells=20;
                    }
                    let haemoglobinWithCoefficent = tempHaemoglobin * -0.40551264;
                    let ageWithCoefficent = tempAge * 0.02595618;
                    let creatinineClearanceWithCoefficent = tempCreatinineClearance * -0.0140439;
                    let whiteBloodCellsWithCoefficent = tempWhiteBloodCells * 0.05697497;
                    let priorBleedingWithCoefficent = tempPriorBleeding * 1.41955653;

                    let sumWithCoefficent = haemoglobinWithCoefficent + ageWithCoefficent + creatinineClearanceWithCoefficent + whiteBloodCellsWithCoefficent + priorBleedingWithCoefficent;
                    let value = Math.round(100 * (sumWithCoefficent + 4.68785783) / (5.52784356));

                    let riskOfMajorBleeding = parseFloat(1 - Math.exp(-0.001874968 * Math.exp(value * 0.06687003))).toFixed(3) * 100;
                    let riskOfMajorOrMinorBleeding = parseFloat(1 - Math.exp(-0.002871235 * Math.exp(value * 0.0747252))).toFixed(3) * 100;

                    riskOfMajorBleeding = Math.round(riskOfMajorBleeding*100)/100;
                    riskOfMajorOrMinorBleeding = Math.round(riskOfMajorOrMinorBleeding*100)/100;

                    let risk = '';
                    if(value<=10.0){
                        risk="Very Low";
                    }else if(value<=17.0){
                        risk="Low";
                    }else if(value<=24.0){
                        risk="Moderate";
                    }else if(value>24.0){
                        risk="High";
                    }                    
                    PreciseDaptScore.result = {value: value, desc: '', risk: risk, riskOfMajorBleeding: riskOfMajorBleeding, riskOfMajorOrMinorBleeding: riskOfMajorOrMinorBleeding};
                }else{
                    PreciseDaptScore.result = {value: '',desc: 'Enter all fields left correctly'};
                }
                return PreciseDaptScore;
            }
            function setCHADSVASScore(rawdata, validator) {
                let CHADSVASScore = {
                    chfOrLvsd: '',
                    hypertension: '',
                    age: '',
                    diabetesMellitus: '',
                    priorStrokeOrTIAOrThromboembolism: '',
                    vascularDisease: '',
                    sexCategory: ''
                };

                if(rawdata.medicalHistory.congestiveHeartsFailure==='0'&&rawdata.medicalHistory.leftVentricularSystolicDysfunction==='0'){
                    CHADSVASScore.chfOrLvsd = 0;
                }
                if(rawdata.medicalHistory.congestiveHeartsFailure==='1'||rawdata.medicalHistory.leftVentricularSystolicDysfunction==='1'){
                    CHADSVASScore.chfOrLvsd = 1;
                }

                if(rawdata.medicalHistory.treatedHypertensionOnMedication==='1'){
                    CHADSVASScore.hypertension = 1;
                }else if(!validator.errors.has('systolic-blood-pressure')&&!validator.errors.has('diastolic-blood-pressure')&&rawdata.physicalExamination.systolicBloodPressure!=''&&rawdata.physicalExamination.diastolicBloodPressure!=''){
                    if(!parseInt(rawdata.physicalExamination.systolicBloodPressure)>140||!parseInt(rawdata.physicalExamination.diastolicBloodPressure)>90){
                        CHADSVASScore.hypertension = 0;
                    }
                }
                if(!validator.errors.has('systolic-blood-pressure')&&!validator.errors.has('diastolic-blood-pressure')&&rawdata.physicalExamination.systolicBloodPressure!=''&&rawdata.physicalExamination.diastolicBloodPressure!=''){
                    if(parseInt(rawdata.physicalExamination.systolicBloodPressure)>140&&parseInt(rawdata.physicalExamination.diastolicBloodPressure)>90){
                        CHADSVASScore.hypertension = 1;
                    }else if(rawdata.medicalHistory.treatedHypertensionOnMedication==='0'){
                        CHADSVASScore.hypertension = 0;
                    }
                }
                
                if(!validator.errors.has('age')&&rawdata.basicInfo.age!=''){
                    let age = parseInt(rawdata.basicInfo.age);
                    if(age>=75){
                        CHADSVASScore.age=2;
                    }else if(age>=65){
                        CHADSVASScore.age=1;
                    }else{
                        CHADSVASScore.age=0;
                    }
                }
                CHADSVASScore.diabetesMellitus = rawdata.medicalHistory.diabetesMellitus;
                if(rawdata.medicalHistory.priorStrokeOrTIAOrThromboembolism==='1'){
                    CHADSVASScore.priorStrokeOrTIAOrThromboembolism=2;
                }
                if(rawdata.medicalHistory.priorStrokeOrTIAOrThromboembolism==='0'){
                    CHADSVASScore.priorStrokeOrTIAOrThromboembolism=0;
                }
                CHADSVASScore.vascularDisease = rawdata.medicalHistory.priorVascularDisease;

                if(rawdata.basicInfo.sex==='F'){
                    CHADSVASScore.sexCategory=1;
                }else if(rawdata.basicInfo.sex==='M'){
                    CHADSVASScore.sexCategory=0;
                }

                let CHADSVASScoreStatus=true;
                for(let ele in CHADSVASScore) {
                    if(CHADSVASScore[ele]===''){
                        CHADSVASScoreStatus = false;
                    }
                }
                if(CHADSVASScoreStatus){
                    let value = 0;
                    for (let ele in CHADSVASScore) {
                        value+=parseInt(CHADSVASScore[ele]);
                    }

                    let risk = '';
                    if(CHADSVASScore.sexCategory===0){
                        if(value===0){
                            risk='Low';
                        }else if(value===1){
                            risk='Moderate';
                        }else{
                            risk='High';
                        }
                    }else{
                        if(value===1){
                            risk='Low';
                        }else{
                            risk='High';
                        }
                    }
                    let therapy = '';
                    if(risk==='Low'){
                        therapy='No anticoagulant therapy';
                    }else if(risk==='Moderate'){
                        therapy='Oral anticoagulant should be considered';
                    }else if(risk==='High'){
                        therapy='Oral anticoagulant is recommended';
                    }
                    CHADSVASScore.result = {value: value,desc:'',risk:risk,therapy:therapy};
                }else{
                    CHADSVASScore.result = {value: '',desc: 'Enter all fields left correctly'};
                }
                return CHADSVASScore;
            }
            function setHASBLEDScore(rawdata, validator) {
                let HASBLEDScore = {
                    hypertension: '',
                    abnormalRenalFunction: '',
                    abnormalLiverFunction: '',
                    priorStroke: '',
                    priorMajorBleedingOrPredisposingToBleeding: '',
                    labileINR: '',
                    elderly: '',
                    alcoholUsageHistory: '',
                    medicationUsagePredisposingToBleeding: ''
                };

                if(!validator.errors.has('systolic-blood-pressure')&&rawdata.physicalExamination.systolicBloodPressure!=''){
                    if(parseInt(rawdata.physicalExamination.systolicBloodPressure)>160){
                        HASBLEDScore.hypertension=1;
                    }else{
                        HASBLEDScore.hypertension=0;
                    }
                }
                HASBLEDScore.abnormalRenalFunction = rawdata.labExamination.abnormalRenalFunction;
                HASBLEDScore.abnormalLiverFunction = rawdata.labExamination.abnormalLiverFunction;
                HASBLEDScore.priorStroke = rawdata.medicalHistory.priorStroke;
                if(rawdata.medicalHistory.priorHistoryBleeding==='2'||rawdata.medicalHistory.priorHistoryBleeding==='3'){
                    HASBLEDScore.priorMajorBleedingOrPredisposingToBleeding = 1;
                }else if(rawdata.medicalHistory.priorHistoryBleeding==='1'){
                    HASBLEDScore.priorMajorBleedingOrPredisposingToBleeding = 0;
                }
                HASBLEDScore.labileINR = rawdata.labExamination.labileINR;
                if(!validator.errors.has('age')&&rawdata.basicInfo.age!=''){
                    if(parseInt(rawdata.basicInfo.age)>65){
                        HASBLEDScore.elderly=1;
                    }else{
                        HASBLEDScore.elderly=0;
                    }
                }
                HASBLEDScore.alcoholUsageHistory = rawdata.riskFactors.alcoholUsageHistory;
                HASBLEDScore.medicationUsagePredisposingToBleeding = rawdata.medicalHistory.medicationUsagePredisposingToBleeding;

                let HASBLEDScoreStatus=true;
                for(let ele in HASBLEDScore) {
                    if(HASBLEDScore[ele]===''){
                        HASBLEDScoreStatus = false;
                    }
                }
                if(HASBLEDScoreStatus){
                    let value = 0;
                    for (let ele in HASBLEDScore) {
                        value+=parseInt(HASBLEDScore[ele]);
                    }
                    let desc = '';
                    if(value>=3){
                        desc = 'High Risk';
                    }
                    HASBLEDScore.result = {value: value,desc: desc};
                }else{
                    HASBLEDScore.result = {value: '',desc: 'Enter all fields left correctly'};
                }
                return HASBLEDScore;
            }
            function setBleedingScore(rawdata, validator) {
                let BleedingScore = {
                    hematocrit: '',
                    GFR: '',
                    heartRate: '',
                    systolicBloodPressure: '',
                    priorVascularDisease: '',
                    diabetesMellitus: '',
                    congestiveHeartsFailure: '',
                    sex: ''
                };
                if(!validator.errors.has('hematocrit')&&rawdata.labExamination.hematocrit!=''){
                    let hematocrit = parseFloat(rawdata.labExamination.hematocrit);
                    if(hematocrit>=40){
                        BleedingScore.hematocrit = 0;
                    }else if(hematocrit>=37){
                        BleedingScore.hematocrit = 2;
                    }else if(hematocrit>=34){
                        BleedingScore.hematocrit = 3;
                    }else if(hematocrit>=31){
                        BleedingScore.hematocrit = 7;
                    }else{
                        BleedingScore.hematocrit = 9;
                    }
                }

                if(!validator.errors.has('GFR')&&rawdata.labExamination.GFR!=''){
                    let GFR = parseFloat(rawdata.labExamination.GFR);
                    if(GFR>120){
                        BleedingScore.GFR=0;
                    }else if(GFR>90){
                        BleedingScore.GFR=7;
                    }else if(GFR>60){
                        BleedingScore.GFR=17;
                    }else if(GFR>30){
                        BleedingScore.GFR=28;
                    }else if(GFR>15){
                        BleedingScore.GFR=35;
                    }else{
                        BleedingScore.GFR=39;
                    }
                }

                if(!validator.errors.has('heart-rate')&&rawdata.physicalExamination.heartRate!=''){
                    let heartRate = parseInt(rawdata.physicalExamination.heartRate);
                    if(heartRate<71){
                        BleedingScore.heartRate=0;
                    }else if(heartRate<81){
                        BleedingScore.heartRate=1;
                    }else if(heartRate<91){
                        BleedingScore.heartRate=3;
                    }else if(heartRate<101){
                        BleedingScore.heartRate=6;
                    }else if(heartRate<111){
                        BleedingScore.heartRate=8;
                    }else if(heartRate<121){
                        BleedingScore.heartRate=10;
                    }else{
                        BleedingScore.heartRate=11;
                    }
                }
                      
                if(!validator.errors.has('blood-pressure')&&rawdata.physicalExamination.systolicBloodPressure!=''){
                    let systolicBloodPressure = parseInt(rawdata.physicalExamination.systolicBloodPressure);
                    if(systolicBloodPressure<91){
                        BleedingScore.systolicBloodPressure=10;
                    }else if(systolicBloodPressure<101){
                        BleedingScore.systolicBloodPressure=8;
                    }else if(systolicBloodPressure<121){
                        BleedingScore.systolicBloodPressure=5;
                    }else if(systolicBloodPressure<181){
                        BleedingScore.systolicBloodPressure=1;
                    }else if(systolicBloodPressure<201){
                        BleedingScore.systolicBloodPressure=3;
                    }else{
                        BleedingScore.systolicBloodPressure=5;
                    }
                }

                if(rawdata.medicalHistory.priorVascularDisease!=''){
                    BleedingScore.priorVascularDisease=rawdata.medicalHistory.priorVascularDisease=='1'?6:0;
                }

                if(rawdata.medicalHistory.diabetesMellitus!=''){
                    BleedingScore.diabetesMellitus=rawdata.medicalHistory.diabetesMellitus=='1'?6:0;           
                }

                if(rawdata.medicalHistory.congestiveHeartsFailure!=''){
                    BleedingScore.congestiveHeartsFailure=rawdata.medicalHistory.congestiveHeartsFailure=='1'?7:0;           
                }

                if(rawdata.basicInfo.sex!=''){
                    BleedingScore.sex=rawdata.basicInfo.sex=='F'?8:0;           
                }
                let BleedingScoreStatus = true;
                for(let ele in BleedingScore) {
                    if(BleedingScore[ele]===''){
                        BleedingScoreStatus = false;
                    }
                }
                if(BleedingScoreStatus){
                    let value = 0;
                    for(let ele in BleedingScore) {
                        value += BleedingScore[ele];
                    }
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
                    BleedingScore.result = {value: value,desc: desc};
                } else {
                    BleedingScore.result = {value: '',desc: 'Enter all fields left correctly'};
                }
                return BleedingScore;
            }
            function setDAPTScore(rawdata, validator) {
                let DAPTScore = {
                    age: '',
                    cigaretteSmoking: '',
                    diabetesMellitus: '',
                    priorMIOrPriorPCI: '',
                    historyOfCHFOrLevflt30: '',
                    mIAtPresentation: '',
                    veinGraftStent: '',
                    paclitaxelElutingStent: '',
                    stentDiameterlt3: ''
                };
                if(!validator.errors.has('age')&&rawdata.basicInfo.age!=''){
                    DAPTScore.age = rawdata.basicInfo.age;
                }
                DAPTScore.cigaretteSmoking = rawdata.riskFactors.cigaretteSmoking;
                DAPTScore.diabetesMellitus = rawdata.medicalHistory.diabetesMellitus;

                if(rawdata.medicalHistory.congestiveHeartsFailure=='1'){
                    DAPTScore.historyOfCHFOrLevflt30 = 2;
                }else if(rawdata.medicalHistory.congestiveHeartsFailure==='0'&&!validator.errors.has('lvef')&&rawdata.specialExamination.lvef!=''&&!parseFloat(rawdata.specialExamination.lvef)<30){
                    DAPTScore.historyOfCHFOrLevflt30 = 0;
                }
                if(!validator.errors.has('lvef')&&rawdata.specialExamination.lvef!=''){
                    if(parseFloat(rawdata.specialExamination.lvef)<30){
                        DAPTScore.historyOfCHFOrLevflt30 = 2;
                    }else if(rawdata.medicalHistory.congestiveHeartsFailure==='0'){
                        DAPTScore.historyOfCHFOrLevflt30 = 0;
                    };
                }

                if(rawdata.medicalHistory.priorMI==='0'&&rawdata.medicalHistory.priorPCI==='0'){
                    DAPTScore.priorMIOrPriorPCI = 0;
                }else{
                    if(rawdata.medicalHistory.priorMI=='1'||rawdata.medicalHistory.priorPCI=='1'){
                        DAPTScore.priorMIOrPriorPCI = 1;
                    }
                }
                DAPTScore.mIAtPresentation = rawdata.medicalHistory.mIAtPresentation;
                DAPTScore.veinGraftStent = rawdata.specialExamination.veinGraftStent==1?2:rawdata.specialExamination.veinGraftStent;
                DAPTScore.paclitaxelElutingStent = rawdata.specialExamination.paclitaxelElutingStent;
                if(!validator.errors.has('stent-diameter')&&rawdata.specialExamination.stentDiameter!=''){
                    if(parseFloat(rawdata.specialExamination.stentDiameter)<3){
                        DAPTScore.stentDiameterlt3 = 1;
                    }else{
                        DAPTScore.stentDiameterlt3 = 0;
                    };
                }

                let DAPTScoreStatus = true;
                for(let ele in DAPTScore) {
                    if(DAPTScore[ele]===''){
                        DAPTScoreStatus = false;
                    }
                }
                if(!(parseInt(DAPTScore.age)<=100 && parseInt(DAPTScore.age)>=18)){
                    DAPTScoreStatus = false;
                }
                if(DAPTScoreStatus){
                    let ageScore = 0;
                    if(DAPTScore.age>=75){
                        ageScore = -2;
                    }else if(DAPTScore.age>=65){
                        ageScore = -1;
                    }
                    let value = ageScore;
                    for (let ele in DAPTScore) {
                        if(ele!='age' && DAPTScore[ele]!='') {
                            value+=parseInt(DAPTScore[ele]);
                        }
                    }
                    let desc = '';
                    if(value>=2){
                        desc = 'Long DAPT';
                    }else {
                        desc = 'Standard DAPT';
                    }
                    DAPTScore.result = {value: value,desc: desc};

                } else {
                    DAPTScore.result = {value: '',desc: 'Enter all fields left correctly'};
                }
                return DAPTScore;
            }

            function GFRCaculator(age, weight, Cr, sex){
                let GFR = 0;
                if(sex=='M'){                                   //男性
                    GFR = parseInt((140-age)*weight/(72*Cr));
                }else if(sex=='F'){                             //女性
                    GFR = parseInt((140-age)*weight/(85*Cr));
                }else{
                    GFR = null;
                }
                return GFR;
            }
            return returnValue;
        }
    },
    methods: {
        checkData () {
            console.log(this.rawdata,this.resultData,sessionStorage.getItem('user'));
            if(this.resultData.DAPTScore.result.value===''||this.resultData.BleedingScore.result.value===''||this.resultData.HASBLEDScore.result.value===''||this.resultData.CHADSVASScore.result.value===''||this.resultData.DAPTScore.result.value===''){
                this.$refs.dataError.open();      
            }else{
                this.$refs.saveDataConfirm.open();            
            }
        },
        SaveData () {
            this.$refs.dataSaving.open();
            console.log(this.rawdata,this.resultData,sessionStorage.getItem('user'));
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
</style>