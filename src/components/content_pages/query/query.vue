<template>
  <div class="query">
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
            <h3>病历查询</h3>
            <p> 相关说明 </p>
        </div>
        <div class="portlet light">
            <div class="portlet-title">
                <div class="caption">
                    <i class=" icon-layers font-dark"></i>
                    <span class="caption-subject bold uppercase">病历列表</span>
                </div>
                <!-- <div class="actions">
                    <div class="btn-group btn-group-devided" data-toggle="buttons">
                        <label class="btn btn-transparent dark btn-outline btn-circle btn-sm active">
                            <input type="radio" name="options" class="toggle" id="option1">Actions</label>
                        <label class="btn btn-transparent dark btn-outline btn-circle btn-sm">
                            <input type="radio" name="options" class="toggle" id="option2">Settings</label>
                    </div>
                </div> -->
            </div>
            <div class="portlet-body">
                <div class="table-toolbar">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="btn-group">
                                <button class="btn sbold green" @click="addMedicalRecord"> 添加新病历
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <!-- <div class="col-md-6">
                            <div class="btn-group pull-right">
                                <button class="btn green  btn-outline dropdown-toggle" data-toggle="dropdown">Tools
                                    <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu pull-right">
                                    <li>
                                        <a href="javascript:;">
                                            <i class="fa fa-print"></i> Print </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i class="fa fa-file-pdf-o"></i> Save as PDF </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <i class="fa fa-file-excel-o"></i> Export to Excel </a>
                                    </li>
                                </ul>
                            </div>
                        </div> -->
                    </div>                    
                </div>
                <div style="margin:10px 0">
                    <label class="control-lable">
                        每页显示
                        <select name="per-page" class="form-control input-inline input-sm" @change="setPerPage($event.target.value)">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        条记录
                    </label>
                </div>
                <div style="overflow: auto">
                        <!-- api-url="https://vuetable.ratiw.net/api/users" -->                    
                        <!-- api-url="apiUrl"                     -->
                    <vuetable ref="vuetable"                        
                        :api-url="apiUrl"
                        :fields="fields"
                        :api-mode="true"
                        :css="css.table"
                        :per-page="perPage"
                        pagination-path=""
                        data-path="data"                        
                        :no-data-template="'没有可用数据'"
                        @vuetable:pagination-data="onPaginationData"
                    >
                    <template slot="contactInfo" scope="props">
                        <span>{{props.rowData.telephone}}</span>
                        <span v-if="props.rowData.telephone&&props.rowData.cellphone1">；</span>
                        <span>{{props.rowData.cellphone1}}</span>
                        <span v-if="props.rowData.cellphone1&&props.rowData.cellphone2">；</span>
                        <span>{{props.rowData.cellphone2}}</span>
                    </template>
                    <template slot="actions" scope="props">
                        <div class="btn-group">
                            <button class="btn btn-xs blue dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> 操作
                                <i class="fa fa-angle-down"></i>
                            </button>
                            <ul class="dropdown-menu pull-right" role="menu">                                
                                <!-- <li class="divider"> </li> -->
                                <li>
                                    <a href="javascript:;" @click="goEdit(props.rowData)">
                                        <i class="icon-pencil"></i> 编辑病历
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;" @click="goDetail(props.rowData)">
                                        <i class="icon-info"></i> 查看详情
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </template>
                    </vuetable>
                    <div class="vuetable-pagination">
                        <vuetable-pagination-info ref="paginationInfo"                                
                            :css="css.paginationInfo"
                            :info-template="'共 {total} 条记录，显示第 {from} 到 {to} 条'"
                            :no-data-template="'没有相关数据'"
                        ></vuetable-pagination-info>
                        <vuetable-pagination ref="pagination"
                            @vuetable-pagination:change-page="onChangePage"
                            :css="css.pagination"
                        ></vuetable-pagination>
                    </div>
                </div>        
            </div>
        </div>    
        <div class="clearfix"></div>
    </div>
</template>

<script>
import utils from '@/utils/utils';
import config from '@/config';
import Vuetable from 'vuetable-2/src/components/Vuetable';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';
import vuetableCss from './vuetableCss.js';
import fieldsDef from './fieldsDef.js';

export default {
    name: 'query',
    data () {
        return {
            apiUrl: config.apiHost+"/record/getPartOfAllRecords",
            perPage: 10,
            css: vuetableCss,
            fields: fieldsDef
        }
    },
    computed: {
        medicalRecordList () {
            return this.$store.state.medicalRecordList;
        }
    }, 
    methods: {
        addMedicalRecord () {
            this.$router.push('/home/input');
        },
        onPaginationData (paginationData) {
            this.$refs.pagination.setPaginationData(paginationData);
            this.$refs.paginationInfo.setPaginationData(paginationData);
        },
        onChangePage (page) {
            this.$refs.vuetable.changePage(page);
        },
        setPerPage(value){
            this.perPage = parseInt(value);
            this.$nextTick(function() {
                this.$refs.vuetable.refresh();
            })
        },
        genderLabel (value) {
            return value == '男'
            ? '<span class="label label-info"><i class="fa fa-mars"></i> 男</span>'
            : '<span class="label label-danger"><i class="fa fa-venus"></i> 女</span>'
        },
        showDoctorName(value){
            return value.name;
        },
        showContactInfo(value){
            return value;
        },
        goDetail (data) {
            let id=data._id;
            this.$router.push(`/home/detail/${id}`);
        },
        goEdit (data) {
            let id=data._id;
            this.$store.dispatch('changeCurrentMedicalRecordId',id);
            this.$router.push(`/home/edit/${id}`);
        }
    },
    watch: {
        '$route': function (val, oldVal) {
            this.$refs.vuetable.refresh();
        },
    },
    mounted () {
        utils.handleSidebarAndContentHeight();
        utils.handleGoTop();
    },
    components: {
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo
    }
}

</script>

<style lang="stylus" scoped>
    .query
        padding-bottom 100px
</style>


