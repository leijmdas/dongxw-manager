<template>
    <div>

        <v-toolbar type="alert">
            <div slot="tip" class="panel panel-default panel-search">
                <el-form :inline="true">
                    <el-form-item label="大类编码" prop="code">
                        <el-input v-model="page.query.param.code" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="大类名称" prop="name">
                        <el-input v-model="page.query.param.name" clearable></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                        <el-button @click="cancel">取消</el-button>
                        <el-button plain @click="exportRecords">导出XLS</el-button>
                        <el-button type="primary" plain @click="create">新增</el-button>

                    </el-form-item>
                </el-form>
            </div>
            <!--<el-button plain @click="exportRecords">导出 XLS</el-button>-->
            <!--<el-button type="primary" plain @click="create">新增</el-button>-->
        </v-toolbar>
        <div width="50%">
        <v-table ref="table" :page="page" :dblclick="edit" :click="clickRow" :pageSize="12" :table-minheight="250"  @dataloaded="onDataloaded">
            <el-table-column prop="seq" label="序号" width="50">

                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>

            </el-table-column>
            <el-table-column prop="id" label="大类标识" width="120"></el-table-column>
            <el-table-column prop="code" label="大类编码" width="240"></el-table-column>
            <el-table-column prop="name" label="大类名称" width="160">
                      <!--<template slot-scope='{row}'>-->
                    <!--<span style='color:blue'>{{row.name}}</span>-->
                    <!--</template>-->
                    <template slot-scope="scope">
                        <a class="link-name"
                           href="javascript:;"
                           :title="scope.row.name"
                           @click="edit(scope.row)" >{{ scope.row.name }}
                        </a>
                    </template>
            </el-table-column>
            <el-table-column prop="remark" label="描述" width="240"></el-table-column>

            <el-table-column width="100" label="操作"  >
                <!--<el-table-column width="100" label="操作" :fixed="'right'">-->
                <template slot-scope="scope">

                    <el-button type="text" title="编辑" @click="edit(scope.row)"  >
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" style="color:red" @click="del(scope.row,scope.$index)" title="删除"  >
                    <i class="el-icon-delete  "></i>
                    </el-button>
                </template>
            </el-table-column>

        </v-table>


        </div>
            <v-dialog ref="formDiag" :width="'450px'" title="信息编辑">
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
        color: green;
    }
</style>

<script>

    import FormPanel from './Form';

    export default {
        components: {FormPanel},
        props: {
            fatherMethodShowSub: {
                type: Function,
                default: null
            },

        },
        data() {
            return {
                metafields : [],

                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'code|asc',
                        param: {
                            parentId : 0,
                            prdFlag : 0,
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
                let params = _.cloneDeep(this.getSearchParams())
                params.param.parentId = null
                this.$api.dongxw.ProductTypeService.export(params)
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
                    this.$api.dongxw.ProductTypeService.deleteById(row.id).then(rsp => {
                        this.search()
                        this.$msgJsonResult(rsp)
                    });
                });
            },
            onFormSaved() {
                this.$refs.formDiag.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {
                if (options.parentId) {
                    this.parentId = options.parentId;
                }
                this.search();
            },
            search() {
                this.$refs.table.load();
                //this.$refs.tablesub.load();

            },
            cancel() {
                this.dateRange = [];
                this.page.query.param = {
                    parentId : 0,
                    prdFlag : 0,
                    isDeleted: false
                };
                this.search();
            }  ,

            clickRow(row) {
                this.row = row;
                console.log(JSON.stringify(row));
                if (this.fatherMethodShowSub) {
                    this.fatherMethodShowSub(row);
                }

            },

        },

        created() {
        },
        mounted() {
            this.$on("init", this.init);

        }
    };
</script>
