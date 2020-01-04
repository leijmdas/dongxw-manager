<template>
    <el-form :model="entity" :rules="rules" ref="form" label-width="120px" class="dialog-form">
        <el-tabs :stretch="isExp" v-model="activeName">
            <el-tab-pane label="订单信息" name="orderInfo">


                <fieldset align="bottom">
                    <el-row :span="22" style="margin-top: 10px">
                        <el-col :span="11">
                            <el-form-item label="客户" prop="customerId"
                                          :rules="[{ required: true}]">
                                <customer-select :width="'200px'" v-model="entity.customerId"
                                                 :clearable="true"></customer-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="状态" prop="status">

                                <el-select v-model="entity.status">
                                    <el-option v-for="item in $dongxwDict.store.ORDER_STATUS" :key="item[0]"
                                               :value="item[0]" :label="item[1]"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :span="22">
                        <el-col :span="11">
                            <el-form-item label="EP订单号" prop="epOrderCode">
                                <el-input placeholder="EP订单号" v-model="entity.epOrderCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="客户订单号" prop="customerOrderCode">
                                <el-input placeholder="客户订单号" v-model="entity.customerOrderCode"></el-input>

                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row :span="22">
                        <el-col :span="11">
                            <el-form-item label="结算币种" prop="moneyType">
                                <el-select v-model="entity.moneyType">
                                    <el-option v-for="item in $dongxwDict.store.MONEY_TYPE" :key="item[0]"
                                               :value="item[0]" :label="item[1]"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="业务员" prop="businessBy">
                                <el-input placeholder="业务员" v-model="entity.businessBy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :span="22" style="margin-top: 10px ">
                        <el-col :span="11">
                            <el-form-item label="下单日期" prop="" :rules="[{ required: true}]">
                                <el-date-picker :disabled="disables"
                                                v-model="entity.orderDate"
                                                format="yyyy 年 MM 月 dd 日"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                                type="date"
                                                placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <!--format="yyyy-MM-dd"-->
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="客户交货日期" prop="" :rules="[{ required: true}]">
                                <el-date-picker :disabled="disables"
                                                v-model="entity.customerIssueDate"
                                                format="yyyy 年 MM 月 dd 日"
                                                value-format="yyyy-MM-dd HH:mm:ss"
                                                type="date"
                                                placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :span="22" style="margin-top: 10px ">
                        <el-col :span="11">
                            <el-form-item label="验货日期" prop="">
                                <el-date-picker
                                    :disabled="disables"
                                    v-model="entity.checkDate"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">

                            <el-form-item label="工厂交货日期" prop="">
                                <el-date-picker
                                    :disabled="disables"
                                    v-model="entity.factroyIssueDate"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :span="22">
                        <el-col :span="11">
                            <el-form-item label="预付发票编号" prop="invoiceNoIni">
                                <el-input placeholder="预付发票编号" v-model="entity.invoiceNoIni"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="正式发票编号" prop="invoiceNo">
                                <el-input placeholder="正式发票编号" v-model="entity.invoiceNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :span="22" style="margin-top: 10px ">
                        <el-col :span="22">
                            <el-form-item label="备注" prop="remark">
                                <el-input placeholder="备注" v-model="entity.remark"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>



                </fieldset>


            </el-tab-pane>
            <el-tab-pane height="400px" label="订单原件" name="orderPic">

                <div style="margin:10px" class="orderLogo">
                    <v-image-uploader :form-data="{}" :multiple=true v-model="entity.customerOrderImg">

                    </v-image-uploader>
                    <!--<div style="text-align:center"> 订单原件</div>-->
                </div>
                <!--<el-form-item label="订单原件" prop="customerOrderImg">-->
                <!--<el-input placeholder="订单原件" v-model="entity.customerOrderImg" disabled></el-input>-->
                <!--</el-form-item>-->

            </el-tab-pane>

        </el-tabs>
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
    import SupplierSelect from '@/components/widgets/dongxw/SupplierSelect.vue';

    const defaultEntity = {
        id: null,
        customerId: null,
        status: 0,
        moneyType:100,
        customerOrderCode: '',
        epOrderCode: '',
        businessBy: '',
        invoiceNo: '',
        invoiceNoIni: '',
        remark: '',
        materialRemark: '',
        customerOrderImg: null,
        orderDate: null,
        customerIssueDate: null,
        checkDate: null,
        factroyIssuseDate: null,
        invoiceId : 0,
        invoiceIdIni:0
    };
    export default {
        components: {CustomerSelect, SupplierSelect},
        data() {
            return {
                activeName: 'orderInfo',
                isExp: false,
                ruleTpl: {when: null, then: null},
                entity: _.cloneDeep(defaultEntity),
                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {

                    name: [
                        {required: true, message: "名称不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 128,
                            message: "长度在 1 到 128 个字符",
                            trigger: "blur"
                        }
                    ],
                    epOrderCode: [
                        {required: true, message: "EP订单号", trigger: "blur"},
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
                    startOn: [
                        {
                            required: true,
                            message: "请选择开始时间",
                            trigger: "blur"
                        }
                    ],
                    merchantId: [
                        {
                            type: "number"
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

                    limitDays: [
                        {
                            required: false
                        }
                    ],
                    limitTotalNum: [
                        {
                            required: false
                        }
                    ],
                    isMerchant: [
                        {
                            required: true
                        }
                    ],
                    tip: [
                        {
                            required: true,
                            message: "活动提示不能为空",
                            trigger: "blur"
                        }
                    ],
                    limitPermanTimes: [
                        {
                            required: true,
                            message: "限次不能为空",
                        }
                    ],
                    visibility: [
                        {
                            required: false,
                        }
                    ],

                    effectRange: [
                        {
                            required: true,
                            message: "请选择活动时间"
                        }
                    ]
                }
            };
        },
        methods: {
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
                let ruleCode = this.entity.ruleTplCode;
                if (!ruleCode) {
                    return;
                }
                if (!this.ruleDefs) {
                    return;
                }
                let opt = this.ruleDefs.filter(tmp => tmp.code == ruleCode)[0];
                if (!opt) return;
                this.ruleTpl = opt;
                let whenFields = opt.when == null ? [] : opt.when.fields;
                let thenFields = opt.then == null ? [] : opt.then.fields;
                let oldProps = this.oldProps || [];

                function field2Props(fields, type) {
                    let rs = [];
                    fields.forEach(f => {
                        let tmpOlds = oldProps.filter(
                            p => p.propKey == f.prop && p.propScope == type
                        );
                        let tmpOld = tmpOlds.length > 0 ? tmpOlds[0] : null;
                        rs.push({
                            propKey: f.prop,
                            propName: f.name,
                            propValue: tmpOld == null ? "" : tmpOld.propValue,
                            remark: f.remark,
                            required: !!f.required,
                            propScope: type
                        });
                    });
                    return rs;
                }

                let whenProps = field2Props(whenFields || [], "when");
                let thenProps = field2Props(thenFields || [], "then");
                this.entity.props = [];
                this.entity.props = this.entity.props.concat(whenProps).concat(thenProps);
            },
            setValues(vals) {
                this.resetEntity = _.cloneDeep(vals);
                this.entity = _.cloneDeep(this.resetEntity);
            },
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        let params = Object.assign({}, this.entity);


                        // params.startOn = this.entity.effectRange[0];
                        // params.endOn = this.entity.effectRange[1];

                        this.$api.dongxw.OrderMaster.save(params).then(rsp => {
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
                    this.isDisabled = true;//this.entity.status > 0;
                    this.$api.dongxw.OrderMaster.findById(options.id).then(rr => {
                        let r = rr.data;
                        this.isDisabled = r.status > 0;

                        this.entity = r;

                        //this.oldProps = r.props || [];
                        //this.resetProps();
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
