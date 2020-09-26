<template>
    <el-form  :model="entity" :rules="rules" ref="form" label-width="100px" class="dialog-form">

        <fieldset align="top" style="margin-left:10px; margin-right: 10px">
            <legend>送货单产品</legend>


            <el-row :span="24" style="margin-top: 5px ">
                <el-col :span="12">
                    <el-form-item label="客订单号" prop="orderCode">
                        <el-input disabled placeholder="客订单号" v-model="entity.orderCode"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="产品编码" prop="product.code">
                        <el-input disabled placeholder="产品编码" v-model="entity.product.code"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="规格描述" prop="product.remark">
                        <el-input disabled placeholder="规格描述" v-model="entity.product.remark"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="颜色" prop="product.color">
                        <el-input disabled placeholder="颜色" v-model="entity.product.color"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="尺寸" prop="product.size">
                        <el-input disabled placeholder="尺寸" v-model="entity.product.size"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单位" prop="product.unit">
                        <el-input disabled placeholder="单位" v-model="entity.product.unit"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="订单数量" prop="qtyOrder">
                        <el-input disabled placeholder="订单数量" v-model="entity.qtyOrder"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="已发数量" prop="qtyFinish">
                        <el-input disabled placeholder="已发数量" v-model="entity.qtyFinish"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发货数量" prop="qty">
                        <el-input  placeholder="发货数量" v-model="entity.qty"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="单价" prop="price">
                        <el-input disabled placeholder="单价" v-model="entity.price"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="金额" prop="money">
                        <el-input disabled placeholder="金额" v-model="money"/>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="备品数量" prop="qtyBackup">
                        <el-input disabled placeholder="备品数量" v-model="entity.qtyBackup"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="备注" prop="code">
                        <el-input   placeholder="备注" v-model="entity.remark"></el-input>
                    </el-form-item>
                </el-col>


            </el-row>


        </fieldset>
        <v-dialog ref="formDiag" :appendToBody="true" title="查找" :width="'48%'">
            <cust-find  v-model="entity.customerId" :confirmFind="confirmFind" :cancelFind="cancelFind">            </cust-find>

        </v-dialog>

    </el-form>

</template>
<style lang="less" scoped>
    .orderLogo .el-upload-dragger {
        img {
            width: 400px;
            height: 300px;
            // height: 60% !important;
        }
    }

    .input-class {
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

    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';
    import OrderMasterSelect from '@/components/widgets/dongxw/OrderMasterSelect.vue';
    import CustFind from '@/components/widgets/dongxw/CustomerMultiSelect.vue';

    const defaultEntity = {

        id: null,

        code:'',
        custName :'',
        issueAddr:'',
        tel:'',
        contact:'',
        calFlag:false,
        tradeType:30,
        tradeTime:  new Date() ,
        issueWh: '',
        payMode:'月结30天',

        customerId: 0 ,
        orderId: 0,
        poId: 0,
        prdName: "0",
        sheetBy: "0",
        status: 0,
        supplyId: 0,
        tradeBy: "0",
        useDpt: " ",
        useExp: " ",
        wh: 0

    };
    export default {
        components: {CustFind,OrderMasterSelect, CustomerSelect},

        data: function () {
            return {};
        },
        computed:{
          money :{
              get () {
                  return this.entity.price * this.entity.qty
              }
          }
        },
        data() {
            return {

                disables: false,
                isExp: false,
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
        methods: {
            findCust() {
                this.$refs.formDiag.show();

            },
            confirmFind(row) {
                this.$refs.formDiag.hide();
                this.entity.customerId = row.id
                this.$api.dongxw.CustomerService.findById(this.entity.customerId).then(rsp => {
                    let cust = rsp.data
                    this.entity.contact = cust.contact
                    this.entity.tel = cust.tel
                    this.entity.custName = cust.custName
                    this.entity.issueAddr = cust.addr

                })
            },
            cancelFind() {
                this.$refs.formDiag.hide();
            },

            getProps(scope) {
                return this.entity.props.filter(p => p.propScope == scope);
            },
            onRuleDefsLoaded(opts) {
                this.ruleDefs = opts || [];
                this.resetProps();
            },
            onDiscountTypeChange(val) {

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

                        let params = Object.assign({}, this.entity);
                        this.$api.dongxw.TradeService.save(params).then(rsp => {
                            this.$emit("saved", rsp);
                        });
                    }
                });
            },
            resetForm() {
                //this.$refs["form"].resetFields();

            },

            init(options) {
                this.resetForm();
                if (options.id) {
                    this.isDisabled = true;
                    this.$api.dongxw.TradeService.findById(options.id).then(rsp => {
                        this.entity = rsp.data;
                        this.isDisabled = this.entity.calFlag;


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
