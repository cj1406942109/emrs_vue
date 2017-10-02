<template>
  <div id="app" class="page-wrapper">
    <page-header></page-header>
    <div class="clearfix"></div>  
    <page-container></page-container>
    <page-footer></page-footer>
  </div>
</template>

<script>
    import pageHeader from '@/components/page_header/page_header';
    import pageContainer from '@/components/page_container/page_container';
    import pageFooter from '@/components/page_footer/page_footer';

    export default {
        name: 'app',
        components: {
          pageHeader, pageContainer, pageFooter
        }
    }
</script>

<style lang="stylus" scoped>

</style>

