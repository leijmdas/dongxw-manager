
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
                <el-form-item label="客款号" prop="code">
                    <el-input disabled placeholder="客款号" disabled v-model="entity.code"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="EP款号" prop="epCode">
                    <el-input disabled placeholder="EP款号" disabled v-model="entity.epCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="产品描述" prop="remark">
                    <el-input disabled placeholder="产品描述" disabled v-model="entity.remark"></el-input>
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
            <el-col :span="12">
                <el-form-item label="单价" prop="unit">
                    <el-input disabled placeholder="单价" disabled v-model="entity.price"></el-input>
                </el-form-item>
            </el-col>
           <el-col :span="12">
                <el-form-item label="客户" prop="customerName">
                    <el-input disabled placeholder="客户" disabled v-model="entity.customerName"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item v-if="qty>=0" label="数量" prop="qty">
                    <el-input disabled placeholder="数量" v-model="qty"></el-input>
                </el-form-item>
            </el-col>
            <slot slot="view"></slot>
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
    .el-input.is-disabled /deep/ .el-input__inner {
        color: darkmagenta;
        background-color:  ghostwhite;  /*rgba(255, 255, 255, 0.8);*/
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
            setPrice: {
                type: Function

            },
            qty: {
                required: false,
                default : -1
            },
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

                            this.entity.pptCode = this.entity.productType ? this.entity.productType.code : '-'
                            this.entity.ptCode = this.entity.productSubType ? this.entity.productSubType.code : '-'
                            this.entity.customerName = this.entity.customer ? this.entity.customer.custName : '-'
                            if(this.setPrice){
                                this.setPrice(this.entity);
                            }
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
