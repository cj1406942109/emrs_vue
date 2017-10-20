<template>
    <div class="page-content-wrapper">
        <div class="page-content">
            <keep-alive>
                <router-view :pagedata="pagedata"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import config from '@/config'
export default {
    name: 'page_content',
    data () {
        return {
            pagedata: {}
        }
    },
    created () {
        this.$http.post(config.apiHost + '/index/getIndex').then(response => {
            var responseData = response.body;
            if (responseData.status) {
                this.pagedata = responseData.data;
            }
            this.$http.post(config.apiHost + '/user/getAllDoctorIdAndName').then(response => {
                var responseData = response.body;
                if (responseData.status) {
                    this.$set(this.pagedata,'doctorList', responseData.data);
                    this.$set(this.pagedata,'recorderList', responseData.data);
                }
            }, response => {
                console.log(response);
            });
        }, response => {
            console.log(response);
        });    
    }
}
</script>

<style lang="stylus" scoped>

</style>


