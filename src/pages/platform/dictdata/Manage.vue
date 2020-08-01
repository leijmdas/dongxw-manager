<!--cust管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true">
                <el-form-item label="子系统" prop="subsysId">
                    <subsys-select @change="search" v-model="page.query.param.subsysId" :clearable="true"></subsys-select>
                </el-form-item>


                <el-form-item label="分类编号" prop="typeCode">
                    <el-input v-model="page.query.param.typeCode" clearable></el-input>
                </el-form-item>
                <el-form-item label="分类名称" prop="typeName">
                    <el-input v-model="page.query.param.typeName" clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                    <el-button @click="cancel">取消</el-button>

                </el-form-item>
            </el-form>
        </div>
        <v-toolbar title="数据字典" type="alert">
            <el-button v-if='page.query.param.subsysId' type="primary" plain @click="create">新增</el-button>
        </v-toolbar>


        <v-table ref='table'  :page='page' :table-minheight='450' @dataloaded='onDataloaded'>
            <el-table-column prop='subsysId' :sortable='true' label='子系统' width='100'>
                <template slot-scope='{row}'><span style='color: '>
			{{row.subsysDict.subsysName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='typeCode' :sortable='true' label='分类编号' width='100'>
                <template slot-scope='{row}'>
                    {{row.typeCode}}
                </template>
            </el-table-column>
            <el-table-column prop='typeName' :sortable='true' label='分类名称' width='100'>
                <template slot-scope='{row}'>
                    {{row.typeName}}
                </template>

            </el-table-column>
            <el-table-column prop='code' :sortable='true' label='字典编号' width='100'>
                <template slot-scope='{row}'>
                    {{row.code}}
                </template>
            </el-table-column>
            <el-table-column prop='name' :sortable='true' label='字典名称' width='100'>
                <!--<template slot-scope='{row}'>-->
                    <!--{{row.name}}-->
                <!--</template>-->
                <template slot-scope="scope">
                    <a class="link-name"
                       href="javascript:;"
                       :title="scope.row.name"
                       @click="edit(scope.row)" >{{ scope.row.name }}
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop='remark' :sortable='true' label='备注' width='100'>
                <template slot-scope='{row}'>
                    {{row.remark}}
                </template>
            </el-table-column>
            <el-table-column prop='createTime' :sortable='true' label='创建时间' width='190'>
                <template slot-scope='{row}'>
                    {{row.createTime}}
                </template>
            </el-table-column>
            <el-table-column prop='createBy' :sortable='true' label='创建人'  >
                <template slot-scope='{row}'>
                    {{row.createBy}}
                </template>
            </el-table-column>
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
    import SubsysSelect from '@/components/widgets/platform/SubsysSelect.vue';

    export default {
        components: { FormPanel,SubsysSelect },
        data() {
            return {
                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'typeCode|asc,code|asc',
                        param: {
                            subjectId: undefined,
                            subsysId: 100,
                            isDeleted: false
                        }
                    },
                    getData : this.$api.platform.DictDataService.query

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
                // if (rsp.total < 1) return;
                // let promotionIds = rsp.data.map(r => r.id);
                // this.$api.ipark.PromotionInfoService.summaryGroupByPromotionId(promotionIds).then(rs => {
                //     let _rs = rs || [];
                //     this.summaryMap = {}
                //     _rs.forEach(r => {
                //         this.summaryMap[r.promotionId] = r;
                //     })
                // })
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
                this.$refs.formDiag.show({subsysId: this.page.query.param.subsysId});
            },
            edit(row) {
                this.$refs.formDiag.show({subsysId: this.page.query.param.subsysId,id: row.id});
            },
            toggleStatus(row) {

            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.platform.DictDataService.deleteById(row.id).then(rsp => {
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
