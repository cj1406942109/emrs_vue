<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>    
  import utils from '@/utils/utils';
  export default {
      mounted () {
        utils.handlePortletCollapse();
      }
  }
</script>

<style lang="stylus">

  #app    
    // 修改vue-datepicker默认样式
    .cov-vue-date
      width 100% !important
      .cov-datepicker
        width 100% !important
    //设置radio，checkbox样式
    .checkbox-component
    .radio-component
      line-height 34px
      margin-right 20px
      &.border-red 
        label
          color #e7505a
          .input-box
            border 1px solid #e7505a
    .checkbox-component > input + label > .input-box
    .radio-component > input + label > .input-box 
      width 20px
      height 20px
      border 1px solid #c2cad8
      vertical-align middle
      box-shadow none
      margin 0 5px
      cursor pointer    
    .checkbox-component > input + label > .input-box > .input-box-tick
      position relative
      top -3px
      margin-top -10px
      path 
        stroke #3498DB
    .radio-component > input + label > .input-box > .input-box-circle
      cursor pointer
      background-color #3498DB
      border-radius 50%
    //修改sweet-modal样式
    .sweet-modal-overlay
      &.theme-light
        background rgba(0, 0, 0, 0.2)
</style>

