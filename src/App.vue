<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>    
    export default {
        
    }
</script>

<style lang="stylus">

  #app
    // 修改select2默认样式
    .select2-container
      width 100% !important
      .select2-selection--single
        height 34px
        border 1px solid #c2cad8
        outline none
        .select2-selection__rendered
          line-height 34px
        .select2-selection__arrow
          height 32px
    // 修改vue-datepicker默认样式
    .cov-vue-date
      width 100% !important
      .cov-datepicker
        width 100% !important
</style>

