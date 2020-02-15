<template>
    <div class="panel panel-default panel-search">
        <el-form :inline="true" label-width="85px" label-position="left">

            <el-form-item label="子系统" prop="subsysId">
                <subsys-select @change="search" v-model="page.query.param.subsysId" :clearable="true"></subsys-select>
            </el-form-item>

            <el-form-item label="元数据类型" prop="metadataType">
                <el-select @change="search"  v-model="page.query.param.metadataType" :clearable="true">
                    <el-option v-for="t in $dict.store.METADATA_TYPE" :key="t[0]" :value="t[0]" :label="t[1]">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="元数据名称" prop="metadataName">
                <el-input placeholder="元数据名称" v-model="page.query.param.metadataName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>

            <el-button type="primary" plain  @click="create" style="float: right; margin-right: 20px">新增</el-button>
        </el-form>

        <v-table :pageSize="5" :selection= "false" ref="table" :page="page" :table-minheight="200"
                 :dblclick="edit" :click="clickTableRow" @dataloaded="onDataloaded">
            <!--<el-table-column prop="seq" label="序号" width="50">-->
                <!--<template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>-->
            <!--</el-table-column>-->
            <el-table-column prop="metadataOrder" label="排序" width="60"></el-table-column>
            <el-table-column width="145" label="元数据">

                <template slot-scope="scope">

                    <el-button type="text" @click="del(scope.row,scope.$index)" title="删表" >
                        <span style="color:red">删表</span>
                    </el-button>
                    <el-button type="text" title="建表" @click="edit(scope.row)">
                        建表
                    </el-button>
                    <el-button type="text" title="建表" @click="edit(scope.row)">
                        拷贝
                    </el-button>

                </template>
            </el-table-column>

            <!--<el-table-column prop="subsysId" label="子系统" width="120"></el-table-column>-->

            <el-table-column prop="metadataAlias" label="中文名称" width="160">
                <template slot-scope="{row}">
                    <span style="color:mediumvioletred">{{row.metadataAlias}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="metadataName" label="元数据名称" width="160">
                <template slot-scope="{row}">
                    <span s>{{row.metadataName}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="metadataDb" label="数据库" width="160"></el-table-column>
            <el-table-column prop="metadataMemo" label="描述" width="320"></el-table-column>

            <el-table-column prop="metadataType" label="类型" width="100">
                <template slot-scope="{row}">
                    {{$dict.getText(row.metadataType,$dict.store.METADATA_TYPE)}}
                </template>
            </el-table-column>
            <el-table-column prop="metadataAutocreate" label="创建？" width="80">
                <template slot-scope="{row}">
                    {{row.metadataAutocreate}}
                </template>
            </el-table-column>
            <el-table-column prop="metadataCached" label="cached?"  >
                <template slot-scope="{row}">
                    {{row.metadataCached}}
                </template>
            </el-table-column>


            <el-table-column width="100" label="操作" :fixed="'right'">

                <template slot-scope="scope">
                    <el-button type="text" title="编辑" @click="edit(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" @click="del(scope.row,scope.$index)" title="删除" >
                        <span style="color:red"><i class="el-icon-delete red"></i></span>
                    </el-button>
                </template>
            </el-table-column>

        </v-table>

        <v-dialog ref="formDiag" title="信息编辑" :width="'50%'">
            <!--<form-panel @saved="onFormSaved"></form-panel>-->
            <div slot="footer">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>

    </div>
</template>
<style>

</style>

<script>
    import SubsysSelect from '@/components/widgets/platform/SubsysSelect.vue';

    export default {
        components: {SubsysSelect},
        props:{
            value: {
                type: Object,
                required: true
            },
        },
        computed: {
            table: {
                get () {
                    return this.value
                },
                set (val) {
                    this.$emit('input', val)
                }
            }
        },
        watch: {

        },
        data() {
            return {

                page: {
                    query: {
                        orderBys: 'metadataOrder|asc',
                        param: {
                            subsysId: 0,
                            metadataType: 1,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.platform.MetadataDictService.query
                }
            }
        },
        methods: {
            clickTableRow(row) {
                //Object.assign(this.value, row)
                this.table = row
            },

            onFormSaved() {
                this.$refs.formDiag.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {
                this.search();
            },

            search() {
                this.getSearchParams();
                this.$refs.table.currentPage = 1;
                this.$refs.table.load();
            },
            cancel() {
                this.dateRangeType = null;
                this.dateRange = [];
                this.$refs.table.currentPage = 1;
                this.page.query.param = {
                    subsysId: 0,
                };
                this.search();
            },
            onDataloaded(rsp) {

            },
            getSearchParams() {
                this.page.query.dateRanges = {};
                if (this.dateRangeType != null && this.dateRange && this.dateRange.length > 0) {
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

            view(row) {
                this.$refs.formDiagView.show({id: row.id});
            },
            toggleStatus(row) {


            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {type: "warning"}).then(() => {
                    this.$api.platform.MetadataDictService.deleteById(row.id).then(rsp => {
                        this.$msgJsonResult(rsp);
                        if (rsp.code == 0) {
                            this.search();

                        }
                    });
                });
            },
        },
        created() {
        },
        mounted() {
            this.$on("init", this.init);
        }
    }
</script>
