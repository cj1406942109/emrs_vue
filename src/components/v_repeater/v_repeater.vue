<template>
  <div class="mt-repeater">
    <slot name="header"></slot>
    <div class="col-md-4">
        <a href="javascript:;" class="btn btn-info" @click="addRow(array, row)"><i class="fa fa-plus"></i> 添加</a>
        <span class="help-block">  </span>
    </div>
    <div class="col-md-10 col-md-offset-2">
        <div >
            <div class="mt-repeater-item" v-for="(item,index) in array" :key="item.id"> 
                <slot :name="index"></slot>
                <div class="mt-repeater-input" @click="removeRow(array, index)">
                    <a href="javascript:;" class="btn btn-danger mt-repeater-delete">
                        <i class="fa fa-close"></i> 删除</a>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name: 'v_repeater',    
    data () {
        return {}
    },
    props: {
        array: {
            type: Array
        },
        row: {
            type: Object
        }
    },
    methods: {
        addRow (array, row) {
            this.array.push(row);
        },
        removeRow (array, index) {
            this.array.splice(index, 1);
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>


