<template>
    <div>
        <el-form :model='entity' :rules='rules' ref='form' label-width='100px' class='dialog-form'>

            <el-row :span='24'>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='订单号' prop='orderId'>
                        <el-input disabled placeholder='客户订单' v-model='epOrderCode'>
                        </el-input>
                    </el-form-item>
                </el-col>

                <el-col :span='12'>
                    <el-form-item style='width:100%' label='联系人' prop='contact'>
                        <el-input placeholder='联系人' v-model='entity.contact'>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='电话' prop='tel'>
                        <el-input placeholder='电话' v-model='entity.tel'>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='币种' prop='moneyType'>
                        <el-select style='width:100%' v-model='entity.moneyType'>
                            <el-option :key='100' :value='100' :label='"100--人民币"'></el-option>
                            <el-option :key='200' :value='200' :label='"200--美元"'></el-option>
                            <el-option :key='300' :value='300' :label='"300--港币"'></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='开单日期' prop='openDate'>
                        <el-date-picker style='width:100%' v-model='entity.openDate' format='yyyy 年 MM 月 dd 日'
                                        value-format='yyyy-MM-dd HH:mm:ss' type='date'
                                        placeholder='选择日期'></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='交货日期' prop='issueDate'>
                        <el-date-picker style='width:100%' v-model='entity.issueDate' format='yyyy 年 MM 月 dd 日'
                                        value-format='yyyy-MM-dd HH:mm:ss' type='date'
                                        placeholder='选择日期'></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label='供应商' prop='supplyId'>
                        <supplier-select :style="'width:100%'" v-model='entity.supplyId'></supplier-select>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='创建时间' prop='createTime'>
                        <el-input disabled placeholder='创建时间' v-model='entity.createTime'>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item style='width:100%' label='备注' prop='remark'>
                        <el-input type='textarea' :rows='2' placeholder='备注' v-model='entity.remark'>
                        </el-input>
                    </el-form-item>
                </el-col>

                <!--<el-col :span='12'>-->
                    <!--<el-form-item style='width:100%' label='创建人' prop='createBy'>-->
                        <!--<el-input disabled placeholder='创建人' v-model='entity.createByName'>-->
                        <!--</el-input>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
            </el-row>
        </el-form>
        <v-toolbar  type="alert">
            <slot>
            </slot>
        </v-toolbar>
        <manage-item ref="formPanel" v-show="entity.id">  </manage-item>
    </div>
</template>
<style lang="less" scoped>
    .orderLogo .el-upload-dragger {
        img {
            width: 400px;
            height: 300px;
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
    import ManageItem from './ManageItem.vue'

    const defaultEntity = {
        id:  null,	//  标识
        orderId:  0,	//  客户订单
        supplyId:  0,	//  供应商
        contact:  ' ' ,	//  联系人
        tel:  ' ' ,	//  电话
        moneyType: 100,	//  币种
        openDate:  null,	//  开单日期
        issueDate:  null,	//  交货日期
        prdFlg:  0,	//  存货分类
        remark:  '' ,	//  备注
        createTime: null ,	//  创建时间
        createBy:  0,	//  创建人
    };
    export default {
        components: {ManageItem,OrderMasterSelect,CustomerSelect, SupplierSelect},
        props:{
            customerOrder : {
                type: Object,
                required: true,
                default :{}
            }
        },
        computed: {
            epOrderCode: function () {
                return this.customerOrder.epOrderCode + " (" + this.customerOrder.customerOrderCode + ") "

            }
        },
        data() {
            return {
                activeName: 'orderInfo',
                disables:false,
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
                if (this.entity.supplyId <= 0) {
                    this.$message("请选择供应商！")
                    return
                }
                this.$refs["form"].validate(valid => {

                    if (valid) {

                        let params = Object.assign({}, this.entity)
                        params.orderId = this.customerOrder.id

                        this.$api.dongxw.PurchaseOrderService.save(params).then(rsp => {
                            if(this.entity.id) {
                                this.$emit("saved", rsp)
                            }else{
                                this.entity.id= rsp.data
                                this.init({id:this.entity.id})
                            }
                        });
                    }
                });
            },
            resetForm() {
                this.entity = _.cloneDeep(defaultEntity);
            },
            init(options) {
                this.resetForm();

                if (options.id) {
                    this.isDisabled = true;
                    this.$api.dongxw.PurchaseOrderService.findById(options.id).then(rsp => {
                        this.entity = rsp.data;
                        this.isDisabled =  this.entity.status > 0;

                        let params = {
                            orderId: this.entity.orderId,
                            id: this.entity.id
                        }
                        this.$refs.formPanel.init(params)

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
