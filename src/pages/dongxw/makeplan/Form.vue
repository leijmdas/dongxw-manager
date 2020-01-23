<template>
    <el-form :model="entity" :rules="rules" ref="form" label-width="120px" class="dialog-form">

        <fieldset align="top">
            <el-row :span="22">
                <el-col :span="11">
                    <el-form-item label="客款号" prop="code">
                        <el-input disabled placeholder="客款号" v-model="product.code"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="EP款号" prop="epCode">
                        <el-input disabled placeholder="EP款号" v-model="product.epCode"></el-input>

                    </el-form-item>
                </el-col>

            </el-row>
            <el-row :span="22">
                <el-col :span="22">
                    <el-form-item label="产品描述" prop="remark">
                        <el-input disabled placeholder="产品描述" v-model="product.remark"></el-input>

                    </el-form-item>
                </el-col>


            </el-row>
            <el-row :span="22">

                <el-col :span="11">
                    <el-form-item label="颜色" prop="color">
                        <el-input disabled placeholder="颜色" v-model="product.color"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="尺寸" prop="size">
                        <el-input disabled placeholder="尺寸" v-model="product.size"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row :span="22">
                <el-col :span="11">
                    <el-form-item label="数量" prop="qty">
                        <el-input disabled placeholder="数量" v-model="orderLine.qty"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">

                    <el-form-item label="外发标志" prop="outFlag">
                        <el-select style="width:100%" v-model="entity.outFlag">
                            <el-option v-for="item in $dongxwDict.store.OUT_FLAG" :key="item[0]"
                                       :value="item[0]" :label="item[1]"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>


            <el-row :span="22" style="margin-top: 5px ">
                <el-col :span="11">
                    <el-form-item label="接单日期" prop="orderDate" :rules="[{ required: true}]">
                        <el-date-picker style="width:100%" :disabled="disables"
                                        v-model="entity.orderDate"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        type="date"
                                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>                            <!--format="yyyy-MM-dd"-->
                </el-col>

                <el-col :span="11">
                    <el-form-item label="要求交期" prop="issueDate" :rules="[{ required: true}]">
                        <el-date-picker style="width:100%" :disabled="disables"
                                        v-model="entity.issueDate"
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
                    <el-form-item label="物料到位日期" prop="rmDate">
                        <el-date-picker style="width:100%"
                                        :disabled="disables"
                                        v-model="entity.rmDate"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        type="date"
                                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="11">

                    <el-form-item label="包材到位日期" prop="pkgDate">
                        <el-date-picker style="width:100%"
                                        :disabled="disables"
                                        v-model="entity.pkgDate"
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
                    <el-form-item label="计划上线日期" prop="planStart">
                        <el-date-picker style="width:100%"
                                        :disabled="disables"
                                        v-model="entity.planStart"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        type="date"
                                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="11">

                    <el-form-item label="计划完成日期" prop="planEnd">
                        <el-date-picker style="width:100%"
                                        :disabled="disables"
                                        v-model="entity.planEnd"
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

                    <el-form-item label="完成标志" prop="finishFlag">
                        <el-select style="width:100%" v-model="entity.finishFlag">
                            <el-option v-for="item in $dongxwDict.store.FINISH_FLAG" :key="item[0]"
                                       :value="item[0]" :label="item[1]"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="实际完成日期" prop="realEnd">
                        <el-date-picker style="width:100%"
                                        :disabled="disables"
                                        v-model="entity.realEnd"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        type="date"
                                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>


            </el-row>


            <el-row :span="22" style="margin-top: 10px ">
                <el-col :span="22">
                    <el-form-item label="备注" prop="remark">
                        <el-input placeholder="备注" type="textarea" :rows="3" v-model="entity.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :span="22">
                <el-col :span="11">
                    <el-form-item label="建档人" prop="createByName">
                        <el-input disabled placeholder="建档人" v-model="entity.createByName"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="建档时间" prop="createDate">
                        <el-input disabled placeholder="建档时间" v-model="entity.createDate"></el-input>

                    </el-form-item>
                </el-col>

            </el-row>

        </fieldset>


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
    import SupplierSelect from '@/components/widgets/dongxw/SupplierSelect.vue';

    const defaultEntity = {

        id: null,
        outFlag: 0,
        finishFlag: 0,


        status: 0,
        orderDate: null,
        customerIssueDate: null,
        checkDate: null,
        factroyIssuseDate: null,
        invoiceId: 0,
        invoiceIdIni: 0
    };
    export default {
        components: {OrderMasterSelect, CustomerSelect, SupplierSelect},
        data() {
            return {
                product: {
                    code: null,
                    epCode: null,
                    remark: null,
                    color: null,
                    size : null ,
                },
                orderLine: {
                    qty: 0
                },

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
                    startOn: [
                        {
                            required: true,
                            message: "请选择开始时间",
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


                        this.$api.dongxw.MakePlan.save(params).then(rsp => {
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
                    this.$api.dongxw.MakePlan.findById(options.id).then(rr => {
                        let r = rr.data;
                        this.isDisabled = r.status > 0;

                        this.entity = r;
                        if(this.entity&&this.entity.product)
                        {
                            this.product=this.entity.product
                        }
                        if(this.entity&&this.entity.orderLine)
                        {
                            this.orderLine=this.entity.orderLine
                        }

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
