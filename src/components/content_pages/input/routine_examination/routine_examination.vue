<template>
  <div class="tab-pane portlet" :class="{active:activeTab==6}">
    <div class="portlet-title">
        <div class="caption">
            <span class="caption-subject bold font-dark uppercase">常规检查</span>
        </div>
    </div>
    <div class="porlet-body">
        <div class="row">
            <div class="col-md-12">
                <!-- 血生化部分开始 -->
                <div class="portlet box blue">
                    <div class="portlet-title">
                        <div class="caption">血生化</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">血脂全套</label>
                            <div class="col-md-10">
                                <div class="form-group">
                                    <label class="control-label col-md-2">TC</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.TC">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">TG</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.TG">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">LDL-C</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.LDL">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">HDL-C</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.HDL">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                    <label class="control-label col-md-2">非HDL</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" readonly v-model="routineExamination.notHDL">
                                        <span class="help-inline"> mmol/L </span>
                                        <span class="help-block"> [TC] - [HDL-C] </span>
                                    </div>
                                </div>                        
                                <div class="form-group">
                                    <label class="control-label col-md-2">APOA1</label>
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.APOA1">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">APOB</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.APOB">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">血糖</label>            
                            <div class="col-md-10">
                                <div class="form-group">
                                    <label class="control-label col-md-2">空腹</label>            
                                    <div class="col-md-6">
                                        <input class="form-control input-inline" v-model="routineExamination.bloodGlucoseFasting">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">血清心肌坏死标志物</label>            
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="routineExamination.isSerumMyocardialNecrosisMarkers">否</radio></label>
                                    <label><radio value="1" v-model="routineExamination.isSerumMyocardialNecrosisMarkers">是</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-8" v-if="routineExamination.isSerumMyocardialNecrosisMarkers=='1'">
                                <div class="form-group">
                                    <label class="control-label col-md-2">CK</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.myocardialCK">
                                        <span class="help-inline"> U/L </span>
                                    </div>
                                    <label class="control-label col-md-2">CK-MB</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.myocardialCKMB">
                                        <span class="help-inline"> U/L </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">cTnI</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.myocardialCTnI">
                                        <span class="help-inline"> μg/L </span>
                                    </div>
                                    <label class="control-label col-md-2">Mb</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.myocardialMb">
                                        <span class="help-inline"> μg/L </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">炎症标志物</label>            
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="routineExamination.isInflammatoryMarkers">否</radio></label>
                                    <label><radio value="1" v-model="routineExamination.isInflammatoryMarkers">是</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-8" v-if="routineExamination.isInflammatoryMarkers=='1'">
                                <div class="form-group">
                                    <label class="control-label col-md-2">hs-CRP</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.inflammationHsCRP">
                                        <span class="help-inline"> mg/L </span>
                                    </div>
                                    <label class="control-label col-md-2">IL-6</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.inflammationIL6">
                                        <span class="help-inline"> pg/mL </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">IL-1β</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.inflammationIL1Beta">
                                        <span class="help-inline"> pg/mL </span>
                                    </div>
                                    <label class="control-label col-md-2">TNFα</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.inflammationTNFAlpha">
                                        <span class="help-inline"> μg/L </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">心衰</label>            
                            <div class="col-md-10">
                                <div class="form-group">
                                    <label class="control-label col-md-2">NT-proBNP</label>            
                                    <div class="col-md-6">
                                        <input class="form-control input-inline" v-model="routineExamination.heartFailureNTproBNP">
                                        <span class="help-inline"> ng/L </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">电解质</label>            
                            <div class="col-md-10">
                                <div class="form-group">
                                    <label class="control-label col-md-2">Na</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.electrolyteNa">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                    <label class="control-label col-md-2">K</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.electrolyteK">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">Ca</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.electrolyteCa">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                    <label class="control-label col-md-2">Cl</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.electrolyteCl">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">肝功能</label>            
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="routineExamination.isLiverFunction">否</radio></label>
                                    <label><radio value="1" v-model="routineExamination.isLiverFunction">是</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-8" v-if="routineExamination.isLiverFunction=='1'">
                                <div class="form-group">
                                    <label class="control-label col-md-2">总蛋白</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.totalProtein">
                                        <span class="help-inline"> g/L </span>
                                    </div>
                                    <label class="control-label col-md-2">白蛋白</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.albumin">
                                        <span class="help-inline"> g/L </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">总胆红素</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.totalBilirubin">
                                        <span class="help-inline"> μmol/L </span>
                                    </div>
                                    <label class="control-label col-md-2">直接胆红素</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.directBilirubin">
                                        <span class="help-inline"> μmol/L </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">间接胆红素</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.indirectBilirubin">
                                        <span class="help-inline"> μmol/L </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">ALT</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.ALT">
                                        <span class="help-inline"> U/L </span>
                                    </div>
                                    <label class="control-label col-md-2">AST</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.AST">
                                        <span class="help-inline"> U/L </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">肾功能</label>            
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="routineExamination.isRenalFunction">否</radio></label>
                                    <label><radio value="1" v-model="routineExamination.isRenalFunction">是</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-8" v-if="routineExamination.isRenalFunction=='1'">
                                <div class="form-group">
                                    <label class="control-label col-md-2">Cr</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.Cr">
                                        <span class="help-inline"> μmol/L </span>
                                    </div>
                                    <label class="control-label col-md-2">UA</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.UA">
                                        <span class="help-inline"> μmol/L </span>
                                    </div>
                                </div>    
                                <div class="form-group">
                                    <label class="control-label col-md-2">BUN</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.BUN">
                                        <span class="help-inline"> mmol/L </span>
                                    </div>
                                    <label class="control-label col-md-2">GFR</label>            
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="routineExamination.GFR">
                                        <span class="help-inline"> ml/min</span>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">肝肾疾病</label>            
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="routineExamination.isHepatorenalDisease">否</radio></label>
                                    <label><radio value="1" v-model="routineExamination.isHepatorenalDisease">是</radio></label>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 血生化部分结束 --> 
                <!-- 凝血功能部分开始 -->
                <div class="portlet box red">
                    <div class="portlet-title">
                        <div class="caption">凝血功能</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">                                                                        
                        <div class="form-group">
                            <label class="control-label col-md-2">APTT</label>            
                            <div class="col-md-4">
                                <input class="form-control input-inline" v-model="routineExamination.APTT">
                                <span class="help-inline"> s </span>
                            </div>
                            <label class="control-label col-md-2">PT</label>            
                            <div class="col-md-4">
                                <input class="form-control input-inline" v-model="routineExamination.PT">
                                <span class="help-inline"> s </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">TT</label>            
                            <div class="col-md-4">
                                <input class="form-control input-inline" v-model="routineExamination.TT">
                                <span class="help-inline"> s </span>
                            </div>
                            <label class="control-label col-md-2">FIB</label>            
                            <div class="col-md-4">
                                <input class="form-control input-inline" v-model="routineExamination.FIB">
                                <span class="help-inline"> g/L </span>
                            </div>
                        </div>  
                        <div class="form-group">
                            <label class="control-label col-md-2">D-二聚体</label>            
                            <div class="col-md-4">
                                <input class="form-control input-inline" v-model="routineExamination.dDimer">
                                <span class="help-inline"> mg/L </span>
                            </div>
                        </div>  
                        <div class="form-group">
                            <label class="control-label col-md-2">INR</label>            
                            <div class="col-md-4">
                                <input class="form-control input-inline" v-model="routineExamination.INR">
                                <select class="form-control input-inline" v-model="routineExamination.isINRStable">
                                    <option value="" disabled selected>选择类型</option>
                                    <option value="1">稳定</option>
                                    <option value="0">不稳定</option>
                                </select>
                            </div>
                        </div>                      
                    </div>
                </div>
                <!-- 凝血功能部分结束 -->               
                <!-- 血常规部分开始 -->
                <div class="portlet box yellow">
                    <div class="portlet-title">
                        <div class="caption">血常规</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body"> 
                        <div class="form-group">
                            <label class="control-label col-md-2">红细胞计数</label>            
                            <div class="col-md-4">
                                <input class="form-control input-inline" v-model="routineExamination.redBloodCellCount">
                                <span class="help-inline"> x10^12/L </span>
                            </div>
                            <label class="control-label col-md-2">红细胞比容</label>            
                            <div class="col-md-4">
                                <input class="form-control input-inline" v-model="routineExamination.redBloodCellSpecificVolume">
                                <span class="help-inline"> % </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2">HGB</label>            
                            <div class="col-md-4">
                                <input class="form-control input-inline" v-model="routineExamination.HGB">
                                <span class="help-inline"> g/L </span>
                            </div>                            
                        </div> 
                        <div class="form-group">
                            <label class="control-label bold col-md-2">白细胞计数</label>            
                            <div class="col-md-4">
                                <input class="form-control input-inline" v-model="routineExamination.leukocyteCount">
                                <span class="help-inline"> x10^9/L </span>
                            </div>      
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label col-md-4">中性粒细胞</label>            
                                    <div class="col-md-8">
                                        <input class="form-control input-inline" v-model="routineExamination.neutrophil">
                                        <span class="help-inline"> x10^9/L </span>
                                    </div>                            
                                </div> 
                                <div class="form-group">
                                    <label class="control-label col-md-4">嗜酸性粒细胞</label>            
                                    <div class="col-md-8">
                                        <input class="form-control input-inline" v-model="routineExamination.eosinophil">
                                        <span class="help-inline"> x10^9/L </span>
                                    </div>                            
                                </div> 
                                <div class="form-group">
                                    <label class="control-label col-md-4">嗜碱性粒细胞</label>            
                                    <div class="col-md-8">
                                        <input class="form-control input-inline" v-model="routineExamination.basophil">
                                        <span class="help-inline"> x10^9/L </span>
                                    </div>                            
                                </div> 
                                <div class="form-group">
                                    <label class="control-label col-md-4">淋巴细胞</label>            
                                    <div class="col-md-8">
                                        <input class="form-control input-inline" v-model="routineExamination.lymphocyte">
                                        <span class="help-inline"> x10^9/L </span>
                                    </div>                            
                                </div> 
                                <div class="form-group">
                                    <label class="control-label col-md-4">单核细胞</label>            
                                    <div class="col-md-8">
                                        <input class="form-control input-inline" v-model="routineExamination.monocyte">
                                        <span class="help-inline"> x10^9/L </span>
                                    </div>                            
                                </div> 
                            </div>                      
                        </div> 
                        <div class="form-group">
                            <label class="control-label bold col-md-2">血小板功能数量异常</label>            
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="routineExamination.isQualitativePlatelet">否</radio></label>
                                    <label><radio value="1" v-model="routineExamination.isQualitativePlatelet">是</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-8" v-if="routineExamination.isQualitativePlatelet=='1'">
                                <div class="form-group">
                                    <label class="control-label bold col-md-2">血小板计数</label>            
                                    <div class="col-md-10">
                                        <div class="form-group">
                                            <label class="control-label col-md-2">PLT</label>            
                                            <div class="col-md-10">
                                                <input class="form-control input-inline" v-model="routineExamination.PCPLT">
                                                <span class="help-inline"> x10^9/L </span>
                                            </div>                            
                                        </div> 
                                        <div class="form-group">
                                            <label class="control-label col-md-2">MPV</label>            
                                            <div class="col-md-10">
                                                <input class="form-control input-inline" v-model="routineExamination.PCMPV">
                                                <span class="help-inline"> fL </span>
                                            </div>                            
                                        </div> 
                                        <div class="form-group">
                                            <label class="control-label col-md-2">PDW</label>            
                                            <div class="col-md-10">
                                                <input class="form-control input-inline" v-model="routineExamination.PCPDW">
                                                <span class="help-inline"> % </span>
                                            </div>                            
                                        </div> 
                                    </div>                            
                                </div> 
                                <div class="form-group">
                                    <label class="control-label bold col-md-2">血小板聚集率</label>            
                                    <div class="col-md-10">                                        
                                        <div class="form-group">
                                            <label class="control-label col-md-2">ADP</label>            
                                            <div class="col-md-10">
                                                <input class="form-control input-inline" v-model="routineExamination.PARADP">
                                                <span class="help-inline"> % </span>
                                            </div>                            
                                        </div> 
                                        <div class="form-group">
                                            <label class="control-label col-md-2">肾上腺素</label>            
                                            <div class="col-md-10">
                                                <input class="form-control input-inline" v-model="routineExamination.PAREpinephrine">
                                                <span class="help-inline"> % </span>
                                            </div>                            
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-2">花生四烯酸</label>            
                                            <div class="col-md-10">
                                                <input class="form-control input-inline" v-model="routineExamination.PARArachidonicAcid">
                                                <span class="help-inline"> % </span>
                                            </div>                            
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-2">胶原</label>            
                                            <div class="col-md-10">
                                                <input class="form-control input-inline" v-model="routineExamination.PARCollagen">
                                                <span class="help-inline"> % </span>
                                            </div>                            
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-2">瑞斯托霉素</label>            
                                            <div class="col-md-10">
                                                <input class="form-control input-inline" v-model="routineExamination.PARRistocetin">
                                                <span class="help-inline"> % </span>
                                            </div>                            
                                        </div>
                                    </div>                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 血常规部分结束 -->        
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import {Checkbox, Radio} from 'vue-checkbox-radio';
export default {
    name: 'routine_examination',    
    props: {
        pagedata: {
            type: Object
        },
        routineExamination: {
            type: Object
        },
        activeTab: {
            type: Number
        }
    },
    data () {
        return {}
    },    
    computed: {
        notHDL: function () {
            if(this.routineExamination.TC!='' && this.routineExamination.HDL!=''){
                return parseFloat(this.routineExamination.TC-this.routineExamination.HDL).toFixed(2);
            }else {
                return '';
            }
        }
    },
    watch: {
        notHDL: function (val) {
            this.routineExamination.notHDL = val;
        }
    },
    components: {
        Checkbox, Radio
    }
}
</script>

<style lang="stylus" scoped>

</style>