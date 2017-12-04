<template>
  <div class="detail">
        <div class="page-bar">
            <ul class="page-breadcrumb">
                <li>
                    <span>电子病历系统</span>
                    <i class="fa fa-circle"></i>
                </li>
                <li>
                    <router-link to="/home/query">病历列表</router-link>
                </li>
            </ul>
        </div>
        <h1 class="page-title"> 电子病历系统
            <small>病历录入、病历查询、病历编辑</small>
        </h1>
        <div class="m-heading-1 border-green m-bordered">
            <h3>病历详情</h3>
            <p> 相关说明 </p>
        </div>
        <div class="portlet light">
            <div class="portlet-title">
                <div class="caption">
                    <i class=" icon-layers font-dark"></i>
                    <span class="caption-subject bold uppercase">病历详情</span>
                </div>
                <div class="actions">
                    <div class="btn-group">
                        <a class="btn blue dropdown-toggle" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> 操作
                            <i class="fa fa-angle-down"></i>
                        </a>
                        <ul class="dropdown-menu pull-right" v-if="mr">
                            <li @click="goEdit(mr._id)"><a href="javascript:;"><i class="fa fa-pencil"></i> 编辑病历 </a></li>                   
                        </ul>
                    </div>
                </div>
            </div>
            <div class="portlet-body">                
                <div class="tabbable-custom">
                    <ul class="nav nav-tabs">
                        <li @click="changeActiveTab(index)" v-for="(tab,index) in detailTabs" :key="tab.id" :class="{active:index+1==activeTab}"><a href="javascript:;" data-toggle="tab">{{tab.title}}</a></li>                                               
                    </ul>                                                
                    <div class="tab-content" v-if="mr">
                        <div class="tab-pane" :class="{active:activeTab==1}">
                            <table class="table table-stripped table-bordered">
                                <tbody>
                                    <tr><td><label class="bold">姓名：</label>{{mr.basicInfo.name}}</td></tr>
                                    <tr><td><label class="bold">性别：</label>{{mr.basicInfo.gender}}</td></tr>
                                    <tr><td><label class="bold">年龄：</label>{{mr.basicInfo.age}}</td></tr>
                                    <tr><td><label class="bold">手机号1：</label>{{mr.basicInfo.cellphone1}}</td></tr>
                                    <tr><td><label class="bold">手机号2：</label>{{mr.basicInfo.cellphone2}}</td></tr>
                                    <tr><td><label class="bold">固定电话：</label>{{mr.basicInfo.telephone}}</td></tr>
                                    <tr><td><label class="bold">身份证号：</label>{{mr.basicInfo.idNum}}</td></tr>
                                    <tr><td><label class="bold">医保卡号：</label>{{mr.basicInfo.medicalCardNum}}</td></tr>
                                    <tr><td><label class="bold">住院号：</label>{{mr.basicInfo.admissionNum}}</td></tr>
                                    <tr><td><label class="bold">床位号：</label>{{mr.basicInfo.bedNum}}</td></tr>
                                    <tr><td><label class="bold">记录者：</label>{{mr.basicInfo.recorder}}</td></tr>
                                    <tr><td><label class="bold">主治医生：</label>{{mr.basicInfo.doctor.name}}</td></tr>
                                    <tr><td><label class="bold">民族：</label>{{getStaticIndexName('nationalityList',mr.basicInfo.nationality)}}</td></tr>
                                    <tr><td><label class="bold">职业：</label>{{getStaticIndexName('professionList',mr.basicInfo.profession)}}</td></tr>
                                    <tr><td><label class="bold">出生日期：</label>{{mr.basicInfo.birthday}}</td></tr>
                                    <tr><td><label class="bold">出生地：</label>{{mr.basicInfo.birthProvince}}&nbsp;{{mr.basicInfo.birthCity}}</td></tr>
                                    <tr><td><label class="bold">家庭住址：</label>{{mr.basicInfo.addressProvince}}&nbsp;{{mr.basicInfo.addressCity}}&nbsp;{{mr.basicInfo.addressArea}}&nbsp;{{mr.basicInfo.addressTown}}</td></tr>
                                    <tr><td><label class="bold">详细住址：</label>{{mr.basicInfo.address}}</td></tr>
                                </tbody>
                            </table>                                                       
                        </div>
                        <div class="tab-pane" :class="{active:activeTab==2}">
                            <div class="portlet light">
                                <div><label class="bold">就诊原因：</label>{{getStaticIndexNameArray('historyOfPresentIllnessCareCauses', mr.historyOfPresentIllness.careCauses)}}<br></div>
                                <div v-if="mr.historyOfPresentIllness.careCauses.indexOf('6')>=0"><label class="bold">其他就诊原因：</label><span>{{mr.historyOfPresentIllness.careCauseOthers}}</span></div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">胸痛</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td>
                                                <label class="bold">发作频率：</label>
                                                <span v-if="mr.historyOfPresentIllness.chestPain.timesPerDay">{{mr.historyOfPresentIllness.chestPain.timesPerDay}}次/天</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.chestPain.timesPerWeek">{{mr.historyOfPresentIllness.chestPain.timesPerWeek}}次/周</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.chestPain.timesPerMonth">{{mr.historyOfPresentIllness.chestPain.timesPerMonth}}次/月</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.chestPain.timesPerYear">{{mr.historyOfPresentIllness.chestPain.timesPerYear}}次/年</span>&nbsp;&nbsp;
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">发病时间：</label>
                                                {{getStaticIndexNameArray('onsetTimeOfIllness', mr.historyOfPresentIllness.chestPain.onsetTime)}}&nbsp;&nbsp;
                                            </td></tr>
                                            <tr v-if="mr.historyOfPresentIllness.chestPain.onsetTime.indexOf('5')>=0"><td>
                                                <label class="bold">其他发病时间：</label>
                                                <span>{{mr.historyOfPresentIllness.chestPain.onsetTimeOthers}}</span>
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">部位：</label><br>
                                                <table class="table table-striped table-hover" v-if="mr.historyOfPresentIllness.chestPain.diseaseBodyParts.length>0">
                                                    <thead class="bold">
                                                        <tr><td>部位名</td><td>性质</td><td>持续时间</td><td>程度</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="body in mr.historyOfPresentIllness.chestPain.diseaseBodyParts" :key="body.id">
                                                            <td>{{getStaticIndexName('diseaseBodyPartNames',body.bodyPartName)}}&nbsp;&nbsp;<span v-if="body.bodyPartName=='11'">{{body.bodyPartNameOthers}}</span></td>
                                                            <td>{{getStaticIndexName('diseaseQualityOfPain',body.qualityOfPain)}}&nbsp;&nbsp;<span v-if="body.qualityOfPain=='13'">{{body.qualityOfPainOthers}}</span></td>
                                                            <td>{{getStaticIndexName('diseaseDurationOfPain',body.durationOfPain)}}&nbsp;&nbsp;<span v-if="body.durationOfPain=='6'">{{body.durationOfPainOthers}}</span></td>
                                                            <td>{{getStaticIndexName('diseasePainDegree',body.painDegree)}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">缓解因素：</label>
                                                {{getStaticIndexNameArray('relievingFactors', mr.historyOfPresentIllness.chestPain.relievingFactors)}}&nbsp;&nbsp;
                                                <label class="bold">时间：</label>
                                                <span v-if="mr.historyOfPresentIllness.chestPain.relievingDuration">{{mr.historyOfPresentIllness.chestPain.relievingDuration}}mins</span>
                                            </td></tr>
                                            <tr v-if="mr.historyOfPresentIllness.chestPain.relievingFactors.indexOf('5')>=0"><td>
                                                <label class="bold">其他缓解因素：</label>
                                                <span>{{mr.historyOfPresentIllness.chestPain.relievingFactorsOthers}}</span>&nbsp;&nbsp;
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">诱因：</label>
                                                {{getStaticIndexNameArray('precipitatingFactors', mr.historyOfPresentIllness.chestPain.precipitatingFactors)}}&nbsp;&nbsp;
                                            </td></tr>
                                            <tr v-if="mr.historyOfPresentIllness.chestPain.precipitatingFactors.indexOf('12')>=0"><td>
                                                <label class="bold">其他诱因：</label>
                                                <span>{{mr.historyOfPresentIllness.chestPain.precipitatingFactorsOthers}}</span>
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">放射部位：</label>
                                                {{getStaticIndexNameArray('radiationSites', mr.historyOfPresentIllness.chestPain.radiationSites)}}&nbsp;&nbsp;
                                            </td></tr>
                                            <tr v-if="mr.historyOfPresentIllness.chestPain.radiationSites.indexOf('7')>=0"><td>
                                                <label class="bold">其他放射部位：</label>
                                                <span>{{mr.historyOfPresentIllness.chestPain.radiationSitesOthers}}</span>
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">伴随症状：</label>
                                                {{getStaticIndexNameArray('simultaneousPhenomena', mr.historyOfPresentIllness.chestPain.simultaneousPhenomena)}}&nbsp;&nbsp;
                                            </td></tr>
                                            <tr v-if="mr.historyOfPresentIllness.chestPain.simultaneousPhenomena.indexOf('21')>=0"><td>
                                                <label class="bold">其他伴随症状：</label>
                                                <span>{{mr.historyOfPresentIllness.chestPain.simultaneousPhenomenonOthers}}</span>
                                            </td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">胸闷</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td>
                                                <label class="bold">发作频率：</label>
                                                <span v-if="mr.historyOfPresentIllness.chestDistress.timesPerDay">{{mr.historyOfPresentIllness.chestDistress.timesPerDay}}次/天</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.chestDistress.timesPerWeek">{{mr.historyOfPresentIllness.chestDistress.timesPerWeek}}次/周</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.chestDistress.timesPerMonth">{{mr.historyOfPresentIllness.chestDistress.timesPerMonth}}次/月</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.chestDistress.timesPerYear">{{mr.historyOfPresentIllness.chestDistress.timesPerYear}}次/年</span>&nbsp;&nbsp;
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">发病时间：</label>
                                                {{getStaticIndexNameArray('onsetTimeOfIllness', mr.historyOfPresentIllness.chestDistress.onsetTime)}}&nbsp;&nbsp;
                                            </td></tr>
                                            <tr v-if="mr.historyOfPresentIllness.chestDistress.onsetTime.indexOf('5')>=0"><td>
                                                <label class="bold">其他发病时间：</label>
                                                <span>{{mr.historyOfPresentIllness.chestDistress.onsetTimeOthers}}</span>
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">部位：</label><br>
                                                <table class="table table-striped table-hover" v-if="mr.historyOfPresentIllness.chestDistress.diseaseBodyParts.length>0">
                                                    <thead class="bold">
                                                        <tr><td>部位名</td><td>性质</td><td>持续时间</td><td>程度</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="body in mr.historyOfPresentIllness.chestDistress.diseaseBodyParts" :key="body.id">
                                                            <td>{{getStaticIndexName('diseaseBodyPartNames',body.bodyPartName)}}&nbsp;&nbsp;<span v-if="body.bodyPartName=='11'">{{body.bodyPartNameOthers}}</span></td>
                                                            <td>{{getStaticIndexName('diseaseQualityOfPain',body.qualityOfPain)}}&nbsp;&nbsp;<span v-if="body.qualityOfPain=='13'">{{body.qualityOfPainOthers}}</span></td>
                                                            <td>{{getStaticIndexName('diseaseDurationOfPain',body.durationOfPain)}}&nbsp;&nbsp;<span v-if="body.durationOfPain=='6'">{{body.durationOfPainOthers}}</span></td>
                                                            <td>{{getStaticIndexName('diseasePainDegree',body.painDegree)}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">缓解因素：</label>
                                                {{getStaticIndexNameArray('relievingFactors', mr.historyOfPresentIllness.chestDistress.relievingFactors)}}&nbsp;&nbsp;
                                                <label class="bold">时间：</label>
                                                <span v-if="mr.historyOfPresentIllness.chestDistress.relievingDuration">{{mr.historyOfPresentIllness.chestDistress.relievingDuration}}mins</span>
                                            </td></tr>
                                            <tr v-if="mr.historyOfPresentIllness.chestDistress.relievingFactors.indexOf('5')>=0"><td>
                                                <label class="bold">其他缓解因素：</label>
                                                <span>{{mr.historyOfPresentIllness.chestDistress.relievingFactorsOthers}}</span>&nbsp;&nbsp;
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">诱因：</label>
                                                {{getStaticIndexNameArray('precipitatingFactors', mr.historyOfPresentIllness.chestDistress.precipitatingFactors)}}&nbsp;&nbsp;
                                            </td></tr>
                                            <tr v-if="mr.historyOfPresentIllness.chestDistress.precipitatingFactors.indexOf('12')>=0"><td>
                                                <label class="bold">其他诱因：</label>
                                                <span>{{mr.historyOfPresentIllness.chestDistress.precipitatingFactorsOthers}}</span>
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">放射部位：</label>
                                                {{getStaticIndexNameArray('radiationSites', mr.historyOfPresentIllness.chestDistress.radiationSites)}}&nbsp;&nbsp;
                                            </td></tr>
                                            <tr v-if="mr.historyOfPresentIllness.chestDistress.radiationSites.indexOf('7')>=0"><td>
                                                <label class="bold">其他放射部位：</label>
                                                <span>{{mr.historyOfPresentIllness.chestDistress.radiationSitesOthers}}</span>
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">伴随症状：</label>
                                                {{getStaticIndexNameArray('simultaneousPhenomena', mr.historyOfPresentIllness.chestDistress.simultaneousPhenomena)}}&nbsp;&nbsp;
                                            </td></tr>
                                            <tr v-if="mr.historyOfPresentIllness.chestDistress.simultaneousPhenomena.indexOf('21')>=0"><td>
                                                <label class="bold">其他伴随症状：</label>
                                                <span>{{mr.historyOfPresentIllness.chestDistress.simultaneousPhenomenonOthers}}</span>
                                            </td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">呼吸困难</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td>
                                                <label class="bold">发作频率：</label>
                                                <span v-if="mr.historyOfPresentIllness.dyspnea.timesPerDay">{{mr.historyOfPresentIllness.dyspnea.timesPerDay}}次/天</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.dyspnea.timesPerWeek">{{mr.historyOfPresentIllness.dyspnea.timesPerWeek}}次/周</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.dyspnea.timesPerMonth">{{mr.historyOfPresentIllness.dyspnea.timesPerMonth}}次/月</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.dyspnea.timesPerYear">{{mr.historyOfPresentIllness.dyspnea.timesPerYear}}次/年</span>&nbsp;&nbsp;
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">发病时间：</label>
                                                {{getStaticIndexNameArray('onsetTimeOfIllness', mr.historyOfPresentIllness.dyspnea.onsetTime)}}&nbsp;&nbsp;
                                            </td></tr>  
                                            <tr v-if="mr.historyOfPresentIllness.dyspnea.onsetTime.indexOf('5')>=0"><td>
                                                <label class="bold">其他发病时间：</label>
                                                <span>{{mr.historyOfPresentIllness.dyspnea.onsetTimeOthers}}</span>                                                
                                            </td></tr>                                          
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">心悸</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td>
                                                <label class="bold">发作频率：</label>
                                                <span v-if="mr.historyOfPresentIllness.palpitation.timesPerDay">{{mr.historyOfPresentIllness.palpitation.timesPerDay}}次/天</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.palpitation.timesPerWeek">{{mr.historyOfPresentIllness.palpitation.timesPerWeek}}次/周</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.palpitation.timesPerMonth">{{mr.historyOfPresentIllness.palpitation.timesPerMonth}}次/月</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.palpitation.timesPerYear">{{mr.historyOfPresentIllness.palpitation.timesPerYear}}次/年</span>&nbsp;&nbsp;
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">发病时间：</label>
                                                {{getStaticIndexNameArray('onsetTimeOfIllness', mr.historyOfPresentIllness.palpitation.onsetTime)}}&nbsp;&nbsp;
                                            </td></tr>    
                                            <tr v-if="mr.historyOfPresentIllness.palpitation.onsetTime.indexOf('5')>=0"><td>
                                                <label class="bold">其他发病时间：</label>
                                                <span>{{mr.historyOfPresentIllness.palpitation.onsetTimeOthers}}</span>
                                            </td></tr>                                         
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">心电图异常</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td>
                                                <label class="bold">发作频率：</label>
                                                <span v-if="mr.historyOfPresentIllness.abnormalEcg.timesPerDay">{{mr.historyOfPresentIllness.abnormalEcg.timesPerDay}}次/天</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.abnormalEcg.timesPerWeek">{{mr.historyOfPresentIllness.abnormalEcg.timesPerWeek}}次/周</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.abnormalEcg.timesPerMonth">{{mr.historyOfPresentIllness.abnormalEcg.timesPerMonth}}次/月</span>&nbsp;&nbsp;
                                                <span v-if="mr.historyOfPresentIllness.abnormalEcg.timesPerYear">{{mr.historyOfPresentIllness.abnormalEcg.timesPerYear}}次/年</span>&nbsp;&nbsp;
                                            </td></tr>
                                            <tr><td>
                                                <label class="bold">发病时间：</label>
                                                {{getStaticIndexNameArray('onsetTimeOfIllness', mr.historyOfPresentIllness.abnormalEcg.onsetTime)}}&nbsp;&nbsp;
                                            </td></tr>  
                                            <tr v-if="mr.historyOfPresentIllness.abnormalEcg.onsetTime.indexOf('5')>=0"><td>
                                                <label class="bold">其他发病时间：</label>
                                                <span>{{mr.historyOfPresentIllness.abnormalEcg.onsetTimeOthers}}</span>
                                            </td></tr>                                          
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                        </div>
                        <div class="tab-pane" :class="{active:activeTab==3}">
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">血脂异常</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无血脂异常：</label>{{get3trueValue1(mr.anamnesis.isLipidAbnormality)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isLipidAbnormality=='1'"><td><label class="bold">病史：</label><span v-if="mr.anamnesis.lipidAbnormalityDuration">{{mr.anamnesis.lipidAbnormalityDuration}}年</span></td></tr>
                                            <tr v-if="mr.anamnesis.isLipidAbnormality=='1'"><td><label class="bold">类型：</label><span v-if="mr.anamnesis.lipidAbnormalityType">{{getStaticIndexName('lipidAbnormalityTypes', mr.anamnesis.lipidAbnormalityType)}}</span></td></tr>        
                                            <tr><td><label class="bold">有无治疗：</label>{{get3trueValue2(mr.anamnesis.isLipidAbnormalityUnderTreatment)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isLipidAbnormalityUnderTreatment=='2'"><td><label class="bold">长期用药药名：</label><span>{{mr.anamnesis.lipidAbnormalityDrugName}}</span></td></tr>                                                                                                                       
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">原发性高血压</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无原发性高血压：</label>{{get3trueValue1(mr.anamnesis.isEssentialHypertension)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isEssentialHypertension=='1'"><td><label class="bold">病史：</label><span v-if="mr.anamnesis.essentialHypertensionDuration">{{mr.anamnesis.essentialHypertensionDuration}}年</span></td></tr>
                                            <tr><td><label class="bold">有无治疗：</label>{{get3trueValue2(mr.anamnesis.isEssentialHypertensionUnderTreatment)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isEssentialHypertensionUnderTreatment=='2'"><td><label class="bold">长期用药药名：</label><span>{{mr.anamnesis.essentialHypertensionDrugName}}</span></td></tr>                                                                                                                       
                                            <tr><td><label class="bold">血压最高值：</label><span v-if="mr.anamnesis.maximumBP.SBP||mr.anamnesis.maximumBP.DBP">{{mr.anamnesis.maximumBP.SBP}} / {{mr.anamnesis.maximumBP.DBP}} mmHg</span></td></tr>                                                                                                                       
                                            <tr><td><label class="bold">血压平时值：</label><span v-if="mr.anamnesis.ordinaryBP.SBP||mr.anamnesis.ordinaryBP.DBP">{{mr.anamnesis.ordinaryBP.SBP}} / {{mr.anamnesis.ordinaryBP.DBP}} mmHg</span></td></tr>                                                                                                                       
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">血糖异常</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无血脂异常：</label>{{get3trueValue1(mr.anamnesis.isDysglycemia)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isDysglycemia=='1'"><td><label class="bold">类型：</label><span v-if="mr.anamnesis.dysglycemiaType">{{getStaticIndexName('dysglycemiaTypes', mr.anamnesis.dysglycemiaType)}}</span></td></tr>        
                                            <tr><td><label class="bold">是否糖尿病：</label>{{get2trueValue1(mr.anamnesis.isDiabetesMellitus)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isDiabetesMellitus=='1'"><td><label class="bold">病史：</label><span v-if="mr.anamnesis.diabetesMellitusDuration">{{mr.anamnesis.diabetesMellitusDuration}}年</span></td></tr>
                                            <tr v-if="mr.anamnesis.isDiabetesMellitus=='1'"><td><label class="bold">类型：</label><span v-if="mr.anamnesis.diabetesMellitusType">{{getStaticIndexName('diabetesMellitusTypes', mr.anamnesis.diabetesMellitusType)}}</span></td></tr>        
                                            <tr><td><label class="bold">有无治疗：</label>{{get3trueValue3(mr.anamnesis.isDiabetesMellitusUnderTreatment)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isDiabetesMellitusUnderTreatment=='1'||mr.anamnesis.isDiabetesMellitusUnderTreatment=='2'"><td><label class="bold">治疗方法：</label><span>{{getStaticIndexNameArray('diabetesMellitusTreatmentMethods', mr.anamnesis.diabetesMellitusTreatmentMethod)}}</span></td></tr>
                                            <tr v-if="mr.anamnesis.diabetesMellitusTreatmentMethod.indexOf('3')>=0"><td><label class="bold">口服药药名：</label><span>{{mr.anamnesis.diabetesMellitusOralDrugName}}</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">痛风</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无痛风：</label>{{get3trueValue1(mr.anamnesis.isGout)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isGout=='1'"><td><label class="bold">病史：</label><span v-if="mr.anamnesis.goutDuration">{{mr.anamnesis.goutDuration}}年</span></td></tr>
                                            <tr><td><label class="bold">血清尿酸：</label><span v-if="mr.anamnesis.serumUricAcidLevel">{{mr.anamnesis.serumUricAcidLevel}} mmol/L</span></td></tr>                                                                                                                       
                                            <tr><td><label class="bold">有无肾功能不全：</label>{{get3trueValue1(mr.anamnesis.isRenalInsufficiency)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isRenalInsufficiency=='1'"><td><label class="bold">病史：</label><span v-if="mr.anamnesis.renalInsufficiencyDuration">{{mr.anamnesis.renalInsufficiencyDuration}}年</span></td></tr>
                                            <tr v-if="mr.anamnesis.isRenalInsufficiency=='1'"><td><label class="bold">病因：</label><span>{{mr.anamnesis.renalInsufficiencyEtiology}}</span></td></tr>
                                            <tr><td><label class="bold">最高Cr：</label><span v-if="mr.anamnesis.maximumCr">{{mr.anamnesis.maximumCr}} mmol/L</span></td></tr>
                                            <tr><td><label class="bold">近期Cr：</label><span v-if="mr.anamnesis.recentCr">{{mr.anamnesis.recentCr}} mmol/L</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">深静脉血栓</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无深静脉血栓：</label>{{get3trueValue1(mr.anamnesis.isDeepVenousThrombosis)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isDeepVenousThrombosis=='1'"><td>
                                                <label class="bold">发病情况：</label>
                                                <span v-if="mr.anamnesis.deepVenousThrombosisOnsetTimeYear">{{mr.anamnesis.deepVenousThrombosisOnsetTimeYear}}年</span>
                                                <span v-if="mr.anamnesis.deepVenousThrombosisOnsetTimeMonth">{{mr.anamnesis.deepVenousThrombosisOnsetTimeMonth}}月前</span>
                                            </td></tr>                                            
                                            <tr v-if="mr.anamnesis.isDeepVenousThrombosis=='1'"><td><label class="bold">诱因：</label><span>{{getStaticIndexNameArray('deepVenousThrombosisInducements', mr.anamnesis.deepVenousThrombosisInducements)}}</span></td></tr>
                                            <tr v-if="mr.anamnesis.deepVenousThrombosisInducements.indexOf('5')>=0"><td><label class="bold">其他诱因：</label><span>{{mr.anamnesis.deepVenousThrombosisInducementsOthers}}</span></td></tr>
                                            <tr v-if="mr.anamnesis.isDeepVenousThrombosis=='1'"><td><label class="bold">症状：</label><span>{{getStaticIndexNameArray('deepVenousThrombosisSymptoms', mr.anamnesis.deepVenousThrombosisSymptoms)}}</span></td></tr>
                                            <tr v-if="mr.anamnesis.isDeepVenousThrombosis=='1'"><td><label class="bold">诊断结果：</label><span>{{getStaticIndexName('deepVenousThrombosisDiagnosisResults', mr.anamnesis.deepVenousThrombosisDiagnosisResult)}}</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">既往缺血性卒中</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无既往缺血性卒中：</label>{{get3trueValue1(mr.anamnesis.isOldIschemicStroke)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isOldIschemicStroke=='1'"><td>
                                                <label class="bold">类型：</label><br>
                                                <table class="table table-striped table-hover" v-if="mr.anamnesis.oldIschemicStrokeTypes.length>0">                                                    
                                                    <tbody>
                                                        <tr v-for="item in mr.anamnesis.oldIschemicStrokeTypes" :key="item.id">
                                                            <td>
                                                                {{getStaticIndexName('oldIschemicStrokeTypes',item.typeName)}}，
                                                                <span>{{item.onsetTimeYear}}年</span>
                                                                <span>{{item.onsetTimeMonth}}月前，发生</span>
                                                                <span>{{item.onsetFrequency}}次</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">血管性疾病史</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无血管性疾病史：</label>{{get3trueValue1(mr.anamnesis.isVascularDiseases)}}</td></tr>                                                                                   
                                            <tr v-if="mr.anamnesis.isVascularDiseases=='1'"><td><label class="bold">类型：</label><span>{{getStaticIndexNameArray('vascularDiseasesTypes', mr.anamnesis.vascularDiseasesTypes)}}</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">出血病史</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无出血病史：</label>{{get3trueValue1(mr.anamnesis.isHemorrhage)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isHemorrhage=='1'"><td>
                                                <label class="bold">类型：</label><br>
                                                <table class="table table-striped table-hover" v-if="mr.anamnesis.hemorrhageTypes.length>0">     
                                                    <thead>
                                                        <tr class="bold"><td>类型</td><td>发生时间</td><td>发生次数</td></tr>
                                                    </thead>                                                   
                                                    <tbody>
                                                        <tr v-for="item in mr.anamnesis.hemorrhageTypes" :key="item.id">
                                                            <td>{{getStaticIndexName('oldIschemicStrokeTypes',item.typeName)}}</td>
                                                            <td>{{item.onsetTime}}</td>
                                                            <td>{{item.onsetFrequency}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">出血史</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无出血史：</label>{{get3trueValue1(mr.anamnesis.isBleeding)}}</td></tr>
                                            <tr v-if="mr.anamnesis.isBleeding=='1'"><td>
                                                <label class="bold">病因：</label><br>
                                                <table class="table table-striped table-hover" v-if="mr.anamnesis.bleedingCauses.length>0">     
                                                    <thead>
                                                        <tr class="bold"><td>病因</td><td>发生时间</td></tr>
                                                    </thead>                                                   
                                                    <tbody>
                                                        <tr v-for="item in mr.anamnesis.bleedingCauses" :key="item.id">
                                                            <td>{{getStaticIndexName('bleedingCauses',item.cause)}}</td>
                                                            <td>{{item.onsetTime}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" :class="{active:activeTab==4}">
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">吸烟</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">吸烟：</label>{{get2trueValue1(mr.riskFactors.isSomking)}}</td></tr>
                                            <tr v-if="mr.riskFactors.isSomking=='1'"><td><label class="bold">烟龄：</label><span v-if="mr.riskFactors.smokingDuration">{{mr.riskFactors.smokingDuration}}年</span></td></tr>
                                            <tr v-if="mr.riskFactors.isSomking=='1'"><td><label class="bold">平均吸烟：</label><span v-if="mr.riskFactors.piecesPerDay">{{mr.riskFactors.piecesPerDay}}支/日</span></td></tr>
                                            <tr v-if="mr.riskFactors.isSomking=='1'"><td><label class="bold">吸烟类型：</label><span>{{getStaticIndexNameArray('cigretteTypes', mr.riskFactors.cigretteType)}}</span></td></tr>
                                            <tr v-if="mr.riskFactors.cigretteType.indexOf('5')>=0"><td><label class="bold">其他吸烟类型：</label><span>{{mr.riskFactors.cigretteTypeOthers}}</span></td></tr>
                                            <tr v-if="mr.riskFactors.isSomking=='1'"><td><label class="bold">是否戒烟：</label>{{get2trueValue1(mr.riskFactors.isSmokingCessation)}}</td></tr>
                                            <tr v-if="mr.riskFactors.isSmokingCessation=='1'"><td><label class="bold">戒烟时长：</label><span v-if="mr.riskFactors.smokingCessationDuration">{{mr.riskFactors.smokingCessationDuration}}年</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">饮酒</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">吸烟：</label>{{get2trueValue1(mr.riskFactors.isDrinking)}}</td></tr>
                                            <tr v-if="mr.riskFactors.isDrinking=='1'"><td><label class="bold">酒龄：</label><span v-if="mr.riskFactors.drinkingDuration">{{mr.riskFactors.drinkingDuration}}年</span></td></tr>
                                            <tr v-if="mr.riskFactors.isDrinking=='1'"><td><label class="bold">平均饮酒：</label><span v-if="mr.riskFactors.talesPerDay">{{mr.riskFactors.talesPerDay}}两/日</span></td></tr>
                                            <tr v-if="mr.riskFactors.isDrinking=='1'"><td><label class="bold">饮酒类型：</label><span>{{getStaticIndexNameArray('wineTypes', mr.riskFactors.wineType)}}</span></td></tr>
                                            <tr v-if="mr.riskFactors.wineType.indexOf('5')>=0"><td><label class="bold">其他饮酒类型：</label><span>{{mr.riskFactors.wineTypeOthers}}</span></td></tr>
                                            <tr v-if="mr.riskFactors.isDrinking=='1'"><td><label class="bold">是否戒酒：</label>{{get2trueValue1(mr.riskFactors.isTemperance)}}</td></tr>
                                            <tr v-if="mr.riskFactors.isTemperance=='1'"><td><label class="bold">戒酒时长：</label><span v-if="mr.riskFactors.temperanceDuration">{{mr.riskFactors.temperanceDuration}}年</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">饮食习惯（每日摄入量）</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">饮水：</label>{{getStaticIndexName('dietHabitDrinkingAmouts', mr.riskFactors.drinkingAmount)}}</td></tr>
                                            <tr><td><label class="bold">谷薯类：</label>{{getStaticIndexName('dietHabitPaddyPotatoes', mr.riskFactors.paddyPotato)}}</td></tr>
                                            <tr><td><label class="bold">全谷物和杂豆：</label>{{getStaticIndexName('dietHabitGrainMixedBeans', mr.riskFactors.grainMixedBeans)}}</td></tr>
                                            <tr><td><label class="bold">薯类：</label>{{getStaticIndexName('dietHabitPotatoes', mr.riskFactors.potato)}}</td></tr>
                                            <tr><td><label class="bold">蔬菜类：</label>{{getStaticIndexName('dietHabitVegetables', mr.riskFactors.vegetables)}}</td></tr>
                                            <tr><td><label class="bold">水果类：</label>{{getStaticIndexName('dietHabitFruits', mr.riskFactors.fruits)}}</td></tr>
                                            <tr><td><label class="bold">畜禽肉：</label>{{getStaticIndexName('dietHabitLivestockMeats', mr.riskFactors.livestockMeat)}}</td></tr>
                                            <tr><td><label class="bold">水产品：</label>{{getStaticIndexName('dietHabitAquaticProducts', mr.riskFactors.aquaticProducts)}}</td></tr>
                                            <tr><td><label class="bold">蛋类：</label>{{getStaticIndexName('dietHabitEggs', mr.riskFactors.eggs)}}</td></tr>
                                            <tr><td><label class="bold">奶及奶制品：</label>{{getStaticIndexName('dietHabitMilkProducts', mr.riskFactors.milkProducts)}}</td></tr>
                                            <tr><td><label class="bold">大豆及坚果类：</label>{{getStaticIndexName('dietHabitSoybeansNuts', mr.riskFactors.soybeansNuts)}}</td></tr>
                                            <tr><td><label class="bold">食盐：</label>{{getStaticIndexName('dietHabitSalts', mr.riskFactors.salt)}}</td></tr>
                                            <tr><td><label class="bold">糖：</label>{{getStaticIndexName('dietHabitSugar', mr.riskFactors.sugar)}}</td></tr>
                                            <tr><td><label class="bold">油：</label>{{getStaticIndexName('dietHabitOils', mr.riskFactors.oil)}}</td></tr>
                                            <tr><td><label class="bold">肥肉：</label><span v-if="mr.riskFactors.fatMeat">{{mr.riskFactors.fatMeat}}g/周</span></td></tr>
                                            <tr><td><label class="bold">内脏：</label><span v-if="mr.riskFactors.visceral">{{mr.riskFactors.visceral}}g/周</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">社会心理因素</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">血型性格：</label>{{getStaticIndexName('bloodTypes', mr.riskFactors.bloodType)}}</td></tr>
                                            <tr><td><label class="bold">有无长期心理压力：</label>{{get3trueValue1(mr.riskFactors.isLongtermPsychologicalStress)}}</td></tr>
                                            <tr><td><label class="bold">有无抑郁症：</label>{{get3trueValue1(mr.riskFactors.isDepression)}}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">运动</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">类型：</label>{{getStaticIndexName('exerciseTypes', mr.riskFactors.exerciseType)}}</td></tr>
                                            <tr><td><label class="bold">每次时长：</label>{{getStaticIndexName('exerciseDuration', mr.riskFactors.exerciseDuration)}}</td></tr>
                                            <tr><td><label class="bold">方式：</label><span>{{getStaticIndexNameArray('exerciseModes', mr.riskFactors.exerciseMode)}}</span></td></tr>
                                            <tr v-if="mr.riskFactors.exerciseMode.indexOf('3')>=0"><td><label class="bold">其他方式：</label><span>{{mr.riskFactors.exerciseModeOthers}}</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">中心型肥胖</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无中心型肥胖：</label>{{get3trueValue1(mr.riskFactors.isCentralObesity)}}</td></tr>
                                            <tr v-if="mr.riskFactors.isCentralObesity=='1'"><td><label class="bold">病史：</label><span v-if="mr.riskFactors.centralObesityDuration">{{mr.riskFactors.centralObesityDuration}}年</span></td></tr>
                                            <tr><td><label class="bold">身高：</label><span v-if="mr.riskFactors.height">{{mr.riskFactors.height}}cm</span></td></tr>
                                            <tr><td><label class="bold">体重：</label><span v-if="mr.riskFactors.weight">{{mr.riskFactors.weight}}kg</span></td></tr>
                                            <tr><td><label class="bold">BMI：</label><span v-if="mr.riskFactors.BMI">{{mr.riskFactors.BMI}}kg/m<sup>2</sup></span></td></tr>
                                            <tr><td><label class="bold">腰围：</label><span v-if="mr.riskFactors.waistline">{{mr.riskFactors.waistline}}cm</span></td></tr>
                                            <tr><td><label class="bold">颈围：</label><span v-if="mr.riskFactors.neckCircumference">{{mr.riskFactors.neckCircumference}}cm</span></td></tr>
                                            <tr><td><label class="bold">臀围：</label><span v-if="mr.riskFactors.hipline">{{mr.riskFactors.hipline}}cm</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" :class="{active:activeTab==5}">
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">早发冠心病</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无早发冠心病家族史：</label>{{get3trueValue1(mr.familyHistory.prematureChd.isPrematureChd)}}</td></tr>
                                            <tr v-if="mr.familyHistory.prematureChd.isPrematureChd=='1'"><td>
                                                <label class="bold">发病成员：</label>
                                                <table class="table table-striped table-hover" v-if="mr.familyHistory.prematureChd.onsetMembers.length>0">     
                                                    <thead>
                                                        <tr class="bold"><td>成员</td><td>性别</td><td>发病年龄</td><td>冠心病类型</td></tr>
                                                    </thead>                                                   
                                                    <tbody>
                                                        <tr v-for="item in mr.familyHistory.prematureChd.onsetMembers" :key="item.id">
                                                            <td>{{getStaticIndexName('familyMembers',item.onsetMember)}}</td>
                                                            <td>{{getStaticIndexName('genderList',item.gender)}}</td>
                                                            <td>{{item.onsetAge}}</td>
                                                            <td>{{getStaticIndexName('prematureChdTypes',item.prematureChdType)}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">心肌梗塞</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无心肌梗塞家族史：</label>{{get3trueValue1(mr.familyHistory.myocardialInfarction.isMyocardialInfarction)}}</td></tr>
                                            <tr v-if="mr.familyHistory.myocardialInfarction.isMyocardialInfarction=='1'"><td>
                                                <label class="bold">发病成员：</label>
                                                <table class="table table-striped table-hover" v-if="mr.familyHistory.myocardialInfarction.onsetMembers.length>0">     
                                                    <thead>
                                                        <tr class="bold"><td>成员</td><td>性别</td><td>发病年龄</td></tr>
                                                    </thead>                                                   
                                                    <tbody>
                                                        <tr v-for="item in mr.familyHistory.myocardialInfarction.onsetMembers" :key="item.id">
                                                            <td>{{getStaticIndexName('familyMembers',item.onsetMember)}}</td>
                                                            <td>{{getStaticIndexName('genderList',item.gender)}}</td>
                                                            <td>{{item.onsetAge}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">猝死</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无猝死家族史：</label>{{get3trueValue1(mr.familyHistory.suddenDeath.isSuddenDeath)}}</td></tr>
                                            <tr v-if="mr.familyHistory.suddenDeath.isSuddenDeath=='1'"><td>
                                                <label class="bold">发病成员：</label>
                                                <table class="table table-striped table-hover" v-if="mr.familyHistory.suddenDeath.onsetMembers.length>0">     
                                                    <thead>
                                                        <tr class="bold"><td>成员</td><td>性别</td><td>发病年龄</td><td>冠心病类型</td></tr>
                                                    </thead>                                                   
                                                    <tbody>
                                                        <tr v-for="item in mr.familyHistory.suddenDeath.onsetMembers" :key="item.id">
                                                            <td>{{getStaticIndexName('familyMembers',item.onsetMember)}}</td>
                                                            <td>{{getStaticIndexName('genderList',item.gender)}}</td>
                                                            <td>{{item.onsetAge}}</td>
                                                            <td>{{getStaticIndexName('prematureChdTypes',item.etiology)}}&nbsp;&nbsp;<span v-if="item.etiology=='4'">{{item.etiologyOthers}}</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">缺血性脑卒中</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无缺血性脑卒中家族史：</label>{{get3trueValue1(mr.familyHistory.ischemicStroke.isIschemicStroke)}}</td></tr>
                                            <tr v-if="mr.familyHistory.ischemicStroke.isIschemicStroke=='1'"><td>
                                                <label class="bold">发病成员：</label>
                                                <table class="table table-striped table-hover" v-if="mr.familyHistory.ischemicStroke.onsetMembers.length>0">     
                                                    <thead>
                                                        <tr class="bold"><td>成员</td><td>性别</td><td>发病年龄</td></tr>
                                                    </thead>                                                   
                                                    <tbody>
                                                        <tr v-for="item in mr.familyHistory.ischemicStroke.onsetMembers" :key="item.id">
                                                            <td>{{getStaticIndexName('familyMembers',item.onsetMember)}}</td>
                                                            <td>{{getStaticIndexName('genderList',item.gender)}}</td>
                                                            <td>{{item.onsetAge}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">出血性脑卒中</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">有无出血性脑卒中家族史：</label>{{get3trueValue1(mr.familyHistory.hemorrhagicStroke.isHemorrhagicStroke)}}</td></tr>
                                            <tr v-if="mr.familyHistory.hemorrhagicStroke.isHemorrhagicStroke=='1'"><td>
                                                <label class="bold">发病成员：</label>
                                                <table class="table table-striped table-hover" v-if="mr.familyHistory.hemorrhagicStroke.onsetMembers.length>0">     
                                                    <thead>
                                                        <tr class="bold"><td>成员</td><td>性别</td><td>发病年龄</td></tr>
                                                    </thead>                                                   
                                                    <tbody>
                                                        <tr v-for="item in mr.familyHistory.hemorrhagicStroke.onsetMembers" :key="item.id">
                                                            <td>{{getStaticIndexName('familyMembers',item.onsetMember)}}</td>
                                                            <td>{{getStaticIndexName('genderList',item.gender)}}</td>
                                                            <td>{{item.onsetAge}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" :class="{active:activeTab==6}">
                            <div class="portlet light">                                
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">体温：</label><span v-if="mr.physicalExamination.bodyTemperature">{{mr.physicalExamination.bodyTemperature}}℃</span></td></tr>
                                            <tr><td><label class="bold">呼吸频率：</label><span v-if="mr.physicalExamination.respiratoryRate">{{mr.physicalExamination.respiratoryRate}}次/分</span></td></tr>
                                            <tr><td><label class="bold">呼吸音：</label>
                                                <span v-if="mr.physicalExamination.isBreathSoundsNormal=='1'">正常</span>
                                                <span v-if="mr.physicalExamination.isBreathSoundsNormal=='0'">异常</span>&nbsp;&nbsp;
                                                <span v-if="mr.physicalExamination.isBreathSoundsNormal=='0'">
                                                    <label class="bold">类型：</label><span>{{getStaticIndexName('breathSoundsTypes',mr.physicalExamination.breathSoundsType)}}</span>&nbsp;&nbsp;
                                                    <label class="bold">部位：</label><span>{{getStaticIndexName('breathSoundsParts',mr.physicalExamination.breathSoundsPart)}}</span>
                                                </span>
                                            </td></tr>
                                            <tr><td><label class="bold">肺部湿啰音：</label>
                                                {{get3trueValue1(mr.physicalExamination.isLungWetRales)}}&nbsp;&nbsp;
                                                <span v-if="mr.physicalExamination.isBreathSoundsNormal=='0'">
                                                    <label class="bold">范围：</label><span>{{getStaticIndexName('lungWetRalesRanges',mr.physicalExamination.lungWetRalesRange)}}</span>&nbsp;&nbsp;
                                                    <label class="bold">部位：</label><span>{{getStaticIndexName('lungWetRalesParts',mr.physicalExamination.lungWetRalesPart)}}</span>
                                                </span>
                                            </td></tr>                             
                                            <tr><td><label class="bold">心率：</label><span v-if="mr.physicalExamination.heartRate">{{mr.physicalExamination.heartRate}}bpm</span></td></tr>
                                            <tr><td><label class="bold">心律：</label><span>{{getStaticIndexName('cardiacRhythms',mr.physicalExamination.cardiacRhythm)}}</span></td></tr>
                                            <tr><td><label class="bold">心音（S1）：</label><span>{{getStaticIndexName('heartSoundS1Results',mr.physicalExamination.heartSoundS1Result)}}</span></td></tr>
                                            <tr><td><label class="bold">心音（S3/S4奔马律）：</label><span>{{get3trueValue1(mr.physicalExamination.isS3S4GallopRhythm)}}</span></td></tr>
                                            <tr><td><label class="bold">脉搏：</label><span v-if="mr.physicalExamination.pulse">{{mr.physicalExamination.pulse}}次/分</span></td></tr>
                                            <tr><td><label class="bold">血压：</label><span v-if="mr.physicalExamination.BP.SBP||mr.physicalExamination.BP.DBP">{{mr.physicalExamination.BP.SBP}}/{{mr.physicalExamination.BP.DBP}}mmHg</span></td></tr>
                                            <tr><td><label class="bold">耳垂有纵向裂纹：</label>
                                                <span>{{get2trueValue1(mr.physicalExamination.isEarLobeLongitudinalCrack)}}</span>&nbsp;&nbsp;
                                                <span v-if="mr.physicalExamination.isEarLobeLongitudinalCrack=='1'">
                                                    <label class="bold">部位：</label><span>{{getStaticIndexNameArray('earLobeLongitudinalCrackParts',mr.physicalExamination.earLobeLongitudinalCrackParts)}}</span>
                                                </span>
                                            </td></tr>
                                            <tr><td><label class="bold">皮肤有黄色素瘤：</label>
                                                <span>{{get2trueValue1(mr.physicalExamination.isSkinYellowPigmentTumor)}}</span>&nbsp;&nbsp;
                                                <span v-if="mr.physicalExamination.isSkinYellowPigmentTumor=='1'">
                                                    <label class="bold">部位：</label><span>{{getStaticIndexNameArray('skinYellowPigmentTumorParts',mr.physicalExamination.skinYellowPigmentTumorParts)}}</span>
                                                </span>
                                            </td></tr>
                                            <tr><td><label class="bold">头顶脱发：</label>
                                                <span>{{get2trueValue1(mr.physicalExamination.isAlopecia)}}</span>&nbsp;&nbsp;
                                                <span v-if="mr.physicalExamination.isAlopecia=='1'">
                                                    <label class="bold">部位：</label><span>{{getStaticIndexNameArray('alopeciaParts',mr.physicalExamination.alopeciaParts)}}</span>
                                                </span>
                                            </td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" :class="{active:activeTab==7}">
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">血生化</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">血脂全套</label></td></tr>
                                            <tr><td><label class="bold">TC：</label><span v-if="mr.routineExamination.TC">{{mr.routineExamination.TC}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">TG：</label><span v-if="mr.routineExamination.TG">{{mr.routineExamination.TG}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">LDL-C：</label><span v-if="mr.routineExamination.LDL">{{mr.routineExamination.LDL}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">HDL-C：</label><span v-if="mr.routineExamination.HDL">{{mr.routineExamination.HDL}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">非HDL：</label><span v-if="mr.routineExamination.notHDL">{{mr.routineExamination.notHDL}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">APOA1：</label><span v-if="mr.routineExamination.APOA1">{{mr.routineExamination.APOA1}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">APOB：</label><span v-if="mr.routineExamination.APOB">{{mr.routineExamination.APOB}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">血糖（空腹）：</label><span v-if="mr.routineExamination.bloodGlucoseFasting">{{mr.routineExamination.bloodGlucoseFasting}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">血清心肌坏死标志物：</label>
                                                {{get2trueValue1(mr.routineExamination.isSerumMyocardialNecrosisMarkers)}}         
                                            </td></tr> 
                                            <tr v-if="mr.routineExamination.isSerumMyocardialNecrosisMarkers=='1'"><td><label class="bold">CK：</label><span v-if="mr.routineExamination.myocardialCK">{{mr.routineExamination.myocardialCK}}U/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isSerumMyocardialNecrosisMarkers=='1'"><td><label class="bold">CK-MB：</label><span v-if="mr.routineExamination.myocardialCKMB">{{mr.routineExamination.myocardialCKMB}}U/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isSerumMyocardialNecrosisMarkers=='1'"><td><label class="bold">cTnI：</label><span v-if="mr.routineExamination.myocardialCTnI">{{mr.routineExamination.myocardialCTnI}}μg/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isSerumMyocardialNecrosisMarkers=='1'"><td><label class="bold">Mb：</label><span v-if="mr.routineExamination.myocardialMb">{{mr.routineExamination.myocardialMb}}μg/L</span></td></tr>
                                            <tr><td><label class="bold">炎症标志物：</label>
                                                {{get2trueValue1(mr.routineExamination.isInflammatoryMarkers)}}         
                                            </td></tr> 
                                            <tr v-if="mr.routineExamination.isInflammatoryMarkers=='1'"><td><label class="bold">hs-CRP：</label><span v-if="mr.routineExamination.inflammationHsCRP">{{mr.routineExamination.inflammationHsCRP}}mg/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isInflammatoryMarkers=='1'"><td><label class="bold">IL-6：</label><span v-if="mr.routineExamination.inflammationIL6">{{mr.routineExamination.inflammationIL6}}pg/mL</span></td></tr>
                                            <tr v-if="mr.routineExamination.isInflammatoryMarkers=='1'"><td><label class="bold">IL-1β：</label><span v-if="mr.routineExamination.inflammationIL1Beta">{{mr.routineExamination.inflammationIL1Beta}}pg/mL</span></td></tr>
                                            <tr v-if="mr.routineExamination.isInflammatoryMarkers=='1'"><td><label class="bold">TNFα：</label><span v-if="mr.routineExamination.inflammationTNFAlpha">{{mr.routineExamination.inflammationTNFAlpha}}μg/L</span></td></tr>
                                            <tr><td><label class="bold">心衰（NT-proBNP）：</label><span v-if="mr.routineExamination.heartFailureNTproBNP">{{mr.routineExamination.heartFailureNTproBNP}}ng/L</span></td></tr>
                                            <tr><td><label class="bold">电解质</label></td></tr>
                                            <tr><td><label class="bold">Na：</label><span v-if="mr.routineExamination.electrolyteNa">{{mr.routineExamination.electrolyteNa}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">K：</label><span v-if="mr.routineExamination.electrolyteK">{{mr.routineExamination.electrolyteK}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">Ca：</label><span v-if="mr.routineExamination.electrolyteCa">{{mr.routineExamination.electrolyteCa}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">Cl：</label><span v-if="mr.routineExamination.electrolyteCl">{{mr.routineExamination.electrolyteCl}}mmol/L</span></td></tr>
                                            <tr><td><label class="bold">肝功能：</label>
                                                {{get2trueValue1(mr.routineExamination.isLiverFunction)}}         
                                            </td></tr> 
                                            <tr v-if="mr.routineExamination.isLiverFunction=='1'"><td><label class="bold">总蛋白：</label><span v-if="mr.routineExamination.totalProtein">{{mr.routineExamination.totalProtein}}g/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isLiverFunction=='1'"><td><label class="bold">白蛋白：</label><span v-if="mr.routineExamination.albumin">{{mr.routineExamination.albumin}}g/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isLiverFunction=='1'"><td><label class="bold">总胆红素：</label><span v-if="mr.routineExamination.totalBilirubin">{{mr.routineExamination.totalBilirubin}}μmol/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isLiverFunction=='1'"><td><label class="bold">直接胆红素：</label><span v-if="mr.routineExamination.directBilirubin">{{mr.routineExamination.directBilirubin}}μmol/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isLiverFunction=='1'"><td><label class="bold">间接胆红素：</label><span v-if="mr.routineExamination.indirectBilirubin">{{mr.routineExamination.indirectBilirubin}}μmol/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isLiverFunction=='1'"><td><label class="bold">ALT：</label><span v-if="mr.routineExamination.ALT">{{mr.routineExamination.ALT}}U/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isLiverFunction=='1'"><td><label class="bold">AST：</label><span v-if="mr.routineExamination.AST">{{mr.routineExamination.AST}}U/L</span></td></tr>
                                            <tr><td><label class="bold">肾功能：</label>
                                                {{get2trueValue1(mr.routineExamination.isRenalFunction)}}         
                                            </td></tr> 
                                            <tr v-if="mr.routineExamination.isRenalFunction=='1'"><td><label class="bold">Cr：</label><span v-if="mr.routineExamination.Cr">{{mr.routineExamination.Cr}}μmol/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isRenalFunction=='1'"><td><label class="bold">UA：</label><span v-if="mr.routineExamination.UA">{{mr.routineExamination.UA}}μmol/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isRenalFunction=='1'"><td><label class="bold">BUN：</label><span v-if="mr.routineExamination.BUN">{{mr.routineExamination.BUN}}mmol/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isRenalFunction=='1'"><td><label class="bold">GFR：</label><span v-if="mr.routineExamination.GFR">{{mr.routineExamination.GFR}}ml/min</span></td></tr>
                                            <tr><td><label class="bold">肝肾疾病：</label>
                                                {{get2trueValue1(mr.routineExamination.isHepatorenalDisease)}}         
                                            </td></tr> 
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">凝血功能</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">APTT：</label><span v-if="mr.routineExamination.APTT">{{mr.routineExamination.APTT}}s</span></td></tr>
                                            <tr><td><label class="bold">PT：</label><span v-if="mr.routineExamination.PT">{{mr.routineExamination.PT}}s</span></td></tr>
                                            <tr><td><label class="bold">TT：</label><span v-if="mr.routineExamination.TT">{{mr.routineExamination.TT}}s</span></td></tr>
                                            <tr><td><label class="bold">FIB：</label><span v-if="mr.routineExamination.FIB">{{mr.routineExamination.FIB}}g/L</span></td></tr>
                                            <tr><td><label class="bold">D-二聚体：</label><span v-if="mr.routineExamination.dDimer">{{mr.routineExamination.dDimer}}mg/L</span></td></tr>
                                            <tr><td><label class="bold">INR：</label><span>{{mr.routineExamination.INR}}</span></td></tr>
                                            <tr><td><label class="bold">INR类型：</label>
                                                <span v-if="mr.routineExamination.isINRStable=='1'">稳定</span>
                                                <span v-if="mr.routineExamination.isINRStable=='0'">不稳定</span>
                                            </td></tr>                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">血常规</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">红细胞计数：</label><span v-if="mr.routineExamination.redBloodCellCount">{{mr.routineExamination.redBloodCellCount}}x10^12/L</span></td></tr>
                                            <tr><td><label class="bold">红细胞比容：</label><span v-if="mr.routineExamination.redBloodCellSpecificVolume">{{mr.routineExamination.redBloodCellSpecificVolume}}%</span></td></tr>
                                            <tr><td><label class="bold">HGB：</label><span v-if="mr.routineExamination.HGB">{{mr.routineExamination.HGB}}g/L</span></td></tr>
                                            <tr><td><label class="bold">白细胞计数：</label><span v-if="mr.routineExamination.leukocyteCount">{{mr.routineExamination.leukocyteCount}}x10^9/L</span></td></tr>
                                            <tr><td><label class="bold">中性粒细胞：</label><span v-if="mr.routineExamination.neutrophil">{{mr.routineExamination.neutrophil}}x10^9/L</span></td></tr>
                                            <tr><td><label class="bold">嗜酸性粒细胞：</label><span v-if="mr.routineExamination.eosinophil">{{mr.routineExamination.eosinophil}}x10^9/L</span></td></tr>
                                            <tr><td><label class="bold">嗜碱性粒细胞：</label><span v-if="mr.routineExamination.basophil">{{mr.routineExamination.basophil}}x10^9/L</span></td></tr>
                                            <tr><td><label class="bold">淋巴细胞：</label><span v-if="mr.routineExamination.lymphocyte">{{mr.routineExamination.lymphocyte}}x10^9/L</span></td></tr>
                                            <tr><td><label class="bold">单核细胞：</label><span v-if="mr.routineExamination.monocyte">{{mr.routineExamination.monocyte}}x10^9/L</span></td></tr>
                                            <tr><td><label class="bold">血小板功能数量异常：</label>
                                                {{get2trueValue1(mr.routineExamination.isQualitativePlatelet)}}         
                                            </td></tr> 
                                            <tr v-if="mr.routineExamination.isQualitativePlatelet=='1'"><td><label class="bold">血小板计数（PLT）：</label><span v-if="mr.routineExamination.PCPLT">{{mr.routineExamination.PCPLT}}x10^9/L</span></td></tr>
                                            <tr v-if="mr.routineExamination.isQualitativePlatelet=='1'"><td><label class="bold">血小板计数（MPV）：</label><span v-if="mr.routineExamination.PCMPV">{{mr.routineExamination.PCMPV}}fL</span></td></tr>
                                            <tr v-if="mr.routineExamination.isQualitativePlatelet=='1'"><td><label class="bold">血小板计数（PDW）：</label><span v-if="mr.routineExamination.PCPDW">{{mr.routineExamination.PCPDW}}%</span></td></tr>
                                            <tr v-if="mr.routineExamination.isQualitativePlatelet=='1'"><td><label class="bold">血小板聚集率（ADP）：</label><span v-if="mr.routineExamination.PARADP">{{mr.routineExamination.PARADP}}%</span></td></tr>
                                            <tr v-if="mr.routineExamination.isQualitativePlatelet=='1'"><td><label class="bold">血小板聚集率（肾上腺素）：</label><span v-if="mr.routineExamination.PAREpinephrine">{{mr.routineExamination.PAREpinephrine}}%</span></td></tr>
                                            <tr v-if="mr.routineExamination.isQualitativePlatelet=='1'"><td><label class="bold">血小板聚集率（花生四烯酸）：</label><span v-if="mr.routineExamination.PARArachidonicAcid">{{mr.routineExamination.PARArachidonicAcid}}%</span></td></tr>
                                            <tr v-if="mr.routineExamination.isQualitativePlatelet=='1'"><td><label class="bold">血小板聚集率（胶原）：</label><span v-if="mr.routineExamination.PARCollagen">{{mr.routineExamination.PARCollagen}}%</span></td></tr>
                                            <tr v-if="mr.routineExamination.isQualitativePlatelet=='1'"><td><label class="bold">血小板聚集率（瑞斯托霉素）：</label><span v-if="mr.routineExamination.PARRistocetin">{{mr.routineExamination.PARRistocetin}}%</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" :class="{active:activeTab==8}">
                            <div class="portlet light">               
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">ECG</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">病理性Q波：</label>{{get3trueValue1(mr.specialExamination.ecg.pathologicalQWave.isPathologicalQWave)}}</td></tr>
                                            <tr><td><label class="bold">病理性Q波导联：</label>{{getStaticIndexNameArray('leadSystem', mr.specialExamination.ecg.pathologicalQWave.qWaveLeads)}}</td></tr>
                                            <tr><td><label class="bold">ST段改变：</label>{{get3trueValue1(mr.specialExamination.ecg.stSegmentChange.isStSegmentChange)}}</td></tr>
                                            <tr v-if="mr.specialExamination.ecg.stSegmentChange.isStSegmentChange=='1'"><td><label class="bold">ST段压低：</label>{{get3trueValue1(mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.isStSegmentDepression)}}</td></tr>
                                            <tr v-if="mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.isStSegmentDepression=='1'"><td><label class="bold">ST段压低导联：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.changeDetail.length>0">
                                                    <thead class="bold">
                                                        <tr><td>导联</td><td>幅度（mV）</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.ecg.stSegmentChange.stSegmentDepression.changeDetail" :key="item.id">
                                                            <td>{{getStaticIndexName('leadSystem',item.lead)}}</td>
                                                            <td>{{item.amplitude}}</td>                                            
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            <tr v-if="mr.specialExamination.ecg.stSegmentChange.isStSegmentChange=='1'"><td><label class="bold">ST段抬高：</label>{{get3trueValue1(mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.isStSegmentElevation)}}</td></tr>
                                            <tr v-if="mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.isStSegmentElevation=='1'"><td><label class="bold">ST段抬高导联：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.changeDetail.length>0">
                                                    <thead class="bold">
                                                        <tr><td>导联</td><td>幅度（mV）</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.ecg.stSegmentChange.stSegmentElevation.changeDetail" :key="item.id">
                                                            <td>{{getStaticIndexName('leadSystem',item.lead)}}</td>
                                                            <td>{{item.amplitude}}</td>                                            
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            <tr><td><label class="bold">T波改变：</label>{{get3trueValue1(mr.specialExamination.ecg.tWaveChange.isTWaveChange)}}</td></tr>
                                            <tr v-if="mr.specialExamination.ecg.tWaveChange.isTWaveChange=='1'"><td><label class="bold">T波改变导联：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.ecg.tWaveChange.changeDetail.length>0">
                                                    <thead class="bold">
                                                        <tr><td>导联</td><td>波形</td><td>幅度（mV）</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.ecg.tWaveChange.changeDetail" :key="item.id">
                                                            <td>{{getStaticIndexName('leadSystem',item.lead)}}</td>
                                                            <td>{{getStaticIndexName('ecgWaveforms',item.waveform)}}</td>
                                                            <td>{{item.amplitude}}</td>                                            
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            <tr><td><label class="bold">心律失常：</label>{{get3trueValue1(mr.specialExamination.ecg.arrhythmia.isArrhythmia)}}</td></tr>
                                            <tr v-if="mr.specialExamination.ecg.arrhythmia.isArrhythmia=='1'"><td><label class="bold">心律失常类型：</label>
                                                {{getStaticIndexNameArray('arrhythmiaTypes', mr.specialExamination.ecg.arrhythmia.arrhythmiaTypes)}}
                                            </td></tr>
                                            <tr v-if="mr.specialExamination.ecg.arrhythmia.arrhythmiaTypes.indexOf('10')>=0"><td><label class="bold">心律失常其他类型：</label>
                                                {{mr.specialExamination.ecg.arrhythmia.arrhythmiaTypeOthers}}
                                            </td></tr>
                                            <tr><td><label class="bold">心电图结果：</label>
                                                <span v-if="mr.specialExamination.ecg.isResultNormal=='1'">正常</span>
                                                <span v-if="mr.specialExamination.ecg.isResultNormal=='0'">异常</span>
                                            </td></tr>
                                            <tr><td><label class="bold">检查结论：</label>{{mr.specialExamination.ecg.findings}}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">               
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">运动ECG</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label>运动</label>{{mr.specialExamination.exerciseEcg.exerciseDuration}}mins后，{{get3trueValue1(mr.specialExamination.ecg.isExerciseAngina)}}心绞痛</td></tr>
                                            <tr><td><label class="bold">血压最高值：</label><span v-if="mr.specialExamination.exerciseEcg.maximumBP.SBP||mr.specialExamination.exerciseEcg.maximumBP.DBP">{{mr.specialExamination.exerciseEcg.maximumBP.SBP}} / {{mr.specialExamination.exerciseEcg.maximumBP.DBP}} mmHg</span></td></tr>
                                            <tr><td><label class="bold">血压最低值：</label><span v-if="mr.specialExamination.exerciseEcg.minimumBP.SBP||mr.specialExamination.exerciseEcg.minimumBP.DBP">{{mr.specialExamination.exerciseEcg.minimumBP.SBP}} / {{mr.specialExamination.exerciseEcg.minimumBP.DBP}} mmHg</span></td></tr>
                                            <tr><td><label class="bold">ST段改变：</label>{{get3trueValue1(mr.specialExamination.exerciseEcg.stSegmentChange.isStSegmentChange)}}</td></tr>
                                            <tr v-if="mr.specialExamination.exerciseEcg.stSegmentChange.isStSegmentChange=='1'"><td><label class="bold">ST段压低：</label>{{get3trueValue1(mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression)}}</td></tr>
                                            <tr v-if="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression=='1'"><td><label class="bold">ST段压低持续时间：</label><span v-if="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.duration">{{mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.duration}}mins</span></td></tr>
                                            <tr v-if="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression=='1'"><td><label class="bold">ST段压低导联：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.changeDetail.length>0">
                                                    <thead class="bold">
                                                        <tr><td>导联</td><td>幅度（mV）</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.changeDetail" :key="item.id">
                                                            <td>{{getStaticIndexName('leadSystem',item.lead)}}</td>
                                                            <td>{{item.amplitude}}</td>                                            
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            <tr v-if="mr.specialExamination.exerciseEcg.stSegmentChange.isStSegmentChange=='1'"><td><label class="bold">ST段抬高：</label>{{get3trueValue1(mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation)}}</td></tr>
                                            <tr v-if="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.isStSegmentDepression=='1'"><td><label class="bold">ST段抬高持续时间：</label><span v-if="mr.pecialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.duration">{{mr.pecialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.duration}}mins</span></td></tr>
                                            <tr v-if="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation=='1'"><td><label class="bold">ST段抬高导联：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.changeDetail.length>0">
                                                    <thead class="bold">
                                                        <tr><td>导联</td><td>幅度（mV）</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.changeDetail" :key="item.id">
                                                            <td>{{getStaticIndexName('leadSystem',item.lead)}}</td>
                                                            <td>{{item.amplitude}}</td>                                            
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            <tr><td><label class="bold">T波改变：</label>{{get3trueValue1(mr.specialExamination.exerciseEcg.tWaveChange.isTWaveChange)}}</td></tr>
                                            <tr v-if="mr.specialExamination.exerciseEcg.tWaveChange.isStSegmentDepression=='1'"><td><label class="bold">T波改变持续时间：</label><span v-if="mr.pecialExamination.exerciseEcg.tWaveChange.duration">{{mr.pecialExamination.exerciseEcg.tWaveChange.duration}}mins</span></td></tr>
                                            <tr v-if="mr.specialExamination.exerciseEcg.tWaveChange.isTWaveChange=='1'"><td><label class="bold">T波改变导联：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.exerciseEcg.tWaveChange.changeDetail.length>0">
                                                    <thead class="bold">
                                                        <tr><td>导联</td><td>波形</td><td>幅度（mV）</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.exerciseEcg.tWaveChange.changeDetail" :key="item.id">
                                                            <td>{{getStaticIndexName('leadSystem',item.lead)}}</td>
                                                            <td>{{getStaticIndexName('ecgWaveforms',item.waveform)}}</td>
                                                            <td>{{item.amplitude}}</td>                                            
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>                                            
                                            <tr><td><label class="bold">运动ECG结果：</label>
                                                {{getStaticIndexName('ecgResults',mr.specialExamination.exerciseEcg.result)}}
                                            </td></tr>
                                            <tr><td><label class="bold">检查结论：</label>{{mr.specialExamination.exerciseEcg.findings}}</td></tr>
                                        </tbody>
                                    </table>
                                </div>               
                            </div>
                            <div class="portlet light">               
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">长程ECG</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">心博总数：</label><span v-if="mr.specialExamination.holterEcg.totalHeartbeats">{{mr.specialExamination.holterEcg.totalHeartbeats}}次/天</span></td></tr>
                                            <tr><td><label class="bold">平均心率：</label><span v-if="mr.specialExamination.holterEcg.averageHeartRate">{{mr.specialExamination.holterEcg.averageHeartRate}}bpm</span></td></tr>
                                            <tr><td><label class="bold">最高心率：</label><span v-if="mr.specialExamination.holterEcg.maximalHeartRate">{{mr.specialExamination.holterEcg.maximalHeartRate}}bpm</span></td></tr>
                                            <tr><td><label class="bold">最高心率发生时间：</label><span>{{mr.specialExamination.holterEcg.maximalHeartRateOccurrenceTime}}</span></td></tr>
                                            <tr><td><label class="bold">最低心率：</label><span v-if="mr.specialExamination.holterEcg.minimalHeartRate">{{mr.specialExamination.holterEcg.minimalHeartRate}}bpm</span></td></tr>
                                            <tr><td><label class="bold">最低心率发生时间：</label><span>{{mr.specialExamination.holterEcg.minimalHeartRateOccurrenceTime}}</span></td></tr>
                                            <tr><td><label class="bold">心率失常：</label>{{get3trueValue1(mr.specialExamination.holterEcg.arrhythmia.isArrhythmia)}}</td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.arrhythmia.isArrhythmia=='1'"><td><label class="bold">心率失常频度：</label><span v-if="mr.specialExamination.holterEcg.arrhythmia.frequentness">{{mr.specialExamination.holterEcg.arrhythmia.frequentness}}次/天</span></td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.arrhythmia.isArrhythmia=='1'"><td><label class="bold">异常心博总数：</label><span v-if="mr.specialExamination.holterEcg.arrhythmia.totalAbnormalHeartbeats">{{mr.specialExamination.holterEcg.arrhythmia.totalAbnormalHeartbeats}}次/天</span></td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.arrhythmia.isArrhythmia=='1'"><td><label class="bold">心律失常类型：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.holterEcg.arrhythmia.arrhythmiaTypes.length>0">
                                                    <thead class="bold">
                                                        <tr><td>类型</td><td>持续时间（mins）</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.holterEcg.arrhythmia.arrhythmiaTypes" :key="item.id">
                                                            <td>{{getStaticIndexName('arrhythmiaTypes',item.arrhythmiaType)}}<span v-if="item.arrhythmiaType=='11'">{{item.arrhythmiaTypeOthers}}</span> </td>
                                                            <td>{{item.duration}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            <tr><td><label class="bold">病理性Q波：</label>{{get3trueValue1(mr.specialExamination.holterEcg.pathologicalQWave.isPathologicalQWave)}}</td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.pathologicalQWave.isPathologicalQWave=='1'"><td><label class="bold">病理性Q波频度：</label><span v-if="mr.specialExamination.holterEcg.pathologicalQWave.frequentness">{{mr.specialExamination.holterEcg.pathologicalQWave.frequentness}}次/天</span></td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.pathologicalQWave.isPathologicalQWave=='1'"><td><label class="bold">病理性Q波导联：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.holterEcg.pathologicalQWave.qWaveLeadsDetail.length>0">
                                                    <thead class="bold">
                                                        <tr><td>时间</td><td>导联</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.holterEcg.pathologicalQWave.qWaveLeadsDetail" :key="item.id">
                                                            <td>{{item.time}}</td>
                                                            <td>{{getStaticIndexNameArray('leadSystem',item.qWaveLeads)}}</span> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>

                                            <tr><td><label class="bold">ST段改变：</label>{{get3trueValue1(mr.specialExamination.holterEcg.stSegmentChange.isStSegmentChange)}}</td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.stSegmentChange.isStSegmentChange=='1'"><td><label class="bold">ST段压低：</label>{{get3trueValue1(mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression)}}</td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression=='1'"><td><label class="bold">ST段压低频度：</label><span v-if="mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.frequentness">{{mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.frequentness}}次/天</span></td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression=='1'"><td><label class="bold">ST段压低导联：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.changesDetail.length>0">
                                                    <thead class="bold">
                                                        <tr><td>持续时间（mins）</td><td>导联</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.holterEcg.stSegmentChange.stSegmentDepression.changesDetail" :key="item.id">
                                                            <td>{{item.duration}}</td>                                            
                                                            <td>
                                                                <table class="table table-striped table-hover" v-if="item.leads.length>0">
                                                                    <thead class="bold">
                                                                        <tr><td>导联</td><td>幅度（mV）</td></tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr v-for="subItem in item.leads" :key="subItem.id">
                                                                            <td>{{getStaticIndexName('leadSystem',subItem.lead)}}</td>                             
                                                                            <td>{{subItem.amplitude}}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.stSegmentChange.isStSegmentChange=='1'"><td><label class="bold">ST段抬高：</label>{{get3trueValue1(mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation)}}</td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation=='1'"><td><label class="bold">ST段抬高频度：</label><span v-if="mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.frequentness">{{mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.frequentness}}次/天</span></td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation=='1'"><td><label class="bold">ST段抬高导联：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.changesDetail.length>0">
                                                    <thead class="bold">
                                                        <tr><td>持续时间（mins）</td><td>导联</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.holterEcg.stSegmentChange.stSegmentElevation.changesDetail" :key="item.id">
                                                            <td>{{item.duration}}</td>                                            
                                                            <td>
                                                                <table class="table table-striped table-hover" v-if="item.leads.length>0">
                                                                    <thead class="bold">
                                                                        <tr><td>导联</td><td>幅度（mV）</td></tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr v-for="subItem in item.leads" :key="subItem.id">
                                                                            <td>{{getStaticIndexName('leadSystem',subItem.lead)}}</td>                               
                                                                            <td>{{subItem.amplitude}}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            <tr><td><label class="bold">T波改变：</label>{{get3trueValue1(mr.specialExamination.holterEcg.tWaveChange.isTWaveChange)}}</td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.tWaveChange.isTWaveChange=='1'"><td><label class="bold">T波改变频度：</label><span v-if="mr.specialExamination.holterEcg.tWaveChange.frequentness">{{mr.specialExamination.holterEcg.tWaveChange.frequentness}}次/天</span></td></tr>
                                            <tr v-if="mr.specialExamination.holterEcg.tWaveChange.isTWaveChange=='1'"><td><label class="bold">T波改变导联：</label>
                                                 <table class="table table-striped table-hover" v-if="mr.specialExamination.holterEcg.tWaveChange.changesDetail.length>0">
                                                    <thead class="bold">
                                                        <tr><td>持续时间（mins）</td><td>导联</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.holterEcg.tWaveChange.changesDetail" :key="item.id">
                                                            <td>{{item.duration}}</td>                                            
                                                            <td>
                                                                <table class="table table-striped table-hover" v-if="item.leads.length>0">
                                                                    <thead class="bold">
                                                                        <tr><td>导联</td><td>波形</td><td>幅度（mV）</td></tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr v-for="subItem in item.leads" :key="subItem.id">
                                                                            <td>{{getStaticIndexName('leadSystem',subItem.lead)}}</td>                                 
                                                                            <td>{{getStaticIndexName('ecgWaveforms',subItem.waveform)}}</td>                                 
                                                                            <td>{{subItem.amplitude}}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>                                            
                                            <tr><td><label class="bold">检查结论：</label>{{mr.specialExamination.holterEcg.findings}}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">        
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">心脏彩超</span>
                                    </div>
                                </div>                        
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">LVD：</label><span v-if="mr.specialExamination.ucg.LVD">{{mr.specialExamination.ucg.LVD}}mm</span></td></tr>
                                            <tr><td><label class="bold">EDV：</label><span v-if="mr.specialExamination.ucg.EDV">{{mr.specialExamination.ucg.EDV}}ml</span></td></tr>
                                            <tr><td><label class="bold">LVS：</label><span v-if="mr.specialExamination.ucg.LVS">{{mr.specialExamination.ucg.LVS}}mm</span></td></tr>
                                            <tr><td><label class="bold">ESV：</label><span v-if="mr.specialExamination.ucg.ESV">{{mr.specialExamination.ucg.ESV}}ml</span></td></tr>
                                            <tr><td><label class="bold">LAD：</label><span v-if="mr.specialExamination.ucg.LAD">{{mr.specialExamination.ucg.LAD}}mm</span></td></tr>
                                            <tr><td><label class="bold">LVPW：</label><span v-if="mr.specialExamination.ucg.LVPW">{{mr.specialExamination.ucg.LVPW}}mm</span></td></tr>
                                            <tr><td><label class="bold">IVST：</label><span v-if="mr.specialExamination.ucg.IVST">{{mr.specialExamination.ucg.IVST}}mm</span></td></tr>
                                            <tr><td><label class="bold">LVEF < 40%：</label>{{get2trueValue1(mr.specialExamination.ucg.isLVEFLtFortyPercent)}}</td></tr> 
                                            <tr v-if="mr.specialExamination.ucg.isLVEFLtFortyPercent=='1'"><td><label class="bold">E/A：</label><span v-if="mr.specialExamination.ucg.ratioEToA">{{mr.specialExamination.ucg.ratioEToA}}%</span></td></tr>
                                            <tr v-if="mr.specialExamination.ucg.isLVEFLtFortyPercent=='1'"><td><label class="bold">EF：</label><span>{{mr.specialExamination.ucg.EF}}</span></td></tr>
                                            <tr><td><label class="bold">局部运动异常：</label>{{get2trueValue1(mr.specialExamination.ucg.isLocalMotionAbnormality)}}</td></tr>
                                            <tr v-if="mr.specialExamination.ucg.isLocalMotionAbnormality=='1'"><td><label class="bold">局部运动异常部位：</label><span>{{getStaticIndexNameArray('ucgParts', mr.specialExamination.ucg.localMotionAbnormalityParts)}}</span></td></tr>
                                            <tr><td><label class="bold">室壁瘤：</label>{{get2trueValue1(mr.specialExamination.ucg.isVntricularAneurysm)}}</td></tr>
                                            <tr v-if="mr.specialExamination.ucg.isVntricularAneurysm=='1'"><td><label class="bold">局部运动异常部位：</label><span>{{getStaticIndexNameArray('ucgParts', mr.specialExamination.ucg.vntricularAneurysmParts)}}</span></td></tr>
                                            <tr><td><label class="bold">左室附壁血栓：</label>{{get2trueValue1(mr.specialExamination.ucg.isLeftVentricularThrombosis)}}</td></tr>
                                            <tr v-if="mr.specialExamination.ucg.isLeftVentricularThrombosis=='1'"><td><label class="bold">局部运动异常部位：</label><span>{{getStaticIndexNameArray('ucgParts', mr.specialExamination.ucg.leftVentricularThrombosisParts)}}</span></td></tr>
                                            <tr><td><label class="bold">检查结论：</label>{{mr.specialExamination.ucg.findings}}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="portlet light">        
                                <div class="portlet-title">
                                    <div class="caption">                                        
                                        <span class="caption-subject sbold uppercase">冠脉介入</span>
                                    </div>
                                </div>                        
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">编号：</label><span>{{mr.specialExamination.pci.num}}</span></td></tr>
                                            <tr><td><label class="bold">日期：</label><span>{{mr.specialExamination.pci.date}}</span></td></tr>
                                            <tr><td><label class="bold">类型：</label><span>{{getStaticIndexName('pciTypes', mr.specialExamination.pci.pciType)}}</span></td></tr>
                                            <tr v-if=" mr.specialExamination.pci.pciType.indexOf('4')>=0||mr.specialExamination.pci.pciType.indexOf('5')>=0"><td><label class="bold">PCI距溶栓：</label><span v-if="mr.specialExamination.pci.thrombolysisInterval">{{mr.specialExamination.pci.thrombolysisInterval}}h</span></td></tr>
                                            <tr><td><label>发病后</label>
                                                <span>{{mr.specialExamination.pci.onsetIntervalDay}}天</span>
                                                <span>{{mr.specialExamination.pci.onsetIntervalHour}}小时进行PCI，院前</span>
                                                <span>{{mr.specialExamination.pci.stayTimePrehospital}}分钟，急/门诊</span>
                                                <span>{{mr.specialExamination.pci.stayTimeEmergencyCall}}分钟，CCU</span>
                                                <span>{{mr.specialExamination.pci.stayTimeCCU}}分钟，导管室</span>
                                                <span>{{mr.specialExamination.pci.stayTimeConduitRoom}}分钟。</span>
                                            </td></tr>
                                            <tr><td><label class="bold">造影剂：</label><span>{{getStaticIndexNameArray('cardiacRhythms', mr.specialExamination.pci.contrastMedia)}}</span></td></tr>
                                            <tr v-if="mr.specialExamination.pci.contrastMedia.indexOf('4')>=0"><td><label class="bold">其他造影剂：</label><span>{{mr.specialExamination.pci.contrastMediaOthers}}</span></td></tr>
                                            <tr><td><label class="bold">造影结果</label></td></tr>
                                            <tr><td><label class="bold">冠脉分布：</label>{{getStaticIndexName('coronaryDistributionTypes', mr.specialExamination.pci.coronaryDistributionType)}}</td></tr>
                                            <tr><td><label class="bold">冠脉畸形：</label>{{get3trueValue1(mr.specialExamination.pci.isCoronaryMalformations)}}</td></tr>
                                            <tr><td><label class="bold">3级病变：</label>{{get3trueValue1(mr.specialExamination.pci.isGrade3Lesions)}}</td></tr>
                                            <tr><td><label class="bold">血流TIMI0-2级：</label>{{get3trueValue1(mr.specialExamination.pci.isBloodFlowTIMIGrade0to2)}}</td></tr>
                                            <tr><td><label class="bold">CTO：</label>{{get3trueValue1(mr.specialExamination.pci.isCTO)}}</td></tr>
                                            <tr><td><label class="bold">侧枝循环：</label>{{get3trueValue1(mr.specialExamination.pci.isCollateralCirculation)}}</td></tr>
                                            <tr><td><label class="bold">介入路径：</label>{{getStaticIndexNameArray('pciPaths', mr.specialExamination.pci.pciPaths)}}</td></tr>
                                            <tr><td><label class="bold">植入支架部位</label></td></tr>
                                            <tr><td><label class="bold">LAD：</label><span v-if="mr.specialExamination.pci.implantedBracketCountLAD">{{mr.specialExamination.pci.implantedBracketCountLAD}}个</span></td></tr>
                                            <tr><td><label class="bold">LCX：</label><span v-if="mr.specialExamination.pci.implantedBracketCountLCX">{{mr.specialExamination.pci.implantedBracketCountLCX}}个</span></td></tr>
                                            <tr><td><label class="bold">RCA：</label><span v-if="mr.specialExamination.pci.implantedBracketCountRCA">{{mr.specialExamination.pci.implantedBracketCountRCA}}个</span></td></tr>
                                            <tr><td><label class="bold">LM：</label><span v-if="mr.specialExamination.pci.implantedBracketCountLM">{{mr.specialExamination.pci.implantedBracketCountLM}}个</span></td></tr>
                                            <tr><td><label class="bold">病变节段：</label>
                                                <table class="table table-striped table-hover" v-if="mr.specialExamination.pci.segmentalLesions.length>0">
                                                    <thead class="bold">
                                                        <tr><td>病变节段</td><td>狭窄（%）</td><td>长（mm）</td><td>形态</td><td>钙化</td><td>开口病变</td><td>血栓</td><td>TIMI</td><td>病变类型</td><td>PCI导丝</td><td>球囊</td><td>支架</td></tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in mr.specialExamination.pci.segmentalLesions" :key="item.id">
                                                            <td>{{item.num}}</td>
                                                            <td>{{item.stenosis}}</td>
                                                            <td>{{item.length}}</td>
                                                            <td>{{getStaticIndexName('segmentalLesionsShapes', item.shape)}}</td>                                            
                                                            <td>{{get3trueValue1(item.isCalcification)}}</td>                                            
                                                            <td>{{get2trueValue1(item.isOstialLesion)}}</td>                                            
                                                            <td>{{get3trueValue1(item.isThrombus)}}</td>                                            
                                                            <td>{{item.TIMIGrade}}</td>                                            
                                                            <td>{{item.kindsOfLesions}}</td>                                            
                                                            <td>{{item.pciGuidewire}}</td>                                            
                                                            <td>{{item.balloon}}</td>                                            
                                                            <td>{{item.stent}}</td>                                            
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td></tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" :class="{active:activeTab==9}">
                            <div class="portlet light">                                
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">无痛性心肌缺血：</label>{{get2trueValue1(mr.admissionDiagnosis.isSilentMyocardialIschemia)}}</td></tr> 
                                            <tr><td><label class="bold">冠脉微血管病变：</label>{{get2trueValue1(mr.admissionDiagnosis.isCoronaryMicrovascularDisease)}}</td></tr> 
                                            <tr><td><label class="bold">心肌梗死：</label>{{get2trueValue1(mr.admissionDiagnosis.isMyocardialInfarction)}}</td></tr>
                                            <tr v-if="mr.admissionDiagnosis.isMyocardialInfarction=='1'"><td><label class="bold">心肌梗死（类型）：</label><span>{{getStaticIndexName('myocardialInfarctionTypes', mr.admissionDiagnosis.myocardialInfarctionType)}}</span></td></tr>
                                            <tr v-if="mr.admissionDiagnosis.isMyocardialInfarction=='1'"><td><label class="bold">心肌梗死（部位）：</label><span>{{mr.admissionDiagnosis.myocardialInfarctionPart}}</span></td></tr>
                                            <tr><td><label class="bold">心绞痛：</label>{{get2trueValue1(mr.admissionDiagnosis.isAngina)}}</td></tr>
                                            <tr v-if="mr.admissionDiagnosis.isAngina=='1'"><td><label class="bold">心绞痛（类型）：</label><span>{{getStaticIndexName('anginaTypes', mr.admissionDiagnosis.anginaType)}}</span></td></tr>
                                            <tr v-if="mr.admissionDiagnosis.isAngina=='1'"><td><label class="bold">心绞痛（CCS分级）：</label><span>{{mr.admissionDiagnosis.anginaCcs}}</span></td></tr>
                                            <tr><td><label class="bold">缺血性心肌病：</label>{{get2trueValue1(mr.admissionDiagnosis.isIschemicCardiomyopathy)}}</td></tr> 
                                            <tr><td><label class="bold">冠心病猝死：</label>{{get2trueValue1(mr.admissionDiagnosis.isSuddenCoronaryDeath)}}</td></tr> 
                                            <tr><td><label class="bold">胸痛原因待查：</label>{{get2trueValue1(mr.admissionDiagnosis.isChestPainOfUnknownOrigin)}}</td></tr> 
                                            <tr><td><label class="bold">其他：</label>{{get2trueValue1(mr.admissionDiagnosis.isDiagnosisOthers)}}</td></tr> 
                                            <tr v-if="mr.admissionDiagnosis.isDiagnosisOthers=='1'"><td><label class="bold">其他诊断：</label><span>{{mr.admissionDiagnosis.diagnosisOthers}}</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" :class="{active:activeTab==10}">
                            <div class="portlet light">                                
                                <div class="portlet-body">
                                    <table class="table table-stripped table-bordered">
                                        <tbody>
                                            <tr><td><label class="bold">无痛性心肌缺血：</label>{{get2trueValue1(mr.dischargeDiagnosis.isSilentMyocardialIschemia)}}</td></tr> 
                                            <tr><td><label class="bold">冠脉微血管病变：</label>{{get2trueValue1(mr.dischargeDiagnosis.isCoronaryMicrovascularDisease)}}</td></tr> 
                                            <tr><td><label class="bold">心肌梗死：</label>{{get2trueValue1(mr.dischargeDiagnosis.isMyocardialInfarction)}}</td></tr>
                                            <tr v-if="mr.dischargeDiagnosis.isMyocardialInfarction=='1'"><td><label class="bold">心肌梗死（类型）：</label><span>{{getStaticIndexName('myocardialInfarctionTypes', mr.dischargeDiagnosis.myocardialInfarctionType)}}</span></td></tr>
                                            <tr v-if="mr.dischargeDiagnosis.isMyocardialInfarction=='1'"><td><label class="bold">心肌梗死（部位）：</label><span>{{mr.dischargeDiagnosis.myocardialInfarctionPart}}</span></td></tr>
                                            <tr><td><label class="bold">心绞痛：</label>{{get2trueValue1(mr.dischargeDiagnosis.isAngina)}}</td></tr>
                                            <tr v-if="mr.dischargeDiagnosis.isAngina=='1'"><td><label class="bold">心绞痛（类型）：</label><span>{{getStaticIndexName('anginaTypes', mr.dischargeDiagnosis.anginaType)}}</span></td></tr>
                                            <tr v-if="mr.dischargeDiagnosis.isAngina=='1'"><td><label class="bold">心绞痛（CCS分级）：</label><span>{{mr.dischargeDiagnosis.anginaCcs}}</span></td></tr>
                                            <tr><td><label class="bold">缺血性心肌病：</label>{{get2trueValue1(mr.dischargeDiagnosis.isIschemicCardiomyopathy)}}</td></tr> 
                                            <tr><td><label class="bold">冠心病猝死：</label>{{get2trueValue1(mr.dischargeDiagnosis.isSuddenCoronaryDeath)}}</td></tr> 
                                            <tr><td><label class="bold">胸痛原因待查：</label>{{get2trueValue1(mr.dischargeDiagnosis.isChestPainOfUnknownOrigin)}}</td></tr> 
                                            <tr><td><label class="bold">其他：</label>{{get2trueValue1(mr.dischargeDiagnosis.isDiagnosisOthers)}}</td></tr> 
                                            <tr v-if="mr.dischargeDiagnosis.isDiagnosisOthers=='1'"><td><label class="bold">其他诊断：</label><span>{{mr.dischargeDiagnosis.diagnosisOthers}}</span></td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
        <div class="clearfix"></div>

        <sweet-modal icon="error" ref="errorModal">
            {{modalMessage}}
        </sweet-modal>
    </div>
</template>

<script>
import utils from '@/utils/utils';
// import config from '@/config';
import mrApi from '@/api/mr';

export default {
    name: 'detail',
    data () {
        return {
            mr: null,
            modalMessage: '',
            detailTabs: [
                {
                    href: '#tab_2_1',
                    title: '基本信息'
                },
                {
                    href: '#tab_2_2',
                    title: '现病史'
                },{
                    href: '#tab_2_3',
                    title: '既往病史'
                },{
                    href: '#tab_2_4',
                    title: '危险因素'
                },{
                    href: '#tab_2_5',
                    title: '家族史'
                },{
                    href: '#tab_2_6',
                    title: '体格检查'
                },{
                    href: '#tab_2_7',
                    title: '常规检查'
                },{
                    href: '#tab_2_8',
                    title: '特殊检查'
                },{
                    href: '#tab_2_9',
                    title: '入院诊断'
                },{
                    href: '#tab_2_10',
                    title: '出院诊断'
                }
            ],
            activeTab: 1,
            recordId: ''
        }
    },
    watch: {
        '$route' (val) {
            if(val.path.indexOf('detail')>=0){
                this.recordId = this.$route.params.id;
                mrApi.getMedicalRecord({recordId:this.recordId}).then(res=>{
                    if(res.status){
                        this.mr = res.data;                
                    }else{
                        this.modalMessage = '获取病历数据失败，请稍后重试！';
                        this.$refs.errorModal.open();
                    }
                })
            }
        }
    },
    created () {
        this.recordId = this.$route.params.id;
        mrApi.getMedicalRecord({recordId:this.recordId}).then(res=>{
            if(res.status){
                this.mr = res.data;                
            }else{
                this.modalMessage = '获取病历数据失败，请稍后重试！';
                this.$refs.errorModal.open();
            }
        })
    },
    computed: {
        staticIndex () {
            return this.$store.state.staticIndex;
        }
    },
    methods: {
        changeActiveTab (index) {
            this.activeTab = index+1;
        },
        goEdit (id) {            
            this.$store.dispatch('changeCurrentMedicalRecordId',id);
            this.$router.push(`/home/edit/${id}`);
        },
        getStaticIndexName(listName, index) {
            let vm = this;
            let name = ''
            vm.staticIndex[listName].forEach(function(item){
                if(item.id==index){
                    name = item.text;
                }
            })
            return name;
        },
        getStaticIndexNameArray(listName, indexArray) {
            function sortNumber(a, b){
                return parseInt(a) - parseInt(b);
            }
            if(!indexArray.length>0){
                return '';
            }else{
                let nameArray=[];
                let vm = this;
                let sortIndexArray = JSON.parse(JSON.stringify(indexArray)).sort(sortNumber);
                sortIndexArray.forEach(function(item){                    
                    nameArray.push(vm.getStaticIndexName(listName,item));
                })
                return nameArray.toString();
            }
        },
        get2trueValue1(val){
            if(val=='0'){
                return '否';
            }else if(val=='1'){
                return '是';
            }else {
                return '';
            }
        },
        get3trueValue1(val){
            if(val=='-1'){
                return '不知道';
            }else if(val=='0'){
                return '无';
            }else if(val=='1'){
                return '有';
            }else {
                return '';
            }
        },
        get3trueValue2(val){
            if(val=='0'){
                return '无';
            }else if(val=='1'){
                return '间断';
            }else if(val=='2'){
                return '长期用药';
            }else {
                return '';
            }
        },
        get3trueValue3(val){
            if(val=='0'){
                return '无';
            }else if(val=='1'){
                return '不规律';
            }else if(val=='2'){
                return '规律治疗';
            }else {
                return '';
            }
        }
    },
    mounted () {
        utils.handleSidebarAndContentHeight();
        utils.handleGoTop();
    },
    components: {
        
    }
}

</script>

<style lang="stylus" scoped>
    .detail
        padding-bottom 100px
</style>


