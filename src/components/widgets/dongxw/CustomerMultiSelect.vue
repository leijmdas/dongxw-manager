<!--cust管理-->
<template>
    <div v-model="currentValue" >
        <div class="panel panel-default panel-search">
            <el-form :inline="true">

                <el-form-item  label="客户编码" prop="code">
                    <el-input v-model="page.query.param.custNo" clearable></el-input>
                </el-form-item>
                <el-form-item label="客户名称" prop="name">
                    <el-input v-model="page.query.param.custName" clearable></el-input>
                </el-form-item>



                <el-form-item>
                    <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <v-toolbar title="客户名单" type="alert">
            <el-button type="primary" plain @click="cancelFind">关闭</el-button>
        </v-toolbar>


        <v-table ref="table" :multi="false"  :page="page" :tableMaxheight="400" :table-minheight="300"
                 @dataloaded="onDataloaded">

            <el-table-column :sortable="true" prop="custNo" label="客户编码" width="100">
                <template slot-scope="{row}">
                    <span >{{ row.custNo }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column :sortable="true"  prop="name" label="name" width="200"></el-table-column>-->
            <el-table-column :sortable="true" width='260' prop="name" label='****** 请选择客户 ******'>
                <template slot-scope="{row}">
                    <el-button  :style="'width:100%'"  @click='confirmFind(row)'> <span  style="color: darkmagenta ">{{ row.custName }}</span>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="custSname" label="客户全称" width="300"></el-table-column>

            <el-table-column prop="addr" label="地址" width="300"></el-table-column>


            <el-table-column  prop="contact" label="联系人" width="120">
            </el-table-column>

            <el-table-column :sortable="true"  prop="tel" label="电话" width="120">
            </el-table-column>


        </v-table>

    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">

    .status_green {
        color: red;
    }
</style>

<script>


    export default {
        components: {},
        props: {
            value: {
                required: true
            },
            confirmFind: {
                Type: Function,
                required: true,
            },
            cancelFind: {
                Type: Function,
                required: true,
            },
        },
        data() {
            return {
                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'custNo|asc',
                        param: {
                            isDeleted: false
                        }
                    },
                    getData : this.$api.dongxw.CustomerService.query

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
            confirmFindClick(){
                if(this.confirmFind)
                {
                    this.confirmFind()
                }
            },
            cancelFindClick(){
                if(this.cancelFind)
                {
                    this.cancelFind()
                }
            },

            onDataloaded(rsp) {

            },
            /*
            导出
             */
            exportRecords() {
                let params = this.getSearchParams();
                console.log(params);
                this.$api.dongxw.SupplierService.export(params);
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
                    this.$api.dongxw.CustomerService.updateStatus(row.id, status == 1 ? 2 : 1).then(rsp => {
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
                    this.$api.dongxw.SupplierService.deleteById(row.id).then(rsp => {
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
                this.$refs.table.load();
            },
            cancel() {
                this.dateRange = [];
                this.page.query.param = {};
                this.search();
            }
        },
        created() {
        },
        mounted() {
            this.$on("init", this.init);
        }
    };
</script>
