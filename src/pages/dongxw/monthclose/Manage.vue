<!--生产计划管理-->
<template>
    <div>

        <el-tabs value="stocktype" stretch type="card" @tab-click="handleClickStock" :tab-position="'bottom'">
            <el-tab-pane value=10 label="外购成品库" name="opstock"></el-tab-pane>
            <el-tab-pane value=20 label="原料与成品库" name="rmstock"></el-tab-pane>
        </el-tabs>
        <v-table ref="table" :page="page" :table-minheight="120" @dataloaded="onDataloaded">

            <el-table-column prop="seq" label="序号" width="120">
                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
            </el-table-column>
            <el-table-column prop="wh" label="仓库" width="160">
                <template slot-scope="{row}">
                    {{ row.wh===10?"外购成品库":"原料与成品库" }}
                </template>
            </el-table-column>
            <el-table-column prop="ym" label="年月" width="160"/>

            <el-table-column prop="closeFlag" label="月结状态" width="180">
                <template slot-scope="{row}">
                    <span :style="checkColor(row)">
                    {{ row.closeFlag?"已月结":"活动" }}
                    </span>
                </template>
            </el-table-column>


            <el-table-column width="160" label="操作">
                <template slot-scope="{row}">

                    <el-button v-show="!row.closeFlag" type="default" title="过帐" @click="balance(row)">
                        过帐
                    </el-button>

                    <el-button v-show="!row.closeFlag" type="primary" title="月结" @click=" mc(row)">
                        月结
                    </el-button>


                </template>
            </el-table-column>

        </v-table>

        <el-tabs value="stock" stretch type="card" @tab-click="handleClick">
            <el-tab-pane label="库存" name="stock">库存</el-tab-pane>
            <el-tab-pane label="入库" name="instock">入库</el-tab-pane>
            <el-tab-pane label="出库" name="outstock">出库</el-tab-pane>
            <el-tab-pane label="盘点" name="checkstock">盘点</el-tab-pane>
        </el-tabs>
        <v-dialog ref="formDiag" title="信息编辑" :width="'50%'">
            <form-panel @saved="onFormSaved"></form-panel>
            <div slot="footer">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>


    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">
    .el-input{
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

    export default {
        components: {OrderSearch, OrderMasterSelect, FormPanel, CustomerSelect},
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
                stocktype:10,
                dateRangeType: 'orderDate',
                order : {},
                row : null,
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
                    getData: this.$api.dongxw.MonthCloseService.query
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

        methods: {
            handleClickStock(tab,event){
                if(tab.name=="opstock"){
                    this.stocktype=10
                }else{
                    this.stocktype=20
                }
                this.search();
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            checkColor(row) {
                if(row.closeFlag )
                {
                    return 'color:green'
                }else
                {
                    return 'color:red'
                }
                return ''
            },
            handleCommand(command) {
                if(this.page.query.param.orderId) {
                    if (command === "add") {
                        this.makePlan();
                    }
                    if (command === "check") {
                        this.checkPlan();
                    } else {
                        //this.rmPlan();
                    }
                }else{
                    this.$mesage("请选择订单!")
                }
            },
            onDataloaded(rsp) {

            },
            makePlan() {

            },
            checkPlan() {

            },
            rmPlan() {

            },
            getSearchParams() {
                this.page.query.dateRanges = {};
                if (this.dateRangeType != null && this.dateRange && this.dateRange.length > 0) {
                    this.page.query.dateRanges[this.dateRangeType] = {
                        startDate: this.dateRange[0],
                        endDate: this.dateRange.length > 1 ? this.dateRange[1] : null
                    };
                }
                this.page.query.param.wh=this.stocktype;
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
                    self.$api.dongxw.MakePlan.export(params);

                });

            },makeSheet(){

            },

             /*发送邮件
             * */
            exportMail() {


            },
            create() {
                this.$refs.formDiag.show();
            },
            mc(row) {
                this.$confirm("确定进行月结吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.MonthCloseService.mc(row.id).then(rsp => {
                        this.search();
                        this.$message({
                            type: "success",
                            message: "月结成功!"
                        });
                    });
                });    },
            balance(row) {
                this.$confirm("确定进行过帐吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.MonthCloseService.balance(row.id).then(rsp => {
                        this.search();
                        this.$message({
                            type: "success",
                            message: "过帐成功!"
                        });
                    });
                });    },

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
                //this.$refs.orderSearch.search()
                this.row = null
                this.search()
            },
            searchByOrder(row) {
                this.order = row
                this.page.query.param.orderId = row.id
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
                this.$alert('这是一段内容', '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            },
            showLine(row) {
                console.log("fatherMethodL: " + this.fatherMethod);
                if (row.orderType != 100 && this.fatherMethod) {
                    this.fatherMethod(row);
                }
                if (row.orderType == 100){
                    this.$message("父订单没有产品清单！")
                }
            },
            showPic(row) {


            },
            getRow() {
                console.log(this.row);

                if (this.row) {
                    return this.row;
                }else{
                }
                console.log(this.$refs.table.tableData);
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
            // document.getElementById('app').addEventListener('keydown',function () {
            //     alert('按键触发')
            // })
        }
    };
</script>
