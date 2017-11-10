<template>
    <div class="page-content-wrapper">
        <div class="page-content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>

export default {
    name: 'page_content',
    created () {
        this.$store.dispatch('getStaticIndex');
        this.$store.dispatch('getDoctorList');
        this.$store.dispatch('getRecorderList');
    }
}
</script>

<style lang="stylus" scoped>

</style>


