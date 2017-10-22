<template>
  <div class="tab-pane active portlet">
    <div class="portlet-title">
        <div class="caption">
            <span class="caption-subject bold font-dark uppercase">危险因素</span>
        </div>
    </div>
    <div class="porlet-body">
        <div class="row">
            <div class="col-md-12">
                <!-- 吸烟部分开始 -->
                <div class="portlet box blue">
                    <div class="portlet-title">
                        <div class="caption">吸烟</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">是否吸烟</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="riskFactors.isSomking">否</radio></label>
                                    <label><radio value="1" v-model="riskFactors.isSomking">是</radio></label>
                                </div>                                 
                            </div>
                            <div class="col-md-4" v-if="riskFactors.isSomking=='1'">
                                <input type="text" name="smoking_duration" class="form-control input-inline" v-model="riskFactors.duration">
                                <span class="help-inline"> 年 </span>
                                <span class="help-block"> 填写烟龄 </span>
                            </div>
                        </div>
                        <div class="form-group" v-if="riskFactors.isSomking=='1'">
                            <label class="control-label bold col-md-2">平均吸烟</label>
                            <div class="col-md-4">
                                <input type="text" name="pieces_per_day" class="form-control input-inline" v-model="riskFactors.piecesPerDay">
                                <span class="help-inline"> 支/日 </span>
                            </div>
                        </div>
                        <div class="form-group" v-if="riskFactors.isSomking=='1'">
                            <label class="control-label bold col-md-2">吸烟类型（多选）</label>
                            <div class="col-md-6">
                                <div><label v-for="cigrette in pagedata.cigretteTypes" :key="cigrette.id"><checkbox v-model="riskFactors.cigretteType" :value="cigrette.id">{{cigrette.text}}</checkbox></label></div>
                                <span class="help-block"> &nbsp;</span>
                            </div>
                            <div class="col-md-4" v-show="riskFactors.cigretteType.indexOf('5')>= 0">
                                <input type="text" class="form-control" name="cigrette_type_others" v-model="riskFactors.cigretteTypeOthers">
                                <span class="help-block"> 填写其他类型 </span>
                            </div>
                        </div>
                        <div class="form-group" v-if="riskFactors.isSomking=='1'">
                            <label class="control-label bold col-md-2">是否戒烟</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="riskFactors.isSmokingCessation">否</radio></label>
                                    <label><radio value="1" v-model="riskFactors.isSmokingCessation">是</radio></label>
                                </div>
                                <span class="help-block"> &nbsp;</span>                                   
                            </div>
                            <div class="col-md-4" v-show="riskFactors.isSmokingCessation=='1'">
                                <input type="text" name="smoking_cessation_duration" class="form-control input-inline" v-model="riskFactors.smokingCessationDuration">
                                <span class="help-inline"> 年 </span>
                                <span class="help-block"> 填写戒烟时长 </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 吸烟部分结束 -->
                <!-- 饮酒部分开始 -->
                <div class="portlet box red">
                    <div class="portlet-title">
                        <div class="caption">饮酒</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">是否饮酒</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="riskFactors.isDrinking" name="is_drinking">否</radio></label>
                                    <label><radio value="1" v-model="riskFactors.isDrinking" name="is_drinking">是</radio></label>
                                </div> 
                            </div>
                            <div class="col-md-4" v-if="riskFactors.isDrinking=='1'">
                                <input type="text" name="drinking_duration" class="form-control input-inline" v-model="riskFactors.duration">
                                <span class="help-inline"> 年 </span>
                                <span class="help-block"> 填写酒龄 </span>
                            </div>
                        </div>
                        <div class="form-group" v-if="riskFactors.isDrinking=='1'">
                            <label class="control-label bold col-md-2">平均饮酒</label>
                            <div class="col-md-4">
                                <input type="text" name="tales_per_day" class="form-control input-inline" v-model="riskFactors.talesPerDay">
                                <span class="help-inline"> 两/日 </span>
                            </div>
                        </div>
                        <div class="form-group" v-if="riskFactors.isDrinking=='1'">
                            <label class="control-label bold col-md-2">饮酒类型（多选）</label>
                            <div class="col-md-6">
                                <div><label v-for="wine in pagedata.wineTypes" :key="wine.id"><checkbox v-model="riskFactors.wineType" :value="wine.id">{{wine.text}}</checkbox></label></div>
                                <span class="help-block"> &nbsp;</span>
                            </div>
                            <div class="col-md-4" v-show="riskFactors.wineType.indexOf('5')>= 0">
                                <input type="text" class="form-control" name="wine_type_others" v-model="riskFactors.wineTypeOthers">
                                <span class="help-block"> 填写其他类型 </span>
                            </div>
                        </div>
                        <div class="form-group" v-if="riskFactors.isDrinking=='1'">
                            <label class="control-label bold col-md-2">是否戒酒</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="riskFactors.isTemperance">否</radio></label>
                                    <label><radio value="1" v-model="riskFactors.isTemperance">是</radio></label>
                                </div>                                
                                <span class="help-block"> &nbsp;</span>
                            </div>
                            <div class="col-md-4" v-if="riskFactors.isTemperance=='1'">
                                <input type="text" name="temperance_duration" class="form-control input-inline" v-model="riskFactors.temperanceDuration">
                                <span class="help-inline"> 年 </span>
                                <span class="help-block"> 戒酒时长 </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 饮酒部分结束 -->
                <!-- 饮食习惯部分开始 -->
                <div class="portlet box yellow">
                    <div class="portlet-title">
                        <div class="caption">饮食习惯（每日摄入量）</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">饮水</label>
                            <div class="col-md-2">
                                <select name="drinking_amount" class="form-control" v-model="riskFactors.drinkingAmount">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="drinkingAmount in pagedata.dietHabitDrinkingAmouts" :key="drinkingAmount.id" :value="drinkingAmount.id">{{drinkingAmount.text}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">谷薯类</label>
                            <div class="col-md-2">
                                <select name="paddy_potato" class="form-control" v-model="riskFactors.paddyPotato">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="paddyPotato in pagedata.dietHabitPaddyPotatoes" :key="paddyPotato.id" :value="paddyPotato.id">{{paddyPotato.text}}</option>
                                </select>
                            </div>
                            <label class="control-label bold col-md-2">全谷物和杂豆</label>
                            <div class="col-md-2">
                                <select name="grain_mixed_beans" class="form-control" v-model="riskFactors.grainMixedBeans">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="grainMixedBeans in pagedata.dietHabitGrainMixedBeans" :key="grainMixedBeans.id" :value="grainMixedBeans.id">{{grainMixedBeans.text}}</option>
                                </select>
                            </div>
                            <label class="control-label bold col-md-2">薯类</label>
                            <div class="col-md-2">
                                <select name="potato" class="form-control" v-model="riskFactors.potato">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="potato in pagedata.dietHabitPotatoes" :key="potato.id" :value="potato.id">{{potato.text}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">蔬菜类</label>
                            <div class="col-md-2">
                                <select name="vegetables" class="form-control" v-model="riskFactors.vegetables">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="vegetables in pagedata.dietHabitVegetables" :key="vegetables.id" :value="vegetables.id">{{vegetables.text}}</option>
                                </select>
                            </div>
                            <label class="control-label bold col-md-2">水果类</label>
                            <div class="col-md-2">
                                <select name="fruits" class="form-control" v-model="riskFactors.fruits">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="fruits in pagedata.dietHabitFruits" :key="fruits.id" :value="fruits.id">{{fruits.text}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">畜禽肉</label>
                            <div class="col-md-2">
                                <select name="livestock_meat" class="form-control" v-model="riskFactors.livestockMeat">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="livestockMeat in pagedata.dietHabitLivestockMeats" :key="livestockMeat.id" :value="livestockMeat.id">{{livestockMeat.text}}</option>
                                </select>
                            </div>
                            <label class="control-label bold col-md-2">水产品</label>
                            <div class="col-md-2">
                                <select name="aquatic_products" class="form-control" v-model="riskFactors.aquaticProducts">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="aquaticProducts in pagedata.dietHabitAquaticProducts" :key="aquaticProducts.id" :value="aquaticProducts.id">{{aquaticProducts.text}}</option>
                                </select>
                            </div>
                            <label class="control-label bold col-md-2">蛋类</label>
                            <div class="col-md-2">
                                <select name="eggs" class="form-control" v-model="riskFactors.eggs">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="eggs in pagedata.dietHabitEggs" :key="eggs.id" :value="eggs.id">{{eggs.text}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">奶及奶制品</label>
                            <div class="col-md-2">
                                <select name="milk_products" class="form-control" v-model="riskFactors.milkProducts">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="milkProducts in pagedata.dietHabitMilkProducts" :key="milkProducts.id" :value="milkProducts.id">{{milkProducts.text}}</option>
                                </select>
                            </div>
                            <label class="control-label bold col-md-2">大豆及坚果类</label>
                            <div class="col-md-2">
                                <select name="soybeans_nuts" class="form-control" v-model="riskFactors.soybeansNuts">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="soybeansNuts in pagedata.dietHabitSoybeansNuts" :key="soybeansNuts.id" :value="soybeansNuts.id">{{soybeansNuts.text}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">食盐</label>
                            <div class="col-md-2">
                                <select name="salt" class="form-control" v-model="riskFactors.salt">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="salt in pagedata.dietHabitSalts" :key="salt.id" :value="salt.id">{{salt.text}}</option>
                                </select>
                            </div>
                            <label class="control-label bold col-md-2">糖</label>
                            <div class="col-md-2">
                                <select name="sugar" class="form-control" v-model="riskFactors.sugar">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="sugar in pagedata.dietHabitSugar" :key="sugar.id" :value="sugar.id">{{sugar.text}}</option>
                                </select>
                            </div>
                            <label class="control-label bold col-md-2">油</label>
                            <div class="col-md-2">
                                <select name="oil" class="form-control" v-model="riskFactors.oil">
                                    <option value="" disabled selected>选择</option>
                                    <option v-for="oil in pagedata.dietHabitOils" :key="oil.id" :value="oil.id">{{oil.text}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">肥肉</label>
                            <div class="col-md-3">
                                <input type="text" name="fat_meat" class="form-control input-inline" v-model="riskFactors.fatMeat">
                                <span class="help-inline"> g/周 </span>
                            </div>
                            <label class="control-label bold col-md-2">内脏</label>
                            <div class="col-md-3">
                                <input type="text" name="visceral" class="form-control input-inline" v-model="riskFactors.visceral">
                                <span class="help-inline"> g/周 </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 饮食习惯部分结束 -->
                <!-- 社会心理因素部分开始 -->
                <div class="portlet box green-dark">
                    <div class="portlet-title">
                        <div class="caption">社会心理因素</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-6">血型性格</label>
                            <div class="col-md-2">
                                <select name="blood_type" class="form-control" v-model="riskFactors.bloodType">
                                    <option value="" disabled selected>选择血型</option>
                                    <option v-for="bloodType in pagedata.bloodTypes" :key="bloodType.id" :value="bloodType.id">{{bloodType.text}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-6">有无长期心理压力</label>
                            <div class="col-md-6">
                                <div>
                                    <label><radio value="0" v-model="riskFactors.isLongtermPsychologicalStress">否</radio></label>
                                    <label><radio value="1" v-model="riskFactors.isLongtermPsychologicalStress">是</radio></label>
                                </div>                                
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-6">有无抑郁症（悲观、焦虑或反应迟钝、疲劳、缺乏自信、饮食睡眠改变）</label>
                            <div class="col-md-6">
                                <div>
                                    <label><radio value="0" v-model="riskFactors.isDepression">否</radio></label>
                                    <label><radio value="1" v-model="riskFactors.isDepression">是</radio></label>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 社会心理因素部分结束 -->
                <!-- 运动部分开始 -->
                <div class="portlet box purple">
                    <div class="portlet-title">
                        <div class="caption">运动</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">类型</label>
                            <div class="col-md-2">
                                <select name="exercise_type" class="form-control" v-model="riskFactors.exerciseType">
                                    <option value="" disabled selected>选择血型</option>
                                    <option v-for="exerciseType in pagedata.exerciseTypes" :key="exerciseType.id" :value="exerciseType.id">{{exerciseType.text}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">每次时长</label>
                            <div class="col-md-2">
                                <select name="exercise_duration" class="form-control" v-model="riskFactors.exerciseDuration">
                                    <option value="" disabled selected>选择血型</option>
                                    <option v-for="exerciseDuration in pagedata.exerciseDuration" :key="exerciseDuration.id" :value="exerciseDuration.id">{{exerciseDuration.text}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">方式（多选）</label>
                            <div class="col-md-4">
                                <div><label v-for="exerciseMode in pagedata.exerciseModes" :key="exerciseMode.id"><checkbox v-model="riskFactors.exerciseMode" :value="exerciseMode.id">{{exerciseMode.text}}</checkbox></label></div>
                                <span class="help-block"> &nbsp;</span>
                            </div>
                            <div class="col-md-3" v-show="riskFactors.exerciseMode.indexOf('3')>=0">
                                <input type="text" class="form-control" name="exercise_mode_others" v-model="riskFactors.exerciseModeOthers">
                                <span class="help-block"> 填写其他方式 </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 运动部分结束 -->
                <!-- 中心型肥胖部分开始 -->
                <div class="portlet box dark">
                    <div class="portlet-title">
                        <div class="caption">中心型肥胖</div>
                        <div class="tools">
                            <a href="javascript:;" class="collapse"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="form-group">
                            <label class="control-label bold col-md-2">有无中心型肥胖</label>
                            <div class="col-md-2">
                                <div>
                                    <label><radio value="0" v-model="riskFactors.isCentralObesity">否</radio></label>
                                    <label><radio value="1" v-model="riskFactors.isCentralObesity">是</radio></label>
                                </div>
                                <span class="help-block"> &nbsp;</span>
                            </div>
                            <div class="col-md-4" v-show="riskFactors.isCentralObesity=='1'">
                                <input type="text" name="central_obesity_duration" class="form-control input-inline" v-model="riskFactors.centralObesityDuration">
                                <span class="help-inline"> 年 </span>
                                <span class="help-block"> 填写病史 </span>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">身高</label>
                            <div class="col-md-4">
                                <input name="height" class="form-control input-inline" v-model="riskFactors.height">
                                <span class="help-inline"> cm </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">体重</label>
                            <div class="col-md-4">
                                <input name="weight" class="form-control input-inline" v-model="riskFactors.weight">
                                <span class="help-inline"> kg </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">腰围</label>
                            <div class="col-md-4">
                                <input name="waistline" class="form-control input-inline" v-model="riskFactors.waistline">
                                <span class="help-inline"> cm </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">颈围</label>
                            <div class="col-md-4">
                                <input name="neck_circumference" class="form-control input-inline" v-model="riskFactors.neckCircumference">
                                <span class="help-inline"> cm </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label bold col-md-2">臀围</label>
                            <div class="col-md-4">
                                <input name="hipline" class="form-control input-inline" v-model="riskFactors.hipline">
                                <span class="help-inline"> cm </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 中心型肥胖部分结束 -->
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import {Checkbox, Radio} from 'vue-checkbox-radio';
export default {
    name: 'risk_factors',
    props: {
        pagedata: {
            type: Object
        }
    },
    data () {
        return {
            riskFactors: {
                isSomking: "1",
                smokingDuration: "10",
                piecesPerDay: "3",
                cigretteType: [],
                cigretteTypeOthers: "斗烟",
                isSmokingCessation: "1",
                smokingCessationDuration: "3",
                isDrinking: "1",
                drinkingDuration: "15",
                talesPerDay: "2",
                wineType: [],
                wineTypeOthers: "香槟",
                isTemperance: "1",
                temperanceDuration: "2",
                drinkingAmount: "2",
                paddyPotato: "2",
                grainMixedBeans: "1",
                potato: "1",
                vegetables: "2",
                fruits: "3",
                livestockMeat: "1",
                aquaticProducts: "2",
                eggs: "2",
                milkProducts: "2",
                soybeansNuts: "1",
                salt: "3",
                sugar: "2",
                oil: "1",
                fatMeat: "100",
                visceral: "20",
                bloodType: "3",
                isLongtermPsychologicalStress: "1",
                isDepression: "1",
                exerciseType: "2",
                exerciseDuration: "2",
                exerciseMode: [],
                exerciseModeOthers: "游泳",
                isCentralObesity: "1",
                centralObesityDuration: "5",
                height: "175",
                weight: "80",
                waistline: "75",
                neckCircumference: "43",
                hipline: "87"
            }
        }
    },
    components: {
        Checkbox, Radio
    }
}
</script>

<style lang="stylus" scoped>

</style>