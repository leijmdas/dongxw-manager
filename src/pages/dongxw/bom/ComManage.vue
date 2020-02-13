<!-- 管理 -->
<template>
    <div>
        <rm-view v-model="parentRm.childId" style="width:70%" ></rm-view>

        <v-toolbar title="组件清单" type="alert">
            <el-button type="primary" plain @click="create">新增</el-button>
            <el-button plain @click="closeDlg">关闭</el-button>
        </v-toolbar>

        <v-table ref="table" :page="page" :dblclick="edit"  :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column  prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span >{{scope.$index + 1}} </span></template>
            </el-table-column>

            <!--<el-table-column prop="productId" label="产品" width="80">-->
                <!--<template slot-scope="{row}">-->
                   <!--<span style="color:green"> {{ row.product? row.product.code :'-' }} </span>-->
                <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column prop="parentId" label="大类" width="70">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.childRm? row.childRm.productType.name :'-' }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="productSubType" label="小类" width="80">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.childRm ? row.childRm.productSubType.name :'-' }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="code" label="物料代码" width="80">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.childRm? row.childRm.code :'-' }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="name" label="物料名称" width="120">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.childRm? row.childRm.name :'-' }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="remark" label="规格型号" width="100">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.childRm? row.childRm.remark :'-' }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="color" label="颜色" width="120">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.childRm? row.childRm.color :'-' }}-->
                <!--</template>-->
            <!--</el-table-column>-->


            <el-table-column prop="width" label="宽封度" width="70"></el-table-column>
            <el-table-column prop="cutPartName" label="裁片名称" width="120"></el-table-column>
            <el-table-column label="尺寸(英寸）" align="center">
                <el-table-column prop="sizeL" label="长度" width="80"></el-table-column>
                <el-table-column prop="sizeX" label="X" width="30"></el-table-column>
                <el-table-column prop="sizeW" label="宽度" width="80"></el-table-column>
            </el-table-column>
            <el-table-column prop="pieces" label="件数" width="60"></el-table-column>
            <el-table-column prop="knifeQty" label="刀数" width="60"></el-table-column>
            <el-table-column prop="length" label="长封度" width="70"></el-table-column>

            <el-table-column prop="lossRate" label="损耗" width="60">
                <template slot-scope="{row}">
                    {{row.lossRate}}%
                </template>
            </el-table-column>
            <el-table-column prop="eachQty" label="每个用量" width="80"></el-table-column>
            <el-table-column prop="qty" label="用量"  ></el-table-column>
            <!--<el-table-column prop="unit" label="单位" width="70">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.childRm? row.childRm.unit :'-' }}-->
                <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column prop="price" label="单价" width="80"></el-table-column>-->
            <!--<el-table-column prop="money" label="金额" width="100"></el-table-column>-->

            <!--<el-table-column prop="createDate" label="建档时间" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="createByName" label="建档人" >-->
            <!--</el-table-column>-->

            <el-table-column width="140" label="操作" :fixed="'right'">
                <template slot-scope="scope">

                    <el-button type="text" title="编辑" @click="edit(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <!--<el-button :disabled="scope.row.source===0"  :style="scope.row.source===1?'color:#13ce66':'color:#ff4949'"-->
                               <!--type="default" title="组件" @click="edit(scope.row)">       组件-->
                    <!--</el-button>-->
                    <el-button type="text"  style="color:red" @click="del(scope.row,scope.$index)" title="删除"  >
                        <i class="el-icon-delete red"></i>
                    </el-button>
                </template>
            </el-table-column>
        </v-table>
        <v-dialog :appendToBody="true" ref="formDiagNew" :width="'600px'" title="组件用量"
                  :model="false" :modal-append-to-body="false" >
            <com-form-panel :parentRm="parentRm" :productId="productId" @saved="onFormSaved"></com-form-panel>
            <div slot="footer" style="margin-right:40px">
                <el-button type="primary" @click="$refs.formDiagNew.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiagNew.hide()}">取消</el-button>
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
</style>

<script>
    import ProductMaster from '@/components/widgets/dongxw/ProductMaster.vue';
    import RmTypeSelect from '@/components/widgets/dongxw/RmTypeSelect.vue';
    import SubTypeSelect from '@/components/widgets/dongxw/RmSubTypeSelect.vue';
    import RmView from '@/components/widgets/dongxw/RmView.vue';

    import ComFormPanel from './ComForm';

    export default {
        components: { RmView, ProductMaster, ComFormPanel, RmTypeSelect, SubTypeSelect},
        props:{
          closeDlg:{
              type:Function,
          }
        },

        data() {
            return {
                parentRm : {},

                switchShow: true,
                showQryBar: true,
                formStatus: 1,

                productId: -1,
                product : {},

                orderDateRange: [],
                summaryMap: {},
                currentPage: 1,
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            productId: undefined,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.dongxw.BomService.query

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
        computed: {

        },

        methods: {

            onDataloaded(rsp) {

            },
            /*
            导出
             */
            exportRecords() {
                let params = this.getSearchParams();
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

                this.$refs.formDiagNew.show();
            },
            edit(row) {
                this.$refs.formDiagNew.show({id: row.id});
            },
            toggleStatus(row) {

            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.BomService.deleteById(row.id).then(rsp => {
                        this.search();
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    });
                });
            },
            onFormSaved() {
                this.$refs.formDiagNew.hide()

                this.$nextTick(this.search)
            },
            init(options = {}) {
                this.parentRm = options;
                console.log('parentRm:'+JSON.stringify(options))
                this.search();
            },
            search(row) {

                this.page.query.param.parentId = this.parentRm.id
                this.page.query.param.customerId = 0
                this.$refs.table.currentPage = 1
                this.$refs.table.load()
            },
            cancel() {
                this.dateRange = [];
                this.page.query.param = {
                    parentId : parentRm.childId,
                    isDeleted: false,
                };
                this.search();
            }
        },
        created() {
        },
        mounted() {
            this.$on("init", this.init)
        }
    };
</script>
