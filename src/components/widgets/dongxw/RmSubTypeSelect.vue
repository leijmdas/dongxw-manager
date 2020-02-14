<!-- 名称选择-->

<template>
    <el-select v-model="currentValue" placeholder="请选择" filterable :loading="loading" :clearable="clearable" :disabled="disabled" @change="handleChange">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: left">{{ item.code }}</span>
        </el-option>
    </el-select>
</template>
<style rel="stylesheet/less" lang="less" scoped>

    .el-select-dropdown__item span{
        width:100px;
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
            value: {
                required: true
            },
            clearable: {
                type: Boolean
            },
            disabled: {
                type: Boolean
            },
            parentTypeId: {
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
            parentTypeId: {
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
                this.$api.dongxw.ProductTypeService.query({
                    orderBys: 'code|asc',
                    param: {
                        parentId: this.parentTypeId,
                        prdFlagNot : 0,
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
