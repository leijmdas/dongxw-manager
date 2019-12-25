<template>
    <el-form :model="entity" :rules="rules" ref="form" label-width="120px" class="dialog-form">
      <div>
          <el-form-item label="名称" prop="name">
              <el-input v-model="ppp" :disabled="isDisabled"></el-input>
          </el-form-item>
      </div>
        <div style="margin:10px" class="merchantLogo">
            <v-image-uploader :form-data="{}" v-model="ppp">

            </v-image-uploader>
            <div style="text-align:center">
                LOGO
            </div>
        </div>
        <fieldset align="bottom">
            <el-row>
                <el-col :span="14">

                    <el-form-item label="名称" prop="name">
                        <el-input v-model="entity.name" :disabled="isDisabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="业务类型" prop="bizType">

                        <el-select v-model="entity.bizType" :disabled="isDisabled">
                            <el-option v-for="item in $dict.store.BUSINESSTYPE" :key="item[0]"
                                       :value="item[0]" :label="item[1]"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>


            <el-form-item label="优惠门槛" prop="dicountCondition">
                <el-input placeholder="优惠门槛说明（如: 无任何门槛）" v-model="entity.discountCondition"></el-input>
            </el-form-item>
            <el-form-item label="优惠规则" prop="ruleTplCode" v-display="entity.status!=0" v-show="false">
                <promotion-rule-def-select v-model="entity.ruleTplCode" :discountType="entity.discountType"
                                           @change="resetProps" @loaded="onRuleDefsLoaded"></promotion-rule-def-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="entity.remark"></el-input>
            </el-form-item>

        </fieldset>


    </el-form>
</template>
<style lang="less" scoped>
    .merchantLogo .el-upload-dragger {
        img {
            height: 200px !important;
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

    //import BranchCompanySelect from '@/components/widgets/BranchCompanySelect.vue';
    const defaultEntity = {
        id: null,
        type: 2, //优惠券
        isMerchant: false,
        limitDays: false,
        visibility: "public",
        effectTimes: null,
        effectTimeUnit: "day",
        ruleTplCode: "",
        discountCondition: "无任何门槛",
        discountValue: 0,
        limitTotalNum: '',
        limitPermanTimes: '',
        props: [],
        effectRange: [],
        discountType: 1,
        status: 0,
        tip: "",
        remark: "",
        bizType: 2, // 业务类型
        subjectType: 0,
        subjectId: 0,
        useType: 0,
        useCompany: 0,
        usePark: 0,
        useMerchant: 0,
        itemType: 0,
        mainPark: 0,
        mainMerchant: 0,

    };
    export default {
        components: {},
        data() {
            return {
                ppp: "",

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
                    discountType: [
                        {
                            type: "number",
                            required: true,
                            message: "请选择优惠类型",
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
                        if (!params.isMerchant) {
                            params.merchantId = 0;
                        }
                        if (!params.limitDays) {
                            params.effectTimes = 0;
                        }
                        if (this.limitTotal) {
                            params.limitTotalNum = this.entity.limitTotalNum
                        } else {
                            params.limitTotalNum = -1
                        }
                        // params.startOn = this.entity.effectRange[0];
                        // params.endOn = this.entity.effectRange[1];

                        this.$api.ipark.PromotionInfoService.save(params).then(rsp => {
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
                    console.log(JSON.stringify(this.entity));
                    this.isDisabled = true;//this.entity.status > 0;
                    // this.$api.ipark.PromotionInfoService.get(options.id).then(r => {
                    //     this.isDisabled = r.status > 0;
                    //     r.limitDays = !!r.effectTimes;
                    //     r.isMerchant = !!r.merchantId;
                    //     this.entity = r;
                    //     if (this.entity.limitTotalNum == -1) {
                    //         this.limitTotal = false
                    //         this.entity.limitTotalNum = ''
                    //     } else {
                    //         this.limitTotal = true
                    //     }
                    //
                    // });
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
