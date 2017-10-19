<template>
    <div>
        <div :class="className">
            <select name="province" class="form-control" v-model="location.province">
                <option value="" disabled>请选择省</option>
                <option v-for="province in provinceList" :key="province" :value="province">{{province}}</option>
            </select>
        </div>
        <div :class="className">
            <select name="city" class="form-control" v-model="location.city" :disabled="!cityList||cityList.length==0">
                <option value="" disabled>请选择市</option>
                <option v-for="city in cityList" :key="city" :value="city">{{city}}</option>
            </select>
        </div>
        <div :class="className" v-if="grade > 2">
            <select name="area" class="form-control" v-model="location.area" :disabled="!areaList||areaList.length==0">
                <option value="" disabled>请选择区</option>
                <option v-for="area in areaList" :key="area" :value="area">{{area}}</option>
            </select>
        </div>
        <div :class="className" v-if="grade > 3">
            <select name="town" class="form-control" v-model="location.town" :disabled="!townList||townList.length==0">
                <option value="" disabled>请选择街道</option>
                <option v-for="town in townList" :key="town" :value="town">{{town}}</option>
            </select>
        </div>    
    </div>
</template>

<script>
import address4 from './address4.json';

export default {
    props: {
        location: {
            type: Object,
            default: function () {                
                if(this.grade==2) {
                    return {
                        province: '',
                        city: '',
                    }
                }
                if(this.grade==3) {
                    return {
                        province: '',
                        city: '',
                        area: '',
                    }
                }
                if(this.grade==4) {
                    return {
                        province: '',
                        city: '',
                        area: '',
                        town: ''                        
                    }
                }
            }
        },
        grade: {
            type: Number,
            validator: function (value) {
                 return  value >=2 && value <=4
            },
            default: 3
        },
        className: {
            type: String,
            default: 'col-md-3'
        }
    },
    data() {
        return {
            provinceList: [],
            cityList: [],
            areaList: [],
            townList: []            
        }
    },
    created: function () {
        for(var province in address4) {
            this.provinceList.push(province);            
        }
        if(this.location.province) {
            for (var city in address4[this.location.province]) {
                this.cityList.push(city);
            }
        } 
        if(this.location.city) {
            for (var area in address4[this.location.province][this.location.city]) {
                this.areaList.push(area);
            }
        } 
        if(this.location.area) {
            for (var town in address4[this.location.province][this.location.city][this.location.area]) {
                this.townList.push(address4[this.location.province][this.location.city][this.location.area][town]);
            }
        } 
    },
    watch: {
        'location.province':{
            handler: 'updateCity'
        },
        'location.city':{
            handler: 'updateArea'
        },
        'location.area':{
            handler: 'updateTown'
        },
    },
    methods: {
        updateCity (val, oldVal) {
            if(val!=oldVal) {
                this.cityList = [];                
                this.areaList = [];                
                this.townList = [];
                if(address4[val]){
                    for(var city in address4[val]) {
                       this.cityList.push(city)
                    }
                }
                this.location.city = '';                
                if(this.grade > 3){
                    this.location.area = '';    
                    this.location.town = '';
                }else if(this.grade > 2){
                    this.location.area = '';
                }
            }
        },
        updateArea (val, oldVal) {
            if(this.location.city){
                if(val!=oldVal) {
                    this.areaList = [];
                    this.townList = [];
                    for(var area in address4[this.location.province][val]) {
                        this.areaList.push(area)
                    }                    
                    if(this.grade > 3){
                        this.location.area = '';
                        this.location.town = '';
                    }else if(this.grade > 2){
                        this.location.area = '';
                    }
                }
            }
            
        },
        updateTown (val, oldVal) {
            if(this.location.area){
                if(val!=oldVal) {
                    this.townList = [];
                    for(var town in address4[this.location.province][this.location.city][val]) {
                        this.townList.push(address4[this.location.province][this.location.city][val][town])
                    }
                    if(this.grade > 3){
                        this.location.town = '';                        
                    }
                }
            }
        }       
    }
}
</script>

<style lang="stylus" scoped>
    
</style>


