<template>
    <div>
        <el-form :model='entity' :rules='rules' ref='form' label-width='100px' class='dialog-form'>

            <el-row :span='24'>
                <el-col :span='12'>
                    <el-form-item label='供应商' prop='name'>
                        <el-button type="primary" :style="'width:100%'" plain   @click="findSupplier" style=" color :green">
                            {{entity.supplier.name?entity.supplier.name:"请选择供应商"}}
                        </el-button>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='订单编号' prop='purchaseOrderCode'>
                        <el-input disabled placeholder='订单编号' v-model='entity.purchaseOrderCode'>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='订货日期' prop='openDate'>
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

            </el-row>
            <el-row :span='24'>

                <el-col :span='12'>
                    <el-form-item style='width:100%' label='地址' prop='addr'>
                        <el-input disabled placeholder='电话' v-model='entity.supplier.addr'>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='联系人' prop='contact'>
                        <el-input disabled placeholder='联系人' v-model='entity.supplier.contact'>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='电话' prop='tel'>
                        <el-input disabled placeholder='电话' v-model='entity.supplier.tel'>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='传真' prop='fax'>
                        <el-input disabled placeholder='传真' v-model='entity.supplier.fax'>
                        </el-input>
                    </el-form-item>
                </el-col>
                <!--10草稿11作废20正式-->
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='状态' prop='status'>
                        <el-input disabled placeholder='状态' v-model='entity.status'>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item style='width:100%' label='备注' prop='remark'>
                        <el-input type='textarea' :rows='2' placeholder='备注' v-model='entity.remark'>
                        </el-input>
                    </el-form-item>
                </el-col>



                <el-col :span='12'>
                    <el-form-item style='width:100%' label='创建时间' prop='createTime'>
                        <el-input disabled placeholder='创建时间' v-model='entity.createTime'>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item style='width:100%' label='创建人' prop='createBy'>
                        <el-input disabled placeholder='创建人' v-model='entity.createByName'>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <v-toolbar  type="alert">
            <slot>
            </slot>
        </v-toolbar>
        <manage-item ref="formPanel" v-show="entity.id">  </manage-item>
        <v-dialog ref="formDiag" :appendToBody="true" title="查找" :width="'48%'">
            <supplier-find  v-model="entity.supplyId" :confirmFind="confirmFind" :cancelFind="cancelFind">
                <!--<el-button type="primary" @click="$refs.formDiag.dispatch('submit')">确定</el-button>-->
                <!--<el-button type="default" @click="()=>{$refs.formDiag.hide();}">取消</el-button>-->
            </supplier-find>

        </v-dialog>
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
    import SupplierFind from '@/components/widgets/dongxw/SupplierMultiSelect.vue';

    const defaultEntity = {
        id: null,	//  标识
        purchaseOrderCode: '',
        supplier: {},
        orderId: 0,	//  客户订单
        supplyId: 0,	//  供应商
        contact:  ' ' ,	//  联系人
        tel:  ' ' ,	//  电话
        moneyType: 100,	//  币种
        openDate:  null,	//  开单日期
        issueDate:  null,	//  交货日期
        prdFlg:  200,	//  存货分类
        remark:  '' ,	//  备注
        createTime: null ,	//  创建时间
        createBy:  0,	//  创建人
    };
    export default {
        components: {SupplierFind,ManageItem,OrderMasterSelect,CustomerSelect, SupplierSelect},
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
                findSupplierId: -1 ,
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



                }
            };
        },
        methods: {
            findSupplier() {
                this.$refs.formDiag.show();

            },
            confirmFind(row) {
                this.$refs.formDiag.hide();
                //this.$message(JSON.stringify(row))
                this.entity.supplyId = row.id
                this.$api.dongxw.SupplierService.findById(this.entity.supplyId ).then(rsp => {
                    this.entity.supplier = rsp.data
                    this.entity.contact=this.entity.supplier.contact
                    this.entity.tel=this.entity.supplier.tel


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
