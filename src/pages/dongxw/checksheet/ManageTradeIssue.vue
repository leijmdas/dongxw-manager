<!--ISSUE管理-->
<template>
    <div>

        <v-toolbar title="产品清单" type="alert">
            <div slot="tip" style="margin-left: 60px;margin-top: 2px">
                <span>客户名称</span>
                <el-input disabled style="margin-left: 10px;width:222px;" v-model="master.custName"
                          placeholder="客户名称"></el-input>

                <el-button @click="search" type="primary" style="margin-right: 10px" >查询</el-button>
                <!--<el-button @click="batchCreate" type="primary" style="margin-right: 10px" plain > 批量新增</el-button>-->
                <!--<el-button type="primary" style="margin-right: 160px"   plain @click="create"> 新增  </el-button> -->
                <!--<el-button @click="cancel">取消</el-button>-->
            </div>
        </v-toolbar>


        <v-table ref="table" :page="page" :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
            </el-table-column>

            <!--<el-table-column :sortable="true" prop="masterId" label="masterId" width="160">  </el-table-column>-->
            <el-table-column :sortable="true" prop="orderCode" label="客订单号" width="102">  </el-table-column>
            //产品信息
            <el-table-column :sortable="true" prop="product.code" label="产品编码" width="100"></el-table-column>
            <el-table-column :sortable="true" prop="product.remark" label="规格描述" width="220"></el-table-column>
            <el-table-column :sortable="true" prop="product.color" label="颜色" width="100"></el-table-column>
            <el-table-column :sortable="true" prop="product.size" label="尺寸" width="100"></el-table-column>
            <el-table-column :sortable="true" prop="qtyOrder" label="订单数量" width="120"></el-table-column>
            <el-table-column :sortable="false" prop="qtyFinish" label="已发数量" width="80"></el-table-column>
            <el-table-column :sortable="true" prop="qty" label="发货数量" width="100"></el-table-column>
            <el-table-column :sortable="false"  prop="product.unit" label="单位" width="70"></el-table-column>

            <el-table-column :sortable="true" prop="price" label="单价" width="80"></el-table-column>
            <el-table-column :sortable="true" prop="money" label="金额" width="110"></el-table-column>
            <el-table-column :sortable="true" prop="qtyBackup" label="备品数量" width="80">
            </el-table-column>

            <el-table-column :sortable="true" prop="remark" label="备注"/>


            <!--<el-table-column width="80" label="操作" :fixed="'right'">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button :disabled="scope.row.calFlag" type="text" title="编辑" @click="edit(scope.row)">-->
                        <!--<i class="el-icon-edit"></i>-->
                    <!--</el-button>-->

                    <!--<el-button :disabled="scope.row.calFlag" type="text"  style="color:red"-->
                               <!--@click="del(scope.row,scope.$index)" title="删除"  >-->
                        <!--<i class="el-icon-delete red"></i>-->
                    <!--</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </v-table>

        <!--<v-dialog :appendToBody="true" ref="formDiag" :width="'60%'" title="信息编辑">-->
            <!--<form-panel   @saved="onFormSaved"></form-panel>-->
            <!--<div slot="footer" style="margin-right:40px">-->
                <!--<el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>-->
                <!--<el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>-->
            <!--</div>-->
        <!--</v-dialog>-->

        <v-dialog :appendToBody="true" ref="batchFormDiag" :width="'80%'" title="批量选择产品">
            <batch-select-panel @saved="onBatchFormSaved" :closeDlg="closeDlg"></batch-select-panel>
            <!--<div slot="footer" style="margin-right:40px">-->
                <!--<el-button type="primary" @click="()=>{$refs.batchFormDiag.hide()}">选中</el-button>-->
                <!--<el-button type="default" @click="()=>{$refs.batchFormDiag.hide()}">关闭</el-button>-->
            <!--</div>-->
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
    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';

    import ProductTypeSelect from '@/components/widgets/dongxw/ProductTypeSelect.vue';
    import ProductSubTypeSelect from '@/components/widgets/dongxw/ProductSubTypeSelect.vue';

    import BatchSelectPanel from '@/components/widgets/stock/SelectProductByOrder.vue';

    export default {
        components: { BatchSelectPanel,CustomerSelect, ProductTypeSelect,ProductSubTypeSelect },
        props: {},
        data() {
            return {
                master: {id: 0, custName: ''},
                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                currentPage: 1,
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            //masterId: this.master.id,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.dongxw.TradeService.query

                },
                tableActions: [

                ]
            };
        },
        watch: {
            enableView: {
                handler: function(newVal, oldVal) {
                        this.search()
                },
                deep: true
            } ,
        },
        computed: {},

        methods: {
            closeDlg(){
                this.$refs.batchFormDiag.hide();
                this.search();
            },
            handleCommand(orderBys) {
                this.page.query.orderBys = orderBys
                this.search()
            },

            onDataloaded(rsp) {

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
            batchCreate() {

               this.$refs.batchFormDiag.show({master:this.master})

            },
            create() {
                this.$refs.formDiag.show();
            },
            edit(row) {
                this.$refs.formDiag.show({id: row.id});
            },
            toggleStatus(row) {

            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.TradeService.deleteById(row.id).then(rsp => {
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
            onBatchFormSaved() {
                this.$refs.batchFormDiag.hide();
                this.$nextTick(this.search);
            },

            init(options = {}) {
                //debugger
                this.master = options.master
                this.search()
            },
            search() {
                this.$refs.table.currentPage = 1;
                this.page.query.param.masterId = this.master.id;

                this.$refs.table.load();
            },
            cancel() {
                this.dateRange = []
                this.$refs.table.currentPage = 1;
                this.page.query.param = {
                   masterId: this.master.id,
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
