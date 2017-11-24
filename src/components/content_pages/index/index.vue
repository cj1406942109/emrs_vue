<template>
  <div class="index">
    <div class="page-bar">
        <ul class="page-breadcrumb">
            <li>
                <span>Home</span>
                <i class="fa fa-circle"></i>
            </li>
            <li>
                <router-link to="/home">Dashboard</router-link>
            </li>
        </ul>            
    </div>
    <h1 class="page-title"> Bleeding Risk Estimator
        <small>Enter all the fields below</small>
    </h1>      
  </div>
</template>

<script>
import utils from '@/utils/utils';

export default {
    name: 'index',
    data () {
        return {            
        }
    },
    mounted () {
        utils.handleSidebarAndContentHeight();
    }
}
</script>

<style lang="stylus" scoped>

</style>


