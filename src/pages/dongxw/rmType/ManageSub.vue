<template>
    <div>

        <v-toolbar type="alert">
            <div slot="tip" class="panel panel-default panel-search">
                <el-form :inline="true">
                    <el-form-item style="margin-left: 20px " label="大类标识">
                        <span style="color:red">
                        {{ parentId < 0 ?'请点上方大类':parentRow.name }}
                    </span>
                    </el-form-item>

                    <el-form-item label="小类编码" prop="code">
                        <el-input v-model="page.query.param.code" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="小类名称" prop="name">
                        <el-input v-model="page.query.param.name" clearable></el-input>
                    </el-form-item>

                    <el-form-item>
                       <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                        <el-button @click="cancel">取消</el-button>
                        <el-button v-show="parentId>0"  type="primary" plain @click="create">新增</el-button>

                    </el-form-item>
                </el-form>
            </div>
            <!--<el-button plain @click="exportRecords">导出 XLS</el-button>-->
            <!--<el-button type="primary" plain @click="create">新增</el-button>-->
        </v-toolbar>
        <v-table ref="table" :page="page" :dblclick="edit" :table-minheight="450"  :pageSize="12"  @dataloaded="onDataloaded">
            <el-table-column prop="seq" label="序号" width="50">

                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>

            </el-table-column>
            <el-table-column  prop="parentId" label="大类" width="190">
                <template slot-scope="{row}">
                    <span style="color:green">   {{ row.pProductType?row.pProductType.name:'-'}} </span>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="小类编码" width="160"></el-table-column>
            <el-table-column prop="name" label="小类名称" width="200">
                <template slot-scope="scope">
                    <a class="link-name"
                       href="javascript:;"
                       :title="scope.row.name"
                       @click="edit(scope.row)" >{{ scope.row.name }}
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="描述" width="240"></el-table-column>

            <el-table-column width="100" label="操作">
                <!--<el-table-column width="100" label="操作" :fixed="'right'">-->
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


        <v-dialog ref="formDiag" :width="'450px'" title="信息编辑">
            <form-panel @saved="onFormSaved" :parentId="parentId"></form-panel>
            <div slot="footer">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>
    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">

    .status_green {
        color: green;
    }
</style>

<script>

    import FormPanel from './FormSub';

    export default {
        components: {FormPanel},

        data() {
            return {
                metafields : [],
                parentId: -1,
                parentRow: { parentId: -1},
                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            parentId : -1,
                            //prdFlag : -1,
                            isDeleted: false
                        }
                    },
                    getData : this.$api.dongxw.ProductTypeService.query

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
                // this.$api.dongxw.CustomerService.export(params);
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

                this.$refs.formDiag.parentId = this.parentId;
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
                    this.$api.dongxw.ProductTypeService.deleteById(row.id).then(rsp => {
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

                this.parentId = options.parentId
                this.parentRow = options.parentRow
                this.page.query.param.parentId = this.parentId;
                this.search();
            },
            search() {

                this.$refs.table.load();

            },
            cancel() {
                this.dateRange = [];
                this.page.query.param = {};
                this.page.query.param.parentId = this.parentId;
                this.search();
            }  ,

        },

        created() {
        },
        mounted() {
            this.$on("init", this.init);

        }
    };
</script>
