<!--cust管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true">
                <el-form-item label="物料代码" prop="code">
                    <el-input v-model="page.query.param.code" clearable></el-input>
                </el-form-item>


                <el-form-item label="物料名称" prop="name">
                    <el-input v-model="page.query.param.name" clearable></el-input>
                </el-form-item>

                <el-form-item label="规格型号" prop="remark">
                    <el-input v-model="page.query.param.remark" clearable></el-input>
                </el-form-item>
                <el-form-item label="颜色" prop="color">
                    <el-input v-model="page.query.param.color" clearable></el-input>
                </el-form-item>

                <el-form-item label="大类" prop="orderType">

                    <rm-type-select   @change="search"v-model="page.query.param.parentId" :clearable="true"></rm-type-select>
                </el-form-item>
                <el-form-item label="小类">
                    <sub-type-select :parentTypeId="page.query.param.parentId" v-model="page.query.param.productTypeId" :clearable="true"></sub-type-select>
                </el-form-item>

                <el-form-item label="状态" prop="status">
                    <el-select :clearable="true" v-model="page.query.param.status" style="width:100px">
                        <el-option v-for="item in $dongxwDict.store.STATUS" :key="item[0]" :value="item[0]"
                                   :label="item[1]"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item>-->
                    <!--&lt;!&ndash;<el-button-group></el-button-group>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button type="primary" @click="search" v-keycode="'ENTER1'">查询</el-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button @click="cancel">取消</el-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button type="primary" plain @click="()=>{$bus.$emit('app:flush')}">刷新</el-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button @click="()=>{$bus.$emit('app:goback')}">返回</el-button>&ndash;&gt;-->

                <!--</el-form-item>-->
            </el-form>
        </div>
        <v-toolbar title="物料清单" type="alert">

            <el-switch slot="tip" v-model="isShowPrdPic" style="margin-left:20px; margin-right: 20px"
                       active-color="#13ce66" inactive-color="#ff4949"
                       active-text="显示图片" inactive-text="不显示">
            </el-switch>
            <el-dropdown @command="handleCommand"  slot="tip">
                  <span style="margin-top: 25px"  class="el-dropdown-link">
                    排序方式<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                <el-dropdown-menu title="排序方式">
                    <el-dropdown-item key="0" command="code|asc">物料代码
                    </el-dropdown-item>
                    <el-dropdown-item key="1" command="name|asc">物料名称
                    </el-dropdown-item>
                    <el-dropdown-item key="2" command="id|desc">按录入顺序
                    </el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>

            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="cancel">取消</el-button>

            <el-button v-if="!onlyQuery" plain @click="exportRecords">导出XLS</el-button>
            <el-button v-if="!onlyQuery" type="primary" plain @click="create">新增</el-button>
            <el-button v-if="onlyQuery" type="primary" plain @click="multiSele(false)">保存</el-button>
            <el-button v-if="onlyQuery" plain @click="multiSel(true)">关闭</el-button>

        </v-toolbar>


        <v-table ref="table" :multi="true" :page="page" :dblclick="edit" :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column  prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span >{{scope.$index + 1}} </span></template>
            </el-table-column>
            <el-table-column prop="picUrl" label="图片" v-if="isShowPrdPic" width="90">
                <template slot-scope="{row}">
                    <v-image-preview v-model="row.imgUrls" :picUrl="row.picUrl"  >
                    </v-image-preview>
                </template>
            </el-table-column>
            <el-table-column :sortable="true"  prop="prdFlag" label="存货分类" width="100">
                <template slot-scope="{row}">
                        <span :style="'style:red'">
                            {{row.productType.prdFlag==null?'-':$dongxwDict.getText(row.productType.prdFlag,$dongxwDict.store.STORE_TYPE)}}</span>
                </template>
            </el-table-column>
            <el-table-column :sortable="true"  prop="parentId" label="大类" width="90">

                <template slot-scope="{row}">
                    {{ row.productType? row.productType.name :'-' }}
                </template>
            </el-table-column>
            <el-table-column :sortable="true" prop="productTypeId" label="小类" width="90">
                <template slot-scope="{row}">
                    {{ row.productSubType? row.productSubType.name :'-' }}
                </template>
            </el-table-column>
            <el-table-column :sortable="true"  prop="code" label="物料代码" width="100">
                <template slot-scope="{row}">
                    <span style="color:green"> {{row.code }} </span>
                </template>
            </el-table-column>
            <el-table-column :sortable="true"  prop="name" label="物料名称" width="160">
                <template slot-scope="scope">
                    <a class="link-name"
                       href="javascript:;"
                       :title="scope.row.name"
                       @click="edit(scope.row)" >{{ scope.row.name }}
                    </a>
                </template>
            </el-table-column>

            <el-table-column :sortable="true"  prop="remark" label="规格型号" width="200"></el-table-column>
            <el-table-column :sortable="true"  prop="color" label="颜色" width="100">
            </el-table-column>
            <el-table-column :sortable="true"  prop="unit" label="单位" width="60"></el-table-column>

            <!--<el-table-column :sortable="true"  prop="size" label="尺寸" width="150">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="barCode" label="条码" width="120">-->
            <!--</el-table-column> -->
            <el-table-column :sortable="true"  prop="createDate" label="建档时间" width="150">
            </el-table-column>

            <el-table-column :sortable="true"  prop="createByName" label="建档人" width="150">
            </el-table-column>

            <el-table-column :sortable="true"  prop="status" label="状态" width="60">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.status,$dongxwDict.store.STATUS)}}
                </template>
            </el-table-column>

            <el-table-column prop="memo" label="备注"  >
            </el-table-column>

            <el-table-column  v-if="!onlyQuery" width="100" label="操作" :fixed="'right'">
                <template slot-scope="scope">

                    <el-button type="text" title="编辑" @click="edit(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>

                    <el-button type="text"  style="color:red" @click="del(scope.row,scope.$index)" title="删除"  >
                        <i class="el-icon-delete red"></i>
                    </el-button>
                </template>
            </el-table-column>
        </v-table>
        <v-dialog ref="formDiag" :width="'750px'" title="物料信息">
            <form-panel @saved="onFormSaved"></form-panel>
            <div slot="footer" style="margin-right:40px">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>
    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">
    .el-input{
        width: 160px;
    }
    .status_green {
        color: red;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>

<script>
    import RmTypeSelect from '@/components/widgets/dongxw/RmTypeSelect.vue';
    import SubTypeSelect from '@/components/widgets/dongxw/RmSubTypeSelect.vue';

    import FormPanel from './Form';

    export default {
        components: {FormPanel, RmTypeSelect, SubTypeSelect},
        props: {
            onlyQuery: {
                type: Boolean,
                default: false,
            },
            closeDlg: {
                type: Function,
                default: null
            }
        },
        data() {
            return {
                isShowPrdPic : false,
                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},
                currentPage : 1 ,
                page: {
                    query: {
                        orderBys: 'code|asc',
                        param: {
                            subjectId: undefined,
                            isDeleted: false
                        }
                    },
                    getData : this.$api.dongxw.ProductService.query

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
            handleCommand(command) {
                this.page.query.orderBys = command
                this.search()
            },
            getSelectedRows() {
                return this.$refs.table.getSelectedRows()
            },
            multiSele(onlyClose) {
                if (this.closeDlg) {
                    this.closeDlg(onlyClose)
                }
            },
            onDataloaded(rsp) {

            },
            /*
            导出
             */
            exportRecords() {
                let params = this.getSearchParams();
                console.log(params);
                this.$api.dongxw.ProductService.exportRm(params);
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
                    this.$api.dongxw.ProductService.deleteById(row.id).then(rsp => {
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
                this.page.query.param.customerId = 0
                this.$refs.table.currentPage = 1
                this.$refs.table.load()
            },
            cancel() {
                this.dateRange = [];
                //this.currentPage = 1;
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
