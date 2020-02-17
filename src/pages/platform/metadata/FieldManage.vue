<template>
    <div class="panel panel-default panel-search">
        <el-form :inline="true" label-width="85px" label-position="left">

            <el-form-item label="字段类型" prop="fieldType">
                <dict-data-select @change="search" v-model="page.query.param.fieldType" :clearable="true"></dict-data-select>
            </el-form-item>
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
            <el-button   v-if="table.metadataId" class="btn_left" plain>
                排序
            </el-button>
            <el-button @click="makeWebPage" v-if="table.metadataId" class="btn_left" plain>
                生成页面
            </el-button>
            <el-button @click="delAll" v-if="table.metadataId" class="btn_left" plain >
                <span style="color:red">删除所有</span>
            </el-button>

        </el-form>


        <v-table ref='table' :dblclick='edit' :page='page' :table-minheight='450' @dataloaded='onDataloaded'>
            <el-table-column prop='fieldOrder' label='排序' width='50'>
                <template slot-scope='{row}'>
                    {{row.fieldOrder}}
                </template>
            </el-table-column>
            <el-table-column prop='metadataId' label='元数据标识' width='120'>
                <template slot-scope='{row}'><span style='color:mediumvioletred'>
			{{row.metadataDictModel.metadataAlias}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='fieldMemo' label='中文名称' width='120'>
                <template slot-scope='{row}'><span style='color:blue'>
			{{row.fieldMemo}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='fieldName' label='英文名称' width='120'>
                <template slot-scope='{row}'><span style='color:mediumvioletred'>
			{{row.fieldName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='fieldType' label='字段类型' width='120'>
                <template slot-scope='{row}'>
                    {{row.fieldType}}
                </template>
            </el-table-column>
            <el-table-column prop='fieldSize' label='字段长度' width='80'>
                <template slot-scope='{row}'>
                    {{row.fieldSize}}
                </template>
            </el-table-column>
            <el-table-column prop='fieldDecimal' label='小数位数' width='75'>
                <template slot-scope='{row}'>
                    {{row.fieldDecimal}}
                </template>
            </el-table-column>
            <el-table-column prop='fieldIsNull' label='是否为空' width='70'>
                <template slot-scope='{row}'>
			<span :style='row.fieldIsNull?"color:red":"color:black"'>
				{{row.fieldIsNull?'是':'否'}}
			</span>
                </template>
            </el-table-column>
            <el-table-column prop='fieldDefault' label='默认值' width='60'>
                <template slot-scope='{row}'>
                    {{row.fieldDefault}}
                </template>
            </el-table-column>
            <el-table-column prop='fieldPk' label='是否主键' width='70'>
                <template slot-scope='{row}'>
			<span :style='row.fieldPk?"color:red":"color:black"'>
				{{row.fieldPk?'是':'否'}}
			</span>
                </template>
            </el-table-column>
            <el-table-column prop='fieldAuto' label='自动生成' width='70'>
                <template slot-scope='{row}'>
			<span :style='row.fieldAuto?"color:red":"color:black"'>
				{{row.fieldAuto?'是':'否'}}
			</span>
                </template>
            </el-table-column>
            <el-table-column prop='fieldVisible' label='是否显示' width='70'>
                <template slot-scope='{row}'>
			<span :style='row.fieldVisible?"color:red":"color:black"'>
				{{row.fieldVisible?'是':'否'}}
			</span>
                </template>
            </el-table-column>
            <el-table-column prop='displayColor' label='显示颜色' width='90'>
                <template slot-scope='{row}'><span style='color:blue'>
			{{row.displayColor}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='fieldDisplaysize' label='显示长度' width='70'>
                <template slot-scope='{row}'>
                    {{row.fieldDisplaysize}}
                </template>
            </el-table-column>
            <el-table-column prop='fieldFormat' label='显示格式' width='80'>
                <template slot-scope='{row}'>
                    {{DICT.FIELDFORMAT[row.fieldFormat]}}
                </template>
            </el-table-column>
            <el-table-column prop='fieldComponent' label='页面控件' width='80'>
                <template slot-scope='{row}'>
                    {{DICT.FIELDCOMPONENT[row.fieldComponent]}}
                </template>
            </el-table-column>
            <el-table-column prop='refPool' label='页面弹出框' width='100'>
                <template slot-scope='{row}'>
                    {{DICT.REFPOOL[row.refPool]}}
                </template>
            </el-table-column>
            <el-table-column prop='fieldReadonly' label='是否只读' width='70'>
                <template slot-scope='{row}'>
			<span :style='row.fieldReadonly?"color:red":"color:black"'>
				{{row.fieldReadonly?'是':'否'}}
			</span>
                </template>
            </el-table-column>
            <el-table-column prop='fieldIscal' label='计算字段' width='70'>
                <template slot-scope='{row}'>
			<span :style='row.fieldIscal?"color:red":"color:black"'>
				{{row.fieldIscal?'是':'否'}}
			</span>
                </template>
            </el-table-column>
            <el-table-column prop='fieldMin' label='最小值' width='60'>
                <template slot-scope='{row}'>
                    {{row.fieldMin}}
                </template>
            </el-table-column>
            <el-table-column prop='fieldMax' label='最大值' width='64'>
                <template slot-scope='{row}'>
                    {{row.fieldMax}}
                </template>
            </el-table-column>
            <el-table-column prop='fieldSrc' label='关联类型' width='95'>
                <template slot-scope='{row}'>
                    {{DICT.FIELDSRC[row.fieldSrc]}}
                </template>
            </el-table-column>
            <el-table-column prop='refObject' label='关联数据' width='200'>
                <template slot-scope='{row}'>
                    {{row.refObject}}
                </template>
            </el-table-column>
            <el-table-column prop='refParameter' label='关联参数' width='60'>
                <template slot-scope='{row}'>
                    {{row.refParameter}}
                </template>
            </el-table-column>
            <el-table-column prop='fieldRemark' label='说明' width='64'>
                <template slot-scope='{row}'>
                    {{row.fieldRemark}}
                </template>
            </el-table-column>
            <el-table-column prop='refTable' label='关联表' width='120'>
                <template slot-scope='{row}'>
                    {{row.refTable}}
                </template>
            </el-table-column>
            <el-table-column prop='refField' label='关联字段' width='120'>
                <template slot-scope='{row}'>
                    {{row.refField}}
                </template>
            </el-table-column>
            <el-table-column prop='refFilter' label='关联条件' width='120'>
                <template slot-scope='{row}'>
                    {{row.refFilter}}
                </template>
            </el-table-column>
            <el-table-column prop='refDisplayID' label='关联显示字段' width='120'>
                <template slot-scope='{row}'>
                    {{row.refDisplayID}}
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

        <v-dialog ref="formDiag" title="信息编辑" :width="'760px'">
            <field-panel @saved="onFormSaved"></field-panel>
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
            margin-right: 5px;
            margin-right: 5px;

    }

    .btn_right {

            float: right;
            margin-right: 20px;


    }
</style>

<script>

    import DictDataSelect from '@/components/widgets/platform/DictDataSelect.vue';
    import SubsysSelect from '@/components/widgets/platform/SubsysSelect.vue';
    import FieldPanel from "./FieldForm";

    export default {
        components: {FieldPanel, DictDataSelect, SubsysSelect},
        props: {
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

                DICT: {
                    "FIELDFORMAT": {
                        "0": "默认",
                        "1": "金额",
                        "2": "百分比%",
                        "3": "序号"
                    },
                    "FIELDCOMPONENT": {
                        "0": "默认",
                        "1": "按扭",
                        "2": "下拉框",
                        "3": "多选框",
                        "4": "单选框"
                    },
                    "REFPOOL": {
                        "0": "默认",
                        "1": "选任务面板",
                        "2": "选人员面板",
                        "100": "测试标签函数"
                    },
                    "FIELDSRC": {
                        "0": "无",
                        "100": "数据POOL",
                        "200": "数据字典",
                        "300": "关联显示"
                    }
                },
                page: {
                    query: {
                        orderBys: 'fieldOrder|asc',
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
                this.$refs.formDiag.show({table : this.table});
            },


            edit(row) {
                this.$refs.formDiag.show({fieldId: row.fieldId});
            },


            view(row) {
                this.$refs.formDiagView.show({id: row.id});
            },
            toggleStatus(row) {

            },

            makeWebPage(){
                let params = {
                    param : {
                        metadataId:this.table.metadataId
                    }
                }
                this.$api.platform.MetadataTableService.makeWebPage( params ). then(rsp => {
                    this.$msgJsonResult(rsp);

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
        },
        created() {
        },
        mounted() {
            this.$on("init", this.init);
        }
    }
</script>
