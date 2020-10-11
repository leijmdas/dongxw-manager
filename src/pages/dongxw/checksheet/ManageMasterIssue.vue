<!--in管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true"  v-model="currentValue">
                <!--<el-form-item label="客户" prop="customerId">-->
                    <!--<customer-select disabled :fnChange="search" v-model="page.query.param.customerId" :clearable="true"></customer-select>-->

                <!--</el-form-item>-->


                <el-form-item label="送货单号" prop="code">
                    <el-input v-model="page.query.param.code" clearable></el-input>
                </el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="cancel">取消</el-button>
                <!--<el-button type="primary" style="margin-left: 130px" :disabled="mc.closeFlag" plain @click="create">-->
                <!--</el-button>-->
                <el-button @click="exportExcel()">导出客户对帐单</el-button>
            </el-form>
          </div>


        <v-table ref="table" :page="page"   :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column  prop="seq" label="序号" width="55">
                <template slot-scope="scope"><span >{{scope.$index + 1}} </span></template>
            </el-table-column>
            <el-table-column  prop="ym" label="周期" width="70"/>

            <el-table-column :sortable="true" prop="custName" label="客户名称" width="220">

            </el-table-column>
            <el-table-column  prop="wh" label="仓库" width="90">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.wh,$dongxwDict.store.WH_NAME)}}
                </template>
            </el-table-column>
            <el-table-column :sortable="true" prop="code" label="送货单号" width="140">
            </el-table-column>
            <el-table-column :sortable="true" prop="tradeTime" label="送货日期" width="100">

                <template slot-scope="{row}">
                    {{ $dongxwDict.viewDate(row.tradeTime)}}
                </template>
            </el-table-column>
            <el-table-column   prop="payMode" label="付款方式" width="100">

            </el-table-column>
            <el-table-column  prop="tradeType" label="交易类型" width="80">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.tradeType,$dongxwDict.store.ISSUE_PRD_TYPE)}}
                </template>
            </el-table-column>
            <!--<el-table-column :sortable="true" prop="unit" label="交易状态" width="60"></el-table-column>-->
            <el-table-column   prop="calFlag" label="过帐标识" width="80">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.calFlag,$dongxwDict.store.YESNO_TYPE)}}
                </template>
            </el-table-column>

            <el-table-column :sortable="true" prop="issueAddr" label="交货地址" width="280"></el-table-column>
            <el-table-column :sortable="false" prop="tradeCount" label="清单行数" width="80"></el-table-column>
             <el-table-column  prop="moneyType" label="币种" width="70">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.moneyType,$dongxwDict.store.MONEY_TYPE)}}
                </template>
            </el-table-column>
            <el-table-column :sortable="true" prop="issueWh" label="交货仓库" width="120"></el-table-column>
            <el-table-column :sortable="true" prop="contact" label="联系人" width="111"></el-table-column>
            <el-table-column :sortable="true" prop="tel" label="联系电话"></el-table-column>


            <el-table-column width="111" label="操作" :fixed="'right'">
                <template slot-scope="scope">

                <el-button  @click="edit(scope.row)" :disabled="scope.row.calFlag" type="text" title="编辑">
                    <i class="el-icon-edit"></i>
                </el-button>

                <el-button @click="editTrade(scope.row)" :disabled="scope.row.calFlag" >产品</el-button>
                </template>
            </el-table-column>
        </v-table>
        <v-dialog ref="formDiag" :width="'80%'" title="送货单编辑">
            <form-panel :mc="mc" @saved="onFormSaved"></form-panel>
            <div slot="footer" style="margin-right:40px">
                <!--<el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>-->
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>
        <v-dialog ref="formManageTradeDiag" :width="'80%'" title="送货单产品编辑">
            <manage-trade-issue  @saved="onFormManageTradeDiagSaved"></manage-trade-issue>
            <div slot="footer" style="margin-right:40px">
                <!--<el-button type="primary" @click="$refs.formManageTradeDiag.dispatch('submit')">保存</el-button>-->
                <el-button type="default"
                           @click="()=>{$refs.formManageTradeDiag.hide();search();}">
                    关闭
                </el-button>
            </div>
        </v-dialog>
    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">
    .el-input{
        width: 160px;
    }
    .status_green {
        color: red;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>

<script>
    //import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';

    import FormPanel from './FormMasterIssue';
    import ManageTradeIssue from './ManageTradeIssue';


    export default {
        components: {FormPanel,  ManageTradeIssue},
        props: {

            value: {
                required: true,
                type: Object,
            },
        },
        data() {
            return {
                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                currentPage: 1,
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            //mcId: this.mc.id,
                            tradeType: 30,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.dongxw.MasterService.query

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
        watch: {
            currentValue: {
                handler: function(newVal, oldVal) {
                        this.search()
                },
                deep: true
            } ,
        },

        computed: {
            currentValue: {
                get () {
                    return this.value
                },
                set (val) {
                    this.$emit('input', val)
                }
            }
        },
        methods: {
            /*
        导出
        */
            exportExcel(row) {
                let self = this;
                this.$confirm("确定要导出对帐单吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    let params = _.cloneDeep(this.getSearchParams())
                    params.param = {
                        ym : this.currentValue.ym,
                        customerId : this.currentValue.customerId,
                        tradeType : 30,

                    }
                    //console.log(JSON.stringify(params))
                    self.$api.dongxw.MasterService.exportCheckSheet(params);

                });

            },

            handleCommand(orderBys) {
                this.page.query.orderBys = orderBys
                this.search()
            },

            onDataloaded(rsp) {

            },
            /*
            导出
             */
            exportRecords() {
                let params = this.getSearchParams();
                this.$api.dongxw.ProductService.export(params);
            },
            getSearchParams() {

                this.page.query.dateRanges = {};
                if (this.dateRangeType != null && this.dateRange&&this.dateRange.length > 0) {
                    this.page.query.dateRanges[this.dateRangeType] = {
                        startDate: this.dateRange[0],
                        endDate: this.dateRange.length > 1 ? this.dateRange[1] : null
                    };
                }
                return this.page.query;
            },

            create() {
                this.$refs.formDiag.show();
            },
            edit(row) {
                this.$refs.formDiag.show({id: row.id});
            },
            editTrade(row) {

                this.$refs.formManageTradeDiag.show({master: row, id: row.id });
            },
            toggleStatus(row) {

            },
            del(row) {

            },
            onFormSaved() {
                this.$refs.formDiag.hide();
                this.$nextTick(this.search);
            },
            onFormManageTradeDiagSaved() {
                this.$refs.formManageTradeDialog.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {
                this.search();
            },
            search() {
                this.$refs.table.currentPage = 1;
                this.page.query.param.ym =   this.currentValue.ym;
                this.page.query.param.customerId =   this.currentValue.customerId;
                this.page.query.param.tradeType =  30

                this.$refs.table.load();
            },
            cancel() {
                this.dateRange = []
                this.$refs.table.currentPage = 1;
                this.page.query.param = {
                    tradeType: 30
                };

                this.search()
            }
        },
        created() {
        },
        mounted() {
            this.$on("init", this.init);
        }
    };
</script>
