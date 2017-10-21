<template>
    <div class="tab-pane active portlet">
        <div class="portlet-title">
            <div class="caption">
                <span class="caption-subject bold font-dark uppercase">现病史</span>
            </div>
        </div>
        <div class="porlet-body">
            <div class="form-group">
                <label class="control-label bold col-md-1">就诊原因</label>
                <div class="col-md-6">
                    <div><label v-for="disease in pagedata.historyOfPresentIllnessCareCauses" :key="disease.id"><checkbox v-model="historyOfPresentIllness.careCauses" :value="disease.id" name="care_causes">{{disease.text}}</checkbox></label></div>
                    <span class="help-block"> &nbsp;</span>
                </div>
                <div class="col-md-2" v-if="historyOfPresentIllness.careCauses.indexOf('6')>=0">
                    <input type="text" class="form-control" name="care_cause_others" v-model="historyOfPresentIllness.care_cause_others">
                    <span class="help-block"> 填写其他就诊原因 </span>
                </div>
            </div>
            <div class="row">
                <div  class="col-md-12">
                    <!-- 胸痛部分开始 -->
                    <div class="portlet box blue" v-if="historyOfPresentIllness.careCauses.indexOf('1')>=-1">
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
                                    <input type="text" name="xbs_frequentness" class="form-control input-inline" v-model="historyOfPresentIllness.chestPain.timesPerDay">
                                    <span class="help-inline"> 次/天 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" name="xbs_frequentness" class="form-control input-inline" v-model="historyOfPresentIllness.chestPain.timesPerWeek">
                                    <span class="help-inline"> 次/周 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-3 col-md-offset-1">
                                    <input type="text" name="xbs_frequentness" class="form-control input-inline" v-model="historyOfPresentIllness.chestPain.timesPerMonth">
                                    <span class="help-inline"> 次/月 </span>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" name="xbs_frequentness" class="form-control input-inline" v-model="historyOfPresentIllness.chestPain.timesPerYear">
                                    <span class="help-inline"> 次/年 </span>
                                    <span class="help-block">  </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">发病时间（多选）</label>
                                <div class="col-md-5">
                                    <div><label v-for="time in pagedata.onsetTimeOfIllness" :key="time.id"><checkbox v-model="historyOfPresentIllness.chestPain.onsetTime" :value="time.id" name="onset_time">{{time.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                    <!-- <multiselect :multiple="true" :close-on-select="false"  track-by="text" :custom-label="customLabel" v-model="historyOfPresentIllness.chestPain.onsetTime" :options="pagedata.onsetTimeOfIllness"></multiselect> -->
                                </div>
                                <div class="col-md-3" v-if="historyOfPresentIllness.chestPain.onsetTime.indexOf('5')>=0">
                                    <input type="text" class="form-control" name="onset_time_others" v-model="historyOfPresentIllness.chestPain.onsetTimeOthers">
                                    <span class="help-block"> 填写其他发病时间 </span>
                                </div>
                            </div>
                            <div class="form-group mt-repeater">
                                <label class="control-label bold col-md-1">部位</label>
                                <div class="col-md-4">
                                    <a href="javascript:;" data-repeater-create class="btn btn-info mt-repeater-add"><i class="fa fa-plus"></i> 添加部位</a>
                                    <span class="help-block">  </span>
                                </div>
                                <div class="col-md-11 col-md-offset-1">
                                    <div data-repeater-list="chest_pain" id="chest_pain_repeater" @change="setValue('chestPain', 'chest_pain', '#chest_pain_repeater')">
                                        <div data-repeater-item class="mt-repeater-item">
                                            <div class="mt-repeater-input">
                                                <label class="control-label">部位名</label>
                                                <select name="body_part_name" class="form-control" @change="showOthers($event, pagedata.diseaseBodyPartNames)">
                                                    <option value="" disabled selected>选择部位</option>
                                                    <option v-for="bodyPart in pagedata.diseaseBodyPartNames" :key="bodyPart.id" :value="bodyPart.id">{{bodyPart.text}}</option>
                                                </select>
                                            </div>
                                            <div class="mt-repeater-input hide">
                                                <label class="control-label">&nbsp;</label>
                                                <input type="text" name="body_part_name_others" class="form-control" placeholder="其他部位">
                                            </div>
                                            <div class="mt-repeater-input">
                                                <label class="control-label">性质</label>
                                                <select name="quality_of_pain" class="form-control" @change="showOthers($event, pagedata.diseaseQualityOfPain)">
                                                    <option value="" selected disabled>选择性质</option>
                                                    <option v-for="quality in pagedata.diseaseQualityOfPain" :key="quality.id" :value="quality.id">{{quality.text}}</option>
                                                </select>
                                            </div>
                                            <div class="mt-repeater-input hide">
                                                <label class="control-label">&nbsp;</label>
                                                <input type="text" name="quality_of_pain_others" class="form-control" placeholder="其他性质">
                                            </div>
                                            <div class="mt-repeater-input">
                                                <label class="control-label">持续时间</label>
                                                <select name="duration_of_pain" class="form-control" @change="showOthers($event, pagedata.diseaseDurationOfPain)">
                                                    <option value="" disabled selected>选择持续时间</option>
                                                    <option v-for="duration in pagedata.diseaseDurationOfPain" :key="duration.id" :value="duration.id">{{duration.text}}</option>
                                                </select>
                                            </div>
                                            <div class="mt-repeater-input hide">
                                                <label class="control-label">&nbsp;</label>
                                                <input type="text" name="duration_of_pain_others" class="form-control" placeholder="其他持续时间">
                                            </div>
                                            <div class="mt-repeater-input">
                                                <label class="control-label">程度</label>
                                                <select name="pain_degree" class="form-control">
                                                    <option value="" disabled selected>请选择程度</option>
                                                    <option v-for="degree in pagedata.diseasePainDegree" :key="degree.id" :value="degree.id">{{degree.text}}</option>
                                                </select>
                                            </div>
                                            <div class="mt-repeater-input">
                                                <a href="javascript:;" data-repeater-delete class="btn btn-danger mt-repeater-delete">
                                                    <i class="fa fa-close"></i> 删除</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">缓解因素</label>
                                <div class="col-md-3">
                                    <select name="relieving_factors" class="form-control" v-model="historyOfPresentIllness.chestPain.relievingFactors">
                                        <option value="" disabled selected>请选择缓解因素</option>
                                        <option v-for="factor in pagedata.relievingFactors" :key="factor.id" :value="factor.id">{{factor.text}}</option>
                                    </select>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-3" v-if="historyOfPresentIllness.chestPain.relievingFactors.indexOf('5')>=0">
                                    <input type="text" class="form-control" name="relieving_factors_others" v-model="historyOfPresentIllness.chestPain.relievingFactorsOthers">
                                    <span class="help-block"> 填写其他缓解因素 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">诱因（多选）</label>
                                <div class="col-md-6">
                                    <div><label v-for="factor in pagedata.precipitatingFactors" :key="factor.id"><checkbox v-model="historyOfPresentIllness.chestPain.precipitatingFactors" :value="factor.id">{{factor.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-4" v-if="historyOfPresentIllness.chestPain.precipitatingFactors.indexOf('11')>=0">
                                    <input type="text" class="form-control" name="precipitating_factors_others" v-model="historyOfPresentIllness.chestPain.precipitatingFactorsOthers">
                                    <span class="help-block"> 填写其他诱因 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">放射部位（多选）</label>
                                <div class="col-md-6">
                                    <div><label v-for="site in pagedata.radiationSites" :key="site.id"><checkbox v-model="historyOfPresentIllness.chestPain.radiationSites" :value="site.id">{{site.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-4" v-if="historyOfPresentIllness.chestPain.radiationSites.indexOf('7')>=0">
                                    <input type="text" class="form-control" name="radiation_sites_others" v-model="historyOfPresentIllness.chestPain.radiationSitesOthers">
                                    <span class="help-block"> 填写其他放射部位 </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label bold col-md-1">伴随症状（多选）</label>
                                <div class="col-md-6">
                                    <div><label v-for="phenomenon in pagedata.simultaneousPhenomena" :key="phenomenon.id"><checkbox v-model="historyOfPresentIllness.chestPain.simultaneousPhenomena" :value="phenomenon.id">{{phenomenon.text}}</checkbox></label></div>
                                    <span class="help-block"> &nbsp;</span>
                                </div>
                                <div class="col-md-4" v-if="historyOfPresentIllness.chestPain.simultaneousPhenomena.indexOf('21')>=0">
                                    <input type="text" class="form-control" name="simultaneous_phenomenon_others" v-model="historyOfPresentIllness.chestPain.simultaneousPhenomenaOthers">
                                    <span class="help-block"> 填写其他伴随症状 </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 胸痛部分结束 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Checkbox, Radio} from 'vue-checkbox-radio';
import vSelect from 'vue-select';
import Multiselect from 'vue-multiselect';
import 'jquery.repeater';

export default {
    name: 'history_of_present_illness',
    props: {
        pagedata: {
            type: Object
        }
    },
    data () {
        return {
            historyOfPresentIllness: {
                careCauses: [],
                careCauseOthers: "气促",
                chestPain: {
                    timesPerDay: "1",
                    timesPerWeek: "7",
                    timesPerMonth: "30",
                    timesPerYear: "365",
                    onsetTime: [],
                    onsetTimeOthers: "凌晨",
                    diseaseBodyParts: [{
                            bodyPartName: "1",
                            bodyPartNameOthers: "",
                            qualityOfPain: "1",
                            qualityOfPainOthers: "",
                            durationOfPain: "2",
                            durationOfPainOthers: "",
                            painDegree: "2"
                        },
                        {
                            bodyPartName: "10",
                            bodyPartNameOthers: "其他部位",
                            qualityOfPain: "13",
                            qualityOfPainOthers: "其他性质",
                            durationOfPain: "6",
                            durationOfPainOthers: "其他持续时间",
                            painDegree: "3"
                        }
                    ],
                    relievingFactors: "2",
                    relievingFactorsOthers: "",
                    precipitatingFactors: [],
                    precipitatingFactorsOthers: "其他诱因",
                    radiationSites: [],
                    radiationSitesOthers: "其他放射部位",
                    simultaneousPhenomena: [],
                    simultaneousPhenomenonOthers: "其他伴随症状"
                },
                chestDistress: {
                    timesPerDay: "1",
                    timesPerWeek: "7",
                    timesPerMonth: "30",
                    timesPerYear: "365",
                    onsetTime: "2,4,5",
                    onsetTimeOthers: "凌晨",
                    diseaseBodyParts: [{
                            bodyPartName: "1",
                            bodyPartNameOthers: "",
                            qualityOfPain: "1",
                            qualityOfPainOthers: "",
                            durationOfPain: "2",
                            durationOfPainOthers: "",
                            painDegree: "2"
                        },
                        {
                            bodyPartName: "10",
                            bodyPartNameOthers: "其他部位",
                            qualityOfPain: "13",
                            qualityOfPainOthers: "其他性质",
                            durationOfPain: "6",
                            durationOfPainOthers: "其他持续时间",
                            painDegree: "3"
                        }
                    ],
                    relievingFactors: "2",
                    relievingFactorsOthers: "",
                    precipitatingFactors: "2,4,11",
                    precipitatingFactorsOthers: "其他诱因",
                    radiationSites: "3,5,7",
                    radiationSitesOthers: "其他放射部位",
                    simultaneousPhenomena: "3,5,9,12,18,21",
                    simultaneousPhenomenonOthers: "其他伴随症状"
                },
                dyspnea: {
                    timesPerDay: "1",
                    timesPerWeek: "7",
                    timesPerMonth: "30",
                    timesPerYear: "365",
                    onsetTime: "2,4,5",
                    onsetTimeOthers: "凌晨"
                },
                palpitation: {
                    timesPerDay: "1",
                    timesPerWeek: "7",
                    timesPerMonth: "30",
                    timesPerYear: "365",
                    onsetTime: "2,4,5",
                    onsetTimeOthers: "凌晨"
                },
                abnormalEcg: {
                    timesPerDay: "1",
                    timesPerWeek: "7",
                    timesPerMonth: "30",
                    timesPerYear: "365",
                    onsetTime: "2,4,5",
                    onsetTimeOthers: "凌晨"
                }
            }
        }
    },
    methods: {
        setValue (attr, name, el) {
            this.historyOfPresentIllness[attr].diseaseBodyParts = $(el).repeaterVal()[name];
            console.log(this.historyOfPresentIllness[attr].diseaseBodyParts);
        },
        showOthers (e, array) {
            var el = e.target;
            if(array[el.value-1].text == '其他') {
                $(el).parent().next().removeClass('hide');
            }else {
                $(el).parent().next().addClass('hide');
            }
        },
        customLabel ({id, text, _id}) {
            return text;
        }
    },
    mounted() {
        $('.mt-repeater').repeater({
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                if(confirm('确认删除该栏？')) {
                    $(this).slideUp(deleteElement);
                }
            },
        });
    },
    components: {
        Checkbox, Radio, vSelect, Multiselect
    }
}
</script>

<style lang="stylus" scoped>
    
</style>