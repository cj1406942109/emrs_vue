<template>
  <div class="input">
        <div class="page-bar">
            <ul class="page-breadcrumb">
                <li>
                    <span>电子病历系统</span>
                    <i class="fa fa-circle"></i>
                </li>
                <li>
                    <router-link to="/home/input">病历录入</router-link>
                </li>
            </ul>
        </div>
        
        <h1 class="page-title"> 电子病历系统
            <small>病历录入、病历查询</small>
        </h1>
        <div class="m-heading-1 border-green m-bordered">
            <h3>病历录入</h3>
            <p> 相关说明 </p>
        </div>
        <div class="portlet light " id="form_wizard_1">
            <div class="portlet-title">
                <div class="caption">
                    <i class=" icon-layers font-red"></i>
                    <span class="caption-subject font-red bold uppercase"> 病历录入向导 -<span class="step-title"> 步骤 {{currentStep}} / {{steps.length}} </span></span>
                </div>
            </div>
            <div class="portlet-body form">
                <form class="form-horizontal" id="emrs_input_form" method="POST">
                    <div class="form-wizard">
                        <div class="form-body">
                            <ul class="nav nav-pills nav-justified steps">
                                <li v-for="step in steps" :key="step.id" :class="{active:currentStep===step.value, done: currentStep>step.value}">
                                    <a :href="step.href" data-toggle="tab" class="step">
                                        <span class="number">{{step.value}}</span>
                                        <span class="desc"><i class="fa fa-check"></i>{{step.title}}</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="progress progress-striped active">
                                <div class="progress-bar progress-bar-success" role="progressbar" :style="{width:currentStep*50+'%'}"></div>
                            </div>
                            <div class="tab-content">
                                <div class="alert" :class="[isFormValid?'alert-danger':'alert-success']" v-show="isAlert">
                                    <button class="close" data-dismiss="alert"></button> <span v-if="isFormValid">表单填写错误，请重新检查字段填写要求！</span><span v-else>表单格式验证成功！</span>
                                </div>
                                <div class="tab-pane active" id="tab1" v-show="currentStep==1">
                                    <div class="portlet light">
                                        <div class="portlet-title">
                                            <div class="caption">
                                                <span class="bold uppercase">请填写患者病历基本信息</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <router-view name="tab1"></router-view>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane active" id="tab2" v-show="currentStep==2">
                                    <div class="portlet light">
                                        <div class="portlet-title">
                                            <div class="caption">
                                                <span class="bold uppercase">请填写患者病历详细信息</span>
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="tabbable-custom">
                                                <ul class="nav nav-tabs">
                                                    <li class="active"><a href="#tab_1_1" data-toggle="tab"> 现病史 </a></li>
                                                    <li><a href="#tab_1_2" data-toggle="tab"> 既往病史及危险因素 </a></li>
                                                    <li><a href="#tab_1_3" data-toggle="tab"> 家族史 </a></li>
                                                    <li><a href="#tab_1_4" data-toggle="tab"> 体格检查 </a></li>
                                                    <li><a href="#tab_1_5" data-toggle="tab"> 常规检查 </a></li>
                                                    <li><a href="#tab_1_6" data-toggle="tab"> 特殊检查 </a></li>
                                                    <li><a href="#tab_1_7" data-toggle="tab"> 入院诊断 </a></li>
                                                    <li><a href="#tab_1_8" data-toggle="tab"> 出院诊断 </a></li>
                                                </ul>
                                                <div class="tab-content">
                                                    <router-view name="tab2"></router-view>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-2 button-previous col-md-offset-2" v-show="currentStep>1" @click="lastStep">
                                        <a href="javascript:;" class="btn btn-block default"><i class="fa fa-angle-left"></i> 返回 </a>
                                    </div>
                                    <div class="col-md-2 button-next  col-md-offset-2" v-show="currentStep!=2" @click="nextStep">
                                        <a href="javascript:;" class="btn btn-block green"> 继续 <i class="fa fa-angle-right"></i></a>
                                    </div>
                                    <div class="col-md-2 button-submit" v-show="currentStep===2">
                                        <a href="javascript:;" class="btn btn-block green"> 提交 <i class="fa fa-check"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>        
        <div class="clearfix"></div>        
    </div>
</template>

<script>
import utils from '@/components/utils/utils';
export default {
    name: 'input',
    data () {
        return {
            steps: [
                {
                    value: 1,
                    title: '基本信息',
                    href: '#tab1'
                },
                {
                    value: 2,
                    title: '详细诊断信息',
                    href: '#tab2'
                }
            ],
            currentStep: 1,
            isFormValid: false,     //表单是否合法
            isAlert: false          //是否显示出错信息
        }
    },
    methods: {
        nextStep () {
            this.currentStep++;
        },
        lastStep () {
            this.currentStep--;
        }
    },
    mounted () {
        utils.handleSidebarAndContentHeight();
    }
}

</script>

<style lang="stylus" scoped>
    a
        &.step
            pointer-events: none    //禁用点击
</style>


