<!--cust管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true">

                <el-form-item label="子系统代号" prop="subsysNo">
                    <el-input v-model="page.query.param.subsysNo" clearable></el-input>
                </el-form-item>
                <el-form-item label="子系统名称" prop="subsysName">
                    <el-input v-model="page.query.param.subsysName" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                    <el-button @click="cancel">取消</el-button>

                </el-form-item>
            </el-form>
        </div>
        <v-toolbar title="子系统" type="alert">
            <el-button type="primary" plain @click="create">新增</el-button>
        </v-toolbar>



        <v-table ref='table' :dblclick='edit' :page='page' :table-minheight='450' @dataloaded='onDataloaded'>
            <el-table-column prop='subsysId' :sortable='true' label='标识' width='100'>
                <template slot-scope='{row}'>
                    {{row.subsysId}}
                </template>
            </el-table-column>
            <el-table-column prop='subsysNo' :sortable='true' label='子系统代号' width='160'>
                <template slot-scope='{row}'>
                    {{row.subsysNo}}
                </template>
            </el-table-column>
            <el-table-column prop='subsysName' :sortable='true' label='子系统名称' width='280'>
                <template slot-scope='{row}'>
                    {{row.subsysName}}
                </template>
            </el-table-column>
            <el-table-column prop='remark' :sortable='true' label='子系统表'>
                <template slot-scope='{row}'>
                    {{row.remark}}
                </template>
            </el-table-column>
            <!--<el-table-column prop='ip' :sortable='true' label='ip' width='100'>-->
            <!--<template slot-scope='{row}'>-->
            <!--{{row.ip}}-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop='port' :sortable='true' label='port' width='100'>-->
            <!--<template slot-scope='{row}'>-->
            <!--{{row.port}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column width='80' label='操作' :fixed='"right"'>
                <template slot-scope='scope'>
                    <el-button type='text' title='编辑'@click='edit(scope.row)'>
                        <i class='el-icon-edit'></i>
                    </el-button>
                    <el-button type='text' @click='del(scope.row,scope.$index)' title='删除' >
                        <span style='color: red'> <i class='el-icon-delete red'></i></span>
                    </el-button>
                </template>
            </el-table-column>
        </v-table>
        <v-dialog ref="formDiag" :width="'600px'" title="信息编辑">
            <form-panel @saved="onFormSaved"></form-panel>
            <div slot="footer">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>
    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">

    .status_green {
        color: red;
    }
</style>

<script>

    import FormPanel from './Form';

    export default {
        components: { FormPanel },
        data() {
            return {
                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            subjectId: undefined,
                            isDeleted: false
                        }
                    },
                    getData : this.$api.platform.SubsysDictService.query

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

            },
            /*
            导出
             */
            exportRecords() {
                let params = this.getSearchParams();
                console.log(params);
                this.$api.dongxw.CustomerService.export(params);
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
                this.$refs.formDiag.show({subsysId: row.subsysId});
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
                    this.$api.platform.SubsysDictService.deleteById(row.subsysId).then(rsp => {
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
