<!--订单管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true">
                <el-form-item label="周期" prop="ym">
                    <mc-select :fnChange="search" v-model="page.query.param.ym"
                                     :clearable="true"></mc-select>

                </el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <!--<el-button @click="cancel">取消</el-button>-->
            </el-form>

        </div>
        <v-table ref="table" :page="page"  :click="clickcustomer" :table-minheight="150" @dataloaded="onDataloaded">
            <el-table-column  prop="seq" label="序号" width="55">
                <template slot-scope="scope"><span >{{scope.$index + 1}} </span></template>
            </el-table-column>
            <!--<el-table-column  prop="wh" label="仓库" width="90">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{$dongxwDict.getText(row.wh,$dongxwDict.store.WH_NAME)}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column :sortable="true" prop="ym" label="周期" width="122">

            </el-table-column>
            <el-table-column :sortable="true" prop="custName" label="客户名称" width="220">
            </el-table-column>
            <!--<el-table-column width="245" label="操作" :fixed="'right'">-->
            <!--&lt;!&ndash;<el-button @click="exportExcel(scope.row)">导出送货单</el-button>&ndash;&gt;-->
            <!--</el-table-column>-->
        </v-table>
       <manage-issue v-model="crow">   </manage-issue>


    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">
    .el-input{
        width: 160px;
    }
</style>
<script>
import McSelect from '@/components/widgets/dongxw/McSelect.vue';

import ManageIssue from './ManageMasterIssue.vue';

export default {
    components: {ManageIssue, McSelect},
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
                dateRangeType: 'orderDate',
                crow:{},
                row : null,
                formStatus: 1,
                dateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            ym: null,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.dongxw.MasterService.selectCustomerByYm
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
        computed: {},

        methods: {
            clickcustomer(row){
                 this.crow=row
                console.log(JSON.stringify(this.crow))
            },
            onDataloaded(rsp) {

            },
            getSearchParams() {
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
             /*发送邮件
             * */
            exportMail() {
                let self = this;
                this.$confirm("确定要发送订单记录的邮件吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    let params = self.getSearchParams();
                    self.$api.dongxw.OrderMaster.exportMail(params);

                });

            },
            create() {
                this.$refs.formDiag.show();
            },

            makePlan(row) {
                this.$api.dongxw.MakePlan.makePlanByOrder(row.id).then(rsp => {
                    //this.search();
                    this.$message({
                        type: "success",
                        message: "生成成功!"
                    });
                });
            },
            edit(row) {
                this.$refs.formDiag.show({id: row.id});
            },
            clickRow(row) {
                if(fatherMethod){
                    this.fatherMethod(row)
                }
                //this.row = row;
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

                });
            },
            onFormSaved() {
                this.$refs.formDiag.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {
                this.row = null;
                this.search();
            },
            search() {
                this.getSearchParams();
                this.$refs.table.currentPage = 1;
                this.$refs.table.load();
            },
            cancel() {
                this.dateRangeType = null;
                this.dateRange = [];
                this.page.query.param = {ym: null};
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
                //console.log("fatherMethodL: " + this.fatherMethod);
                if (row.orderType != 100 && this.fatherMethod) {
                    this.fatherMethod(row);
                }
                if (row.orderType == 100){
                    this.$message("父订单没有产品清单！")
                }
            },
            showPic(row) {
                console.log(JSON.stringify(row));
                console.log("funShowPic: ");
                console.log( this.funShowPic);
                if (this.funShowPic) {
                    this.funShowPic(row);
                }

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
        }
    };
</script>
