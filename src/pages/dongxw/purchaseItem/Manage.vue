<!--订单管理-->
<template>
    <div>

        <v-toolbar title="采购订单表" type="alert">
            <span slot="tip" style="margin-left:60px;color :red">  鼠标双击进入订单修改! </span>

            <el-button type="primary" plain @click="create" style="margin-right:60px;color :green">
                新增采购单(根据客户订单)
            </el-button>

            <el-button type="primary" @click="search" v-keycode="'ENTER'">刷新</el-button>
            <!--<el-button @click="cancel" style="margin-right:60px;color :yellowgreen">取消</el-button>-->
            <!--<el-button plain @click="exportRecords">导出XLS</el-button>-->
        </v-toolbar>

        <v-table ref='table' :dblclick='edit' :page='page' :table-minheight='450' @dataloaded='onDataloaded'>
            <el-table-column :sortable='true'  prop='code'   label='供应商编码' width='110'>
                <template slot-scope='{row}'><span style='color:black'>
			        {{row.supplier.code}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='supplierName' :sortable='true' label='供应商' width='180'>
                <template slot-scope='{row}'><span style='color:black'>
			        {{row.supplierName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='purchaseOrderCode' :sortable='true' label='订单编号' width='160'>
                <template slot-scope='{row}'><span style='color:black'>
			{{row.purchaseOrderCode}}</span>
                </template>
            </el-table-column>


            <el-table-column prop='openDate' :sortable='true' label='订货日期' width='95'>
                <template slot-scope='{row}'>
                    <span style='color:black'> {{ $dongxwDict.viewDate(row.openDate)}} </span>
                </template>
            </el-table-column>


            <el-table-column prop='issueDate' :sortable='true' label='交货日期' width='95'>
                <template slot-scope='{row}'>
                    <span style='color:black'>{{$dongxwDict.viewDate(row.issueDate) }}</span>
                </template>
            </el-table-column>

            <el-table-column prop='addr' :sortable='true' label='地址' width='180'>
                <template slot-scope='{row}'><span style='color:black'>
			{{row.supplier.addr}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='contact' :sortable='true' label='联系人' width='120'>
                <template slot-scope='{row}'><span style='color:black'>
			{{row.supplier.contact}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='tel' :sortable='true' label='电话' width='120'>
                <template slot-scope='{row}'><span style='color:black'>
			{{row.supplier.tel}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='fax' :sortable='true' label='传真' width='120'>
                <template slot-scope='{row}'><span style='color:black'>
			{{row.supplier.fax}}</span>
                </template>
            </el-table-column>
            <!--10草稿11作废20正式-->
            <el-table-column prop='status' :sortable='true' label='状态' width='80'>
                <template slot-scope='{row}'><span style='color:black'>
			        {{row.status||'正式'}}</span>
                </template>
            </el-table-column>

            <el-table-column prop='remark' :sortable='true' label='备注' width='120'>
                <template slot-scope='{row}'><span style='color:black'>
			        {{row.remark}}</span>
                </template>
            </el-table-column>

            <el-table-column prop='createTime' :sortable='true' label='创建时间' width='121'>
                <template slot-scope='{row}'><span style='color:black'>
			{{row.createTime}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='createByName' :sortable='true' label='创建人' width='111'>
                <template slot-scope='{row}'><span style='color:black'>
			{{row.createByName}}</span>
                </template>
            </el-table-column>
            <el-table-column width='140' label='操作' :fixed='"right"'>
                <template slot-scope='scope'>

                    <el-button type='text' title='编辑'@click='edit(scope.row)'>
                        <i class='el-icon-edit'></i>
                    </el-button>
                    <el-button type='text' @click='del(scope.row,scope.$index)' title='删除' >
                        <span style='color: red'> <i class='el-icon-delete red'></i></span>
                    </el-button>
                    <el-button  title='导出' @click='exportRecords(scope.row)'>
                        导出
                    </el-button>
                </template>
            </el-table-column>
        </v-table>
        <v-dialog ref="formDiag" title="采购单信息" :width="'50%'">
            <form-panel @saved="onFormSaved" :customerOrder="customerOrder">
                    <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                    <el-button type="default" @click="()=>{$refs.formDiag.hide();onFormSaved();}">关闭</el-button>
            </form-panel>

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
        components: {FormPanel, CustomerSelect},
        props:{
            value: {
                type: Object,
                required: true
            },

            fatherMethod: {
                type: Function,
                default: null
            }
        },
        data() {
            return {
                DICT: {
                    "MONEYTYPE":{
                        "100":"人民币",
                        "200":"美元",
                        "300":"港币"
                    }
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
                            customerId: undefined,
                            prdFlg:200,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.dongxw.PurchaseOrderService.query
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
            customerOrder: {
                get () {
                    return this.value
                },
                set (val) {
                    this.$emit('input', val)
                }
            }
        },
        watch:{
            customerOrder: {
                handler: function(newVal, oldVal) {
                    this.search()
                },
                deep: true
            }
        },

        methods: {
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

                this.page.query.param.orderId = this.customerOrder.id
                return this.page.query;
            },
            /*
            导出
            */
            exportRecords(row) {
                let self = this;
                this.$confirm("确定要导出采购单吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    let params = {
                        param:{
                            id: row.id
                        }
                    }
                    self.$api.dongxw.PurchaseOrderService.exportRm(params);

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
                    self.$api.dongxw.PurchaseOrderService.exportMail(params);

                });

            },
            create() {
                this.$refs.formDiag.show();
            },


            edit(row) {
                this.$refs.formDiag.show({id: row.id});
            },
            clickRow(row) {
                if(fatherMethod){
                    this.fatherMethod(row)
                }
            },


            toggleStatus(row) {

            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.PurchaseOrderService.deleteById(row.id).then(rsp => {
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
                this.row = options


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
                if (row.orderType != 100 && this.fatherMethod) {
                    this.fatherMethod(row);
                }
                if (row.orderType == 100){
                    this.$message("父订单没有产品清单！")
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
