<template>
    <div class="panel panel-default panel-search">
            <el-form :inline="true" label-width="85px" label-position="left">
                <el-form-item label="中文名称" prop="fieldMemo">
                    <el-input placeholder="中文名称" v-model="page.query.param.fieldMemo"></el-input>
                </el-form-item>
                <el-form-item label="英文名称" prop="fieldName">
                    <el-input placeholder="英文名称" v-model="page.query.param.fieldName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>

                <el-button v-if="table.metadataId" class="btn_right" type="primary" plain @click="create">
                    新增
                </el-button>
                <el-button v-if="table.metadataId"  class="btn_left"   plain @click="delAll">
                    删除所有
                </el-button>
                <el-button v-if="table.metadataId"  class="btn_left"   plain  >
                    排序
                </el-button>
            </el-form>


        <v-table ref="table" :dblclick="edit" :page="page" :table-minheight="450" @dataloaded="onDataloaded">
            <!--<el-table-column prop="seq" label="序号" width="45">-->
                <!--<template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>-->
            <!--</el-table-column>-->
            <el-table-column prop="fieldOrder" label="排序" width="50"></el-table-column>

            <el-table-column prop="metadataDictModel.metadataAlias" label="表名" width="125">
                <template slot-scope="{row}">
                    <span style="color:mediumvioletred">{{row.metadataDictModel.metadataAlias}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="fieldMemo" label="中文名称" width="145">
                <template slot-scope="{row}">
                    <span style="color:blue">{{row.fieldMemo}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="fieldName" label="英文名称" width="145">
                <template slot-scope="{row}">
                    <span style="color:mediumvioletred">{{row.fieldName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="fieldType" label="字段类型" width="100"></el-table-column>
            <el-table-column prop="fieldSize" label="字段长度" width="80"></el-table-column>
            <el-table-column prop="fieldSmallSize" label="小数位数" width="80"></el-table-column>
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


            <el-table-column width="90" label="操作" :fixed="'right'">

                <template slot-scope="scope">
                    <el-button type="text" title="编辑" @click="edit(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button type="text" @click="del(scope.row,scope.$index)" title="删除" >
                       <span style="color: red"> <i :class="'el-icon-delete red'"></i></span>
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
<style lang="less" scoped>
    .btn_left {
            float: left;
            margin-right: 20px;

    }

    .btn_right {

            float: right;
            margin-right: 20px;


    }
</style>

<script>
    import SubsysSelect from '@/components/widgets/platform/SubsysSelect.vue';
    import VToolbar from "../../../components/v-toolbar";

    export default {
        components: {  VToolbar,   SubsysSelect},
        props:{
            value: {
                type: Object,
                required: true
            },
            enableView: {
                type: Boolean,
                deafault: false
            },
        },
        watch: {
            table: {
                handler: function (newVal, oldVal) {
                    if(this.enableView) {
                        console.log("FieldMng rev from tableMng: " + this.table.metadataAlias)
                        this.search();
                    }
                },
                deep: true, //immediate:true ,
            },

            enableView: {
                handler: function (newVal, oldVal) {
                    if(this.enableView) {
                        console.log("FieldMng rev from tableMng: " + this.table.metadataAlias)
                        this.search();
                    }
                },
                deep: true, //immediate:true ,
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
        data() {
            return {
                page: {
                    query: {
                        orderBys: 'field_order|asc',
                        param: {
                            subsysId: 0,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.platform.MetadataFieldService.query
                }
            }
        },
        methods: {
            onFormSaved() {
                this.$refs.formDiag.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {
                //this.search();
            },
            search() {
                this.getSearchParams();
                this.$refs.table.currentPage = 1;
                this.$refs.table.load( );
            },
            cancel() {
                this.dateRangeType = null;
                this.dateRange = [];
                this.page.query.param = {

                };
                this.page.query.param.metadataId = this.table.metadataId
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
                this.page.query.param.metadataId = this.table.metadataId
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
                this.$confirm("确定删除'"+row.fieldName+"'此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.platform.MetadataFieldService.deleteById(row.fieldId).then(rsp => {
                        this.$msgJsonResult(rsp);
                        if (rsp.code == 0) {
                            this.search();

                        }
                    });
                });
            },
            delAll(row) {
                this.$confirm("确定删除'"+this.table.metadataAlias+"'所有字段记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.platform.MetadataFieldService.deleteAllByMetadataId(this.table.metadataId).then(rsp => {
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
