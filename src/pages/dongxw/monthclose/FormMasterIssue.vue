<template>
    <el-form  :model="entity" :rules="rules" ref="form" label-width="100px" class="dialog-form">

        <fieldset align="top" style="margin-left:10px; margin-right: 10px">
            <legend>送货单</legend>


            <el-row :span="24" style="margin-top: 5px ">
                <el-col :span="12">
                <el-form-item label="送货单号" prop="code">
                    <el-input disabled placeholder="送货单号" v-model="entity.code"></el-input>
                </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="送货日期" prop="tradeTime" :rules="[{ required: true}]">
                        <el-date-picker style="width:100%" :disabled="disables"
                                        v-model="entity.tradeTime"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        type="date"
                                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>


            </el-row>

            <el-row :span="24">

                <el-col :span="12"  >

                    <el-form-item label="送货单类型" prop="tradeType">
                        <el-select style="width:100%" v-model="entity.tradeType">
                            <el-option v-for="item in $dongxwDict.store.ISSUE_PRD_TYPE" :key="item[0]"
                                       :value="item[0]" :label="item[1]"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12"  >

                    <el-form-item label="过帐标识" prop="calFlag">
                        <el-input disabled placeholder="过帐标识" v-model="entity.calFlag"></el-input>

                    </el-form-item>
                </el-col>
                <el-col :span="24">

                    <el-form-item label="客户名称" prop="custName" :rules="[{ required: true}]">
                        <!--<el-input disabled placeholder="客户名称" v-model="entity.custName"></el-input>-->
                        <el-button type="primary" :style="'width:100%'" plain   @click="findCust" style=" color :green">
                            {{entity.custName?entity.custName:"请选择客户"}}
                        </el-button>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="交货地址" prop="issueAddr">
                        <el-input placeholder="交货地址" v-model="entity.issueAddr"></el-input>
                    </el-form-item>


                </el-col>

                <el-col :span="12">

                    <el-form-item label="交货仓库" prop="issueWh">
                        <el-input placeholder="交货仓库" v-model="entity.issueWh"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="付款方式" prop="payMode">
                        <el-input placeholder="付款方式" v-model="entity.payMode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :span="24">
                <el-col :span="12">
                    <el-form-item label="联系人" prop="contact">
                        <el-input placeholder="联系人" v-model="entity.contact"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话" prop="tel">
                        <el-input placeholder="联系电话" v-model="entity.tel"></el-input>
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
        tradeCount:0,
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
        props: {
            mc: {
                required: true,
                type: Object,
                default:() => {}
            },
        },
        data: function () {
            return {};
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


                        this.$api.dongxw.MasterService.save(params).then(rsp => {
                            this.$emit("saved", rsp);
                        });
                    }
                });
            },
            resetForm() {
                this.$refs["form"].resetFields();
                this.entity = _.cloneDeep(defaultEntity);
                this.entity.tradeTime = this.$dongxwDict.formatDatetime(new Date());
                this.entity.mcId = this.mc.id;
                this.entity.wh = this.mc.wh;
            },

            init(options) {
                this.resetForm();
                if (options.id) {
                    this.isDisabled = true;
                    this.$api.dongxw.MasterService.findById(options.id).then(rr => {
                        let r = rr.data;
                        this.isDisabled = r.calFlag;

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
