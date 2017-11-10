<template>
  <div class="tab-pane portlet" :class="{active:activeTab==5}">
    <div class="portlet-title">
        <div class="caption">
            <span class="caption-subject bold font-dark uppercase">体格检查</span>
        </div>
    </div>
    <div class="porlet-body">
        <div class="form-group">
            <label class="control-label bold col-md-1">体温</label>            
            <div class="col-md-4">
                <input class="form-control input-inline" v-model="physicalExamination.bodyTemperature">
                <span class="help-inline"> ℃ </span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-1">呼吸</label>            
            <div class="col-md-11">
                <div class="form-group">
                    <label class="control-label col-md-2">频率</label>            
                    <div class="col-md-4">
                        <input class="form-control input-inline" v-model="physicalExamination.respiratoryRate">
                        <span class="help-inline"> 次/分 </span>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-2">呼吸音</label>            
                    <div class="col-md-3">
                        <div>
                            <label><radio value="1" v-model="physicalExamination.isBreathSoundsNormal">正常</radio></label>
                            <label><radio value="0" v-model="physicalExamination.isBreathSoundsNormal">异常</radio></label>
                        </div> 
                    </div>
                    <div v-if="physicalExamination.isBreathSoundsNormal=='0'">
                        <label class="control-label col-md-1">类型</label>
                        <div class="col-md-2">
                            <select class="form-control" v-model="physicalExamination.breathSoundsType">
                                <option value="" disabled selected>选择类型</option>
                                <option v-for="breathSoundsType in staticIndex.breathSoundsTypes" :key="breathSoundsType.id" :value="breathSoundsType.id">{{breathSoundsType.text}}</option>
                            </select>
                        </div>
                        <label class="control-label col-md-1">部位</label>
                        <div class="col-md-2">
                            <select class="form-control" v-model="physicalExamination.breathSoundsPart">
                                <option value="" disabled selected>选择部位</option>
                                <option v-for="breathSoundsPart in staticIndex.breathSoundsParts" :key="breathSoundsPart.id" :value="breathSoundsPart.id">{{breathSoundsPart.text}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-2">肺部湿啰音</label>            
                    <div class="col-md-3">
                        <div>
                            <label><radio value="0" v-model="physicalExamination.isLungWetRales">无</radio></label>
                            <label><radio value="1" v-model="physicalExamination.isLungWetRales">有</radio></label>
                        </div> 
                    </div>
                    <div v-if="physicalExamination.isLungWetRales=='1'">
                        <label class="control-label col-md-1">范围</label>
                        <div class="col-md-2">
                            <select class="form-control" v-model="physicalExamination.lungWetRalesRange">
                                <option value="" disabled selected>选择范围</option>
                                <option v-for="lungWetRalesRange in staticIndex.lungWetRalesRanges" :key="lungWetRalesRange.id" :value="lungWetRalesRange.id">{{lungWetRalesRange.text}}</option>
                            </select>
                        </div>
                        <label class="control-label col-md-1">部位</label>
                        <div class="col-md-2">
                            <select class="form-control" v-model="physicalExamination.lungWetRalesPart">
                                <option value="" disabled selected>选择部位</option>
                                <option v-for="breathSoundsPart in staticIndex.breathSoundsParts" :key="breathSoundsPart.id" :value="breathSoundsPart.id">{{breathSoundsPart.text}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-1">心率</label>            
            <div class="col-md-4">
                <input class="form-control input-inline" v-model="physicalExamination.heartRate">
                <span class="help-inline"> bpm </span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-1">心律</label>            
            <div class="col-md-2">
                <select class="form-control" v-model="physicalExamination.cardiacRhythm">
                    <option value="" disabled selected>选择部位</option>
                    <option v-for="cardiacRhythm in staticIndex.cardiacRhythms" :key="cardiacRhythm.id" :value="cardiacRhythm.id">{{cardiacRhythm.text}}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-1">心音</label>            
            <div class="col-md-11">                
                <div class="form-group">                    
                    <label class="control-label col-md-2">S1</label>
                    <div class="col-md-2">
                        <select class="form-control" v-model="physicalExamination.heartSoundS1Result">
                            <option value="" disabled selected>选择</option>
                            <option v-for="heartSoundS1Result in staticIndex.heartSoundS1Results" :key="heartSoundS1Result.id" :value="heartSoundS1Result.id">{{heartSoundS1Result.text}}</option>
                        </select>
                    </div>
                </div>                
                <div class="form-group">
                    <label class="control-label col-md-2">S3/S4奔马律</label>
                    <div class="col-md-2">
                        <div>
                            <label><radio value="0" v-model="physicalExamination.isS3S4GallopRhythm">无</radio></label>
                            <label><radio value="1" v-model="physicalExamination.isS3S4GallopRhythm">有</radio></label>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-1">脉搏</label>            
            <div class="col-md-4">
                <input class="form-control input-inline" v-model="physicalExamination.pulse">
                <span class="help-inline"> 次/分 </span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-1">血压</label>            
            <div class="col-md-6">
                <input placeholder="收缩压（高压）" class="form-control input-inline" v-model="physicalExamination.BP.SBP">
                <span class="help-inline"> / </span>
                <input placeholder="舒张压（低压）" class="form-control input-inline" v-model="physicalExamination.BP.DBP">
                <span class="help-inline"> mmHg </span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-1">耳垂有纵向裂纹</label>            
            <div class="col-md-2">
                <div>
                    <label><radio value="0" v-model="physicalExamination.isEarLobeLongitudinalCrack">否</radio></label>
                    <label><radio value="1" v-model="physicalExamination.isEarLobeLongitudinalCrack">是</radio></label>
                </div>
            </div>
            <div v-if="physicalExamination.isEarLobeLongitudinalCrack=='1'">
                <label class="control-label col-md-2">部位（多选）</label>
                <div class="col-md-6">
                    <div><label v-for="part in staticIndex.earLobeLongitudinalCrackParts" :key="part.id"><checkbox v-model="physicalExamination.earLobeLongitudinalCrackParts" :value="part.id">{{part.text}}</checkbox></label></div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-1">皮肤有黄色素瘤</label>            
            <div class="col-md-2">
                <div>
                    <label><radio value="0" v-model="physicalExamination.isSkinYellowPigmentTumor">否</radio></label>
                    <label><radio value="1" v-model="physicalExamination.isSkinYellowPigmentTumor">是</radio></label>
                </div>
            </div>
            <div v-if="physicalExamination.isSkinYellowPigmentTumor=='1'">
                <label class="control-label col-md-2">部位（多选）</label>
                <div class="col-md-7">
                    <div><label v-for="part in staticIndex.skinYellowPigmentTumorParts" :key="part.id"><checkbox v-model="physicalExamination.skinYellowPigmentTumorParts" :value="part.id">{{part.text}}</checkbox></label></div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label bold col-md-1">头顶脱发</label>            
            <div class="col-md-2">
                <div>
                    <label><radio value="0" v-model="physicalExamination.isAlopecia">否</radio></label>
                    <label><radio value="1" v-model="physicalExamination.isAlopecia">是</radio></label>
                </div>
            </div>
            <div v-if="physicalExamination.isAlopecia=='1'">
                <label class="control-label col-md-2">部位（多选）</label>
                <div class="col-md-6">
                    <div><label v-for="part in staticIndex.alopeciaParts" :key="part.id"><checkbox v-model="physicalExamination.alopeciaParts" :value="part.id">{{part.text}}</checkbox></label></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {Checkbox, Radio} from 'vue-checkbox-radio';
export default {
    name: 'physical_examination',
    props: {
        physicalExamination: {
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
        staticIndex: function() {
            return this.$store.state.staticIndex;
        }
    },  
    components: {
        Checkbox, Radio
    }
}
</script>

<style lang="stylus" scoped>

</style>