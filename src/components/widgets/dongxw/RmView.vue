
<template>

    <el-form  :model="entity" ref="form" :label-width="labelWidth" class="dialog-form" :rules="rules">

        <el-row :span="24">


            <el-col :span="12">
                <el-form-item label="大类" prop="parentId">
                    <el-input disabled placeholder="大类" disabled v-model="entity.pptCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="小类" prop="productTypeId">
                    <el-input disabled placeholder="小类" disabled v-model="entity.ptCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="物料代码" prop="code">
                    <el-input disabled placeholder="物料代码" disabled v-model="entity.code"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="物料名称" prop="name">
                    <el-input disabled placeholder="物料名称" disabled v-model="entity.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="规格型号" prop="remark">
                    <el-input disabled placeholder="规格型号" disabled v-model="entity.remark"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="颜色" prop="color">
                    <el-input disabled placeholder="颜色" disabled v-model="entity.color"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="尺寸" prop="size">
                    <el-input disabled placeholder="尺寸" disabled v-model="entity.size"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="单位" prop="unit">
                    <el-input disabled placeholder="单位" disabled v-model="entity.unit"></el-input>
                </el-form-item>
            </el-col>

        </el-row>
        <slot name="selectPrd"> </slot>
    </el-form>

</template>
<style lang="less" rel="stylesheet/less" scoped>
    .el-radio-group {
        .el-radio {
            display: flex;
            align-items: center;
        }

        label {
            height: 40px;
        }
        .group-text {
            display: inline-block;
            width: 100px;
        }
        .title-text {
            display: inline-block;
            width: 120px;
        }
    }

    .el-select-dropdown__item{

    }
</style>
<script>
    import {fetch } from "@/utils";

    export default {
        data () {
            return {
                loading: false,
                entity: {
                    ptCode : null ,
                    pptCode: null,
                    customerName : '',
                    parent : null ,
                    remark :''
                },
                rules: {
                }
            }
        },
        props: {
            value: {
                required: true
            },
            clearable: {
                type: Boolean
            },
            labelWidth:
                {
                    required: false,
                    default: '100px'
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
            currentValue: {
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

            resetForm() {
              //  this.$refs["form"].resetFields();
            },
            refresh() {

                this.loading = true
                if (this.value) {
                    this.$nextTick(() =>
                        this.$api.dongxw.ProductService.findById(this.value).then(rsp => {
                            this.entity = rsp.data
                            this.loading = false

                            this.entity.pptCode = this.entity.productType ? this.entity.productType.name : '-'
                            this.entity.ptCode = this.entity.productSubType ? this.entity.productSubType.name : '-'
                            //this.entity.customerName = this.entity.customer ? this.entity.customer.custName : '-'

                        })
                    )
                } else {
                    this.entity = {}
                }
            }
        },
        created() {
            this.refresh()
        }
    }
</script>
