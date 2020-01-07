<template>
    <div>
        <el-form :model="entity"  ref="form" label-width="100px" class="dialog-form">
            <el-tabs :stretch="isExp" v-model="activeName">
                <el-tab-pane label="基本信息" name="orderInfo">
                    <el-col :span="22">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="产品大类" prop="parentId">
                                    <product-type-select style="width:100%" v-model="entity.parentId"
                                                         :clearable="true"></product-type-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="产品小类" prop="productTypeId">
                                    <product-sub-type-select style="width:100%" v-model="entity.productTypeId"
                                                             :parentTypeId="entity.parentId"
                                                             :clearable="true"></product-sub-type-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <product-select :productTypeId="entity.productTypeId"
                                        v-model="entity.productId"
                                        :clearable="true"></product-select>
                        <!--<el-button @click="view">选择产品</el-button>-->
                        <el-row>
                            <el-col :span="12">

                                <el-form-item label="数量" style="width:100%" prop="qty">
                                    <el-input placeholder="数量" v-model="entity.qty"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="单价" style="width:100%" prop="price">
                                    <el-input placeholder="单价" v-model="entity.price"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="金额" style="width:50%" prop="unit">
                            <el-input placeholder="金额" v-model="money" disabled></el-input>
                        </el-form-item>


                        <el-form-item label="备注" style="margin-top: 5px" prop="remark">
                            <el-input placeholder="备注" v-model="entity.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-tab-pane>

            </el-tabs>
        </el-form>
        <v-dialog ref="formDiag" width="80%" title="查询">

            <query-form ref="queryForm"></query-form>
            <div slot="footer">
                <!--<el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>-->
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>
    </div>
</template>
<style lang="less" scoped>
    .orderLine .el-upload-dragger {
        img {
            width: 400px;
            height: 300px;
            // height: 60% !important;
        }
    }
    .el-form-item{
        margin-top: 20px;
    }
    .input-class{
        width: 500px;
        height: 40px;
    }
    .dialog-form {
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

    }
</style>

<script>

    import ProductSubTypeSelect from '@/components/widgets/dongxw/ProductSubTypeSelect.vue';
    import ProductTypeSelect from '@/components/widgets/dongxw/ProductTypeSelect.vue';
    import ProductSelect from '@/components/widgets/dongxw/ProductSelectComplex.vue';
    import ProductSelectForm from '@/components/widgets/dongxw/ProductSelectForm.vue';
    import QueryForm from '@/pages/dongxw/product/ManageQuery.vue';

    const defaultEntity = {
        id: null,
        customerId : null,
        orderId : null,
        productId : null,
        productTypeId : null,
        customerCode : '',
        picUrl : '',
        size: '',
        color : '',
        qty : 0,
        unit : '',
        price : 0,
        currency :'',
        money : 0,
        supplierId :0,
        material :'',
        ibQty : 0,
        ibGw : 0,
        ibNw : 0,
        ibSize : '',
        obQty : 0,
        obGw : 0,
        obNw : 0,
        obSize : '',

        createBy: 0,
        remark : '',
        status: 1
    };
    export default {
        components: {QueryForm,ProductTypeSelect,ProductSelectForm,ProductSubTypeSelect, ProductSelect},
        data() {
            return {
                isExp :false,
                customerId : null,
                orderId : null,
                activeName: 'orderInfo',
                ruleTpl: {when: null, then: null},
                entity: _.cloneDeep(defaultEntity),

                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {
                    parentId: [
                        {
                            required: true,
                        }
                    ], productTypeId: [
                        {
                            required: true,
                        }
                    ], qty: [
                        {
                            type: "number",
                            required: true,
                            trigger: "change"
                        }
                    ],
                    price: [
                        {
                            type: "number",
                            required: true,
                            trigger: "change"
                        }
                    ],

                    productId: [{
                        required: true
                    }],


                    name: [
                        {required: true, message: "名称不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 128,
                            message: "长度在 1 到 128 个字符",
                            trigger: "blur"
                        }
                    ],

                    customerOrderCode: [
                        {required: true, message: "客户订单号", trigger: "blur"},
                        {
                            min: 1,
                            max: 128,
                            message: "长度在 1 到 128 个字符",
                            trigger: "blur"
                        }
                    ],


                    status: [
                        {
                            type: "number",
                            required: true,
                            message: "请选择状态",
                            trigger: "change"
                        }
                    ],



                }
            };
        },
        computed: {
            money: function () {
                return this.entity.qty * this.entity.price;
            }

        },



        methods: {
            view(row) {
                this.$refs.formDiag.init({ queryForm:this.$refs.queryForm,formDiag: this.$refs.formDiag });
                this.$refs.formDiag.show({ queryForm:this.$refs.queryForm,formDiag: this.$refs.formDiag });

            },
            getProps(scope) {
                return this.entity.props.filter(p => p.propScope == scope);
            },
            onRuleDefsLoaded(opts) {
                this.ruleDefs = opts || [];
                this.resetProps();
            },
            onDiscountTypeChange(val) {
                if (val == 3) {
                    //次数只能一次
                    this.entity.discountValue = 1;
                }
            },
            resetProps() {

            },
            setValues(vals) {
                this.resetEntity = _.cloneDeep(vals);
                this.entity = _.cloneDeep(this.resetEntity);
            },
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if ( !this.entity.customerId ) {
                            this.entity.customerId = this.customerId;
                            this.entity.orderId = this.orderId;
                        }
                        let params = Object.assign({}, this.entity);
                        console.log(JSON.stringify(params));
                        // this.$message({
                        //     message: '恭喜你，这是一条成功消息' +this.customerId,
                        //     type: 'success'
                        // });
                        this.$api.dongxw.OrderLine.save(params).then(rsp => {
                            this.$emit("saved", rsp);
                        });
                    }
                });
            },
            resetForm() {
                this.$refs["form"].resetFields();
                this.entity = _.cloneDeep(defaultEntity);
            },
            init(options) {
                this.resetForm();
                if (options.customerId) {
                    this.customerId = options.customerId;
                    this.orderId = options.orderId;
                }
                if (options.id) {
                    this.isDisabled = true;
                    this.$api.dongxw.OrderLine.findById(options.id).then(rr => {
                        let r = rr.data;
                        this.isDisabled = r.status > 0;

                        this.entity = r;

                    });
                } else {
                    this.isDisabled = false;
                }
            }
        },
        mounted() {
            this.$on("init", this.init);
            this.$on("submit", this.submitForm);
        }
    };
</script>
