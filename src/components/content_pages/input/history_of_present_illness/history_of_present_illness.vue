<template>
    <div class="tab-pane portlet" :class="{active: activeTab==1}">
        <div class="portlet-title">
            <div class="caption">
                <span class="caption-subject bold font-dark uppercase">现病史</span>
            </div>
        </div>
        <div class="porlet-body">
            <div class="form-group">
                <label class="control-label bold col-md-1">就诊原因</label>
                <div class="col-md-7">
                    <div><label v-for="disease in staticIndex.historyOfPresentIllnessCareCauses" :key="disease.id"><checkbox v-model="historyOfPresentIllness.careCauses" :value="disease.id">{{disease.text}}</checkbox></label></div>
                    <span class="help-block"> &nbsp;</span>
                </div>
                <div class="col-md-2" v-if="historyOfPresentIllness.careCauses.indexOf('6')>=0">
                    <input class="form-control" v-model="historyOfPresentIllness.care_cause_others">
                    <span class="help-block"> 填写其他就诊原因 </span>
                </div>
            </div>
            <div class="row">
                <div  class="col-md-12">
                    <!-- 胸痛部分开始 -->
                    <div class="portlet box blue" v-if="historyOfPresentIllness.careCauses.indexOf('1')>=0">
                        <div class="portlet-title">
                            <div class="caption">胸痛</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发作频率</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.chestPain.timesPerDay">
                                    <span class="help-inline"> 次/天 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.chestPain.timesPerWeek">
                                    <span class="help-inline"> 次/周 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-3 col-md-offset-1">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.chestPain.timesPerMonth">
                                    <span class="help-inline"> 次/月 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.chestPain.timesPerYear">
                                    <span class="help-inline"> 次/年 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发病时间（多选）</label>
                                <div class="col-md-5">
                                    <div><label v-for="time in staticIndex.onsetTimeOfIllness" :key="time.id"><checkbox v-model="historyOfPresentIllness.chestPain.onsetTime" :value="time.id">{{time.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-3" v-if="historyOfPresentIllness.chestPain.onsetTime.indexOf('5')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestPain.onsetTimeOthers">
                                    <span class="help-block"> 填写其他发病时间 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <v-repeater :className="'col-md-11 col-md-offset-1'" :array="historyOfPresentIllness.chestPain.diseaseBodyParts" :row="{bodyPartName: '',bodyPartNameOthers: '',qualityOfPain: '',qualityOfPainOthers: '', durationOfPain: '', durationOfPainOthers:'', painDegree:''}">
                                    <label class="control-label col-md-1 bold" slot="header">部位</label>
                                    <template v-for="(item,index) in historyOfPresentIllness.chestPain.diseaseBodyParts" :slot="index">
                                        <div class="mt-repeater-input" :key="item.id">  
                                            <label class="control-label">部位名</label>
                                            <select class="form-control" v-model="item.bodyPartName">
                                                <option value="" disabled selected>选择部位</option>
                                                <option v-for="bodyPart in staticIndex.diseaseBodyPartNames" :key="bodyPart.id" :value="bodyPart.id">{{bodyPart.text}}</option>
                                            </select>
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id" v-if="item.bodyPartName=='10'">
                                            <label class="control-label">&nbsp;</label>
                                            <input class="form-control" placeholder="其他部位" v-model="item.bodyPartNameOthers">
                                        </div> 
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">性质</label>
                                            <select class="form-control" v-model="item.qualityOfPain">
                                                <option value="" selected disabled>选择性质</option>
                                                <option v-for="quality in staticIndex.diseaseQualityOfPain" :key="quality.id" :value="quality.id">{{quality.text}}</option>
                                            </select> 
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id" v-if="item.qualityOfPain=='13'">
                                            <label class="control-label">&nbsp;</label>
                                            <input class="form-control" placeholder="其他性质" v-model="item.qualityOfPainOthers">
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">持续时间</label>
                                            <select class="form-control" v-model="item.durationOfPain">
                                                <option value="" disabled selected>选择持续时间</option>
                                                <option v-for="duration in staticIndex.diseaseDurationOfPain" :key="duration.id" :value="duration.id">{{duration.text}}</option>
                                            </select>
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id" v-if="item.durationOfPain=='6'">
                                            <label class="control-label">&nbsp;</label>
                                            <input class="form-control" placeholder="其他持续时间" v-model="item.durationOfPainOthers">
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">程度</label>
                                            <select class="form-control" v-model="item.painDegree">
                                                <option value="" disabled selected>请选择程度</option>
                                                <option v-for="degree in staticIndex.diseasePainDegree" :key="degree.id" :value="degree.id">{{degree.text}}</option>
                                            </select>
                                        </div>
                                    </template>
                                </v-repeater>
                            </div>                                                      
                            <div class="form-group">
                                <label class="control-label bold col-md-1">缓解因素</label>
                                <div class="col-md-4">
                                    <div><label v-for="factor in staticIndex.relievingFactors" :key="factor.id"><checkbox v-model="historyOfPresentIllness.chestPain.relievingFactors" :value="factor.id">{{factor.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>                                    
                                </div>
                                <div class="col-md-2" v-if="historyOfPresentIllness.chestPain.relievingFactors.indexOf('5')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestPain.relievingFactorsOthers">
                                    <span class="help-block"> 填写其他缓解因素 </span>
                                </div>
                                <label class="control-label col-md-1">时间</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.chestPain.relievingDuration">
                                    <span class="help-inline"> mins </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">诱因（多选）</label>
                                <div class="col-md-8">
                                    <div><label v-for="factor in staticIndex.precipitatingFactors" :key="factor.id"><checkbox v-model="historyOfPresentIllness.chestPain.precipitatingFactors" :value="factor.id">{{factor.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-2" v-if="historyOfPresentIllness.chestPain.precipitatingFactors.indexOf('12')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestPain.precipitatingFactorsOthers">
                                    <span class="help-block"> 填写其他诱因 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">放射部位（多选）</label>
                                <div class="col-md-8">
                                    <div><label v-for="site in staticIndex.radiationSites" :key="site.id"><checkbox v-model="historyOfPresentIllness.chestPain.radiationSites" :value="site.id">{{site.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-2" v-if="historyOfPresentIllness.chestPain.radiationSites.indexOf('7')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestPain.radiationSitesOthers">
                                    <span class="help-block"> 填写其他放射部位 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">伴随症状（多选）</label>
                                <div class="col-md-8">
                                    <div><label v-for="phenomenon in staticIndex.simultaneousPhenomena" :key="phenomenon.id"><checkbox v-model="historyOfPresentIllness.chestPain.simultaneousPhenomena" :value="phenomenon.id">{{phenomenon.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-2" v-if="historyOfPresentIllness.chestPain.simultaneousPhenomena.indexOf('21')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestPain.simultaneousPhenomenaOthers">
                                    <span class="help-block"> 填写其他伴随症状 </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 胸痛部分结束 -->
                    <!-- 胸闷部分开始 -->
                    <div class="portlet box red" v-if="historyOfPresentIllness.careCauses.indexOf('2')>=0">
                        <div class="portlet-title">
                            <div class="caption">胸闷</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发作频率</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.chestDistress.timesPerDay">
                                    <span class="help-inline"> 次/天 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.chestDistress.timesPerWeek">
                                    <span class="help-inline"> 次/周 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-3 col-md-offset-1">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.chestDistress.timesPerMonth">
                                    <span class="help-inline"> 次/月 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.chestDistress.timesPerYear">
                                    <span class="help-inline"> 次/年 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发病时间（多选）</label>
                                <div class="col-md-5">
                                    <div><label v-for="time in staticIndex.onsetTimeOfIllness" :key="time.id"><checkbox v-model="historyOfPresentIllness.chestDistress.onsetTime" :value="time.id">{{time.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-3" v-if="historyOfPresentIllness.chestDistress.onsetTime.indexOf('5')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestDistress.onsetTimeOthers">
                                    <span class="help-block"> 填写其他发病时间 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <v-repeater :className="'col-md-11 col-md-offset-1'" :array="historyOfPresentIllness.chestDistress.diseaseBodyParts" :row="{bodyPartName: '',bodyPartNameOthers: '',qualityOfPain: '',qualityOfPainOthers: '', durationOfPain: '', durationOfPainOthers:'', painDegree:''}">
                                    <label class="control-label col-md-1 bold" slot="header">部位</label>
                                    <template v-for="(item,index) in historyOfPresentIllness.chestDistress.diseaseBodyParts" :slot="index">
                                        <div class="mt-repeater-input" :key="item.id">  
                                            <label class="control-label">部位名</label>
                                            <select class="form-control" v-model="item.bodyPartName">
                                                <option value="" disabled selected>选择部位</option>
                                                <option v-for="bodyPart in staticIndex.diseaseBodyPartNames" :key="bodyPart.id" :value="bodyPart.id">{{bodyPart.text}}</option>
                                            </select>
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id" v-if="item.bodyPartName=='10'">
                                            <label class="control-label">&nbsp;</label>
                                            <input class="form-control" placeholder="其他部位" v-model="item.bodyPartNameOthers">
                                        </div> 
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">性质</label>
                                            <select class="form-control" v-model="item.qualityOfPain">
                                                <option value="" selected disabled>选择性质</option>
                                                <option v-for="quality in staticIndex.diseaseQualityOfPain" :key="quality.id" :value="quality.id">{{quality.text}}</option>
                                            </select> 
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id" v-if="item.qualityOfPain=='13'">
                                            <label class="control-label">&nbsp;</label>
                                            <input class="form-control" placeholder="其他性质" v-model="item.qualityOfPainOthers">
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">持续时间</label>
                                            <select class="form-control" v-model="item.durationOfPain">
                                                <option value="" disabled selected>选择持续时间</option>
                                                <option v-for="duration in staticIndex.diseaseDurationOfPain" :key="duration.id" :value="duration.id">{{duration.text}}</option>
                                            </select>
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id" v-if="item.durationOfPain=='6'">
                                            <label class="control-label">&nbsp;</label>
                                            <input class="form-control" placeholder="其他持续时间" v-model="item.durationOfPainOthers">
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">程度</label>
                                            <select class="form-control" v-model="item.painDegree">
                                                <option value="" disabled selected>请选择程度</option>
                                                <option v-for="degree in staticIndex.diseasePainDegree" :key="degree.id" :value="degree.id">{{degree.text}}</option>
                                            </select>
                                        </div>
                                    </template>
                                </v-repeater>
                            </div>                            
                            <div class="form-group">
                                <label class="control-label bold col-md-1">缓解因素</label>
                                <div class="col-md-4">
                                    <div><label v-for="factor in staticIndex.relievingFactors" :key="factor.id"><checkbox v-model="historyOfPresentIllness.chestDistress.relievingFactors" :value="factor.id">{{factor.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>                                    
                                </div>
                                <div class="col-md-2" v-if="historyOfPresentIllness.chestDistress.relievingFactors.indexOf('5')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestPain.relievingFactorsOthers">
                                    <span class="help-block"> 填写其他缓解因素 </span>
                                </div>
                                <label class="control-label col-md-1">时间</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.chestDistress.relievingDuration">
                                    <span class="help-inline"> mins </span>
                                </div>
                                <!-- <div class="col-md-3">
                                    <select class="form-control" v-model="historyOfPresentIllness.chestDistress.relievingFactors">
                                        <option value="" disabled selected>请选择缓解因素</option>
                                        <option v-for="factor in staticIndex.relievingFactors" :key="factor.id" :value="factor.id">{{factor.text}}</option>
                                    </select>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-2" v-if="historyOfPresentIllness.chestDistress.relievingFactors.indexOf('5')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestDistress.relievingFactorsOthers">
                                    <span class="help-block"> 填写其他缓解因素 </span>
                                </div> -->
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">诱因（多选）</label>
                                <div class="col-md-8">
                                    <div><label v-for="factor in staticIndex.precipitatingFactors" :key="factor.id"><checkbox v-model="historyOfPresentIllness.chestDistress.precipitatingFactors" :value="factor.id">{{factor.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-2" v-if="historyOfPresentIllness.chestDistress.precipitatingFactors.indexOf('12')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestDistress.precipitatingFactorsOthers">
                                    <span class="help-block"> 填写其他诱因 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">放射部位（多选）</label>
                                <div class="col-md-8">
                                    <div><label v-for="site in staticIndex.radiationSites" :key="site.id"><checkbox v-model="historyOfPresentIllness.chestDistress.radiationSites" :value="site.id">{{site.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-2" v-if="historyOfPresentIllness.chestDistress.radiationSites.indexOf('7')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestDistress.radiationSitesOthers">
                                    <span class="help-block"> 填写其他放射部位 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">伴随症状（多选）</label>
                                <div class="col-md-8">
                                    <div><label v-for="phenomenon in staticIndex.simultaneousPhenomena" :key="phenomenon.id"><checkbox v-model="historyOfPresentIllness.chestDistress.simultaneousPhenomena" :value="phenomenon.id">{{phenomenon.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-2" v-if="historyOfPresentIllness.chestDistress.simultaneousPhenomena.indexOf('21')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.chestDistress.simultaneousPhenomenaOthers">
                                    <span class="help-block"> 填写其他伴随症状 </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 胸闷部分结束 -->
                    <!-- 呼吸困难部分开始 -->
                    <div class="portlet box yellow" v-if="historyOfPresentIllness.careCauses.indexOf('3')>=0">
                        <div class="portlet-title">
                            <div class="caption">呼吸困难</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发作频率</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.dyspnea.timesPerDay">
                                    <span class="help-inline"> 次/天 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.dyspnea.timesPerWeek">
                                    <span class="help-inline"> 次/周 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-3 col-md-offset-1">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.dyspnea.timesPerMonth">
                                    <span class="help-inline"> 次/月 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.dyspnea.timesPerYear">
                                    <span class="help-inline"> 次/年 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发病时间（多选）</label>
                                <div class="col-md-5">
                                    <div><label v-for="time in staticIndex.onsetTimeOfIllness" :key="time.id"><checkbox v-model="historyOfPresentIllness.dyspnea.onsetTime" :value="time.id">{{time.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-3" v-if="historyOfPresentIllness.dyspnea.onsetTime.indexOf('5')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.dyspnea.onsetTimeOthers">
                                    <span class="help-block"> 填写其他发病时间 </span>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <!-- 呼吸困难部分结束 -->
                    <!-- 心悸部分开始 -->
                    <div class="portlet box green-dark" v-if="historyOfPresentIllness.careCauses.indexOf('4')>=0">
                        <div class="portlet-title">
                            <div class="caption">心悸</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发作频率</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.palpitation.timesPerDay">
                                    <span class="help-inline"> 次/天 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.palpitation.timesPerWeek">
                                    <span class="help-inline"> 次/周 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-3 col-md-offset-1">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.palpitation.timesPerMonth">
                                    <span class="help-inline"> 次/月 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.palpitation.timesPerYear">
                                    <span class="help-inline"> 次/年 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发病时间（多选）</label>
                                <div class="col-md-5">
                                    <div><label v-for="time in staticIndex.onsetTimeOfIllness" :key="time.id"><checkbox v-model="historyOfPresentIllness.palpitation.onsetTime" :value="time.id">{{time.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-3" v-if="historyOfPresentIllness.palpitation.onsetTime.indexOf('5')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.palpitation.onsetTimeOthers">
                                    <span class="help-block"> 填写其他发病时间 </span>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <!-- 心悸部分结束 -->
                    <!-- 心电图异常部分开始 -->
                    <div class="portlet box purple" v-if="historyOfPresentIllness.careCauses.indexOf('5')>=0">
                        <div class="portlet-title">
                            <div class="caption">心电图异常</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"></a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发作频率</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.abnormalEcg.timesPerDay">
                                    <span class="help-inline"> 次/天 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.abnormalEcg.timesPerWeek">
                                    <span class="help-inline"> 次/周 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-3 col-md-offset-1">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.abnormalEcg.timesPerMonth">
                                    <span class="help-inline"> 次/月 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="historyOfPresentIllness.abnormalEcg.timesPerYear">
                                    <span class="help-inline"> 次/年 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发病时间（多选）</label>
                                <div class="col-md-5">
                                    <div><label v-for="time in staticIndex.onsetTimeOfIllness" :key="time.id"><checkbox v-model="historyOfPresentIllness.abnormalEcg.onsetTime" :value="time.id">{{time.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-3" v-if="historyOfPresentIllness.abnormalEcg.onsetTime.indexOf('5')>=0">
                                    <input class="form-control" v-model="historyOfPresentIllness.abnormalEcg.onsetTimeOthers">
                                    <span class="help-block"> 填写其他发病时间 </span>
                                </div>
                            </div>                            
                        </div>
                    </div>
                    <!-- 心电图异常部分结束 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Checkbox, Radio} from 'vue-checkbox-radio';
import vRepeater from '@/components/v_repeater/v_repeater';
export default {
    name: 'history_of_present_illness',
    props: {
        historyOfPresentIllness: {
            type: Object
        },
        activeTab: {
            type: Number
        }
    },
    computed: {
        staticIndex: function() {
            return this.$store.state.staticIndex;
        }
    },
    data () {
        return {
            
            className: "col-md-11 col-md-offset-1"
        }
    },    
    components: {
        Checkbox, Radio, vRepeater
    }
}
</script>

<style lang="stylus" scoped>
    
</style>