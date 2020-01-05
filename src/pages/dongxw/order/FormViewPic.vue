<template>
    <el-form :model="entity" :rules="rules" ref="form" label-width="120px" class="dialog-form">

            <div label="订单原件" name="customerOrderImg">
                <img v-if="entity.customerOrderImg"
                     :src="entity.customerOrderImg"
                     Style="height:85%;width:85%"
                     alt="\">

                <!--<div style="margin:10px" class="orderLogoView">-->
                    <!--<v-image-uploader :form-data="{}" :multiple=true v-model="entity.customerOrderImg">-->

                    <!--</v-image-uploader>-->
                    <!--&lt;!&ndash;<div style="text-align:center"> 订单原件</div>&ndash;&gt;-->
                <!--</div>-->
                <!--<el-form-item label="订单原件" prop="customerOrderImg">-->
                <!--<el-input placeholder="订单原件" v-model="entity.customerOrderImg" disabled></el-input>-->
                <!--</el-form-item>-->
            </div>

    </el-form>
</template>
<style lang="less" scoped>
    .orderLogoView .el-upload-dragger {
        img {
            width: 400px;
            height: 300px !important;
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

    import CustomerSelect  from '@/components/widgets/dongxw/CustomerSelect.vue';
    import SupplierSelect  from '@/components/widgets/dongxw/SupplierSelect.vue';

    const defaultEntity = {
        id: null,
        customerId: null,
        status: 0,
        customerOrderCode: '',
        epOrderCode : '',
        businessBy : '',
        invoiceNo: '',
        remark : '',
        materialRemark : '',
        customerOrderImg: null,
        supplierId: 0,
        orderDate : null,
        customerIssueDate : null,
        checkDate: null,
        factroyIssuseDate: null
    };
    export default {
        components: {CustomerSelect, SupplierSelect},
        props: {
            fatherMethod: {
                type: Function,
                default: null
            }
        },
        data() {
            return {
                activeName: 'orderInfo',
                ruleTpl: {when: null, then: null},
                entity: _.cloneDeep(defaultEntity),
                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {
                    bizType: [{
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
                    this.isDisabled = true;
                    this.$api.dongxw.OrderMaster.findById(options.id).then(rr => {
                        let r = rr.data;
                        this.isDisabled = r.status > 0;

                        this.entity = r;

                    });
                } else {
                    this.isDisabled = false;
                }
            },
            showPic(row) {
                console.log("showPic: showPic ")
                console.log(this.fatherMethod);
                console.log(row)
                if (this.fatherMethod) {
                    this.fatherMethod(row);
                }

            }
        },
        mounted() {
            this.$on("init", this.init);
            this.$on("submit", this.submitForm);
        }
    };
</script>
