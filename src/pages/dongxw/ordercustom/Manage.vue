<!--订单管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true">
                <el-form-item label="客户" prop="customerId">
                    <customer-select :fnChange="search" v-model="page.query.param.customerId"
                                     :clearable="true"></customer-select>

                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select :clearable="true" v-model="page.query.param.status" style="width:100px">
                        <el-option v-for="item in $dongxwDict.store.ORDER_STATUS" :key="item[0]" :value="item[0]"
                                   :label="item[1]"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">

                    <div slot="label">
                        <el-select v-model="dateRangeType" filterable clearable style="width:120px"
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
                <el-form-item label="EP订单号" prop="epOrderCode">
                    <el-input v-model="page.query.param.epOrderCode" clearable></el-input>
                </el-form-item>


                <el-form-item label="客订单号" prop="customerOrderCode">
                    <el-input v-model="page.query.param.customerOrderCode" clearable></el-input>
                </el-form-item>


                <el-form-item label="业务员" prop="businessBy">
                    <el-input v-model="page.query.param.businessBy" clearable></el-input>
                </el-form-item>


                <el-form-item label="订单类型" prop="orderType">
                    <el-select @change="search" :clearable="true" v-model="page.query.param.orderType"
                               style="width:100px">
                        <el-option v-for="item in $dongxwDict.store.ORDER_TYPE" :key="item[0]" :value="item[0]"
                                   :label="item[1]"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-itemn style="alignment: right;margin-left: 12%">
                    <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-itemn>

            </el-form>
        </div>
<!--        <v-toolbar title="订单列表" type="alert">-->
<!--            <span slot="tip" style="margin-left:60px;color :red">  鼠标双击进入订单修改! </span>-->

<!--            &lt;!&ndash;<el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>&ndash;&gt;-->
<!--            &lt;!&ndash;<el-button @click="cancel">取消</el-button>&ndash;&gt;-->

<!--            <el-button plain @click="exportRecords">导出XLS</el-button>-->
<!--            &lt;!&ndash;<el-button plain @click="exportMail" style="color:green">发送邮件</el-button>&ndash;&gt;-->
<!--            <el-button type="primary" plain @click="create">新增</el-button>-->
<!--            <el-button type="default"  @click="computeTotal">计算总金额</el-button>-->
<!--        </v-toolbar>-->
        <v-table ref="table" :pageSize="5"  :click="fatherMethod"  :page="page"  :table-minheight="150" @dataloaded="onDataloaded">

            <el-table-column type="index" prop="seq" label="序号" width="50">
            </el-table-column>
            <el-table-column sortable="true" prop="customerId" label="客户代码" width="90">
                <template slot-scope="{row}">
                    {{ row.customer?row.customer.custNo:'-'}}
                </template>
            </el-table-column>
            <el-table-column sortable="true" prop="customerId" label="客户名称" width="120">
                <template slot-scope="{row}">
                    {{ row.customer?row.customer.custName:'-'}}
                </template>
            </el-table-column>
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

            <el-table-column sortable="true" prop="orderType" label="类型" width="80">
                <template slot-scope="{row}">
                    <span :style="'style:red'"> {{$dongxwDict.getText(row.orderType,$dongxwDict.store.ORDER_TYPE)}}</span>
                </template>
            </el-table-column>
            <!--<el-table-column prop="parentId" label="父订单" width="80">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.orderMasterParent? row.orderMasterParent.epOrderCode:'-'}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="totalMoney" label="订单总金额" width="120">
                <template slot-scope="{row}">
                    {{row.totalMoney+" "+$dongxwDict.getText(row.moneyType,$dongxwDict.store.MONEY_TYPE)}}
                </template>
            </el-table-column>
            <el-table-column  prop="includeTax" label="是否含税" width="80">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.includeTax,$dongxwDict.store.TAX_INCLUDE)}}
                </template>
            </el-table-column>
            <el-table-column  prop="status" label="状态" width="80">
                <template slot-scope="{row}">
                    <span :style="row.status==0?'color:green':''"> {{$dongxwDict.getText(row.status,$dongxwDict.store.ORDER_STATUS)}}</span>
                </template>
            </el-table-column>

            <!--<el-table-column  prop="customerOrderImg" label="订单原件" width="78">-->
            <!--<template slot-scope="scope">-->
            <!--<a :href="scope.row.customerOrderImg" v-if="scope.row.customerOrderImg" target="_blank">预览</a> -->
                <!--</template>-->
            <!--</el-table-column>-->

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
            <el-table-column prop="orderMoney" label="定金" width="90">
            </el-table-column>
            <!--<el-table-column prop="moneyType" label="结算币种" width="80">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{$dongxwDict.getText(row.moneyType,$dongxwDict.store.MONEY_TYPE)}}-->
                <!--</template>-->
            <!--</el-table-column>-->

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

            <el-table-column width="110" label="操作" :fixed="'right'">
                <template slot-scope="scope">

                    <el-button type="text" title="生成报关文件" @click="edit(scope.row)">
                        <i class="el-icon-edit"></i>生成报关文件
                    </el-button>

                 </template>
            </el-table-column>

        </v-table>


        <v-dialog ref="formDiag" title="信息编辑" :width="'75%'">
            <form-panel @saved="onFormSaved"></form-panel>
            <div slot="footer">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>
        <v-dialog ref="formDiagView" title="订单原件">
               <div slot="footer">
                <!--<el-button type="primary" @click="$refs.formDiagView.dispatch('submit')">保存</el-button>-->
                <el-button type="default" @click="()=>{$refs.formDiagView.hide()}">关闭</el-button>
            </div>
        </v-dialog>

    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">
    .el-input{
        width: 160px;
    }
</style>
<script>
    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';
    import FormPanel from './Form';

    export default {
        components: {FormPanel,   CustomerSelect},
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
                    getData: this.$api.dongxw.OrderMaster.query
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
            computeTotal(){
                let self = this;
                this.$confirm("确定要计算订单总金额吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    let params = self.getSearchParams();
                    self.$api.dongxw.OrderMaster.compute(params).then(rsp => {
                        this.search();
                        this.$message({
                            type: "success",
                            message: "计算成功!"
                        });
                    });
                });
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
                let status = row.status;
                let msg = '确定上架此活动吗？</br><span style="color:red">一旦上架，部分信息不允许修改!</span>';
                if (status == 1) {
                    msg = '确定下架此活动吗？</br><span style="color:red">一旦下架，已派发的优惠券无法使用!</span>';
                }
                this.$confirm(msg, "确认", {
                    type: "warning",
                    dangerouslyUseHTMLString: true
                }).then(() => {
                    this.$api.ipark.PromotionInfoService.updateStatus(row.id, status == 1 ? 2 : 1).then(rsp => {
                        this.search();
                        this.$message({
                            type: "success",
                            message: "操作成功!"
                        });
                    });
                });
            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.OrderMaster.deleteById(row.id).then(rsp => {
                        this.$msgJsonResult(rsp);
                        if (rsp.code == 0 ) {
                            this.search();
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                        }
                    });
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
