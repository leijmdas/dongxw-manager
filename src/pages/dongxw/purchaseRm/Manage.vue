<!--生产计划管理-->
<template>
    <div class="panel panel-default panel-search">
        <!--<div class="panel panel-default panel-search">-->
            <!--<el-form :inline="true">-->
                <!--<el-form-item label="客户" prop="customerId">-->
                    <!--<customer-select :fnChange="search" v-model="page.query.param.customerId"-->
                                     <!--:clearable="true"></customer-select>-->

                <!--</el-form-item>-->
                <!--<el-form-item label="订单" prop="orderId">-->
                    <!--<order-master-select :customerId="page.query.param.customerId" :fnChange="search" v-model="page.query.param.orderId"-->
                                     <!--:clearable="true"></order-master-select>-->

                <!--</el-form-item>-->

                <!--<el-form-item label="日期">-->

                    <!--<div slot="label">-->
                        <!--<el-select v-model="dateRangeType" filterable clearable style="width:120px"-->
                                   <!--class="formitem-label">-->
                            <!--<el-option value="orderDate" label="接单日期"></el-option>-->
                            <!--<el-option value="issueDate" label="要求交期"></el-option>-->
                            <!--<el-option value="rmDate" label="物料到位日期"></el-option>-->
                            <!--<el-option value="pkgDate" label="包材到位日期"></el-option>-->
                        <!--</el-select>-->
                    <!--</div>-->
                    <!--<el-date-picker style="width:270px" v-model="dateRange" type="daterange" range-separator="至"-->
                                    <!--start-placeholder="开始日期" end-placeholder="结束日期"-->
                                    <!--format="yyyy年MM月dd日"-->
                                    <!--value-format="yyyy-MM-dd HH:mm:ss">-->
                    <!--</el-date-picker>-->

                <!--</el-form-item>-->
                <!--<el-form-item label="订单状态" prop="status">-->
                    <!--<el-select :clearable="true" v-model="page.query.param.orderStatus" style="width:100px">-->
                        <!--<el-option v-for="item in $dongxwDict.store.ORDER_STATUS" :key="item[0]" :value="item[0]"-->
                                   <!--:label="item[1]"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->

                <!--<el-form-item label="客订单号" prop="customerOrderCode">-->
                    <!--<el-input v-model="page.query.param.customerOrderCode" clearable></el-input>-->
                <!--</el-form-item>-->

                <!--<el-form-item label="EP订单号" prop="epOrderCode">-->
                    <!--<el-input v-model="page.query.param.epOrderCode" clearable></el-input>-->
                <!--</el-form-item>-->


                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>-->
                    <!--<el-button @click="cancel">取消</el-button>-->
                <!--</el-form-item>-->

            <!--</el-form>-->
        <!--</div>-->
        <el-container>
            <el-header height="30%">
                <order-search ref="orderSearch" v-show="showOrderSearch" :tableRowClick="orderChange"></order-search>

            </el-header>
            <el-container>
                <el-main width="60%">
                    <el-tabs v-show="order.id" :stretch="false" v-model="activeName">
                        <el-tab-pane style="margin-right: 10px" label="物料采购单" name="po">
                                  <purchase-panel ref="purchasePanel" v-model="order"></purchase-panel>

                        </el-tab-pane>
                        <el-tab-pane label="采购计划表" name="pp">
                            <form-purchase :handleShowPlan="handleShowPlan" v-model="makeplan"
                                           ref="formPurchase"></form-purchase>
                        </el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">
    .el-input {
        width: 160px;
    }

    .el-dropdown {
        vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>
<script>
    import OrderSearch from '@/components/widgets/dongxw/OrderMasterSearch.vue';
    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';
    import OrderMasterSelect from '@/components/widgets/dongxw/OrderMasterSelect.vue';
    import FormPanel from './Form';
    import FormPurchase from './FormPurchase';
    import PurchasePanel from '../purchaseItem/Manage.vue';

    const defaultMakeplan = {
        product: {},
    }
    export default {
        components: { PurchasePanel,FormPurchase, OrderSearch, OrderMasterSelect, FormPanel, CustomerSelect},
        props: {
            fatherMethod: {
                type: Function,
                default: null
            },
            funShowPic: {
                type: Function,
                default: null
            },

        },
        data() {
            return {
                activeName: "po",
                dateRangeType: 'orderDate',
                order: {},
                showOrderSearch: true,
                showPlan : true,
                makeplan : _.cloneDeep(defaultMakeplan),

                formStatus: 1,
                dateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            customerId: undefined,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.dongxw.MakePlan.queryOrderPlan
                },
                tableActions: [
                    {
                        name: "编辑",
                        handle: this.edit
                    },
                    {
                        name: "删除",
                        handle: this.del,
                        style: "color:red"
                    }
                ]
            };
        },
        computed: {
            disabledAddBtn: {
                get() {
                    return this.page.query.param.orderId <= 0
                },
            },
        },
        watch: {
            order : {
                handler: function(newVal, oldVal) {
                    this.page.query.param.orderId = this.order.id
                    this.search();
                },
                deep: true
            }
        },
        methods: {
            handleShowPlan(val){
               this.showPlan  = val
            },

            searchSheet(row) {

                this.makeplan = row
                this.makeplan.order = this.order

            },
            checkColor(row) {
                if (row.status === 0) {
                    return 'color:darkblue'
                }
                if(row.status===20)
                {
                    return 'color:green'
                }
                if(row.status===30)
                {
                    return 'color:red'
                }
                return ''
            },
            handleCommand(command) {

            },
            onDataloaded(rsp) {

            },

            checkPlan() {
                let self = this;

                self.$api.dongxw.MakePlan.checkPlanByOrder(this.page.query.param.orderId).then(rsp => {

                    self.$msgJsonResult(rsp)
                });
            },

            getSearchParams() {
                this.page.query.dateRanges = {};
                if (this.dateRangeType != null && this.dateRange && this.dateRange.length > 0) {
                    this.page.query.dateRanges[this.dateRangeType] = {
                        startDate: this.dateRange[0],
                        endDate: this.dateRange.length > 1 ? this.dateRange[1] : null
                    };
                }
                this.page.query.param.outFlag = 0;
                return this.page.query;
            },
            /*
            导出
            */
            exportRecords() {
                let self = this;
                this.$confirm("确定要导出所有查询的记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    let params = self.getSearchParams();
                    //self.$api.dongxw.MakePlan.export(params);

                });

            },

            makePp() {
                if (this.order.id) {
                    this.$api.dongxw.PurchasePlanService.makePurchasePlanByOrder(this.order.id).then(rsp => {
                        this.$msgJsonResult(rsp)
                        this.search();

                    });
                }
            },

             /*发送邮件
             * */
            exportMail() {
                let self = this;
                this.$confirm("确定要发送订单记录的邮件吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    let params = self.getSearchParams();
                    self.$api.dongxw.PurchasePlanService.exportMail(params);

                });

            },
            create() {
                this.$refs.formDiag.show();
            },
            edit(row) {
                this.$refs.formDiag.show({id: row.id});
            },
            clickRow(row) {
                 this.row = row;
                //console.log(row);
            },

            view(row) {
                this.$refs.formDiagView.show({id: row.id});
            },
            toggleStatus(row) {

            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.MakePlan.deleteById(row.id).then(rsp => {
                        this.search();
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    });
                });
            },
            onFormSaved() {
                this.$refs.formDiag.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {
                this.$refs.orderSearch.search()
                //this.search()
            },
            searchByOrder(row) {
                this.order = row
                this.page.query.param.orderId = this.order.id
                this.search();
            },
            orderChange(row) {
                this.order = row
            },

            search() {

                this.makeplan = _.cloneDeep(defaultMakeplan)
                this.makeplan.order = this.order

                this.getSearchParams();
                this.$refs.table.currentPage = 1;
                this.$nextTick(this.$refs.table.load());

            },
            cancel() {
                this.makeplan = _.cloneDeep(defaultMakeplan)
                this.makeplan.order = this.order

                this.dateRangeType = null
                this.dateRange = [];
                this.page.query.param = {}
                this.search();
            },
            clickbtn() {

            },
            showLine(row) {
                console.log(JSON.stringify(row));
                console.log("fatherMethodL: " + this.fatherMethod);
                if (row.orderType != 100 && this.fatherMethod) {
                    this.fatherMethod(row);
                }
                if (row.orderType == 100){
                    this.$message("父订单没有产品清单！")
                }
            },
            showPic(row) {
                if (this.funShowPic) {
                    this.funShowPic(row);
                }

            },
            getRow() {
                if (this.row) {
                    return this.row;
                }else{
                }
                if (this.$refs.table.tableData) {
                    this.row = this.$refs.table.tableData[0];
                }
                return this.row;
            }
        },

        created() {
        },
        mounted() {
            this.$on("init", this.init);

        }
    };
</script>
