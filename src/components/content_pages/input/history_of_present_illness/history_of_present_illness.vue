<template>
    <div class="tab-pane active portlet">
        <div class="portlet-title">
            <div class="caption col-md-offset-1">
                <span class="caption-subject bold font-dark uppercase">现病史</span>
            </div>
        </div>
        <div class="porlet-body">
            <div class="form-group">
                <label class="control-label bold col-md-2">就诊原因</label>
                <div class="col-md-6">
                    <div>
                        <label><checkbox value="1" name="care_cause">胸痛</checkbox></label>
                        <label><checkbox value="2" name="care_cause">胸闷</checkbox></label>
                        <label><checkbox value="3" name="care_cause">呼吸困难</checkbox></label>
                        <label><checkbox value="4" name="care_cause">心悸</checkbox></label>
                        <label><checkbox value="5" name="care_cause">心电图异常</checkbox></label>
                        <label><checkbox value="6" name="care_cause">其他</checkbox></label>
                    </div>
                </div>
                <div class="col-md-2">
                    <input type="text" class="form-control" name="care_cause_others">
                    <span class="help-block"> 填写其他就诊原因 </span>
                </div>
            </div>                                                                                 
        </div>
    </div>
</template>

<script>
import {Checkbox, Radio} from 'vue-checkbox-radio';
export default {
    name: 'history_of_present_illness',
    data () {
        return {
            
        }
    },
    components: {
        Checkbox, Radio
    }
}
</script>

<style lang="stylus" scoped>

</style>