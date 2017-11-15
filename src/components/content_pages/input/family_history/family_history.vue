<template>
    <div class="tab-pane portlet" :class="{active:activeTab==4}">
        <div class="portlet-title">
            <div class="caption">
                <span class="caption-subject bold font-dark uppercase">家族史</span>
            </div>
        </div>
        <div class="porlet-body">
            <div class="row">
                <div class="col-md-12">
                    <!-- 早发冠心病部分开始 -->
                    <div class="portlet box blue">
                        <div class="portlet-title">
                            <div class="caption">早发冠心病</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="form-group">
                                <label class="control-label bold col-md-2">有无早发冠心病家族史</label>
                                <div class="col-md-2">
                                    <div>
                                        <label><radio value="0" v-model="familyHistory.prematureChd.isPrematureChd">无</radio></label>
                                        <label><radio value="1" v-model="familyHistory.prematureChd.isPrematureChd">有</radio></label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" v-if="familyHistory.prematureChd.isPrematureChd=='1'">
                                <v-repeater :array="familyHistory.prematureChd.onsetMembers" :row="{onsetMember: '',gender: '',onsetAge:'', prematureChdType:''}">
                                    <label class="control-label col-md-2 bold" slot="header">发病成员</label>
                                    <template v-for="(item,index) in familyHistory.prematureChd.onsetMembers" :slot="index">
                                        <div class="mt-repeater-input" :key="item.id">  
                                            <label class="control-label">成员</label>
                                            <select class="form-control" v-model="item.onsetMember">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="member in staticIndex.familyMembers" :key="member.id" :value="member.id">{{member.text}}</option>
                                            </select>
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">性别</label>
                                            <select class="form-control" v-model="item.gender">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="gender in staticIndex.genderList" :key="gender.id" :value="gender.id">{{gender.text}}</option>
                                            </select>
                                        </div> 
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">发病年龄</label>
                                            <input class="form-control" v-model="item.onsetAge">
                                        </div> 
                                        <div class="mt-repeater-input" :key="item.id">  
                                            <label class="control-label">冠心病类型</label>
                                            <select class="form-control" v-model="item.prematureChdType">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="prematureChdType in staticIndex.prematureChdTypes" :key="prematureChdType.id" :value="prematureChdType.id">{{prematureChdType.text}}</option>
                                            </select>
                                        </div>
                                    </template>
                                </v-repeater>
                            </div>
                        </div>
                    </div>
                    <!-- 早发冠心病部分结束 -->
                    <!-- 心肌梗塞部分开始 -->
                    <div class="portlet box blue">
                        <div class="portlet-title">
                            <div class="caption">心肌梗塞</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="form-group">
                                <label class="control-label bold col-md-2">有无心肌梗塞家族史</label>
                                <div class="col-md-2">
                                    <div>
                                        <label><radio value="0" v-model="familyHistory.myocardialInfarction.isMyocardialInfarction">无</radio></label>
                                        <label><radio value="1" v-model="familyHistory.myocardialInfarction.isMyocardialInfarction">有</radio></label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" v-if="familyHistory.myocardialInfarction.isMyocardialInfarction=='1'">
                                <v-repeater :array="familyHistory.myocardialInfarction.onsetMembers" :row="{onsetMember: '',gender: '',onsetAge:''}">
                                    <label class="control-label col-md-2 bold" slot="header">发病成员</label>
                                    <template v-for="(item,index) in familyHistory.myocardialInfarction.onsetMembers" :slot="index">
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">成员</label>
                                            <select class="form-control" v-model="item.onsetMember">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="member in staticIndex.familyMembers" :key="member.id" :value="member.id">{{member.text}}</option>
                                            </select>
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">性别</label>
                                            <select class="form-control" v-model="item.gender">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="gender in staticIndex.genderList" :key="gender.id" :value="gender.id">{{gender.text}}</option>
                                            </select>
                                        </div> 
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">发病年龄</label>
                                            <input class="form-control" v-model="item.onsetAge">
                                        </div>                                         
                                    </template>
                                </v-repeater>
                            </div>
                        </div>
                    </div>
                    <!-- 心肌梗塞部分结束 -->
                    <!-- 猝死部分开始 -->
                    <div class="portlet box blue">
                        <div class="portlet-title">
                            <div class="caption">猝死</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="form-group">
                                <label class="control-label bold col-md-2">有无猝死家族史</label>
                                <div class="col-md-2">
                                    <div>
                                        <label><radio value="0" v-model="familyHistory.suddenDeath.isSuddenDeath">无</radio></label>
                                        <label><radio value="1" v-model="familyHistory.suddenDeath.isSuddenDeath">有</radio></label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" v-if="familyHistory.suddenDeath.isSuddenDeath=='1'">
                                <v-repeater :array="familyHistory.suddenDeath.onsetMembers" :row="{onsetMember: '',gender: '',onsetAge:'', etiology: '', etiologyOthers:''}">
                                    <label class="control-label col-md-2 bold" slot="header">发病成员</label>
                                    <template v-for="(item,index) in familyHistory.suddenDeath.onsetMembers" :slot="index">
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">成员</label>
                                            <select class="form-control" v-model="item.onsetMember">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="member in staticIndex.familyMembers" :key="member.id" :value="member.id">{{member.text}}</option>
                                            </select>
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">性别</label>
                                            <select class="form-control" v-model="item.gender">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="gender in staticIndex.genderList" :key="gender.id" :value="gender.id">{{gender.text}}</option>
                                            </select>
                                        </div> 
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">发病年龄</label>
                                            <input class="form-control" v-model="item.onsetAge">
                                        </div>       
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">发病原因</label>
                                            <select class="form-control" v-model="item.etiology">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="etiology in staticIndex.suddenDeathEtiologies" :key="etiology.id" :value="etiology.id">{{etiology.text}}</option>
                                            </select>
                                        </div>    
                                        <div class="mt-repeater-input" :key="item.id" v-if="item.etiology=='4'">
                                            <label class="control-label">其他病因</label>
                                            <input class="form-control" v-model="item.etiologyOthers">
                                        </div>                                              
                                    </template>
                                </v-repeater>
                            </div>
                        </div>
                    </div>
                    <!-- 猝死部分结束 -->
                    <!-- 缺血性脑卒中部分开始 -->
                    <div class="portlet box blue">
                        <div class="portlet-title">
                            <div class="caption">缺血性脑卒中</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="form-group">
                                <label class="control-label bold col-md-2">有无缺血性脑卒中家族史</label>
                                <div class="col-md-2">
                                    <div>
                                        <label><radio value="0" v-model="familyHistory.ischemicStroke.isIschemicStroke">无</radio></label>
                                        <label><radio value="1" v-model="familyHistory.ischemicStroke.isIschemicStroke">有</radio></label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" v-if="familyHistory.ischemicStroke.isIschemicStroke=='1'">
                                <v-repeater :array="familyHistory.ischemicStroke.onsetMembers" :row="{onsetMember: '',gender: '',onsetAge:''}">
                                    <label class="control-label col-md-2 bold" slot="header">发病成员</label>
                                    <template v-for="(item,index) in familyHistory.ischemicStroke.onsetMembers" :slot="index">
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">成员</label>
                                            <select class="form-control" v-model="item.onsetMember">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="member in staticIndex.familyMembers" :key="member.id" :value="member.id">{{member.text}}</option>
                                            </select>
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">性别</label>
                                            <select class="form-control" v-model="item.gender">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="gender in staticIndex.genderList" :key="gender.id" :value="gender.id">{{gender.text}}</option>
                                            </select>
                                        </div> 
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">发病年龄</label>
                                            <input class="form-control" v-model="item.onsetAge">
                                        </div>       
                                    </template>
                                </v-repeater>
                            </div>
                        </div>
                    </div>
                    <!-- 缺血性脑卒中部分结束 -->
                    <!-- 缺血性脑卒中部分开始 -->
                    <div class="portlet box blue">
                        <div class="portlet-title">
                            <div class="caption">出血性脑卒中</div>
                            <div class="tools">
                                <a href="javascript:;" class="collapse"> </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="form-group">
                                <label class="control-label bold col-md-2">有无出血性脑卒中家族史</label>
                                <div class="col-md-2">
                                    <div>
                                        <label><radio value="0" v-model="familyHistory.hemorrhagicStroke.isHemorrhagicStroke">无</radio></label>
                                        <label><radio value="1" v-model="familyHistory.hemorrhagicStroke.isHemorrhagicStroke">有</radio></label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group" v-if="familyHistory.hemorrhagicStroke.isHemorrhagicStroke=='1'">
                                <v-repeater :array="familyHistory.hemorrhagicStroke.onsetMembers" :row="{onsetMember: '',gender: '',onsetAge:''}">
                                    <label class="control-label col-md-2 bold" slot="header">发病成员</label>
                                    <template v-for="(item,index) in familyHistory.hemorrhagicStroke.onsetMembers" :slot="index">
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">成员</label>
                                            <select class="form-control" v-model="item.onsetMember">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="member in staticIndex.familyMembers" :key="member.id" :value="member.id">{{member.text}}</option>
                                            </select>
                                        </div>
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">性别</label>
                                            <select class="form-control" v-model="item.gender">
                                                <option value="" disabled selected>选择</option>
                                                <option v-for="gender in staticIndex.genderList" :key="gender.id" :value="gender.id">{{gender.text}}</option>
                                            </select>
                                        </div> 
                                        <div class="mt-repeater-input" :key="item.id">
                                            <label class="control-label">发病年龄</label>
                                            <input class="form-control" v-model="item.onsetAge">
                                        </div>       
                                    </template>
                                </v-repeater>
                            </div>
                        </div>
                    </div>
                    <!-- 缺血性脑卒中部分结束 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Checkbox, Radio} from 'vue-checkbox-radio';
import vRepeater from '@/components/v_repeater/v_repeater';

export default {
    name: 'family_history',
    props: {        
        familyHistory: {
            type: Object
        },
        activeTab: {
            type: Number
        }
    },
    data () {
        return {
            
            className: "col-md-11 col-md-offset-1"
        }
    },    
    computed: {
        staticIndex: function() {
            return this.$store.state.staticIndex;
        }        
    },
    components: {
        Checkbox, Radio, vRepeater
    }
}
</script>

<style lang="stylus" scoped>

</style>