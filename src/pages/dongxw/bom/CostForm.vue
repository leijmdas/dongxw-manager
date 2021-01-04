<template>
    <div>
        <el-form :model="entity" :rules="rules" ref="form" label-width="80px" class="dialog-form">

            <el-row :span="24">
                <el-col :span="4">
                    <el-form-item label="产品" prop="product">
                        <el-input disabled placeholder="产品" v-model="product.code"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-form-item label="材料费用" prop="rmFee">
                        <el-input disabled placeholder="材料费用" v-model="entity.rmFee"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="损耗" prop="lossRm">
                        <el-input disabled placeholder="损耗" v-model="entity.lossRm"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="总费用" prop="totalFee">
                        <el-input disabled placeholder="总费用" v-model="totalFee"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-form-item label="提交人" prop="createBy">
                        <el-input disabled placeholder="提交人" v-model="entity.createBy"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="审核人" prop="auditBy">
                        <el-input disabled placeholder="审核人" v-model="entity.auditBy"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
                <el-row :span="24">
                <el-col :span="4">
                    <el-form-item label="开料" prop="cutRm">
                        <el-input placeholder="开料" v-model="entity.cutRm"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-form-item label="刀模" prop="knifeModel">
                        <el-input placeholder="刀模" v-model="entity.knifeModel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="人工" prop="workFee">
                        <el-input placeholder="人工" v-model="entity.workFee"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="运输" prop="shippingFee">
                        <el-input placeholder="运输" v-model="entity.shippingFee"></el-input>
                    </el-form-item>
                </el-col>
                    <el-col :span="4">
                        <el-form-item label="状态" prop="status">
                            <el-select disabled style="width:100%" v-model="entity.status">
                                <el-option v-for="item in $dongxwDict.store.AUDIT_STATUS" :key="item[0]"
                                           :value="item[0]" :label="item[1]"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" style="margin-left: 10px" @click="save" v-if="product.id">保  存
                        </el-button>

                        <el-button type="primary" style="margin-left: 10px"
                                   :disabled="entity.status!=0&&entity.status!=30" v-if="product.id">提交审核
                        </el-button>
                    </el-col>
                </el-row>
        </el-form>

    </div>
</template>
<style lang="less" scoped>

    .el-input.is-disabled /deep/ .el-input__inner {
        color: darkmagenta;
        background-color: ghostwhite; /*#d0e9c6 rgba(255, 255, 255, 0.8);*/
    }


    .productLogo .el-upload-dragger {
        img {
            width: 200px;
            height: 100px !important;
        }
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
    const defaultEntity = {
        id : null,
        productId : null ,
        totalFee : 0,
        rmFee : 0,
        workFee :0 ,
        cutRm : 0,
        knifeModel : 0,
        lossRm : 0,
        shippingFee:0,

        version : '',
        remark : ''
    };


    export default {
        components: { },
        props: {
            value: {
                required: true
            },

        },
        data() {
            return {

                multiple: true,
                entity: _.cloneDeep(defaultEntity),

                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {
                    cutRm: [
                        {
                            type: "number",
                            required: true,
                            message: "请 ",
                            trigger: "change"
                        }
                    ],

                }
            };
        },
        computed: {

            totalFee: function () {

                let total = parseFloat(this.entity.rmFee)
                    + parseFloat(this.entity.lossRm)
                    + parseFloat(this.entity.cutRm)
                    + parseFloat(this.entity.knifeModel)
                    + parseFloat(this.entity.workFee)
                    + parseFloat(this.entity.shippingFee)
                return total.toFixed(2)
            },
            product: {
                get () {
                    return this.value
                },
                set (val) {
                    this.$emit('input', val)
                }
            }

        },
        watch: {
            product: {
                handler: function(newVal, oldVal) {
                    this.search();
                },
                deep: true
            }
        },
        methods: {
            save() {
                if (this.product) {
                    this.entity.productId = this.product.id
                    this.$api.dongxw.BomCostService.save(this.entity).then(
                        rsp => {
                            this.$msgJsonResult(rsp)
                            this.search()
                        }
                    );
                }
            },
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

            },
            resetForm() {
                this.entity = _.cloneDeep(defaultEntity);
                if (!this.entity.id) {

                    this.entity.createDate = this.$dongxwDict.formatDateZero(new Date())
                }
            },
            search() {

                this.entity = _.cloneDeep(defaultEntity)
                if (this.product&&this.product.id) {
                    this.$api.dongxw.BomCostService.findByByProduct(this.product.id).then(rsp => {
                        if ( rsp.data ) {
                            this.entity = rsp.data;
                        }
                    });
                }

            },

            init(options) {
                this.search()
            }
        },
        mounted() {
            this.$on("init", this.init);
            this.$on("submit", this.submitForm);
        }
    };
</script>
