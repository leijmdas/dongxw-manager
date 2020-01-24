<!-- 产品选择-->

<template>

       <div>
            <div class="panel panel-default panel-search" label-width="100px">
                <el-form :inline="true">
                    <el-form-item label="产品描述" prop="remark" :style="'color:red;width:600px'">
                        <el-input v-model="remark" clearable></el-input>
                    </el-form-item>


                    <el-row :span="18">
                        <el-col :span="11">
                            <el-form-item label="颜色" style="color:red;width:320px" prop="color">
                                <el-input v-model="color" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="尺寸" style="color:red;width:320px" prop="size">
                                <el-input v-model="size" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :span="18">
                        <el-col :span="11">
                            <el-form-item label="客款号" style="color:red;width:320px" prop="color">
                                <el-input v-model="code" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="EP款号" style="color:red;width:320px" prop="size">
                                <el-input v-model="epCode" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="客户" prop="id" :style="'color:red;width:600px'">
                        <customer-select v-model="customerId" clearable tyle="color:red;width:280px"></customer-select>

                        <el-button type="primary" @click="refresh">过滤</el-button>
                        <el-select v-model="currentValue" :style="'color:red;width:500px'" placeholder="请选择" filterable
                                   :loading="loading" :clearable="clearable" :disabled="disabled"
                                   @change="handleChange">
                            <el-option v-for="item in options" :key="item.id"
                                       :label="item.code+'--'+item.epCode+'--'+item.remark+'-'+item.color+'-'+item.size"
                                       :value="item.id" :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
            </div>
            <v-table ref="table" :page="page" :table-minheight="450" @dataloaded="onDataloaded"
                     @row-dblclick="onRowDbclick">

                <el-table-column prop="code" label="编码" width="120">
                </el-table-column>
                <el-table-column prop="name" label="名称" width="200">
                </el-table-column>
            </v-table>
       </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .el-selection {
         background-color: #00438a;
    }
</style>

<script>
    import {fetch} from "@/utils";
    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';

    export default {
        components:{CustomerSelect},
        data () {
            return {
                activeName:'tabProduct',
                loading: false,
                options: [],
                // disOpts: [],
                remark:null,
                size : null,
                color: null,
                code : null,
                epCode: null,
                customerId: null
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
                        prdFlag : 0,
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
