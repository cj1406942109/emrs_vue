<template>
    <div class="page-container">
        <sidebar></sidebar>
        <page-content></page-content>
    </div>
</template>

<script>
import sidebar from '@/components/sidebar/sidebar.vue';
import pageContent from '@/components/page_content/page_content.vue';

export default {
    name: 'page_container',
    data () {
        return {}
    },
    components: {
        sidebar, pageContent
    }
}
</script>

<style lang="stylus" scoped>

</style>


