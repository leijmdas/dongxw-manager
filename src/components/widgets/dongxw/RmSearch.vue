<!-- 选择产品-->
<template>
    <el-form :model="entity" ref="form" label-width="80px" label-position="center":rules="rules">
        <el-row>

            <el-col :span="12">
                <el-form-item  label="大类" prop="parentId">
                    <rm-type-select style="width:100%" v-model="entity.parentId" :clearable="true">

                    </rm-type-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="小类" prop="productTypeId">
                    <rm-sub-type-select style="width:100%" v-model="entity.productTypeId"
                                             :parentTypeId="entity.parentId" :clearable="true">
                    </rm-sub-type-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :span="24">

            <el-col :span="12">
                <el-form-item label="物料代码" style="color:red;width:100% " prop="code">
                    <el-input v-model="entity.code" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="物料名称" prop="name" :style="'color:red'">
                    <el-input style="width:100%" v-model="entity.name" clearable></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="12">
                <el-form-item label="规格型号" style="color:red;width:100%" prop="remark">
                    <el-input v-model="entity.remark" clearable></el-input>
                </el-form-item>
            </el-col>        <el-col :span="12">
                <el-form-item label="颜色" style="color:red;width:100%" prop="color">
                    <el-input v-model="entity.color" clearable></el-input>
                </el-form-item>
            </el-col>



            <el-button @click="refresh" :style="'margin-left:2%;color:green;width:23%'"
                       plain type="primary">搜索        </el-button>
            <el-button @click="cancel" :style="'color:red;width:23%'" plain>重置搜索条件</el-button>

        </el-row>
        <el-row :span="24">
            <el-col :span="24">
                <el-form-item label="物料" prop="id" style="width:100%">

                    <el-select v-model="currentValue" :style="'color:red;width: 100%'" placeholder="请选择"
                               filterable :loading="loading" :clearable="clearable" :disabled="disabled">
                        <el-option v-for="item in options" :key="item.id"
                                   :label="item.code+' | '+item.name+' | '+item.remark+' | '+item.color+' | '+item.size"
                                   :value="item.id" :disabled="item.disabled">
                            <span style="float: left">{{ item.code }}</span>
                            <span style="float: left">{{ item.epCode }}</span>
                            <span style="float: left">{{ item.remark }}</span>
                            <span style="float: right">{{ item.color }}</span>
                            <span style="float: right">{{ item.size }}</span>
                        </el-option>
                    </el-select>

                </el-form-item>
            </el-col>
        </el-row>

    </el-form>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .el-input  /deep/ .el-input__inner {
        color: darkmagenta;
        background-color: ghostwhite;
        /*rgba(255, 255, 255, 0.8);*/
    }
    .el-selection  {
        color: darkmagenta;
        background-color: darkgrey;
        /*rgba(255, 255, 255, 0.8);*/
    }
    .el-select-dropdown__item span{
        width:80px;
        text-align:center;
    }
</style>

<script>
    import {fetch} from "@/utils";
    import RmSubTypeSelect from '@/components/widgets/dongxw/RmSubTypeSelect.vue';
    import RmTypeSelect from '@/components/widgets/dongxw/RmTypeSelect.vue';
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
        components:{RmSubTypeSelect,RmTypeSelect,CustomerSelect},
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
                        prdFlagNot: 0, //options.prdFLag,
                        customerId: 0, //options.customerId
                    }
                    Object.assign(this.entity, options)
                }else{
                    this.options = {
                        prdFlagNot: 0,
                        customerId: 0
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
                this.loading = true
                this.$api.dongxw.ProductService.query({
                    param: {
                        prdFlagNot : 0,
                        customerId : 0,
                        productTypeId: this.entity.productTypeId,
                        parentId: this.entity.parentId,
                        color: this.entity.color,
                        size: this.entity.size,
                        code:this.entity.code,
                        epCode: this.entity.epCode,
                        remark:this.entity.remark,

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
        }
    }
</script>
