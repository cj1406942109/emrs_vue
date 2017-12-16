<template>
    <div class="cad-query">
        <div class="page-bar">
            <ul class="page-breadcrumb">
                <li>
                    <span>Coronary Artery Disease Estimator</span>
                    <i class="fa fa-circle"></i>
                </li>
                <li>
                    <router-link to="/home/cad_query">Result List</router-link>
                </li>
            </ul>                     
        </div>
        <h1 class="page-title"> Coronary Artery Disease Estimator
            <small>Dispaly the result list below</small>        
        </h1>
        <div class="portlet light">
            <div class="portlet-title">
                <div class="caption font-dark">
                    <i class="icon-list font-dark"></i>
                    <span class="caption-subject bold uppercase"> Result List </span>
                </div>
            </div>
            <div class="portlet-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th colspan="2">Index</th>
                            <th class="col-md-6">Patient Information</th>
                            <th class="col-md-4">Result Data</th>
                            <th>Creation Time</th>
                        </tr>
                    </thead>
                    <tbody class="text-center" v-if="recordList.length>0">
                        <tr v-for="(item, index) in recordList" :key="item.id">
                            <td>{{index+1}}</td>
                            <td>
                                <span @click="toggleCollapse(index+1)">
                                    <i title="collapse" class="fa fa-plus-square-o" aria-hidden="true" v-if="!checkCollapseStatus(index+1)"></i>
                                    <i title="collapse" class="fa fa-minus-square-o" aria-hidden="true" v-else></i>
                                </span>
                            </td>
                            <td v-show="!checkCollapseStatus(index+1)"><span class="bold">Patiend ID:</span> {{item.patientInfo.id}} &nbsp;&nbsp; <span class="bold">Name:</span> {{item.patientInfo.name}}</td>
                            <td colspan="1" v-show="!checkCollapseStatus(index+1)" class="font-blue">Click the collapse button left to view detail information</td>
                            <td v-show="checkCollapseStatus(index+1)">
                                <table class="table table-bordered table-hover">
                                    <tbody>
                                        <tr>
                                            <td class="col-md-2">Patient ID</td>
                                            <td class="col-md-2">{{item.patientInfo.id}}</td>
                                            <td class="col-md-2">Name</td>
                                            <td class="col-md-2">{{item.patientInfo.name}}</td>
                                        </tr>
                                        <tr>
                                            <td class="col-md-2">Age</td>
                                            <td class="col-md-2">{{item.patientInfo.age}}</td>
                                            <td class="col-md-2">Gender</td>
                                            <td class="col-md-2">{{item.patientInfo.gender}}</td>
                                        </tr>
                                        <tr>
                                            <td class="col-md-2">Phone Number</td>
                                            <td colspan="3" class="col-md-2">{{item.patientInfo.phone}}</td>
                                        </tr>
                                        <tr>
                                            <td class="col-md-2">address</td>
                                            <td colspan="3" class="col-md-2">{{item.patientInfo.address}}</td>
                                        </tr>
                                        <tr>
                                            <td class="col-md-2">Location</td>
                                            <td colspan="3" class="col-md-2">{{item.patientInfo.location.join(';')}}</td>
                                        </tr>
                                         <tr>
                                            <td class="col-md-2">Characteristic</td>
                                            <td colspan="3" class="col-md-2">{{item.patientInfo.characteristic.join(';')}}</td>
                                        </tr>
                                         <tr>
                                            <td class="col-md-2">Precipitation Factors</td>
                                            <td colspan="3" class="col-md-2">{{item.patientInfo.precipitationFactors.join(';')}}</td>
                                        </tr>
                                        <tr>
                                            <td class="col-md-2">Duration</td>
                                            <td class="col-md-2">{{item.patientInfo.duration}}</td>
                                            <td class="col-md-2">Relief Time</td>
                                            <td class="col-md-2">{{item.patientInfo.reliefTime}}<span> min</span></td>
                                        </tr>
                                         <tr>
                                            <td class="col-md-2">Relief Factors</td>
                                            <td colspan="3" class="col-md-2">{{item.patientInfo.reliefFactors.join(';')}}</td>
                                        </tr>
                                        <tr>
                                            <td class="col-md-2">other</td>
                                            <td colspan="3" class="col-md-2">{{item.patientInfo.other}}</td>
                                        </tr>
                                    </tbody>
                                </table>                           
                            </td>
                            <td v-show="checkCollapseStatus(index+1)">
                                <table class="table table-bordered table-hover">
                                    <tbody>
                                        <tr><td>Symptom Status</td><td>{{item.resultData.symptomStatus}}</td></tr>
                                        <tr><td>Probability</td><td>{{item.resultData.probability}}</td></tr>
                                        <tr><td>Percentage</td><td>{{item.resultData.percent}}</td></tr>
                                    </tbody>
                                </table> 
                            </td>
                            <td>{{item.createTime}}</td>
                        </tr>
                    </tbody>
                    <tbody v-if="recordList.length==0">
                        <tr><td colspan="6">No data available!</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <sweet-modal ref="errorModal" icon="error" :blocking="true" :hide-close-button="false">
            {{errorMessage}}
        </sweet-modal>
  </div>
</template>

<script>
import SweetButton from 'sweet-modal-vue/docs/components/Button';
import utils from '@/utils/utils';
import config from '@/config';
export default {
    data () {
        return {
            collapseList: [1],
            recordList: [],
            errorMessage: ''
        }
    },
    methods: {
        toggleCollapse(i){
            let eleInList = false;
            let eleIndex = null;
            this.collapseList.forEach(function(ele, index){
                if(ele === i){
                    eleIndex = index;
                    eleInList = true;
                }
            });
            
            if(eleInList){
                this.collapseList.splice(eleIndex, 1);
            }else{
                this.collapseList.push(i);
            }
        },
        checkCollapseStatus(i){
            let eleInList = false;
            this.collapseList.forEach(function(ele){
                if(ele === i){
                    eleInList = true;
                }
            })
            return eleInList;
        },
        getRecordList(vm){
            vm.$http.post(config.apiHost + '/dp/getAllCADPredictionsByUserId', {userId: JSON.parse(sessionStorage.getItem('user'))._id}).then(response => {
                let responseData = response.body;
                if (responseData.status) {            
                    vm.recordList=responseData.data;
                } else {
                    vm.errorMessage = 'Get the result data failed, please try again!';
                    vm.$refs.errorModal.open();
                }
            }, response => {
                vm.errorMessage = 'Get the result data failed, please try again!';
                vm.$refs.errorModal.open();
            });
        }
    },
    watch: {
        '$route' () {
            this.getRecordList(this);
        }
    },
    created () {
        this.getRecordList(this);
    },
    components: {
        SweetButton
    },
    mounted () {
        utils.handleSidebarAndContentHeight();
        utils.handleGoTop();
    }
}
</script>

<style lang="stylus" scoped>
    .cad-query
        table         
            thead,th
                vertical-align middle
                font-weight bold
                color #000
            thead,th
            tbody,td                
                    text-align center   
                    .fa
                        font-size 16px
                        cursor pointer                        
                    
        .table-hover
            td:nth-child(1)                
                font-weight bold
                color #666
            td:nth-child(2)                
                color #000
                span 
                    color #666
            td:nth-child(3)                
                font-weight bold
                color #666
            td:nth-child(4)                
                color #000
                span 
                    color #666           
            img
                max-width:100%
</style>


