<!-- 名称选择-->

<template>

    <el-select v-model="currentValue" placeholder="请选择" filterable :loading="loading"
               :clearable="clearable" :disabled="disabled" @change="handleChange">
        <el-option v-for="item in options" :key="item.id"
                   :label="item.code+'-'+item.remark+'-'+item.color+'-'+item.size"
                   :value="item.id" :disabled="item.disabled">
        </el-option>
    </el-select>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    /*.el-selection {*/
    /*background-color: #00438a;*/
    /*}*/
    .el-select-dropdown__item{
       // max-width: 550px;
    }
</style>
<script>
    import {fetch } from "@/utils";

    export default {
        data () {
            return {
                loading: false,
                options: [],
                disOpts: [],
            }
        },
        props: {
            value: {
                required: true
            },
            clearable: {
                type: Boolean
            },
            disabled: {
                type: Boolean
            },
            productTypeId: {
                // type: Number,
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
            productTypeId: {
                handler: function(newVal, oldVal) {
                    this.refresh();
                },
                deep: true
            }
        },
        methods: {
            handleChange(val) {
                this.$emit('change', val)
            },
            refresh() {
                this.loading = true
                this.$api.dongxw.ProductService.query({
                    param: {
                        productTypeId: this.productTypeId,
                        prdFlag : 0,
                        isDeleted: false
                    }
                }).then(rsp => {
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
