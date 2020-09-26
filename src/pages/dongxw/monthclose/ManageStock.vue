<!--cust管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true">
                <el-form-item label="客户" prop="customerId">
                    <customer-select :fnChange="search" v-model="page.query.param.customerId" :clearable="true"></customer-select>

                </el-form-item>

                <el-form-item label="客户单号" prop="epCode">
                    <el-input v-model="page.query.param.epCode" clearable></el-input>
                </el-form-item>
                <el-form-item label="物品代码" prop="epCode">
                    <el-input v-model="page.query.param.epCode" clearable></el-input>
                </el-form-item>

                <el-form-item label="物品名称" prop="remark">
                    <el-input v-model="page.query.param.remark" clearable></el-input>
                </el-form-item>
                <el-form-item label="颜色" prop="color">
                    <el-input v-model="page.query.param.color" clearable></el-input>
                </el-form-item>
                <el-form-item label="规格" prop="size">
                    <el-input v-model="page.query.param.size" clearable></el-input>
                </el-form-item>



            </el-form>
        </div>
        <v-toolbar title="库存清单" type="alert">



            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="cancel">取消</el-button>

            <el-button plain @click="exportRecords">导出 XLS</el-button>

            <!--<el-button type="primary" plain @click="create">新增</el-button>-->



        </v-toolbar>


        <v-table ref="table" :page="page"   :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column  prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span >{{scope.$index + 1}} </span></template>
            </el-table-column>
            <el-table-column prop="ym" label="周期" width="80">
            </el-table-column>


            <el-table-column :sortable="true"  prop="customerId" label="客户名称" width="120">
                <template slot-scope="{row}">
                    {{ row.customer?row.customer.custName:'-'}}
                </template>
            </el-table-column>

            <el-table-column :sortable="true" prop="orderId" label="客户单号" width="100">
                <template slot-scope="{row}">
                    <span style="color:green"> {{row.code }} </span>
                </template>
            </el-table-column>

            <!--<el-table-column :sortable="true"  prop="epCode" label="采购单号" width="100"></el-table-column>-->

            <el-table-column prop="productId" label="物品代码" width="120">
            </el-table-column>

            <el-table-column :sortable="true"  prop="productId" label="物品名称" width="245">
                <template slot-scope="scope">
                    <a class="link-name"
                       href="javascript:;"
                       :title="scope.row.remark" >{{ scope.row.remark }}
                    </a>
                </template>
            </el-table-column>

            <el-table-column prop="size" label="规格(尺寸)" width="120">
            </el-table-column>
            <el-table-column :sortable="true" prop="color" label="颜色" width="120">
            </el-table-column>
            <el-table-column :sortable="true" prop="unit" label="单位" width="60"></el-table-column>
            <el-table-column :sortable="true" prop="price" label="单价" width="60"></el-table-column>
            <el-table-column :sortable="true" prop="qty" label="本期库存" width="90"></el-table-column>
            <el-table-column :sortable="true" prop="money" label="金额" width="90"></el-table-column>
            <el-table-column :sortable="true" prop="qtyIn" label="本期入库" width="90"></el-table-column>
            <el-table-column :sortable="true" prop="qtyOut" label="本期出库" width="90"></el-table-column>
            <el-table-column :sortable="true" prop="qty" label="期初库存" width="90"></el-table-column>

            <!--createBy: 0-->
            <!--createDate: "2020-09-23 15:29:29"-->
            <!--customerId: 0-->
            <!--id: 1-->
            <!--mcId: 2-->

            <!--price: 0-->
            <!--productId: 0-->
            <!--qty: 0-->
            <!--qtyIn: 0-->
            <!--qtyOut: 0-->
            <!--wh: 0-->
            <!--ym: 202009-->
            <el-table-column width="100" label="操作" :fixed="'right'">
                <template slot-scope="scope">

                    <el-button type="text" title="编辑" @click="edit(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button type="text"  style="color:red" @click="del(scope.row,scope.$index)" title="删除"  >
                        <i class="el-icon-delete red"></i>
                    </el-button>
                </template>
            </el-table-column>
        </v-table>
        <v-dialog ref="formDiag" :width="'800px'" title="信息编辑">
            <form-panel @saved="onFormSaved"></form-panel>
            <div slot="footer" style="margin-right:40px">
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

    import FormPanel from './Form';

    export default {
        components: { CustomerSelect,FormPanel, ProductTypeSelect,ProductSubTypeSelect },
        data() {
            return {
                isShowPrdPic : false,
                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                currentPage : 1 ,
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            mcId: undefined,
                            isDeleted: false
                        }
                    },
                    getData : this.$api.dongxw.WhStockService.query

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
            handleCommand(command) {
                this.page.query.orderBys = command
                this.search()
            },
            calCbm(val){
                let v = val.split('*')

                if (v.length === 3) {
                    var multi = function (a, b) {
                        return parseInt(a) * parseInt(b);
                    }
                    return v.reduce(multi, 1)/1000000
                }
                return 0;
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
            /*发送邮件
           * */
            exportMail() {
                let self = this;
                this.$confirm("确定要发送产品清单的邮件吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    let params = self.getSearchParams();
                    self.$api.dongxw.ProductService.exportMail(params);

                });

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
                    this.$api.dongxw.ProductService.deleteById(row.id).then(rsp => {
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
                this.search();
            },
            search() {
                this.$refs.table.currentPage = 1;
                this.$refs.table.load();
            },
            cancel() {
                this.dateRange = []
                this.page.query.param = {prdFlag: 0}
                this.search()
            }
        },
        created() {
        },
        mounted() {
            this.$on("init", this.init);
            //let ret=this.$api.dongxw.CustomerService.findById(1);
            //console.log(JSON.stringify(ret));
        }
    };
</script>
