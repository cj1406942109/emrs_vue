<template>
  <div class="tab-pane portlet" :class="{active:activeTab==7}">
    <div class="portlet-title">
        <div class="caption">
            <span class="caption-subject bold font-dark uppercase">特殊检查</span>
        </div>
    </div>
    <div class="porlet-body">
        <div class="row">
            <div class="col-md-12">
                <!-- ECG部分开始 -->
                <div class="portlet box blue">
                    <div class="portlet-title">
                        <div class="caption">ECG</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-1">病理性Q波</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.ecg.pathologicalQWave.isPathologicalQWave">无</radio></label>
                                    <label><radio value="1" v-model="specialExamination.ecg.pathologicalQWave.isPathologicalQWave">有</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-11 col-md-offset-1" v-if="specialExamination.ecg.pathologicalQWave.isPathologicalQWave=='1'">
                                <div class="form-group">
                                    <label class="control-label col-md-2">导联（多选）</label>
                                    <div class="col-md-8">
                                        <div><label v-for="lead in pagedata.leadSystem" :key="lead.id"><checkbox v-model="specialExamination.ecg.pathologicalQWave.qWaveLeads" :value="lead.id">{{lead.text}}</checkbox></label></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">ST段改变</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.ecg.stSegmentChange.isStSegmentChange">无</radio></label>
                                    <label><radio value="1" v-model="specialExamination.ecg.stSegmentChange.isStSegmentChange">有</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-11 col-md-offset-1" v-if="specialExamination.ecg.stSegmentChange.isStSegmentChange=='1'">
                                <div class="form-group">
                                    <label class="control-label col-md-2">ST段压低</label>
                                    <div class="col-md-4">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.ecg.stSegmentChange.stSegmentDepression.isStSegmentDepression">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.ecg.stSegmentChange.stSegmentDepression.isStSegmentDepression">有</radio></label>
                                        </div> 
                                    </div>
                                    <div class="col-md-10 col-md-offset-2" v-if="specialExamination.ecg.stSegmentChange.stSegmentDepression.isStSegmentDepression=='1'">                                        
                                        <div class="form-group">
                                            <v-repeater :array="specialExamination.ecg.stSegmentChange.stSegmentDepression.changeDetail" :row="{lead: '',amplitude: ''}">
                                                <label class="control-label col-md-2" slot="header">导联</label>
                                                <template v-for="(item,index) in specialExamination.ecg.stSegmentChange.stSegmentDepression.changeDetail" :slot="index">
                                                    <div class="mt-repeater-input" :key="item.id">  
                                                        <label class="control-label">导联</label>
                                                        <select class="form-control" v-model="item.lead">
                                                            <option value="" disabled selected>选择</option>
                                                            <option v-for="lead in pagedata.leadSystem" :key="lead.id" :value="lead.id">{{lead.text}}</option>
                                                        </select>
                                                    </div>
                                                    <div class="mt-repeater-input" :key="item.id">
                                                        <label class="control-label">幅度（mV）</label>
                                                        <input class="form-control" v-model="item.amplitude">       
                                                    </div> 
                                                </template>
                                            </v-repeater>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">ST段抬高</label>
                                    <div class="col-md-4">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.ecg.stSegmentChange.stSegmentElevation.isStSegmentElevation">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.ecg.stSegmentChange.stSegmentElevation.isStSegmentElevation">有</radio></label>
                                        </div> 
                                    </div>
                                    <div class="col-md-10 col-md-offset-2" v-if="specialExamination.ecg.stSegmentChange.stSegmentElevation.isStSegmentElevation=='1'">
                                        <div class="form-group">
                                            <v-repeater :array="specialExamination.ecg.stSegmentChange.stSegmentElevation.changeDetail" :row="{lead: '',amplitude: ''}">
                                                <label class="control-label col-md-2" slot="header">导联</label>
                                                <template v-for="(item,index) in specialExamination.ecg.stSegmentChange.stSegmentElevation.changeDetail" :slot="index">
                                                    <div class="mt-repeater-input" :key="item.id">  
                                                        <label class="control-label">导联</label>
                                                        <select class="form-control" v-model="item.lead">
                                                            <option value="" disabled selected>选择</option>
                                                            <option v-for="lead in pagedata.leadSystem" :key="lead.id" :value="lead.id">{{lead.text}}</option>
                                                        </select>
                                                    </div>
                                                    <div class="mt-repeater-input" :key="item.id">
                                                        <label class="control-label">幅度（mV）</label>
                                                        <input class="form-control" v-model="item.amplitude">       
                                                    </div> 
                                                </template>
                                            </v-repeater>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">T波改变</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.ecg.tWaveChange.isTWaveChange">无</radio></label>
                                    <label><radio value="1" v-model="specialExamination.ecg.tWaveChange.isTWaveChange">有</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-11 col-md-offset-1" v-if="specialExamination.ecg.tWaveChange.isTWaveChange=='1'">
                                <div class="form-group">
                                    <v-repeater :array="specialExamination.ecg.tWaveChange.changeDetail" :row="{lead: '',amplitude: '',waveform:''}">
                                        <label class="control-label col-md-2" slot="header">导联</label>
                                        <template v-for="(item,index) in specialExamination.ecg.tWaveChange.changeDetail" :slot="index">
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">导联</label>
                                                <select class="form-control" v-model="item.lead">
                                                    <option value="" disabled selected>选择</option>
                                                    <option v-for="lead in pagedata.leadSystem" :key="lead.id" :value="lead.id">{{lead.text}}</option>
                                                </select>
                                            </div>
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">波形</label>
                                                <select class="form-control" v-model="item.waveform">
                                                    <option value="" disabled selected>选择</option>
                                                    <option v-for="waveform in pagedata.ecgWaveforms" :key="waveform.id" :value="waveform.id">{{waveform.text}}</option>
                                                </select>
                                            </div>
                                            <div class="mt-repeater-input" :key="item.id">
                                                <label class="control-label">幅度（mV）</label>
                                                <input class="form-control" v-model="item.amplitude">       
                                            </div> 
                                        </template>
                                    </v-repeater>
                                </div>                                
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">心律失常</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.ecg.arrhythmia.isArrhythmia">无</radio></label>
                                    <label><radio value="1" v-model="specialExamination.ecg.arrhythmia.isArrhythmia">有</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-11 col-md-offset-1" v-if="specialExamination.ecg.arrhythmia.isArrhythmia=='1'">
                                <div class="form-group">
                                    <div class="form-group">
                                        <label class="control-label col-md-2">类型（多选）</label>
                                        <div class="col-md-7">
                                            <div><label v-for="arrhythmiaType in pagedata.arrhythmiaTypes" :key="arrhythmiaType.id"><checkbox v-model="specialExamination.ecg.arrhythmia.arrhythmiaTypes" :value="arrhythmiaType.id">{{arrhythmiaType.text}}</checkbox></label></div>
                                        </div>
                                        <div class="col-md-2" v-if="specialExamination.ecg.arrhythmia.arrhythmiaTypes.indexOf('11')>='0'">
                                            <input class="form-control" v-model="specialExamination.ecg.arrhythmia.arrhythmiaTypeOthers">
                                            <span class="help-block"> 填写其他类型 </span>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">心电图结果</label>
                            <div class="col-md-4">
                                <div>
                                    <label><radio value="1" v-model="specialExamination.ecg.isResultNormal">正常</radio></label>
                                    <label><radio value="0" v-model="specialExamination.ecg.isResultNormal">异常</radio></label>
                                </div>
                            </div>                                                       
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">检查结论</label>
                            <div class="col-md-6">
                                <textarea class="form-control" rows="4" v-model="specialExamination.ecg.findings"></textarea>
                            </div>                                                       
                        </div>
                    </div>
                </div>
                <!-- ECG部分结束 -->
                <!-- 运动ECG部分开始 -->
                <div class="portlet box red">
                    <div class="portlet-title">
                        <div class="caption">运动ECG</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label col-md-1">运动</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.exerciseEcg.exerciseDuration"> 
                                <span class="help-inline">min后</span>
                            </div>        
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label class="control-label col-md-2">心绞痛</label>
                                    <div class="col-md-8">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.exerciseEcg.isExerciseAngina">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.exerciseEcg.isExerciseAngina">有</radio></label>
                                        </div>
                                    </div> 
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">血压最高值</label>
                                    <div class="col-md-8">
                                        <input placeholder="收缩压（高压）" class="form-control input-inline" v-model="specialExamination.exerciseEcg.maximumBP.SBP">
                                        <span class="help-inline"> / </span>
                                        <input placeholder="舒张压（低压）" class="form-control input-inline" v-model="specialExamination.exerciseEcg.maximumBP.DBP">
                                        <span class="help-inline"> mmHg </span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">血压最低值</label>
                                    <div class="col-md-8">
                                        <input placeholder="收缩压（高压）" class="form-control input-inline" v-model="specialExamination.exerciseEcg.minimumBP.SBP">
                                        <span class="help-inline"> / </span>
                                        <input placeholder="舒张压（低压）" class="form-control input-inline" v-model="specialExamination.exerciseEcg.minimumBP.DBP">
                                        <span class="help-inline"> mmHg </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">ST段改变</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.exerciseEcg.stSegmentChange.isStSegmentChange">无</radio></label>
                                    <label><radio value="1" v-model="specialExamination.exerciseEcg.stSegmentChange.isStSegmentChange">有</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-11 col-md-offset-1" v-if="specialExamination.exerciseEcg.stSegmentChange.isStSegmentChange=='1'">
                                <div class="form-group">
                                    <label class="control-label col-md-2">ST段压低</label>
                                    <div class="col-md-3">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression">有</radio></label>
                                        </div> 
                                    </div>
                                    <div v-if="specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression=='1'">
                                        <label class="control-label col-md-2">持续时间</label>
                                        <div class="col-md-3">
                                            <input class="form-control input-inline" v-model="specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.duration"> 
                                            <span class="help-inline">min</span>
                                        </div>
                                    </div>
                                    <div class="col-md-10 col-md-offset-2" v-if="specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression=='1'">       
                                        <div class="form-group">
                                            <v-repeater :array="specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.changeDetail" :row="{lead: '',amplitude: ''}">
                                                <label class="control-label col-md-2" slot="header">导联</label>
                                                <template v-for="(item,index) in specialExamination.exerciseEcg.stSegmentChange.stSegmentDepression.changeDetail" :slot="index">
                                                    <div class="mt-repeater-input" :key="item.id">  
                                                        <label class="control-label">导联</label>
                                                        <select class="form-control" v-model="item.lead">
                                                            <option value="" disabled selected>选择</option>
                                                            <option v-for="lead in pagedata.leadSystem" :key="lead.id" :value="lead.id">{{lead.text}}</option>
                                                        </select>
                                                    </div>
                                                    <div class="mt-repeater-input" :key="item.id">
                                                        <label class="control-label">幅度（mV）</label>
                                                        <input class="form-control" v-model="item.amplitude">       
                                                    </div> 
                                                </template>
                                            </v-repeater>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">ST段抬高</label>
                                    <div class="col-md-3">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation">有</radio></label>
                                        </div> 
                                    </div>
                                    <div v-if="specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation=='1'">
                                        <label class="control-label col-md-2">持续时间</label>
                                        <div class="col-md-3">
                                            <input class="form-control input-inline" v-model="specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.duration"> 
                                            <span class="help-inline">min</span>
                                        </div>
                                    </div>
                                    <div class="col-md-10 col-md-offset-2" v-if="specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation=='1'">                                        
                                        <div class="form-group">
                                            <v-repeater :array="specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.changeDetail" :row="{lead: '',amplitude: ''}">
                                                <label class="control-label col-md-2" slot="header">导联</label>
                                                <template v-for="(item,index) in specialExamination.exerciseEcg.stSegmentChange.stSegmentElevation.changeDetail" :slot="index">
                                                    <div class="mt-repeater-input" :key="item.id">  
                                                        <label class="control-label">导联</label>
                                                        <select class="form-control" v-model="item.lead">
                                                            <option value="" disabled selected>选择</option>
                                                            <option v-for="lead in pagedata.leadSystem" :key="lead.id" :value="lead.id">{{lead.text}}</option>
                                                        </select>
                                                    </div>
                                                    <div class="mt-repeater-input" :key="item.id">
                                                        <label class="control-label">幅度（mV）</label>
                                                        <input class="form-control" v-model="item.amplitude">       
                                                    </div> 
                                                </template>
                                            </v-repeater>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>     
                        <div class="form-group">
                            <label class="control-label bold col-md-1">T波改变</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.exerciseEcg.tWaveChange.isTWaveChange">无</radio></label>
                                    <label><radio value="1" v-model="specialExamination.exerciseEcg.tWaveChange.isTWaveChange">有</radio></label>
                                </div> 
                            </div>
                            <div v-if="specialExamination.exerciseEcg.tWaveChange.isTWaveChange=='1'">
                                <label class="control-label col-md-2">持续时间</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="specialExamination.exerciseEcg.tWaveChange.duration"> 
                                    <span class="help-inline">min</span>
                                </div>
                            </div>
                            <div class="col-md-11 col-md-offset-1" v-if="specialExamination.exerciseEcg.tWaveChange.isTWaveChange=='1'">
                                <div class="form-group">
                                    <v-repeater :array="specialExamination.exerciseEcg.tWaveChange.changeDetail" :row="{lead: '',amplitude: '',waveform:''}">
                                        <label class="control-label col-md-2" slot="header">导联</label>
                                        <template v-for="(item,index) in specialExamination.exerciseEcg.tWaveChange.changeDetail" :slot="index">
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">导联</label>
                                                <select class="form-control" v-model="item.lead">
                                                    <option value="" disabled selected>选择</option>
                                                    <option v-for="lead in pagedata.leadSystem" :key="lead.id" :value="lead.id">{{lead.text}}</option>
                                                </select>
                                            </div>
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">波形</label>
                                                <select class="form-control" v-model="item.waveform">
                                                    <option value="" disabled selected>选择</option>
                                                    <option v-for="waveform in pagedata.ecgWaveforms" :key="waveform.id" :value="waveform.id">{{waveform.text}}</option>
                                                </select>
                                            </div>
                                            <div class="mt-repeater-input" :key="item.id">
                                                <label class="control-label">幅度（mV）</label>
                                                <input class="form-control" v-model="item.amplitude">       
                                            </div> 
                                        </template>
                                    </v-repeater>
                                </div>                                
                            </div>                            
                        </div>         
                        <div class="form-group">
                            <label class="control-label bold col-md-1">运动ECG结果</label>
                            <div class="col-md-6">
                                <div>
                                    <label v-for="result in pagedata.ecgResults" :key="result.id"><radio :value="result.id" v-model="specialExamination.exerciseEcg.result">{{result.text}}</radio></label>
                                </div>
                            </div>                                                       
                        </div>         
                        <div class="form-group">
                            <label class="control-label bold col-md-1">检查结论</label>
                            <div class="col-md-6">
                                <textarea class="form-control" rows="4" v-model="specialExamination.exerciseEcg.findings"></textarea>
                            </div>                                                       
                        </div> 
                    </div>
                </div>
                <!-- 运动ECG部分结束 -->
                <!-- 长程ECG部分开始 -->
                <div class="portlet box yellow">
                    <div class="portlet-title">
                        <div class="caption">长程ECG</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"></a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label col-md-1">心博总数</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.holterEcg.totalHeartbeats"> 
                                <span class="help-inline">次/天</span>
                            </div> 
                            <label class="control-label col-md-1">平均心率</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.holterEcg.averageHeartRate"> 
                                <span class="help-inline">bpm</span>
                            </div>                           
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-1">最高心率</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.holterEcg.maximalHeartRate"> 
                                <span class="help-inline">bpm</span>
                            </div> 
                            <label class="control-label col-md-1">发生时间</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.holterEcg.maximalHeartRateOccurrenceTime"> 
                            </div>                           
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-1">最低心率</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.holterEcg.minimalHeartRate"> 
                                <span class="help-inline">bpm</span>
                            </div> 
                            <label class="control-label col-md-1">发生时间</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.holterEcg.minimalHeartRateOccurrenceTime"> 
                            </div>                           
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">心率失常</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.holterEcg.arrhythmia.isArrhythmia">无</radio></label>
                                    <label><radio value="1" v-model="specialExamination.holterEcg.arrhythmia.isArrhythmia">有</radio></label>
                                </div> 
                            </div>    
                            <div v-if="specialExamination.holterEcg.arrhythmia.isArrhythmia=='1'">
                                <label class="control-label col-md-1">频度</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="specialExamination.holterEcg.arrhythmia.frequentness">
                                    <span class="help-inline">次/天</span>
                                </div>
                                <label class="control-label col-md-2">异常心博总数</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="specialExamination.holterEcg.arrhythmia.totalAbnormalHeartbeats">
                                    <span class="help-inline">次/天</span>
                                </div>
                            </div>
                            <div class="col-md-11 col-md-offset-1" v-if="specialExamination.holterEcg.arrhythmia.isArrhythmia=='1'">
                                <div class="form-group">
                                    <v-repeater :array="specialExamination.holterEcg.arrhythmia.arrhythmiaTypes" :row="{arrhythmiaType: '',arrhythmiaTypeOthers: '',duration:''}">
                                        <label class="control-label col-md-2" slot="header">类型</label>
                                        <template v-for="(item,index) in specialExamination.holterEcg.arrhythmia.arrhythmiaTypes" :slot="index">
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">类型</label>
                                                <select class="form-control" v-model="item.arrhythmiaType">
                                                    <option value="" disabled selected>选择</option>
                                                    <option v-for="arrhythmiaType in pagedata.arrhythmiaTypes" :key="arrhythmiaType.id" :value="arrhythmiaType.id">{{arrhythmiaType.text}}</option>
                                                </select>
                                            </div>                                            
                                            <div class="mt-repeater-input" :key="item.id" v-if="item.arrhythmiaType=='11'">
                                                <label class="control-label">其他类型</label>
                                                <input class="form-control" v-model="item.arrhythmiaTypeOthers">       
                                            </div>
                                            <div class="mt-repeater-input" :key="item.id">
                                                <label class="control-label">持续时间（min）</label>
                                                <input class="form-control" v-model="item.duration">
                                            </div>
                                        </template>
                                    </v-repeater>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">病理性Q波</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.holterEcg.pathologicalQWave.isPathologicalQWave">无</radio></label>
                                    <label><radio value="1" v-model="specialExamination.holterEcg.pathologicalQWave.isPathologicalQWave">有</radio></label>
                                </div> 
                            </div>    
                            <div v-if="specialExamination.holterEcg.pathologicalQWave.isPathologicalQWave=='1'">
                                <label class="control-label col-md-1">频度</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="specialExamination.holterEcg.pathologicalQWave.frequentness">
                                    <span class="help-inline">次/天</span>
                                </div>
                            </div>
                            <div class="col-md-11 col-md-offset-1" v-if="specialExamination.holterEcg.pathologicalQWave.isPathologicalQWave=='1'">
                                <div class="form-group">
                                    <v-repeater :array="specialExamination.holterEcg.pathologicalQWave.qWaveLeadsDetail" :row="{time: '',qWaveLeads: []}">
                                        <label class="control-label col-md-2" slot="header">导联</label>
                                        <template v-for="(item,index) in specialExamination.holterEcg.pathologicalQWave.qWaveLeadsDetail" :slot="index">
                                            <div class="mt-repeater-input" :key="item.id">
                                                <label class="control-label">时间</label>
                                                <input class="form-control" v-model="item.time">
                                            </div> 
                                            <div class="mt-repeater-input" :key="item.id">
                                                <label class="control-label">导联（多选）</label>
                                                <div><label v-for="lead in pagedata.leadSystem" :key="lead.id"><checkbox v-model="item.qWaveLeads" :value="lead.id">{{lead.text}}</checkbox></label></div>
                                            </div>          
                                        </template>
                                    </v-repeater>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">ST段改变</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.holterEcg.stSegmentChange.isStSegmentChange">无</radio></label>
                                    <label><radio value="1" v-model="specialExamination.holterEcg.stSegmentChange.isStSegmentChange">有</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-11 col-md-offset-1" v-if="specialExamination.holterEcg.stSegmentChange.isStSegmentChange=='1'">
                                <div class="form-group">
                                    <label class="control-label col-md-1">ST段压低</label>
                                    <div class="col-md-3">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.holterEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.holterEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression">有</radio></label>
                                        </div> 
                                    </div>
                                    <div v-if="specialExamination.holterEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression=='1'">
                                        <label class="control-label col-md-2">频度</label>
                                        <div class="col-md-3">
                                            <input class="form-control input-inline" v-model="specialExamination.holterEcg.stSegmentChange.stSegmentDepression.frequentness"> 
                                            <span class="help-inline">次/天</span>
                                        </div>
                                    </div>
                                    <div class="col-md-11 col-md-offset-1" v-if="specialExamination.holterEcg.stSegmentChange.stSegmentDepression.isStSegmentDepression=='1'">
                                        <div class="form-group">
                                            <v-repeater :className="'col-md-11 col-md-offset-1'" :array="specialExamination.holterEcg.stSegmentChange.stSegmentDepression.changesDetail" :row="{duration: '',leads: []}">
                                                <label class="control-label col-md-1" slot="header"></label>
                                                <template v-for="(item,index) in specialExamination.holterEcg.stSegmentChange.stSegmentDepression.changesDetail" :slot="index">                                                    
                                                    <div class="mt-repeater-input" :key="item.id">
                                                        <label class="control-label">持续时间（min）</label>
                                                        <input class="form-control" v-model="item.duration">       
                                                    </div> 
                                                    <div class="mt-repeater-input" :key="item.id">
                                                        <label class="control-label">导联</label>
                                                        <v-repeater :className="'col-md-11 col-md-offset-1'" :array="item.leads" :row="{lead: '',amplitude: ''}">
                                                            <label class="control-label col-md-1" slot="header"></label>
                                                            <template v-for="(subitem,index) in item.leads" :slot="index">
                                                                <div class="mt-repeater-input" :key="subitem.id">  
                                                                    <label class="control-label">导联</label>
                                                                    <select class="form-control" v-model="subitem.lead">
                                                                        <option value="" disabled selected>选择</option>
                                                                        <option v-for="lead in pagedata.leadSystem" :key="lead.id" :value="lead.id">{{lead.text}}</option>
                                                                    </select>
                                                                </div>
                                                                <div class="mt-repeater-input" :key="subitem.id">
                                                                    <label class="control-label">幅度（mV）</label>
                                                                    <input class="form-control" v-model="subitem.amplitude">       
                                                                </div> 
                                                            </template>
                                                        </v-repeater>
                                                    </div>
                                                </template>
                                            </v-repeater>
                                        </div>                                        
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-1">ST段抬高</label>
                                    <div class="col-md-3">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.holterEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.holterEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation">有</radio></label>
                                        </div> 
                                    </div>
                                    <div v-if="specialExamination.holterEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation=='1'">
                                        <label class="control-label col-md-2">频度</label>
                                        <div class="col-md-3">
                                            <input class="form-control input-inline" v-model="specialExamination.holterEcg.stSegmentChange.stSegmentElevation.frequentness"> 
                                            <span class="help-inline">次/天</span>
                                        </div>
                                    </div>
                                    <div class="col-md-11 col-md-offset-1" v-if="specialExamination.holterEcg.stSegmentChange.stSegmentElevation.isStSegmentElevation=='1'">
                                        <div class="form-group">
                                            <v-repeater :className="'col-md-11 col-md-offset-1'" :array="specialExamination.holterEcg.stSegmentChange.stSegmentElevation.changesDetail" :row="{duration: '',leads: []}">
                                                <label class="control-label col-md-1" slot="header"></label>
                                                <template v-for="(item,index) in specialExamination.holterEcg.stSegmentChange.stSegmentElevation.changesDetail" :slot="index">                                                    
                                                    <div class="mt-repeater-input" :key="item.id">
                                                        <label class="control-label">持续时间（min）</label>
                                                        <input class="form-control" v-model="item.duration">       
                                                    </div> 
                                                    <div class="mt-repeater-input" :key="item.id">
                                                        <label class="control-label">导联</label>
                                                        <v-repeater :className="'col-md-11 col-md-offset-1'" :array="item.leads" :row="{lead: '',amplitude: ''}">
                                                            <label class="control-label col-md-1" slot="header"></label>
                                                            <template v-for="(subitem,index) in item.leads" :slot="index">
                                                                <div class="mt-repeater-input" :key="subitem.id">  
                                                                    <label class="control-label">导联</label>
                                                                    <select class="form-control" v-model="subitem.lead">
                                                                        <option value="" disabled selected>选择</option>
                                                                        <option v-for="lead in pagedata.leadSystem" :key="lead.id" :value="lead.id">{{lead.text}}</option>
                                                                    </select>
                                                                </div>
                                                                <div class="mt-repeater-input" :key="subitem.id">
                                                                    <label class="control-label">幅度（mV）</label>
                                                                    <input class="form-control" v-model="subitem.amplitude">       
                                                                </div> 
                                                            </template>
                                                        </v-repeater>
                                                    </div>
                                                </template>
                                            </v-repeater>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">T波改变</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.holterEcg.tWaveChange.isTWaveChange">无</radio></label>
                                    <label><radio value="1" v-model="specialExamination.holterEcg.tWaveChange.isTWaveChange">有</radio></label>
                                </div> 
                            </div>
                            <div v-if="specialExamination.holterEcg.tWaveChange.isTWaveChange=='1'">
                                <label class="control-label col-md-2">频度</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="specialExamination.exerciseEcg.tWaveChange.frequentness"> 
                                    <span class="help-inline">次/天</span>
                                </div>
                            </div>
                            <div class="col-md-11 col-md-offset-1" v-if="specialExamination.holterEcg.tWaveChange.isTWaveChange=='1'">
                                <div class="form-group">
                                    <v-repeater :className="'col-md-11 col-md-offset-1'" :array="specialExamination.holterEcg.tWaveChange.changesDetail" :row="{duration: '',leads: []}">
                                        <label class="control-label col-md-1" slot="header"></label>
                                        <template v-for="(item,index) in specialExamination.holterEcg.tWaveChange.changesDetail" :slot="index">                                                    
                                            <div class="mt-repeater-input" :key="item.id">
                                                <label class="control-label">持续时间（min）</label>
                                                <input class="form-control" v-model="item.duration">       
                                            </div> 
                                            <div class="mt-repeater-input" :key="item.id">
                                                <label class="control-label">导联</label>
                                                <v-repeater :className="'col-md-11 col-md-offset-1'" :array="item.leads" :row="{lead: '',amplitude: '',waveform:''}">
                                                    <label class="control-label col-md-1" slot="header"></label>
                                                    <template v-for="(subitem,index) in item.leads" :slot="index">
                                                        <div class="mt-repeater-input" :key="subitem.id">  
                                                            <label class="control-label">导联</label>
                                                            <select class="form-control" v-model="subitem.lead">
                                                                <option value="" disabled selected>选择</option>
                                                                <option v-for="lead in pagedata.leadSystem" :key="lead.id" :value="lead.id">{{lead.text}}</option>
                                                            </select>
                                                        </div>
                                                        <div class="mt-repeater-input" :key="subitem.id">  
                                                            <label class="control-label">波形</label>
                                                            <select class="form-control" v-model="subitem.waveform">
                                                                <option value="" disabled selected>选择</option>
                                                                <option v-for="waveform in pagedata.ecgWaveforms" :key="waveform.id" :value="waveform.id">{{waveform.text}}</option>
                                                            </select>
                                                        </div>
                                                        <div class="mt-repeater-input" :key="subitem.id">
                                                            <label class="control-label">幅度（mV）</label>
                                                            <input class="form-control" v-model="subitem.amplitude">       
                                                        </div> 
                                                    </template>
                                                </v-repeater>
                                            </div>
                                        </template>
                                    </v-repeater>
                                </div>                                        
                            </div>                                                    
                        </div> 
                        <div class="form-group">
                            <label class="control-label bold col-md-1">检查结论</label>
                            <div class="col-md-6">
                                <textarea class="form-control" rows="4" v-model="specialExamination.holterEcg.findings"></textarea>
                            </div>                                                       
                        </div> 
                    </div>
                </div>
                <!-- 长程ECG部分结束 -->
                <!-- 心脏彩超部分开始 -->
                <div class="portlet box green-dark">
                    <div class="portlet-title">
                        <div class="caption">心脏彩超</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"></a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label col-md-1">LVD</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.ucg.LVD"> 
                                <span class="help-inline">mm</span>
                            </div> 
                            <label class="control-label col-md-1">EDV</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.ucg.EDV"> 
                                <span class="help-inline">ml</span>
                            </div>                           
                            <label class="control-label col-md-1">LVS</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.ucg.LVS"> 
                                <span class="help-inline">mm</span>
                            </div>                           
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-1">ESV</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.ucg.ESV"> 
                                <span class="help-inline">ml</span>
                            </div> 
                            <label class="control-label col-md-1">LAD</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.ucg.LAD"> 
                                <span class="help-inline">mm</span>
                            </div>                           
                            <label class="control-label col-md-1">LVPW</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.ucg.LVPW"> 
                                <span class="help-inline">mm</span>
                            </div>                           
                        </div>
                        <div class="form-group">                            
                            <label class="control-label col-md-1">IVST</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.ucg.IVST"> 
                                <span class="help-inline">mm</span>
                            </div>                           
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">LVEF < 40%</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.ucg.isLVEFLtFortyPercent">否</radio></label>
                                    <label><radio value="1" v-model="specialExamination.ucg.isLVEFLtFortyPercent">是</radio></label>
                                </div> 
                            </div> 
                            <div v-if="specialExamination.ucg.isLVEFLtFortyPercent=='1'">
                                <label class="control-label col-md-1">E/A</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="specialExamination.ucg.ratioEToA"> 
                                    <span class="help-inline">%</span>
                                </div>
                                <label class="control-label col-md-1">EF</label>
                                <div class="col-md-3">
                                    <input class="form-control input-inline" v-model="specialExamination.ucg.EF"> 
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">局部运动异常</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.ucg.isLocalMotionAbnormality">否</radio></label>
                                    <label><radio value="1" v-model="specialExamination.ucg.isLocalMotionAbnormality">是</radio></label>
                                </div> 
                            </div> 
                            <div v-if="specialExamination.ucg.isLocalMotionAbnormality=='1'">
                                <label class="control-label col-md-1">部位（多选）</label>
                                <div class="col-md-6">
                                    <div><label v-for="ucgPart in pagedata.ucgParts" :key="ucgPart.id"><checkbox v-model="specialExamination.ucg.localMotionAbnormalityParts" :value="ucgPart.id">{{ucgPart.text}}</checkbox></label></div>
                                </div>                               
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">室壁瘤</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.ucg.isVntricularAneurysm">否</radio></label>
                                    <label><radio value="1" v-model="specialExamination.ucg.isVntricularAneurysm">是</radio></label>
                                </div> 
                            </div> 
                            <div v-if="specialExamination.ucg.isVntricularAneurysm=='1'">
                                <label class="control-label col-md-1">部位（多选）</label>
                                <div class="col-md-6">
                                    <div><label v-for="ucgPart in pagedata.ucgParts" :key="ucgPart.id"><checkbox v-model="specialExamination.ucg.vntricularAneurysmParts" :value="ucgPart.id">{{ucgPart.text}}</checkbox></label></div>
                                </div>                               
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">左室附壁血栓</label>
                            <div class="col-md-3">
                                <div>
                                    <label><radio value="0" v-model="specialExamination.ucg.isLeftVentricularThrombosis">否</radio></label>
                                    <label><radio value="1" v-model="specialExamination.ucg.isLeftVentricularThrombosis">是</radio></label>
                                </div> 
                            </div> 
                            <div v-if="specialExamination.ucg.isLeftVentricularThrombosis=='1'">
                                <label class="control-label col-md-1">部位（多选）</label>
                                <div class="col-md-6">
                                    <div><label v-for="ucgPart in pagedata.ucgParts" :key="ucgPart.id"><checkbox v-model="specialExamination.ucg.leftVentricularThrombosisParts" :value="ucgPart.id">{{ucgPart.text}}</checkbox></label></div>
                                </div>                               
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-1">检查结论</label>
                            <div class="col-md-6">
                                <textarea class="form-control" rows="4" v-model="specialExamination.ucg.findings"></textarea>
                            </div>                                                       
                        </div> 
                    </div>
                </div>
                <!-- 心脏彩超部分结束 -->
                <!-- 冠脉介入部分开始 -->
                <div class="portlet box purple">
                    <div class="portlet-title">
                        <div class="caption">冠脉介入</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"></a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label col-md-1">编号</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.pci.num"> 
                            </div> 
                            <label class="control-label col-md-1">日期</label>
                            <div class="col-md-3">
                                <input class="form-control input-inline" v-model="specialExamination.pci.date"> 
                            </div>                                                                                 
                        </div>  
                        <div class="form-group">
                            <label class="control-label col-md-1">类型</label>
                            <div class="col-md-2">
                                <select class="form-control" v-model="specialExamination.pci.pciType">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="pciType in pagedata.pciTypes" :key="pciType.id" :value="pciType.id">{{pciType.text}}</option>
                                </select>
                            </div>
                            <div v-if="specialExamination.pci.pciType=='3'||specialExamination.pci.pciType=='4'">
                                <label class="control-label col-md-2">PCI距溶栓</label>
                                <div class="col-md-4">
                                    <input class="form-control input-inline" v-model="specialExamination.pci.thrombolysisInterval">
                                    <span class="help-inline">小时（h）</span>
                                </div>
                            </div>                                                                                                        
                        </div> 
                        <div class="form-group">
                            <div class="col-md-11 col-md-offset-1">
                                <label class="control-label bold">发病后</label>
                                <input class="form-control input-inline" v-model="specialExamination.pci.onsetIntervalDay"> 
                                <label class="control-label bold">天</label>
                                <input class="form-control input-inline" v-model="specialExamination.pci.onsetIntervalHour"> 
                                <label class="control-label bold">小时进行PCI，院前</label>
                                <input class="form-control input-inline" v-model="specialExamination.pci.stayTimePrehospital">
                                <label class="control-label bold">分钟，急/门诊</label>
                                <input class="form-control input-inline" v-model="specialExamination.pci.stayTimeEmergencyCall"> 
                                <label class="control-label bold">分钟，CCU</label>
                                <input class="form-control input-inline" v-model="specialExamination.pci.stayTimeCCU"> 
                                <label class="control-label bold">分钟，导管室</label>
                                <input class="form-control input-inline" v-model="specialExamination.pci.stayTimeConduitRoom"> 
                                <label class="control-label bold">分钟。</label>
                            </div>
                        </div>       
                        <div class="form-group">
                            <label class="control-label bold col-md-2">造影剂（多选）</label>
                            <div class="col-md-6">
                                <div><label v-for="contrastMedium in pagedata.contrastMedia" :key="contrastMedium.id"><checkbox v-model="specialExamination.pci.contrastMedia" :value="contrastMedium.id">{{contrastMedium.text}}</checkbox></label></div>
                                <span class="help-block">&nbsp;</span>
                            </div>
                            <div class="col-md-4" v-if="specialExamination.pci.contrastMedia.indexOf('5')>=0">
                                <input class="form-control input-inline" v-model="specialExamination.pci.contrastMediaOthers"> 
                                <span class="help-block">填写其他造影剂</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">造影结果</label>
                            <div class="col-md-10">
                                <div class="form-group">
                                    <label class="control-label col-md-2">冠脉分布</label>
                                    <div class="col-md-6">
                                        <div>
                                            <label v-for="distributionType in pagedata.coronaryDistributionTypes" :key="distributionType.id"><radio :value="distributionType.id" v-model="specialExamination.pci.coronaryDistributionType">{{distributionType.text}}</radio></label>
                                        </div> 
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">冠脉畸形</label>
                                    <div class="col-md-6">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.pci.isCoronaryMalformations">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.pci.isCoronaryMalformations">有</radio></label>
                                        </div> 
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">3级病变</label>
                                    <div class="col-md-6">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.pci.isGrade3Lesions">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.pci.isGrade3Lesions">有</radio></label>
                                        </div> 
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">血流TIMI0-2级</label>
                                    <div class="col-md-6">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.pci.isBloodFlowTIMIGrade0to2">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.pci.isBloodFlowTIMIGrade0to2">有</radio></label>
                                        </div> 
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">CTO</label>
                                    <div class="col-md-6">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.pci.isCTO">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.pci.isCTO">有</radio></label>
                                        </div> 
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">侧枝循环</label>
                                    <div class="col-md-6">
                                        <div>
                                            <label><radio value="0" v-model="specialExamination.pci.isCollateralCirculation">无</radio></label>
                                            <label><radio value="1" v-model="specialExamination.pci.isCollateralCirculation">有</radio></label>
                                        </div> 
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">介入路径（多选）</label>
                            <div class="col-md-6">
                                <div><label v-for="pciPath in pagedata.pciPaths" :key="pciPath.id"><checkbox v-model="specialExamination.pci.pciPaths" :value="pciPath.id">{{pciPath.text}}</checkbox></label></div>
                                <span class="help-block">&nbsp;</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">植入支架部位</label>
                            <div class="col-md-10">
                                <div class="form-group">
                                    <label class="control-label col-md-2">LAD</label>
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="specialExamination.pci.implantedBracketCountLAD"> 
                                        <span class="help-inline">个</span>
                                    </div>
                                    <label class="control-label col-md-2">LCX</label>
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="specialExamination.pci.implantedBracketCountLCX"> 
                                        <span class="help-inline">个</span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-2">RCA</label>
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="specialExamination.pci.implantedBracketCountRCA"> 
                                        <span class="help-inline">个</span>
                                    </div>
                                    <label class="control-label col-md-2">LM</label>
                                    <div class="col-md-4">
                                        <input class="form-control input-inline" v-model="specialExamination.pci.implantedBracketCountLM"> 
                                        <span class="help-inline">个</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">病变节段</label>
                            <div class="col-md-10">
                                <img src="./pci-img.jpg" style="border:1px dashed #333;border-radius:5px">
                                <span class="help-block">节段位置信息图</span>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <v-repeater :array="specialExamination.pci.segmentalLesions" :row="segmentalLesion">
                                        <label class="control-label col-md-2" slot="header"></label>
                                        <template v-for="(item,index) in specialExamination.pci.segmentalLesions" :slot="index">
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">病变节段</label>
                                                <select class="form-control" v-model="item.num">
                                                    <option value="" disabled selected>选择</option>
                                                    <option v-for="n in 23" :key="n.id" :value="n">{{n}}</option>
                                                </select>
                                            </div>   
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">狭窄（%）</label>
                                                <input class="form-control" v-model="item.stenosis">
                                            </div> 
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">长（mm）</label>
                                                <input class="form-control" v-model="item.length">
                                            </div>  
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">形态</label>
                                                <select class="form-control" v-model="item.shape">
                                                    <option value="" disabled selected>选择</option>
                                                    <option v-for="shape in pagedata.segmentalLesionsShapes" :key="shape.id" :value="shape.id">{{shape.text}}</option>
                                                </select>
                                            </div> 
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">钙化</label>
                                                <select class="form-control" v-model="item.isCalcification">
                                                    <option value="" disabled selected>选择</option>
                                                    <option value="1">有</option>
                                                    <option value="0">无</option>
                                                </select>
                                            </div> 
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">开口病变</label>
                                                <select class="form-control" v-model="item.isOstialLesion">
                                                    <option value="" disabled selected>选择</option>
                                                    <option value="1">是</option>
                                                    <option value="0">否</option>
                                                </select>
                                            </div>
                                            <div class="mt-repeater-input" :key="item.id"></div>
                                            <br :key="item.id">
                                            <div class="mt-repeater-input" :key="item.id" style="padding-left:0">  
                                                <label class="control-label">血栓</label>
                                                <select class="form-control" v-model="item.isThrombus">
                                                    <option value="" disabled selected>选择</option>
                                                    <option value="1">有</option>
                                                    <option value="0">无</option>
                                                </select>
                                            </div>  
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">TIMI</label>
                                                <select class="form-control" v-model="item.TIMIGrade">
                                                    <option value="" disabled selected>选择</option>
                                                    <option value="0">0</option>
                                                    <option value="I">I</option>
                                                    <option value="II">II</option>
                                                    <option value="III">III</option>
                                                </select>
                                            </div>                    
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">病变类型</label>
                                                <select class="form-control" v-model="item.kindsOfLesions">
                                                    <option value="" disabled selected>选择</option>
                                                    <option value="A">A型</option>
                                                    <option value="B">B型</option>
                                                    <option value="C">C型</option>
                                                </select>
                                            </div> 
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">PCI导丝</label>
                                                <input class="form-control" v-model="item.pciGuidewire">
                                            </div> 
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">球囊</label>
                                                <input class="form-control" v-model="item.balloon">
                                            </div> 
                                            <div class="mt-repeater-input" :key="item.id">  
                                                <label class="control-label">支架</label>
                                                <input class="form-control" v-model="item.stent">
                                            </div> 
                                        </template>
                                    </v-repeater>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 冠脉介入部分结束 -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {Checkbox, Radio} from 'vue-checkbox-radio';
import vRepeater from '@/components/v_repeater/v_repeater';
export default {
    name: 'special_examination',
    props: {
        pagedata: {
            type: Object
        },
        specialExamination: {
            type: Object
        },
        activeTab: {
            type: Number
        }
    },
    data () {
        return {
            segmentalLesion: {
                num: "",
                stenosis: "",
                length: "",
                shape: "",
                isCalcification: "",
                isOstialLesion: "",
                isThrombus: "",
                TIMIGrade: "",
                kindsOfLesions: "",
                pciGuidewire: "",
                balloon: "",
                stent: ""
            }
        }
    },
    methods: {
        
    },
    components: {
        Checkbox, Radio, vRepeater
    }
}
</script>

<style lang="stylus" scoped>

</style>