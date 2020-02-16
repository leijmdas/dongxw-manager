<template>

        <v-table ref="table" :pageSize="10" :page="page" :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
            </el-table-column>
            <el-table-column label='元数据名称' prop='metadata_name' width="200">
                <template slot-scope="{row}">
                    <span :style="row.dict_field_name!=row.db_field_name?'color:red':''">{{row.metadata_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="字典字段" prop="dict_field_name" width="200">
                <template slot-scope="{row}">
                    <span :style="row.dict_field_name!=row.db_field_name?'color:red':''">{{row.dict_field_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="字典字段类型" prop="field_type" width="200">
                <template slot-scope="{row}">
                    <span :style="row.dict_field_name!=row.db_field_name?'color:red':''">{{row.field_type}}</span>
                </template>
            </el-table-column>
            <el-table-column label="表字段类型" prop="data_type" width="200">
                <template slot-scope="{row}">
                    <span :style="row.dict_field_name!=row.db_field_name?'color:red':''">{{row.data_type}}</span>
                </template>
            </el-table-column>
            <el-table-column label="表字段" prop="db_field_name" width="200">
                <template slot-scope="{row}">
                    <span :style="row.dict_field_name!=row.db_field_name?'color:red':''">{{row.db_field_name}}</span>
                </template>
            </el-table-column>

        </v-table>

</template>
<style rel="stylesheet/less" scoped lang="less">

    .color_red {
        color: red;
    }
</style>

<script>


    export default {
        components: {    },
        props: {
            enableView: {
                type: Boolean,
                deafault: false
            },
            metadataId: {
                type: Number,
                default: null
            },
            getTableData: {
                type:Function,
                default : null,
            }
        },

        watch: {
            enableView: {
                handler: function(newVal, oldVal) {
                    if(this.enableView) {
                        this.search()
                    }
                },
                deep: true
            } ,
            metadataId: {
                handler: function(newVal, oldVal) {
                    if(this.enableView) {
                        this.search()
                    }
                },
                deep: true
            }
        },
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
                            //subsysId: 0,
                            metadataId: this.metadataId,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.platform.MetadataTableService.checkDict,

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

        methods: {
            onDataloaded(rsp) {

            },
            /*
            导出
             */
            exportRecords() {
                let params = this.getSearchParams();
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

            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.ee.aa.delete(row.id).then(rsp => {
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

                this.loadDictFields()
                this.page.query.param.metadataId = this.metadataId
                if (this.page.query.param.metadataId) {
                    this.$refs.table.load()
                }


            },
            cancel() {
                this.dateRange = [];
                this.page.query.param = {};
                this.search();
            },
            loadDictFields() {

                //this.$api.platform.MetaData.queryFields({
                this.$api.platform.MetadataFieldService.query({
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
            },


        },

        created() {
        },
        mounted() {
            this.$on("init", this.init);
        }
    };
</script>
