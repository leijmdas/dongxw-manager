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
           <div style="color:red;height:70px;font-size: 40px;margin-top:40px;margin-left: 120px"> <h1>今日上班动态显示屏</h1></div>
            <v-table ref="table" :page="page" :dblclick="edit" :click="clickRow" :pageSize="12" :table-minheight="250"  @dataloaded="onDataloaded">
              <!--<el-table-column prop="seq" label="序号" width="50">-->

                  <!--<template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>-->

              <!--</el-table-column>-->
                <el-table-column prop="id" label="工号" width="120">
                    <template slot-scope="{row}">
                        <span style="color:green"> {{ 10000+row.id }} </span>
                    </template>
                </el-table-column>

                <el-table-column prop="seq" label="姓名" width="150">

                <template slot-scope="scope"><span>{{names[scope.$index+'']}} </span></template>

                </el-table-column>
                <el-table-column prop="card" label="上班卡" width="120">
                    09:00
                </el-table-column>
                <el-table-column prop="rcard" label="实际打卡" width="120">
                    09:10
                </el-table-column>
                <el-table-column prop="status" label="状态" width="190">
                    <span style="color:red;">迟到</span>
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
                names: {
                    '0': "张三",
                    1: "李四",
                    2:"王五",
                    3:"张友亮",
                    4:"李明",
                    5:"王兴",
                    6:"张强林",
                    7:"李家栋",
                    8:"宋一明",

                },
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
