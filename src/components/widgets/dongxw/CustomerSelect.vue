<!--模板名称选择-->

<template>
    <el-select :width="width" :height="'250px'"v-model="currentValue" placeholder="请选择" popper-append-to-body
               filterable  remote  :remote-method="remoteQry"
               :loading="loading" :clearable="clearable" :disabled="disabled" @change="handleChange">
        <el-option v-for="item in options" :key="item.id" :label="item.custName" :value="item.id"
                   :disabled="item.disabled">
            <span style="float: left">{{  item.custNo +':'+item.custName   }}</span>
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
            remoteQry(codeName){
                this.refresh(codeName);
            },
            handleChange (val) {
                this.$emit('change', val)
                if(this.fnChange){
                    this.fnChange();
                }
            },
            refresh(codeName) {
                let chinaReg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                let isChina = chinaReg.test(codeName);
                this.loading = true
                this.$api.dongxw.CustomerService.query(
                    {
                        limit: 100,
                        start: 0,
                        orderBys: "custNo|asc",
                        param: {
                            isDeleted: false,
                            //custNo: isChina ? null : codeName,
                            custName:   codeName

                        }
                    }
                ).then(rsp => {
                    this.options = rsp.data
                    this.loading = false
                })
            }
        },
        created() {
            this.refresh()
        }
    }
</script>
