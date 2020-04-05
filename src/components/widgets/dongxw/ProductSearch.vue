<!-- 选择产品-->
<template>
    <el-form :model="entity" ref="form" label-width="80px" label-position="center":rules="rules">
        <el-row>

            <el-col :span="12">
                <el-form-item  label="产品大类" prop="parentId">
                    <product-type-select style="width:100%" v-model="entity.parentId" :clearable="true">

                    </product-type-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="产品小类" prop="productTypeId">
                    <product-sub-type-select style="width:100%" v-model="entity.productTypeId"
                                             :parentTypeId="entity.parentId" :clearable="true">
                    </product-sub-type-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="24">
                <el-form-item label="产品描述" prop="remark" :style="'color:red'">
                    <el-input style="width:100%" v-model="entity.remark" clearable></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="12">
                <el-form-item label="颜色" style="color:red;width:100%" prop="color">
                    <el-input v-model="entity.color" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="尺寸" style="color:red;width:100%" prop="size">
                    <el-input v-model="entity.size" clearable></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="12">
                <el-form-item label="客款号" style="color:red;width:100% " prop="color">
                    <el-input v-model="entity.code" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="EP款号" style="color:red;width:100% " prop="size">
                    <el-input v-model="entity.epCode" clearable></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :span="24">

            <el-col :span="12">
                <el-form-item prop="s">
                    <el-button @click="refresh" :style="'color:green;width:48%'"
                               plain type="primary">搜索
                    </el-button>
                    <el-button @click="cancel" :style="'color:red;width:48%'" plain>重置搜索条件</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="客户" prop="customerId">
                    <customer-select disabled :style="'color:red;width:100%'" v-model="customerId" clearable
                                     tyle="color:red;width:280px"></customer-select>
                </el-form-item>
            </el-col>

        </el-row>
        <el-row :span="24">
            <el-col :span="24">
                <el-form-item label="产品" prop="id" style="width:100%">

                    <el-select v-model="currentValue" :style="'color:red;width: 100%'" placeholder="请选择"
                               filterable :loading="loading" :clearable="clearable" :disabled="disabled">
                        <el-option v-for="item in options" :key="item.id"
                                   :label="item.code+' | '+item.epCode+' | '+item.remark+' | '+item.color+' | '+item.size"
                                   :value="item.id" :disabled="item.disabled">
                            <span style="float: left">{{ item.code }}</span>
                            <span style="float: left">{{ item.epCode }}</span>
                            <span style="float: left">{{ item.remark }}</span>
                            <span style="float: right">{{ item.color }}</span>
                            <span style="float: right">{{ item.size }}</span>
                            <span style="float: left">{{ (item.customer||{}).custName }}</span>
                        </el-option>
                    </el-select>

                </el-form-item>
            </el-col>
        </el-row>

    </el-form>
</template>
<style lang="less" rel="stylesheet/less" scoped>


    .el-select-dropdown__item span{
        width:80px;
        text-align:center;
    }
</style>

<script>
    import {fetch} from "@/utils";
    import ProductSubTypeSelect from '@/components/widgets/dongxw/ProductSubTypeSelect.vue';
    import ProductTypeSelect from '@/components/widgets/dongxw/ProductTypeSelect.vue';
    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';

    const defaultEntity = {
        parentId: null,
        productTypeId: null,
        id: null,
        remark: null,
        size: null,
        color: null,
        code: null,
        epCode: null,
        customerId: null,
        productTypeId: null,
        parentId: null
    }
    export default {
        components:{ProductTypeSelect,ProductSubTypeSelect,CustomerSelect},
        data () {
            return {
                entity: _.cloneDeep(defaultEntity),
                isExp : true,
                activeName:'tabProduct',
                loading: false,
                options: [],
                rules: {
                }
            }
        },
        props: {
            value: {
                required: true,
            },
            clearable: {
                type: Boolean
            },
            disabled: {
                type: Boolean
            },
            customerId: {
                type: Number
            },

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
            customerId :function(){
                this.$nextTick(() => this.refresh());
            }
        },
        methods: {
            defaultValue()
            {
                return  _.cloneDeep(defaultEntity)
            },

            resetForm() {
                this.$refs["form"].resetFields();
                this.entity = _.cloneDeep(defaultEntity);
            },
            init(options) {
                this.resetForm();
                if (options) {
                    this.options = {
                        prdFlag: 0,//options.prdFLag,
                        customerId: options.customerId
                    }
                    Object.assign(this.entity, options)
                }else{
                    this.options = {
                        prdFlag: 0
                    }
                    Object.assign(this.entity, options)
                }
                this.$nextTick(() => this.refresh());

            },
            cancel() {
                this.entity = this.defaultValue()
                Object.assign(this.entity, this.options)

                this.refresh()
            },
            refresh() {
                if(this.customerId) {
                    this.loading = true
                    this.$api.dongxw.ProductService.query({
                        param: {
                            prdFlag: 0,
                            customerId: this.customerId,
                            productTypeId: this.entity.productTypeId,
                            parentId: this.entity.parentId,
                            color: this.entity.color,
                            size: this.entity.size,
                            code: this.entity.code,
                            epCode: this.entity.epCode,
                            remark: this.entity.remark,

                            isDeleted: false
                        }
                    }).then(rsp => {
                        this.options = rsp.data
                        this.loading = false
                    })
                }
            }
        },
        created() {
            //this.refresh()
        },
        mounted() {
        }
    }
</script>
