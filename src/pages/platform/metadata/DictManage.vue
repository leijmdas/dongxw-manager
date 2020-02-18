<template>
    <div class="panel panel-default panel-search">
        <el-row :span="24">
            <el-col :span="8">
                <v-sort-table :page="page" :header="header" :doSortFun="doSortFun" v-show="showSort" ref="sortTable"></v-sort-table>
            </el-col>
        </el-row>
        <el-form :inline="true" label-width="85px" label-position="left">
            <el-button @click="btnSort" v-if="table.metadataId" class="btn_leftright" plain>
                排序
            </el-button>

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

            <el-button type="primary" class="btn_right" plain @click="create">新增</el-button>
            <el-button  plain class="btn_right"> 导入</el-button>
            <el-button class="btn_right" plain > 导出</el-button>
        </el-form>

        <v-table :pageSize="5" :selection="false" ref="table" :page="page" :table-minheight="200"
                 :dblclick="edit" :click="clickTableRow" @dataloaded="onDataloaded">
            <!--<el-table-column prop="seq" label="序号" width="50">-->
                <!--<template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>-->
            <!--</el-table-column>-->
            <el-table-column prop="metadataOrder" label="排序" width="50"></el-table-column>
            <el-table-column width="120" label="元数据操作">

                <template slot-scope="scope">
                    <el-button type="text" title="建表" @click="makeDbTable(scope.row)">
                        建表
                    </el-button>
                    <el-button type="text" @click="dropDbTable(scope.row)" title="删表" >
                        <span style="color:red">删表</span>
                    </el-button>
                </template>
            </el-table-column>


            <el-table-column prop="metadataAlias" label="中文名称" width="120">
                <template slot-scope="{row}">
                    <span style="color:blue">{{row.metadataAlias}}</span>
                </template>
            </el-table-column>

            <el-table-column prop="metadataName" label="元数据名称" width="120">
                <template slot-scope="{row}">
                    <span style="color:mediumvioletred">{{row.metadataName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="metadataType" label="元数据类型" width="100">
                <template slot-scope="{row}">
                    {{$dict.getText(row.metadataType,$dict.store.METADATA_TYPE)}}
                </template>
            </el-table-column>
            <el-table-column prop="metadataAutocreate" label="允许建表" width="100" >
                <template slot-scope="{row}">
                    {{row.metadataAutocreate?'是':'否'}}
                </template>
            </el-table-column>
            <!--<el-table-column prop="metadataCached" label="cached"  >-->
            <!--<template slot-scope="{row}">-->
            <!--{{row.metadataCached}}-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="metadataDb" label="数据库" width="160"></el-table-column>
            <el-table-column prop="metadataMemo" label="描述" ></el-table-column>


            <el-table-column width="240" label="操作" :fixed="'right'">

                <template slot-scope="scope">
                    <el-button type="text" title="编辑" @click="edit(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" @click="del(scope.row,scope.$index)" title="删除" >
                        <span style="color:red"><i class="el-icon-delete red"></i></span>
                    </el-button>

                    <el-button type="text" title="拷贝" @click="copyMaster(scope.row)">
                        拷贝
                    </el-button>
                    <el-button type="priamry" title="生成页面" plain @click="makeWebPage(scope.row)">
                        生成页面
                    </el-button>
                    <el-button type="text" title="导出" @click="生成网页(scope.row)">
                        导出
                    </el-button>
                </template>
            </el-table-column>

        </v-table>

        <v-dialog ref="formDiag" title="信息编辑" :width="'650px'">
            <dict-panel @saved="onFormSaved"></dict-panel>
            <div slot="footer">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>

    </div>
</template>
<style lang="less" scoped>
    .btn_right {
        float: right;
        margin-right: 20px
    }

</style>

<script>
    import SubsysSelect from '@/components/widgets/platform/SubsysSelect.vue';
    import DictPanel from './DictForm.vue'

    export default {
        components: {DictPanel,SubsysSelect},
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
                doSortMetadataDict: this.$api.platform.MetadataTableService.doSortMetadataDict,
                //doSortMetadataField: this.$api.platform.MetadataTableService.doSortMetadataField,
                showSort: false,
                header: [
                    {
                        label: 'ID',
                        prop: 'metadataId'
                    },
                    {
                        label: '排序',
                        prop: 'metadataOrder'
                    },
                    {
                        label: '英文名称',
                        prop: 'metadataName'
                    },
                    {
                        label: '中文名称',
                        prop: 'metadataAlias'
                    },
                ],

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
            makeWebPage(row) {
                let params = {
                    param: {
                        metadataId: row.metadataId
                    }
                }
                this.$api.platform.MetadataTableService.makeWebPage(params).then(rsp => {
                    this.$msgJsonResult(rsp);

                });
            },
            btnSort() {
                this.showSort = !this.showSort
                if (this.showSort) {
                    this.$refs.sortTable.load()
                }
            },
            doSortFun(sortedData) {

                let ids = [] // debugger
                // sortedData.forEach((item, index, array) => {
                //     ids.push(item[this.header[0].prop])
                // })
                for(let item of  sortedData){
                    ids.push(item[this.header[0].prop])
                }
                this.$message(JSON.stringify(ids))
                let params = {
                    subsysId: this.page.query.param.subsysId,
                    ids: ids.join(",")
                }
                this.doSortMetadataDict(params).then(
                    rsp => {
                        this.$msgJsonResult(rsp)
                    })
            },
            clickTableRow(row) {
                //Object.assign(this.value, row)
                this.table = row
            },

            onFormSaved(rsp) {
                this.$refs.formDiag.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {
                this.search();
            },

            search() {
                this.getSearchParams() //this.$refs.table.currentPage = 1;
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

                if (rsp.data.length > 0) {
                    this.table = rsp.data[0]
                }

            },
            getSearchParams() {

                return this.page.query;
            },



            dropDbTable(row) {
                if (row) {
                    let params = _.cloneDeep(this.page.query)
                    params.param.metadataId = row.metadataId
                    this.$confirm("确定要删'"+row.metadataAlias+"表'吗?", "提示", {type: "warning"}).then(() => {

                        this.$api.platform.MetadataTableService.dropDbTable(params).then(rsp => {
                            this.$msgJsonResult(rsp)

                        });
                    });
                }
            },

            makeDbTable(row) {

                if (row) {
                    let params = _.cloneDeep(this.page.query)
                    params.param.metadataId = row.metadataId
                    this.$confirm("确定要建'"+row.metadataAlias+"表'吗?", "提示", {type: "warning"}).then(() => {

                        this.$api.platform.MetadataTableService.makeDbTable(params).then(rsp => {
                            this.$msgJsonResult(rsp)

                        });
                    });
                }
            },

            copyMaster(row) {

                if (row) {
                    //let params = Object.assign({}, this.page.query)
                    let params = _.cloneDeep(this.page.query)
                    params.param.metadataId = row.metadataId

                    this.$confirm("确定要拷贝'"+row.metadataAlias+"表'吗?", "提示", {type: "warning"}).then(() => {
                        this.$api.platform.MetadataTableService.copyMaster(params).then(rsp => {
                            this.$msgJsonResult(rsp);
                            if (rsp.code == 0) {
                                //params.param.metadataId = null
                                this.page.query.param.metadataId = rsp.data
                                this.search();

                            }
                        });
                    });
                }
            },

            create() {
                this.$refs.formDiag.show({subsysId: this.page.query.param.subsysId});
            },
            edit(row) {
                this.$refs.formDiag.show({metadataId: row.metadataId});
            },

            view(row) {
                this.$refs.formDiagView.show({metadataId: row.metadataId});
            },
            toggleStatus(row) {


            },
            del(row) {
                this.$confirm("确定删除'"+row.metadataAlias+"表'此条记录吗?", "提示", {type: "warning"}).then(() => {
                    this.$api.platform.MetadataDictService.deleteById(row.metadataId).then(rsp => {
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
