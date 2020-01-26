<template>
    <div>
        <el-col :span="23">
            <el-form :model="entity" label-width="100px" :rules="rules" ref="form" class="dialog-form">

                <product-view v-model="entity.productId" :style="'margin-top: 20px'" ref="productView">

                </product-view>
                <el-collapse>

                    <el-collapse-item title="选择产品" style="margin-left:4%;width:96%" >
                        <product-select-complex v-model="entity.productId" :style="'margin-bottom: -20px'"
                                                :customerId="entity.customerId" ref="productSelectDlg"
                                                :clearable="true">
                        </product-select-complex>
                    </el-collapse-item>
                </el-collapse>
                <el-row>
                    <!--<el-col :span="24">-->
                        <!--<el-form-item label="产品" style="width:100%" prop="productId">-->
                            <!--<el-input disabled placeholder="产品" v-model="entity.productId"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
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
                <el-row>
                    <el-col :span="12">

                        <el-form-item label="金额" prop="money">
                            <el-input placeholder="金额" v-model="money" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">

                        <el-form-item label="建档时间" prop="createDate">
                            <el-input disabled placeholder="建档时间" v-model="entity.createDate" disabled></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注" style="margin-top: 10px" prop="remark">
                    <el-input placeholder="备注" type="textarea" :rows="2" v-model="entity.remark"></el-input>
                </el-form-item>

            </el-form>
        </el-col>

    </div>
</template>
<style lang="less" scoped>
    .orderLine .el-upload-dragger {
        img {
            width: 400px;
            height: 300px;
        }
    }
    .el-form-item{
        margin-top: 10px;
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
    // import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';
    // import ProductSubTypeSelect from '@/components/widgets/dongxw/ProductSubTypeSelect.vue';
    // import ProductTypeSelect from '@/components/widgets/dongxw/ProductTypeSelect.vue';

    import ProductView from '@/components/widgets/dongxw/ProductView.vue';
    import ProductSelectComplex from '@/components/widgets/dongxw/ProductSelectComplex.vue';

    const defaultEntity = {
        id: null,
        customerId: null,
        orderId : null,
        productId : null,
        productTypeId : null,

        qty : 0,
        price : 0,
        currency :'',
        money : 0,

        createBy: 0,
        remark : '',
        status: 1
    };
    export default {
        components: {ProductView, ProductSelectComplex},
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

                }
            };
        },
        computed: {
            money: function () {
                this.entity.money = Math.round(100*this.entity.qty * this.entity.price)/100
                return this.entity.money
            }

        },



        methods: {

            getProps(scope) {
                return this.entity.props.filter(p => p.propScope == scope);
            },
            onRuleDefsLoaded(opts) {
                this.ruleDefs = opts || [];
                this.resetProps();
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
                        if (!this.entity.id) {
                            this.entity.orderId = this.order.id;
                            this.entity.customerId = this.order.customerId

                        }

                        this.$api.dongxw.OrderLine.save(this.entity).then(rsp => {
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
                if (options.id) {
                    this.isDisabled = true;
                    this.$api.dongxw.OrderLine.findById(options.id).then(rr => {
                        let r = rr.data;
                        this.isDisabled = r.status > 0;
                        this.entity = r;
                    });
                } else {
                    if (options.order) {

                        this.order = options.order;
                        this.entity.orderId = this.order.id
                        this.entity.customerId = this.order.customerId
                        this.entity.product = {
                            customerId: this.order.customerId,
                            productTypeId: null,
                            parentId : null ,
                            id : null ,
                        }
                    }

                }

            }
        },
        mounted() {
            this.$on("init", this.init);
            this.$on("submit", this.submitForm);
        }
    };
</script>
