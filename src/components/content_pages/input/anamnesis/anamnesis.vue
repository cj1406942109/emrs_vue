<template>
  <div class="tab-pane active portlet">
    <div class="portlet-title">
        <div class="caption">
            <span class="caption-subject bold font-dark uppercase">既往病史</span>
        </div>
    </div>
    <div class="porlet-body">
        <div class="row">
            <div class="col-md-12">
                <!-- 血脂异常部分开始 -->
                <div class="portlet box blue">
                    <div class="portlet-title">
                        <div class="caption">血脂异常</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无血脂异常</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="-1" v-model="anamnesis.isLipidAbnormality" >不知道</radio></label>
                                    <label><radio value="0" v-model="anamnesis.isLipidAbnormality" >否</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isLipidAbnormality" >是</radio></label>
                                </div>                                
                            </div>
                            <div v-if="anamnesis.isLipidAbnormality=='1'">
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="anamnesis.lipidAbnormalityDuration">
                                    <span class="help-inline"> 年 </span>
                                    <span class="help-block"> 填写病史 </span>
                                </div>
                                <label class="control-label col-md-1">类型</label>
                                <div class="col-md-2">
                                    <select class="form-control" v-model="anamnesis.lipidAbnormalityType">
                                        <option value="" disabled selected>选择类型</option>
                                        <option v-for="lipidAbnormalityType in pagedata.lipidAbnormalityTypes" :key="lipidAbnormalityType.id" :value="lipidAbnormalityType.id">{{lipidAbnormalityType.text}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-if="anamnesis.isLipidAbnormality=='1'">
                            <label class="control-label col-md-2 col-md-offset-1 bold">有无治疗</label>
                            <div class="col-md-4">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isLipidAbnormalityUnderTreatment">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isLipidAbnormalityUnderTreatment">间断</radio></label>
                                    <label><radio value="2" v-model="anamnesis.isLipidAbnormalityUnderTreatment">长期用药</radio></label>
                                </div>              
                                <span class="help-block"> &nbsp;</span>                  
                            </div>
                            <div class="col-md-2" v-if="anamnesis.isLipidAbnormalityUnderTreatment=='2'">
                                <input class="form-control input-inline" v-model="anamnesis.lipidAbnormalityDrugName">
                                <span class="help-block"> 填写长期用药药名 </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 血脂异常部分结束 -->
                <!-- 原发性高血压部分开始 -->
                <div class="portlet box red">
                    <div class="portlet-title">
                        <div class="caption">原发性高血压</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无原发性高血压</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="-1" v-model="anamnesis.isEssentialHypertension">不知道</radio></label>
                                    <label><radio value="0" v-model="anamnesis.isEssentialHypertension">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isEssentialHypertension">有</radio></label>
                                </div>              
                            </div>
                            <div class="col-md-4" v-if="anamnesis.isEssentialHypertension=='1'">
                                <input class="form-control input-inline" v-model="anamnesis.essentialHypertensionDuration">
                                <span class="help-inline"> 年 </span>
                                <span class="help-block"> 填写病史 </span>
                            </div>
                        </div>
                        <div class="form-group" v-if="anamnesis.isEssentialHypertension=='1'">
                            <label class="control-label col-md-2 col-md-offset-1 bold">有无治疗</label>
                            <div class="col-md-4">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isEssentialHypertensionUnderTreatment">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isEssentialHypertensionUnderTreatment">间断</radio></label>
                                    <label><radio value="2" v-model="anamnesis.isEssentialHypertensionUnderTreatment">长期用药</radio></label>
                                </div>              
                                <span class="help-block"> &nbsp;</span>                                
                            </div>
                            <div class="col-md-2" v-if="anamnesis.isEssentialHypertensionUnderTreatment=='2'">
                                <input class="form-control input-inline" v-model="anamnesis.essentialHypertensionDrugName">
                                <span class="help-block"> 填写长期用药药名 </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">血压最高值</label>
                            <div class="col-md-6">
                                <input placeholder="收缩压（高压）" class="form-control input-inline" v-model="anamnesis.maximumBP.SBP">
                                <span class="help-inline"> / </span>
                                <input placeholder="舒张压（低压）" class="form-control input-inline" v-model="anamnesis.maximumBP.DBP">
                                <span class="help-inline"> mmHg </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">血压平时值</label>
                            <div class="col-md-6">
                                <input placeholder="收缩压（高压）" class="form-control input-inline" v-model="anamnesis.ordinaryBP.SBP">
                                <span class="help-inline"> / </span>
                                <input placeholder="舒张压（低压）" class="form-control input-inline" v-model="anamnesis.ordinaryBP.DBP">
                                <span class="help-inline"> mmHg </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 原发性高血压部分结束 -->
                <!-- 血糖异常部分开始 -->
                <div class="portlet box yellow">
                    <div class="portlet-title">
                        <div class="caption">血糖异常</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无血糖异常</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="-1" v-model="anamnesis.isDysglycemia">不知道</radio></label>
                                    <label><radio value="0" v-model="anamnesis.isDysglycemia">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isDysglycemia">有</radio></label>
                                </div>                         
                                <span class="help-block"> &nbsp;</span>                  
                            </div>
                            <div v-if="anamnesis.isDysglycemia=='1'">                                
                                <label class="control-label col-md-1">类型</label>
                                <div class="col-md-2">
                                    <select class="form-control" v-model="anamnesis.dysglycemiaType">
                                        <option value="" disabled selected>选择类型</option>
                                        <option v-for="dysglycemiaType in pagedata.dysglycemiaTypes" :key="dysglycemiaType.id" :value="dysglycemiaType.id">{{dysglycemiaType.text}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">是否糖尿病</label>
                            <div class="col-md-10">
                                <div class="form-group">
                                    <div class="col-md-4">
                                        <div>
                                            <label><radio value="0" v-model="anamnesis.isDiabetesMellitus">否</radio></label>
                                            <label><radio value="1" v-model="anamnesis.isDiabetesMellitus">是</radio></label>
                                        </div>                                        
                                    </div>
                                    <div v-if="anamnesis.isDiabetesMellitus=='1'">  
                                        <div class="col-md-4">
                                            <input class="form-control input-inline" v-model="anamnesis.diabetesMellitusDuration">
                                            <span class="help-inline"> 年 </span>
                                            <span class="help-block"> 填写病史 </span>
                                        </div>
                                        <label class="control-label col-md-1">类型</label>
                                        <div class="col-md-2">
                                            <select class="form-control" v-model="anamnesis.diabetesMellitusType">
                                                <option value="" disabled selected>选择类型</option>
                                                <option v-for="diabetesMellitusType in pagedata.diabetesMellitusTypes" :key="diabetesMellitusType.id" :value="diabetesMellitusType.id">{{diabetesMellitusType.text}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="anamnesis.isDiabetesMellitus=='1'">
                            <div class="form-group">
                                <label class="control-label col-md-2 col-md-offset-1 bold">有无治疗</label>
                                <div class="col-md-9">
                                    <div>
                                        <label><radio value="0" v-model="anamnesis.isDiabetesMellitusUnderTreatment">无</radio></label>
                                        <label><radio value="1" v-model="anamnesis.isDiabetesMellitusUnderTreatment">不规律</radio></label>
                                        <label><radio value="2" v-model="anamnesis.isDiabetesMellitusUnderTreatment">规律治疗</radio></label>
                                    </div>              
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                            </div>
                            <div class="form-group" v-if="anamnesis.isDiabetesMellitusUnderTreatment=='1'||anamnesis.isDiabetesMellitusUnderTreatment=='2'">
                                <label class="control-label col-md-2 col-md-offset-1 bold">治疗方法（多选）</label>
                                <div class="col-md-5">
                                    <div><label v-for="treatMethod in pagedata.diabetesMellitusTreatmentMethods" :key="treatMethod.id"><checkbox v-model="anamnesis.diabetesMellitusTreatmentMethod" :value="treatMethod.id">{{treatMethod.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-4" v-if="anamnesis.diabetesMellitusTreatmentMethod.indexOf('3')>=0">
                                    <input class="form-control input-inline" v-model="anamnesis.diabetesMellitusOralDrugName">
                                    <span class="help-block"> 填写口服药药名 </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 血糖异常部分结束 -->
                <!-- 痛风部分开始 -->
                <div class="portlet box green-dark">
                    <div class="portlet-title">
                        <div class="caption">痛风</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无痛风</label>
                            <div class="col-md-4">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isGout">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isGout">有</radio></label>
                                </div>                       
                                <span class="help-block"> &nbsp;</span>          
                            </div>
                            <div class="col-md-4" v-if="anamnesis.isGout=='1'">
                                <input class="form-control input-inline" v-model="anamnesis.goutDuration">
                                <span class="help-inline"> 年 </span>
                                <span class="help-block"> 填写病史 </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">血清尿酸</label>
                            <div class="col-md-6">
                                <input class="form-control input-inline" v-model="anamnesis.serumUricAcidLevel">
                                <span class="help-inline">mmol/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无肾功能不全</label>
                            <div class="col-md-10">
                                <div class="form-group">
                                    <div class="col-md-4">
                                        <div>
                                            <label><radio value="-1" v-model="anamnesis.isRenalInsufficiency">不知道</radio></label>
                                            <label><radio value="0" v-model="anamnesis.isRenalInsufficiency">无</radio></label>
                                            <label><radio value="1" v-model="anamnesis.isRenalInsufficiency">有</radio></label>
                                        </div>                         
                                        <span class="help-block"> &nbsp;</span>                                        
                                    </div>
                                    <div class="col-md-4" v-if="anamnesis.isRenalInsufficiency=='1'">
                                        <input class="form-control input-inline" v-model="anamnesis.renalInsufficiencyDuration">
                                        <span class="help-inline"> 年 </span>
                                        <span class="help-block"> 填写病史 </span>
                                    </div>
                                    <div class="col-md-4" v-if="anamnesis.isRenalInsufficiency=='1'">
                                        <input class="form-control" v-model="anamnesis.renalInsufficiencyEtiology">
                                        <span class="help-block"> 填写病因 </span>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">最高Cr</label>
                            <div class="col-md-6">
                                <input class="form-control input-inline" v-model="anamnesis.maximumCr">
                                <span class="help-inline">mmol/L</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">近期Cr</label>
                            <div class="col-md-6">
                                <input class="form-control input-inline" v-model="anamnesis.recentCr">
                                <span class="help-inline">mmol/L</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 痛风部分结束 -->
                <!-- 心脏病史部分开始 -->
                <div class="portlet box purple">
                    <div class="portlet-title">
                        <div class="caption">心脏病史</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无陈旧性心硬</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isOldMyocardialInfarction">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isOldMyocardialInfarction">有</radio></label>
                                </div>                       
                            </div>
                            <div class="col-md-8" v-if="anamnesis.isOldMyocardialInfarction=='1'">
                                <input class="form-control input-inline" v-model="anamnesis.oldMyocardialInfarctionOnsetTimeYear">
                                <label class="control-label">年</label>
                                <input class="form-control input-inline" v-model="anamnesis.oldMyocardialInfarctionOnsetTimeMonth">
                                <label class="control-label">月前，发生</label>
                                <input class="form-control input-inline" v-model="anamnesis.oldMyocardialInfarctionOnsetFrequency">
                                <label class="control-label">次</label>
                            </div>
                        </div>
                        <div class="form-group" v-if="anamnesis.isOldMyocardialInfarction=='1'">
                            <label class="control-label col-md-2 col-md-offset-1 bold">部位（多选）</label>
                            <div class="col-md-6">
                                <div><label v-for="location in pagedata.oldMyocardialInfarctionLocations" :key="location.id"><checkbox v-model="anamnesis.oldMyocardialInfarctionLocation" :value="location.id">{{location.text}}</checkbox></label></div>
                                <span class="help-block"> &nbsp;</span>
                            </div>
                            <div class="col-md-2" v-if="anamnesis.oldMyocardialInfarctionLocation.indexOf('7')>='0'">
                                <input class="form-control" v-model="anamnesis.oldMyocardialInfarctionLocationOthers">
                                <span class="help-block"> 填写其他部位 </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无PCI史</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isPciHistory">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isPciHistory">有</radio></label>
                                </div>                                
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无CABG史</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isCabgHistory">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isCabgHistory">有</radio></label>
                                </div>                                
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无冠脉造影≥50%狭窄史</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isCasGt50History">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isCasGt50History">有</radio></label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无房颤</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isAtrialFibrillation">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isAtrialFibrillation">有</radio></label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无其他心脏病史</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isOtherHeartDiseaseHistory">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isOtherHeartDiseaseHistory">有</radio></label>
                                </div>                                
                            </div>
                        </div>
                        <div class="form-group" v-if="anamnesis.isOtherHeartDiseaseHistory=='1'">
                            <label class="control-label col-md-2 col-md-offset-1 bold">类型（多选）</label>
                            <div class="col-md-6">
                                <div><label v-for="diseaseType in pagedata.otherHeartDiseaseTypes" :key="diseaseType.id"><checkbox v-model="anamnesis.otherHeartDiseaseType" :value="diseaseType.id">{{diseaseType.text}}</checkbox></label></div>
                                <span class="help-block"> &nbsp;</span>
                            </div>
                            <div class="col-md-2" v-if="anamnesis.otherHeartDiseaseType.indexOf('8')>='0'">
                                <input class="form-control" v-model="anamnesis.otherHeartDiseaseTypeOthers">
                                <span class="help-block">填写其他类型</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 心脏病史部分结束 -->
                <!-- 深静脉血栓部分开始 -->
                <div class="portlet box dark">
                    <div class="portlet-title">
                        <div class="caption">深静脉血栓</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无深静脉血栓</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isDeepVenousThrombosis">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isDeepVenousThrombosis">有</radio></label>
                                </div>
                            </div>
                            <div class="col-md-8" v-if="anamnesis.isDeepVenousThrombosis=='1'">
                                <input class="form-control input-inline" v-model="anamnesis.deepVenousThrombosisOnsetTimeYear">
                                <label class="control-label">年</label>
                                <input class="form-control input-inline" v-model="anamnesis.deepVenousThrombosisOnsetTimeMonth">
                                <label class="control-label">月前</label>
                            </div>
                        </div>
                        <div v-if="anamnesis.isDeepVenousThrombosis=='1'">
                            <div class="form-group">
                                <label class="control-label col-md-2 col-md-offset-1 bold">诱因（多选）</label>
                                <div class="col-md-6">
                                    <div><label v-for="inducement in pagedata.deepVenousThrombosisInducements" :key="inducement.id"><checkbox v-model="anamnesis.deepVenousThrombosisInducements" :value="inducement.id">{{inducement.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-2" v-if="anamnesis.deepVenousThrombosisInducements.indexOf('5')>='0'">
                                    <input class="form-control" v-model="anamnesis.deepVenousThrombosisInducementsOthers">
                                    <span class="help-block"> 填写其他诱因 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-2 col-md-offset-1 bold">症状（多选）</label>
                                <div class="col-md-8">
                                    <div><label v-for="symptom in pagedata.deepVenousThrombosisSymptoms" :key="symptom.id"><checkbox v-model="anamnesis.deepVenousThrombosisSymptoms" :value="symptom.id">{{symptom.text}}</checkbox></label></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-2 col-md-offset-1 bold">诊断结果</label>
                                <div class="col-md-9">
                                    <div>
                                        <label><radio value="1" v-model="anamnesis.deepVenousThrombosisDiagnosisResult">确诊为DVT</radio></label>
                                        <label><radio value="2" v-model="anamnesis.deepVenousThrombosisDiagnosisResult">DVT可能性较大</radio></label>
                                        <label><radio value="3" v-model="anamnesis.deepVenousThrombosisDiagnosisResult">DVT可能性与PE相同</radio></label>
                                        <label><radio value="4" v-model="anamnesis.deepVenousThrombosisDiagnosisResult">DVT可能性较小</radio></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 深静脉血栓部分结束 -->
                <!-- 既往缺血性卒中部分开始 -->
                <div class="portlet box blue">
                    <div class="portlet-title">
                        <div class="caption">既往缺血性卒中</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无既往缺血性卒中</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isOldIschemicStroke">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isOldIschemicStroke">有</radio></label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-if="anamnesis.isOldIschemicStroke=='1'">
                            <v-repeater :array="anamnesis.oldIschemicStrokeTypes" :row="{typeName: '',onsetTimeYear: '',onsetTimeMonth: '',onsetFrequency: ''}">
                                <label class="control-label col-md-2 bold" slot="header">类型</label>
                                <template v-for="(item,index) in anamnesis.oldIschemicStrokeTypes" :slot="index">
                                    <div class="mt-repeater-input" :key="item.id">  
                                        <label class="control-label">类型</label>
                                        <select class="form-control" v-model="item.typeName">
                                            <option value="" disabled selected>选择</option>
                                            <option v-for="oldIschemicStrokeType in pagedata.oldIschemicStrokeTypes" :key="oldIschemicStrokeType.id" :value="oldIschemicStrokeType.id">{{oldIschemicStrokeType.text}}</option>
                                        </select>
                                    </div>
                                    <div class="mt-repeater-input" :key="item.id">
                                        <label class="control-label">（）年</label>
                                        <input class="form-control" placeholder="填写年份" v-model="item.onsetTimeYear">
                                    </div> 
                                    <div class="mt-repeater-input" :key="item.id">
                                        <label class="control-label">（）月前，</label>
                                        <input class="form-control" placeholder="填写月份" v-model="item.onsetTimeMonth">              
                                    </div>
                                    <div class="mt-repeater-input" :key="item.id">
                                        <label class="control-label">发生（）次</label>
                                        <input class="form-control" placeholder="填写次数" v-model="item.onsetFrequency">              
                                    </div>
                                </template>
                            </v-repeater>
                        </div> 
                    </div>
                </div>
                <!-- 既往缺血性卒中部分结束 -->
                <!-- 血管性疾病史部分开始 -->
                <div class="portlet box red">
                    <div class="portlet-title">
                        <div class="caption">血管性疾病史</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无血管性疾病史</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isVascularDiseases">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isVascularDiseases">有</radio></label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-if="anamnesis.isVascularDiseases=='1'">
                            <label class="control-label col-md-2 col-md-offset-1 bold">类型（多选）</label>
                            <div class="col-md-8">
                                <div><label v-for="diseaseType in pagedata.vascularDiseasesTypes" :key="diseaseType.id"><checkbox v-model="anamnesis.vascularDiseasesTypes" :value="diseaseType.id">{{diseaseType.text}}</checkbox></label></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 血管性疾病史部分结束 -->
                <!-- 出血病史部分开始 -->
                <div class="portlet box yellow">
                    <div class="portlet-title">
                        <div class="caption">出血病史</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无出血病史</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isHemorrhage">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isHemorrhage">有</radio></label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" v-if="anamnesis.isHemorrhage=='1'">
                            <v-repeater :array="anamnesis.hemorrhageTypes" :row="{typeName: '',onsetTime: '',onsetFrequency: ''}">
                                <label class="control-label col-md-2 bold" slot="header">类型</label>
                                <template v-for="(item,index) in anamnesis.hemorrhageTypes" :slot="index">
                                    <div class="mt-repeater-input" :key="item.id">  
                                        <label class="control-label">类型</label>
                                        <select class="form-control" v-model="item.typeName">
                                            <option value="" disabled selected>选择</option>
                                            <option v-for="hemorrhageType in pagedata.hemorrhageTypes" :key="hemorrhageType.id" :value="hemorrhageType.id">{{hemorrhageType.text}}</option>
                                        </select>
                                    </div>
                                    <div class="mt-repeater-input" :key="item.id">
                                        <label class="control-label">发生时间</label>
                                        <input class="form-control" v-model="item.onsetTime">              
                                    </div> 
                                    <div class="mt-repeater-input" :key="item.id">
                                        <label class="control-label">发生次数</label>
                                        <input class="form-control" v-model="item.onsetFrequency">              
                                    </div>
                                </template>
                            </v-repeater>
                        </div>                        
                    </div>
                </div>
                <!-- 出血病史部分结束 -->
                <!-- 出血史部分开始 -->
                <div class="portlet box green-dark">
                    <div class="portlet-title">
                        <div class="caption">出血史</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无出血史</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="anamnesis.isBleeding">无</radio></label>
                                    <label><radio value="1" v-model="anamnesis.isBleeding">有</radio></label>
                                </div>
                            </div>
                        </div>                        
                        <div class="form-group" v-if="anamnesis.isBleeding=='1'">
                            <v-repeater :array="anamnesis.bleedingCauses" :row="{cause: '',onsetTime: ''}">
                                <label class="control-label col-md-2 bold" slot="header">病因</label>
                                <template v-for="(item,index) in anamnesis.bleedingCauses" :slot="index">
                                    <div class="mt-repeater-input" :key="item.id">  
                                        <label class="control-label">病因</label>
                                        <select class="form-control" v-model="item.cause">
                                            <option value="" disabled selected>选择</option>
                                            <option v-for="cause in pagedata.bleedingCauses" :key="cause.id" :value="cause.id">{{cause.text}}</option>
                                        </select>
                                    </div>
                                    <div class="mt-repeater-input" :key="item.id">
                                        <label class="control-label">发生时间</label>
                                        <input class="form-control" v-model="item.onsetTime">              
                                    </div> 
                                </template>
                            </v-repeater>
                        </div>
                    </div>
                </div>
                <!-- 出血史部分结束 -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {Checkbox, Radio} from 'vue-checkbox-radio';
import vRepeater from '@/components/v_repeater/v_repeater';
export default {
    name: 'anamnesis',
    props: {
        pagedata: {
            type: Object
        },
        anamnesis: {
            type: Object
        }
    },
    data () {
        return {}
    },    
    components: {
        Checkbox, Radio, vRepeater
    }
}
</script>

<style lang="stylus" scoped>

</style>