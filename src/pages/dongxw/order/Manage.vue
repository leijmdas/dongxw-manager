<!--订单管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true">
                <el-form-item label="客户" prop="customerId">
                    <customer-select :fnChange="search" v-model="page.query.param.customerId"
                                     :clearable="true"></customer-select>

                </el-form-item>

                <el-form-item label="日期">

                    <div slot="label">
                        <el-select v-model="dateRangeType" filterable clearable style="width:120px" class="formitem-label">
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

                    <el-form-item label="EP订单号" prop="epOrderCode">
                        <el-input v-model="page.query.param.epOrderCode" clearable></el-input>
                    </el-form-item>


                    <el-form-item label="客户订单号" prop="customerOrderCode">
                        <el-input v-model="page.query.param.customerOrderCode" clearable></el-input>
                    </el-form-item>


                    <el-form-item label="业务员" prop="businessBy">
                        <el-input v-model="page.query.param.businessBy" clearable></el-input>
                    </el-form-item>


                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select :clearable="true" v-model="page.query.param.status" style="width:100px">
                        <el-option v-for="item in $dongxwDict.store.ORDER_STATUS" :key="item[0]" :value="item[0]"
                                   :label="item[1]"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单类型" prop="orderType">
                    <el-select @change="search" :clearable="true" v-model="page.query.param.orderType" style="width:100px">
                        <el-option v-for="item in $dongxwDict.store.ORDER_TYPE" :key="item[0]" :value="item[0]"
                                   :label="item[1]"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>-->
                    <!--<el-button @click="cancel">取消</el-button>-->
                <!--</el-form-item>-->

            </el-form>
        </div>
            <v-toolbar title="数据列表" type="alert">
                <span slot="tip" style="margin-left:60px;">
                <span style="color :red">  鼠标双击进入订单产品管理! </span>
                </span>
                <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                <el-button @click="cancel">取消</el-button>

                <el-button type="primary" plain @click="create">新增</el-button>

                <el-button plain @click="exportRecords">导出 XLS</el-button>
                <el-button plain @click="exportMail" style="color:green" >发送邮件</el-button>
           </v-toolbar>
        <v-table ref="table" :page="page" :dblclick="showLine" :click="clickRow" :table-minheight="450" @dataloaded="onDataloaded">

            <el-table-column prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
            </el-table-column>

            <el-table-column prop="orderType" label="订单类型" width="70">
                <template slot-scope="{row}">
                    <span :style="'style:red'"> {{$dongxwDict.getText(row.orderType,$dongxwDict.store.ORDER_TYPE)}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="parentId" label="父订单" width="80">
                <template slot-scope="{row}">
                    {{ row.orderMasterParent? row.orderMasterParent.epOrderCode:'-'}}

                </template>
            </el-table-column>

            <el-table-column prop="customerId" label="客户代码" width="80">
                <template slot-scope="{row}">
                    {{ row.customer?row.customer.custNo:'-'}}
                 </template>
            </el-table-column>
            <el-table-column prop="customerId" label="客户名称" width="120">
                <template slot-scope="{row}">
                    {{ row.customer?row.customer.custName:'-'}}
                </template>
            </el-table-column>


             <el-table-column @click="view(scope.row)" prop="customerOrderCode" label="客户订单号+原件" width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row)" v-if="scope.row.customerOrderImg" plain>{{scope.row.customerOrderCode}}</el-button>
                    <span v-if="!scope.row.customerOrderImg"> {{scope.row.customerOrderCode}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="epOrderCode" label="EP订单号" width="120"></el-table-column>


            <!--<el-table-column  prop="customerOrderImg" label="订单原件" width="78">-->
                <!--<template slot-scope="scope">-->
                    <!--<a :href="scope.row.customerOrderImg" v-if="scope.row.customerOrderImg" target="_blank">预览</a> -->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column  prop="status" label="订单状态" width="80">
                <template slot-scope="{row}">
                    <span :style="'style:red'"> {{$dongxwDict.getText(row.status,$dongxwDict.store.ORDER_STATUS)}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="moneyType" label="结算币种" width="80">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.moneyType,$dongxwDict.store.MONEY_TYPE)}}
                </template>
            </el-table-column>
            <el-table-column prop="businessBy" label="业务员" width="100"></el-table-column>

            <el-table-column prop="orderDate" label="下单日期" width="100">
                <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.orderDate)}}
                </template>
            </el-table-column>
            <el-table-column prop="customerIssueDate" label="客户交货日期" width="100">
                <template slot-scope="{row}">
                    {{ $dongxwDict.viewDate(row.customerIssueDate)}}
                </template>
            </el-table-column>
            <el-table-column prop="checkDate" label="验货日期" width="100">
                <template slot-scope="{row}">
                    {{ $dongxwDict.viewDate(row.checkDate)}}
                </template>
            </el-table-column>
            <el-table-column prop="factroyIssueDate" label="工厂交货日期" width="100">
                <template slot-scope="{row}">
                    {{ $dongxwDict.viewDate(row.factroyIssueDate)}}
                </template>
            </el-table-column>

            <el-table-column prop="invoiceNoIni" label="预收发票编号" width="120"></el-table-column>
            <el-table-column prop="invoiceNo" label="正式发票编号" width="120"></el-table-column>


            <el-table-column prop="createDate" label="建档时间" width="150">
            </el-table-column>
            <el-table-column prop="createBy" label="建档人" width="150">
            </el-table-column>

            <el-table-column prop="remark" label="备注"></el-table-column>

            <el-table-column width="145" label="操作" :fixed="'right'">
                <template slot-scope="scope">

                    <el-button type="text" title="编辑" @click="edit(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button  v-if="scope.row.orderType!=100" style="color:green"  type="info" plain title="产品" @click="showLine(scope.row)">
                        产品
                    </el-button>
                    <el-tooltip class="item" effect="green" content="只有草稿状态才可以删除!" placement="top-start">
                        <el-button type="text" style="color:red" @click="del(scope.row,scope.$index)" title="删除"
                                   v-if="scope.row.status==0">
                            <i style = "color:red" class="el-icon-delete"></i>
                        </el-button>
                    </el-tooltip>

                    <!--<el-button v-if="scope.row.orderType==20" type="info" @click="showLine(scope.row)" >增加子订单</el-button>-->

                </template>
            </el-table-column>

        </v-table>


        <v-dialog ref="formDiag" title="信息编辑" :width="'50%'">
            <form-panel @saved="onFormSaved"></form-panel>
            <div slot="footer">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>
        <v-dialog ref="formDiagView" title="订单原件">
            <form-view-panel @saved="onFormSaved"></form-view-panel>
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
    import FormViewPanel from './FormViewPic';

    export default {
        components: {FormPanel, FormViewPanel, CustomerSelect},
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
            onDataloaded(rsp) {
                // if (rsp.total < 1) return;
                // let promotionIds = rsp.data.map(r => r.id);
                // this.$api.ipark.PromotionInfoService.summaryGroupByPromotionId(promotionIds).then(rs => {
                //     let _rs = rs || [];
                //     this.summaryMap = {}
                //     _rs.forEach(r => {
                //         this.summaryMap[r.promotionId] = r;
                //     })
                // })
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
            edit(row) {
                this.$refs.formDiag.show({id: row.id});
            },
            clickRow(row) {
                this.row = row;
                console.log(row);
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
                this.row = null;
                this.search();
            },
            search() {
                this.getSearchParams();
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
