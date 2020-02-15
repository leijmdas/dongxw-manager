<template>
    <div>
        <div class="panel panel-default panel-search">

            <el-form :inline="true">

                <el-form-item label="子系统">
                    <subsys-select v-model="page.query.param.subsysId" :clearable="true"></subsys-select>
                </el-form-item>

                <el-form-item label="表名" prop="metadataId">
                    <table-select :fnChange="searchWhenChangeTbl" :subsysId="page.query.param.subsysId"
                                  v-model="page.query.param.metadataId" :clearable="true"></table-select>
                </el-form-item>

                <el-form-item label="英文名称" prop="fieldName">
                    <el-input v-model="page.query.param.fieldName" clearable></el-input>
                </el-form-item>
                <el-form-item label="中文名称" prop="fieldMemo">
                    <el-input v-model="page.query.param.fieldMemo" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" plain @click="search" v-keycode="'ENTER'">查询</el-button>
                    <el-button @click="cancel">取消</el-button>
                    <!--<el-button type="primary" plain @click="create">新增</el-button>-->

                </el-form-item>
            </el-form>
        </div>
        <el-tabs value="tabDict">
            <el-tab-pane id="tabDict" label="元数据字典" name="tabDict">


                <v-table ref="table" :page="page" :table-minheight="450" @dataloaded="onDataloaded">
                    <el-table-column prop="seq" label="序号" width="50">
                        <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
                    </el-table-column>

                    <el-table-column prop="metadataDictModel.subsysId" label="子系统" width="120"></el-table-column>
                    <el-table-column prop="metadataDictModel.metadataAlias" label="表中文名" width="120"></el-table-column>
                    <el-table-column prop="metadataDictModel.metadataName" label="表名" width="120"></el-table-column>
                    <el-table-column prop="fieldName" label="英文名称" width="120"></el-table-column>
                    <el-table-column prop="fieldMemo" label="中文名称" width="160"></el-table-column>
                    <el-table-column prop="fieldOrder" label="排序" width="60"></el-table-column>
                    <el-table-column prop="fieldType" label="字段类型" width="100"></el-table-column>
                    <el-table-column prop="fieldSize" label="字段长度" width="100"></el-table-column>
                    <el-table-column prop="fieldDisplaysize" label="显示长度" width="80"></el-table-column>

                    <el-table-column prop="fieldPk" label="是否主键" width="80">
                        <template slot-scope="{row}">
                            {{ row.fieldPk? '是':'否' }}
                        </template>

                    </el-table-column>
                    <el-table-column prop="fieldAuto" label="自动生成" width="80">
                        <template slot-scope="{row}">
                            {{ row.fieldAuto? '是':'否' }}
                        </template>

                    </el-table-column>
                    <el-table-column prop="fieldReadonly" label="只读" width="60">
                        <template slot-scope="{row}">
                            {{ row.fieldReadonly? '是':'否' }}
                        </template>

                    </el-table-column>
                    <el-table-column prop="fieldVisible" label="是否可见" width="80">
                        <template slot-scope="{row}">
                            {{ row.fieldVisible? '是':'否' }}
                        </template>
                    </el-table-column>
                    fieldIsNull
                    <el-table-column prop="fieldIsNull" label="是否为空" width="80">
                        <template slot-scope="{row}">
                            {{ row.fieldIsNull? '是':'否' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="fieldDefault" label="默认值" width="80"></el-table-column>

                    <el-table-column prop="fieldRemark" label="说明"></el-table-column>



                </v-table>
            </el-tab-pane>

            <el-tab-pane id="tabData" label="数据列表" name="tabData">
                <table-data-form :metadataId="page.query.param.metadataId"></table-data-form>

            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">

    .color_red {
        color: red;
    }
</style>

<script>

    import SubsysSelect from '@/components/widgets/platform/SubsysSelect.vue';
    import TableSelect from '@/components/widgets/platform/TableSelect.vue';
    import TableDataForm from './TableDataForm'
    export default {
        components: {  TableDataForm,SubsysSelect,TableSelect},
        data() {
            return {
                titles: [],
                records: [],
                metafields: [],

                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            subsysId: 0,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.platform.MetaData.queryFields,
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
                    this.$api.aa.a.delete(row.id).then(rsp => {
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
            searchWhenChangeTbl() {
                this.$refs.table.reset()
                this.$refs.table.load()
            },
            search() {
                this.$refs.table.load()
            },
            cancel() {
                this.dateRange = [];
                this.page.query.param = {};

                this.search();
            },
            loadTableDict() {

                this.$api.platform.MetaData.queryFields({
                    param: {
                        metadataId: this.page.query.param.metadataId
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

            loadDict(){
                this.$api.platform.MetaData.queryFieldsByTable('dict_area').then(rsp => {
                    this.metafields = rsp;
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
