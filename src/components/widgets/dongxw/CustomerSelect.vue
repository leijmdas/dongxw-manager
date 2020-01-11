<!--模板名称选择-->

<template>
    <el-select :width="width" v-model="currentValue" placeholder="请选择" filterable :loading="loading" :clearable="clearable" :disabled="disabled" @change="handleChange">
        <el-option  v-for="item in options" :key="item.id" :label="item.custName" :value="item.id" :disabled="item.disabled">
        </el-option>
    </el-select>
</template>
<style rel="stylesheet/less" lang="less">
    /*.el-select {*/
        /*width: 250px;*/
    /*}*/
</style>
<script>
    import { fetch } from "@/utils";

    export default {
        data () {
            return {
                loading: false,
                options: [],
                disOpts: []
            }
        },
        props: {
            fnChange:{
                required:false,
                type:Function
            },
            value: {
                required: true
            },
            width: {
                type: String,
                required: false,
                defult: "60%"
            },
            clearable: {
                type: Boolean
            },
            disabled: {
                type: Boolean
            },
            customerId: {
                //type: Number,

            }
        },
        computed: {
            currentValue: {
                get () {
                    return this.value
                },
                set (val) {
                    this.$emit('input', val)
                }
            }
        },
        watch: {
            customerId: {
                handler: function(newVal, oldVal) {
                    this.value = ''
                    this.currentValue = ''
                    this.refresh();
                },
                deep: true
            }
        },
        methods: {
            handleChange (val) {
                this.$emit('change', val)
                if(this.fnChange){
                    this.fnChange();
                }
            },
            refresh () {
                this.loading = true
                this.$api.dongxw.CustomerService.query({param: {isDeleted:false}}).then(rsp => {
                    this.options = rsp.data
                    this.loading = false
                })
            }
        },
        created () {
            this.refresh()
        }
    }
</script>
