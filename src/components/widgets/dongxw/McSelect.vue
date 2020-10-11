<!--模板名称选择-->

<template>
    <el-select :width="width" :height="'250px'" v-model="currentValue" placeholder="请选择" popper-append-to-body
               filterable
               :loading="loading" :clearable="clearable" :disabled="disabled" @change="handleChange">
        <el-option  v-for="item in options" :key="item.ym" :label="item.ym" :value="item.ym" :disabled="item.disabled">

            <span style="float: left">{{ item.ym }}</span>

        </el-option>
    </el-select>
</template>
<style rel="stylesheet/less" lang="less" scoped>
    /*.el-select {*/
        /*width: 250px;*/
    /*}*/
    .el-select-dropdown__item span{
        width:160px;
        text-align:left;
    }
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
                defult: "120%"
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
            // customerId: {
            //     handler: function(newVal, oldVal) {
            //         this.value = ''
            //         this.currentValue = ''
            //         this.refresh();
            //     },
            //     deep: true
            // }
        },
        methods: {
            remoteQry(custName){
                this.refresh(custName);
            },
            handleChange (val) {
                this.$emit('change', val)
                if(this.fnChange){
                    this.fnChange();
                }
            },
            refresh(custName) {
                this.loading = true
                this.$api.dongxw.MonthCloseService.queryMc(
                    {
                        limit: 100,
                        start: 0, orderBys: "ym|desc",
                        param: {
                            isDeleted: false,
                        }
                    }
                ).then(rsp => {
                    this.options = rsp.data
                    this.loading = false
                    if (this.currentValue === null) {

                        this.currentValue = this.options[0].ym
                        this.handleChange(this.currentValue)
                    }
                })
            }
        },
        created() {
            this.refresh()
        }
    }
</script>
