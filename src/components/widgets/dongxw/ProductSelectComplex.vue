<!-- 产品选择-->

<template>
    <el-tabs   tab-position="top" v-model="activeName">

        <el-tab-pane style="background-color: mintcream" id="tabProduct" label="选择产品" name="tabProduct">

            <el-form label-width="100px"  :rules="rules">
                <el-row :span="24">
                    <el-col :span="24">
                        <el-form-item label="产品描述" prop="remark" :style="'color:red'">
                            <el-input style="width:100%" v-model="remark" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="颜色" style="color:red;width:100%" prop="color">
                            <el-input v-model="color" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="尺寸" style="color:red;width:100%" prop="size">
                            <el-input v-model="size" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="客款号" style="color:red;width:100% " prop="color">
                            <el-input v-model="code" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="EP款号" style="color:red;width:100% " prop="size">
                            <el-input v-model="epCode" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="12">
                    <el-form-item label="客户" prop="customerId"  >
                    <customer-select :style="'color:red;width:100%'" v-model="customerId" clearable tyle="color:red;width:280px"></customer-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                     <el-button plain :style="'margin-left:20px;color:green;width:15%'" type="primary" @click="refresh">查询</el-button>
                     <el-button plain :style="'color:red;width:15%'" @click="cancel">取消</el-button>

                    </el-col>
                </el-row>
                    <el-form-item label="产品"  prop="currentValue" style="width:100%">

                     <el-select v-model="currentValue" :style="'color:red;width:100%'" placeholder="请选择" filterable
                               :loading="loading" :clearable="clearable" :disabled="disabled" @change="handleChange">
                        <el-option v-for="item in options" :key="item.id"
                                   :label="item.code+' | '+item.epCode+'|'+item.remark+'|'+item.color+'|'+item.size"
                                   :value="item.id" :disabled="item.disabled">
                            <span style="float: left">{{ item.code }}</span>
                            <span style="float: left">{{ item.epCode }}</span>
                            <span style="float: left">{{ item.remark }}</span>
                            <span style="float: right">{{ item.color }}</span>
                            <span style="float: right">{{ item.size }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    /*.el-selection {*/
         /*background-color: #00438a;*/
    /*}*/
    .el-select-dropdown__item{
       // max-width: 550px;
    }
    .el-select-dropdown__item span{
        width:80px;
        text-align:center;
    }
</style>

<script>
    import {fetch} from "@/utils";
    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';

    export default {
        components:{CustomerSelect},
        data () {
            return {
                isExp : true,
                activeName:'tabProduct',
                loading: false,
                options: [],
                // disOpts: [],
                remark:null,
                size : null,
                color: null,
                code : null,
                epCode: null,
                customerId: null,
                rules: {
                    currentValue: [
                        {required: true, message: "编号不能为空", trigger: "blur"},
                        {
                            required: true,
                            type: Number,
                            trigger: "blur"
                        }
                    ]
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
            cancel() {
                this.remark = null,
                    this.size = null,
                    this.color = null,
                    this.code = null,
                    this.epCode = null,
                    this.customerId = null
                this.refresh();
            },
            refresh() {
                this.loading = true
                this.$api.dongxw.ProductService.query({
                    param: {
                        productTypeId: this.productTypeId,
                        color: this.color,
                        size: this.size,
                        code:this.code,
                        epCode: this.epCode,
                        remark:this.remark,
                        customerId:this.customerId,

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
        },
        mounted() {
            this.customerId=null;
        }
    }
</script>
