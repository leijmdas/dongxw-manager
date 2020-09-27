<!--订单管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true">
                <el-form-item label="客户" prop="customerId">
                    <customer-select disabled v-model="page.query.param.customerId"
                                     style="width:222px;" :clearable="true"></customer-select>

                </el-form-item>

                <el-form-item label="客订单号" :width="'100%'" prop="customerOrderCode">
                    <el-input v-model="page.query.param.customerOrderCode" clearable></el-input>
                </el-form-item>
                <el-form-item label="EP订单号" prop="epOrderCode">
                    <el-input v-model="page.query.param.epOrderCode" clearable></el-input>
                </el-form-item>

                <!--<el-form-item label="状态" prop="status">-->
                    <!--<el-select :clearable="true" v-model="page.query.param.status" style="width:100px">-->
                        <!--<el-option v-for="item in $dongxwDict.store.ORDER_STATUS" :key="item[0]" :value="item[0]"-->
                                   <!--:label="item[1]"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="日期">

                    <div slot="label">
                        <el-select v-model="dateRangeType" filterable clearable style="width:120px "
                                   class="formitem-label">
                            <el-option value="orderDate" label="下单日期"></el-option>
                            <el-option value="customerIssueDate" label="客户交货日期"></el-option>
                            <el-option value="checkDate" label="验货日期"></el-option>
                            <el-option value="factroyIssueDate" label="工厂交货日期"></el-option>
                        </el-select>
                    </div>
                    <el-date-picker style="width:270px" v-model="dateRange" type="daterange" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期"
                                    format="yyyy年MM月dd日"
                                    value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>

                </el-form-item>

                <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                <el-button @click="cancel">取消</el-button>

            </el-form>
        </div>
        <!--<v-toolbar title="订单列表" type="alert">-->
            <!--<span slot="tip" style="margin-left:60px;color :red">  鼠标双击进入订单修改! </span>-->

            <!--<el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>-->
            <!--<el-button @click="cancel">取消</el-button>-->

        <!--</v-toolbar>-->
        <v-table ref="table" :selection="false" :click="funShowOrderLine" :page="page"
                 :pageSize="5" :table-minheight="140"  :table-maxheight="220"  @dataloaded="onDataloaded">

            <el-table-column prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
            </el-table-column>
            <!--<el-table-column sortable="true" prop="customerId" label="客户代码" width="90">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.customer?row.customer.custNo:'-'}}-->
                <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column sortable="true" prop="orderType" label="订单类型" width="90">-->
                <!--<template slot-scope="{row}">-->
                    <!--<span :style="'style:red'"> {{$dongxwDict.getText(row.orderType,$dongxwDict.store.ORDER_TYPE)}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->

             <el-table-column @click="view(scope.row)" prop="customerOrderCode" label="客订单号" width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row)" v-if="scope.row.customerOrderImg" plain>{{scope.row.customerOrderCode}}</el-button>
                    <span v-if="!scope.row.customerOrderImg"> {{scope.row.customerOrderCode}}</span>
                </template>
             </el-table-column>
            <el-table-column prop="epOrderCode" label="EP订单号" width="120">
                <template slot-scope="scope">
                    <!--<el-button type="text" @click="edit(scope.row)" plain>{{scope.row.epOrderCode}}</el-button>-->
                    <a
                        class="link-name"
                        href="javascript:;"
                        :title="scope.row.epOrderCode"
                        @click="edit(scope.row)"
                    >{{ scope.row.epOrderCode }}</a>
                </template>

            </el-table-column>


            <el-table-column sortable="true" prop="orderDate" label="下单日期" width="100">
                <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.orderDate)}}
                </template>
            </el-table-column>
            <el-table-column sortable="true" prop="customerIssueDate" label="客户交货" width="100">
                <template slot-scope="{row}">
                    {{ $dongxwDict.viewDate(row.customerIssueDate)}}
                </template>
            </el-table-column>
            <el-table-column sortable="true" prop="checkDate" label="验货日期" width="100">
                <template slot-scope="{row}">
                    {{ $dongxwDict.viewDate(row.checkDate)}}
                </template>
            </el-table-column>
            <el-table-column sortable="true" prop="factroyIssueDate" label="工厂交货" width="100">
                <template slot-scope="{row}">
                    {{ $dongxwDict.viewDate(row.factroyIssueDate)}}
                </template>
            </el-table-column>
            <el-table-column sortable="true" prop="customerId" label="客户名称" width="120">
                <template slot-scope="{row}">
                    {{ row.customer?row.customer.custName:'-'}}
                </template>
            </el-table-column>
            <el-table-column  prop="status" label="订单状态" width="80">
                <template slot-scope="{row}">
                    <span :style="row.status==0?'color:green':''"> {{$dongxwDict.getText(row.status,$dongxwDict.store.ORDER_STATUS)}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="moneyType" label="结算币种" width="80">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.moneyType,$dongxwDict.store.MONEY_TYPE)}}
                </template>
            </el-table-column>
            <el-table-column sortable="true" prop="businessBy" label="业务员" width="100"></el-table-column>

            <el-table-column prop="invoiceNoIni" label="预收发票编号" width="120"></el-table-column>
            <el-table-column prop="invoiceNo" label="正式发票编号" width="120"></el-table-column>


            <el-table-column prop="createDate" label="建档时间" width="100">
                <template slot-scope="{row}">
                    {{ $dongxwDict.viewDate(row.createDate)}}
                </template>
            </el-table-column>
            <el-table-column prop="createByName" label="建档人" width="80">
            </el-table-column>

            <el-table-column prop="remark" label="备注"></el-table-column>


        </v-table>

        <order-line   ref="orderLine"  :funSelect="selectCloseDlg" :funClose="closeDlg" ></order-line>

    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">
    .el-input{
        width: 160px;
    }
</style>
<script>
    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';
    import OrderLine from './ManageOrderLine.vue';
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
        components: { OrderLine,CustomerSelect },
        props: {
            fatherMethod: {
                type: Function,
                default: null
            },
            funShowPic: {
                type: Function,
                default: null
            },

            closeDlg: {
                type: Function,
                default: null
            },

        },
        data() {
            return {
                showOrderLine:false,
                entity: _.cloneDeep(defaultEntity),
                tradeRow: () => {
                },
                master: () => {
                },
                dateRangeType: 'orderDate',
                row : null,
                formStatus: 1,
                dateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            customerId: this.customerId,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.dongxw.OrderMaster.query
                },
                tableActions: [

                ]
            };
        },
        computed: {},

        methods: {
            selectCloseDlg() {
                let self = this;
                this.$confirm("确定要增加选定的产品记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    //this.closeDlg();
                    let selectOrderLines=this.$refs.orderLine.getSelectedRows()
                    //master
                    this.insertTrade(this.master,selectOrderLines);

                });


            },

            //insertTrade master主表信息，selectOrderLines子表信息
            insertTrade(master,selectOrderLines){
                console.log("insertTrade-ProductIds:\t"
                    + JSON.stringify(selectOrderLines.map(item=>item.productId)));

                //this.entity = _.cloneDeep(this.resetEntity);
                let params = {
                    tradeMaster: master,
                    orderId : this.tradeRow.id,
                    products: selectOrderLines.map(item => item.productId),
                    orderLines:selectOrderLines
                }
                this.$api.dongxw.TradeService.batchInsert(params) .then(rsp => {
                    this.closeDlg();
                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                });
            },

            funShowOrderLine(row) {
                this.tradeRow=row;
                this.$refs.orderLine.init(row);
                this.showOrderLine = true
            },

            onDataloaded(rsp) {

            },
            getSearchParams() {
                this.page.query.param.customerId=this.master.customerId
                this.page.query.dateRanges = {};
                if (this.dateRangeType != null && this.dateRange && this.dateRange.length > 0) {
                    this.page.query.dateRanges[this.dateRangeType] = {
                        startDate: this.dateRange[0],
                        endDate: this.dateRange.length > 1 ? this.dateRange[1] : null
                    };
                }
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
                    self.$api.dongxw.OrderMaster.export(params);

                });

            },

            create() {
            },


            edit(row) {
                // this.$refs.formDiag.show({id: row.id});
            },
            clickRow(row) {

                this.funShowOrderLine(row)
             },


            toggleStatus(row) {

            },

            onFormSaved() {
                //this.$refs.formDiag.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {
                this.showOrderLine = false
                this.master = options.master
                console.log('master:' + JSON.stringify(this.master))

                this.search();
            },
            search() {
                this.getSearchParams();
                this.$refs.table.currentPage = 1;
                this.$refs.table.load();
            },
            cancel() {
                this.dateRangeType=null;
                this.dateRange = [];
                this.page.query.param = {};
                this.search();
            },
            clickbtn() {

            },
            showLine(row) {
                if (row.orderType != 100 && this.fatherMethod) {
                    this.fatherMethod(row);
                }
                if (row.orderType == 100) {
                    this.$message("父订单没有产品清单！")
                }
            },
            showPic(row) {
                console.log("funShowPic: ");
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
