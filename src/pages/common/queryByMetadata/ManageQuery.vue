<template>
    <div>
        <!--<div class="panel panel-default panel-search">-->

            <!--<el-form :inline="true">-->

                <!--<el-form-item label="子系统">-->
                    <!--<sub-sys-select v-model="page.query.param.subsysId" :clearable="true"></sub-sys-select>-->
                <!--</el-form-item>-->

                <!--<el-form-item label="表名" prop="metadataId">-->
                    <!--<table-select :fnChange="search" :subsysId="page.query.param.subsysId"-->
                                  <!--v-model="page.query.param.metadataId" :clearable="true"></table-select>-->
                <!--</el-form-item>-->


                <!--<el-form-item>-->
                    <!--<el-button type="primary" plain @click="search" v-keycode="'ENTER'">查询</el-button>-->
                    <!--<el-button @click="cancel">取消</el-button>-->
                    <!--&lt;!&ndash;<el-button type="primary" plain @click="create">新增</el-button>&ndash;&gt;-->

                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</div>-->

        <!--<v-toolbar title="数据列表" type="alert">-->

        <!--</v-toolbar>-->
        <v-table ref="table" :page="page" :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
            </el-table-column>
            <el-table-column v-for="(title,index) in titles" v-if="title.fieldVisible"
                             :prop="title.fieldName" :label="title.fieldMemo"
                             :width="title.fieldDisplaysize<30 ? title.fieldDisplaysize*30:title.fieldDisplaysize"
                             :fixed="index+1==title.length? 'right':''">
            </el-table-column>
        </v-table>


        <!--<el-table border :data="records"  >-->
                    <!--<el-table-column prop="seq" label="序号" width="50">-->
                        <!--<template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>-->
                    <!--</el-table-column>-->
                    <!--<el-table-column v-for="title in titles"-->
                                     <!--v-if="title.fieldVisible"-->
                                     <!--:prop="title.fieldName"-->
                                     <!--:width="title.fieldDisplaysize*30"-->
                                     <!--:label="title.fieldMemo" header-align="center">-->
                    <!--</el-table-column>-->

                <!--</el-table>-->

        <!--<v-dialog ref="formDiag" :width="'400px'" title="信息编辑">-->
        <!--<form-panel @saved="onFormSaved"></form-panel>-->
        <!--<div slot="footer">-->
        <!--<el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>-->
        <!--<el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>-->
        <!--</div>-->
        <!--</v-dialog>-->
    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">

    .color_red {
        color: red;
    }
</style>

<script>

    import SubSysSelect from '@/components/widgets/dongxw/SubSysSelect.vue';
    import TableSelect from '@/components/widgets/dongxw/TableSelect.vue';

    export default {
        components: { TableSelect,SubSysSelect },
        data() {
            return {
                titles:[],
                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            subsysId: 0,
                            metadataId: this.metadataId,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.metadata.MetaData.selectTable,

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
        props: {
            metadataId: {
                type: Number,
                default: null
            },

        },
        // computed: {
        //     currentValue: {
        //         get () {
        //             return this.value
        //         },
        //         set (val) {
        //             this.$emit('input', val)
        //         }
        //     }
        // },
        watch: {
            metadataId: {
                handler: function(newVal, oldVal) {
                    // this.value = ''
                    // this.currentValue = ''
                    this.$refs.table.reset()
                    this.search()
                },
                deep: true
            }
        },
        methods: {
            onDataloaded(rsp) {

            },
            /*
            导出
             */
            exportRecords() {
                let params = this.getSearchParams();
                console.log(params);
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
                    this.$api.ipark.PromotionInfoService.delete(row.id).then(rsp => {
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
                this.loadTableDict()
                this.page.query.param.metadataId = this.metadataId
                if(this.page.query.param.metadataId){
                    this.$refs.table.load()
                }


            },
            cancel() {
                this.dateRange = [];
                this.page.query.param = {};
                this.search();
            },
            loadTableDict() {

                this.$api.metadata.MetaData.queryFields({
                    param: {
                        metadataId: this.metadataId
                    }
                }).then(rsp => {
                    this.titles = rsp.data;
                    this.titles.sort(function (a, b) {
                        return a.fieldOrder - b.fieldOrder;
                    });

                    this.$message({
                        type: "success",
                        message: "操作成功!"
                    });
                });
                // let p = {
                //     param: {
                //         metadataId: this.page.query.param.metadataId,
                //         db: "dongxw",
                //         table: "order_master"
                //     }
                // }
                // this.$api.metadata.MetaData.selectTable(p).then(rsp => {
                //     this.records = rsp.data;
                //     this.$message({
                //         type: "success",
                //         message: "操作成功!"
                //     });
                // });
            },


        },

        created() {
        },
        mounted() {
            this.$on("init", this.init);
        }
    };
</script>
