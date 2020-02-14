<!--cust管理-->
<template>
    <div>

        <product-master v-show="switchShow" :tableRowClick="search" ref="productMaster"></product-master>

        <div v-show="showQryBar" class="panel panel-default panel-search">
            <el-form :inline="true">

                <span style="color:palevioletred">成本估价单</span>
                <el-switch style="margin-left:20px; margin-right: 20px" v-model="switchShow"
                           active-text="显示产品清单" inactive-text="不显示" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
                <el-form-item label="大类" prop="orderType">
                    <rm-type-select @change="search" v-model="page.query.param.bigType"
                                    :clearable="true"></rm-type-select>
                </el-form-item>
                <el-form-item label="小类">
                    <sub-type-select @change="search" :parentTypeId="page.query.param.bigType"
                                     v-model="page.query.param.smallType" :clearable="true"></sub-type-select>
                </el-form-item>


                <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                <el-button @click="cancel">取消</el-button>

            </el-form>
        </div>

        <cost-panel v-model="product" ref="costPanel" ></cost-panel>

        <v-toolbar title="BOM清单" type="alert">
            <el-switch slot="tip" style="margin-left:20px; margin-right: 30px" active-color="#13ce66" inactive-color="#ff4949"
                       v-model="showQryBar" active-text="显示查询框" inactive-text="不显示">
            </el-switch>
            <span v-if="!product.code" slot="tip" style="color:red;margin-left:  40px;margin-top: 30px">
                请点上方产品后编辑BOM
            </span>
            <span v-else slot="tip" style="color:green;margin-left: 40px;margin-top: 40px">
                {{  product.code +" : "+product.epCode +" ( "+product.remark +" )"}}
            </span>

            <el-button plain @click="exportRecords">导出XLS</el-button>
            <el-button type="primary" v-show="productId>0" plain @click="create">新增</el-button>
            <el-button type="primary" v-show="productId>0" plain @click="createMulti">新增多个</el-button>

        </v-toolbar>


        <v-table ref="table" v-show="productId>0" :page="page" :dblclick="edit"  :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column  prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span >{{scope.$index + 1}} </span></template>
            </el-table-column>
            <!--<el-table-column prop="prdFlag" label="存货分类" width="100">-->
                <!--<template slot-scope="{row}">-->
                        <!--<span :style="'style:red'">-->
                            <!--{{row.productType.prdFlag==null?'-':$dongxwDict.getText(row.productType.prdFlag,$dongxwDict.store.STORE_TYPE)}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="productId" label="产品" width="80">
                <template slot-scope="{row}">
                   <span style="color:green"> {{ row.product? row.product.code :'-' }} </span>
                </template>
            </el-table-column>

            <el-table-column prop="parentId" label="大类" width="70">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.productType.name :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="productSubType" label="小类" width="80">
                <template slot-scope="{row}">
                    {{ row.childRm ? row.childRm.productSubType.name :'-' }}
                </template>
            </el-table-column>
            <el-table-column :sortable="true" prop="code" label="物料代码" width="100">
                <template slot-scope="{row}">
                    <span style="color:red">{{ row.childRm? row.childRm.code :'-' }}</span>
                </template>
            </el-table-column>
            <el-table-column :sortable="true"  prop="name" label="物料名称" width="120">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.name :'-' }}
                </template>
            </el-table-column>
            <el-table-column  prop="remark" label="规格型号" width="100">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.remark :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="color" label="颜色" width="120">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.color :'-' }}
                </template>
            </el-table-column>


            <!--<el-table-column prop="width" label="宽封度" width="70"></el-table-column>-->
            <!--<el-table-column prop="cutPartName" label="裁片名称" width="120"></el-table-column>-->
            <!--<el-table-column label="尺寸(英寸）" align="center">-->
                <!--<el-table-column prop="sizeL" label="长度" width="80"></el-table-column>-->
                <!--<el-table-column prop="sizeX" label="X" width="30"></el-table-column>-->
                <!--<el-table-column prop="sizeW" label="宽度" width="80"></el-table-column>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="knifeQty" label="刀数" width="60"></el-table-column>-->
            <!--<el-table-column prop="length" label="长封度" width="70"></el-table-column>-->

            <el-table-column prop="lossRate" label="损耗" width="60">
                <template slot-scope="{row}">
                    {{row.lossRate}}%
                </template>
            </el-table-column>
            <el-table-column prop="eachQty" label="每个用量" width="80"></el-table-column>
            <el-table-column prop="pieces" label="件数" width="60"></el-table-column>
            <el-table-column prop="qty" label="用量" width="80"></el-table-column>
            <el-table-column prop="unit" label="单位" width="70">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.unit :'-' }}
                </template>
            </el-table-column>

            <el-table-column prop="price" label="单价" width="80"></el-table-column>
            <el-table-column prop="money" label="金额" width="100"></el-table-column>

            <el-table-column :sortable="true" prop="createDate" label="建档时间" width="120">
            </el-table-column>
            <el-table-column prop="createByName" label="建档人">
            </el-table-column>

            <el-table-column width="140" label="操作" :fixed="'right'">
                <template slot-scope="scope">

                    <el-button type="text" title="编辑" @click="edit(scope.row)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <el-button :disabled="scope.row.source===0"  :style="scope.row.source===1?'color:#13ce66':'color:#ff4949'"
                               type="default" title="组件" @click="editCom(scope.row)">       组件
                    </el-button>
                    <el-button type="text"  style="color:red" @click="del(scope.row,scope.$index)" title="删除"  >
                        <i class="el-icon-delete red"></i>
                    </el-button>
                </template>
            </el-table-column>
        </v-table>
        <v-dialog ref="formDiag"  :width="'750px'" title="物料用量">
            <form-panel :productId="productId" @saved="onFormSaved"></form-panel>
            <div slot="footer" style="margin-right:40px">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>
        <v-dialog ref="comMngDlg" :width="'58%'" title="组件清单">
            <com-panel :productId="productId" :closeDlg="closeDlg"></com-panel>
        </v-dialog>
        <v-dialog ref="rmManageDlg" :width="'58%'" title="搜索物料">
            <rm-panel ref="rmPanel" :onlyQuery="true" :closeDlg="closeDlgRm"></rm-panel>
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

    import FormPanel from './Form';
    import CostPanel from './CostForm';
    import ComPanel from './ComManage';
    import RmPanel from '../rm/Manage';

    export default {
        components: {ComPanel, RmPanel, CostPanel, ProductMaster, FormPanel, RmTypeSelect, SubTypeSelect},
        data() {
            return {
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
                        orderBys: 'code|desc',
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

            sortByDate(obj1, obj2) {
                let code1 =  obj1.childRm? obj1.childRm.code :'-'
                let code2 =  obj2.childRm? obj2.childRm.code :'-'
                //let val1 = obj1.deadline
                //let val2 = obj2.deadline
                return code1.localeCompare( code2 )
            },


            closeDlg(){
                this.$refs.comMngDlg.hide()
                this.$refs.costPanel.search()
                this.search()
            },
            closeDlgRm(onlyClose){
                if(onlyClose){
                    this.$refs.rmManageDlg.hide()
                    return
                }
                let rms = this.$refs.rmPanel.getSelectedRows();
                let rmIds = []
                for (let i = 0; i < rms.length; i++) {
                    rmIds.push(rms[i].id)
                }
                let params = {
                    productId: this.productId,
                    rmIds: rmIds.join(','),
                }
                console.log(JSON.stringify(rmIds))
                this.$api.dongxw.BomService.saveByIds(params).then(rsp => {
                    this.$refs.costPanel.search()
                    this.search()
                })
                this.$refs.rmManageDlg.hide()


            },

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
            createMulti() {
                this.$refs.rmManageDlg.show();
            },
            create() {
                this.$refs.formDiag.show();
            },
            edit(row) {
                this.$refs.formDiag.show({id: row.id});
            },
            editCom(row) {
                this.$refs.comMngDlg.show(row)

            },
            toggleStatus(row) {

            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.BomService.deleteById(row.id).then(rsp => {
                        this.$msgJsonResult(rsp)
                        if(rsp.code==0) {
                            this.search();
                            this.$refs.costPanel.search()
                        }

                    });
                });
            },
            onFormSaved() {
                this.$refs.formDiag.hide()
                this.$refs.costPanel.$emit("init",{})
                this.$nextTick(this.search)
            },
            init(options = {}) {
                this.$refs.productMaster.init()
                this.search();
            },
            search(row) {
                if (row && row.id) {
                    this.product = row
                    this.productId = row.id
                    this.page.query.param.productId = this.productId
                }
                this.page.query.param.customerId = 0
                this.page.query.param.parentId = 0

                this.$refs.table.currentPage = 1
                this.$refs.table.load()
            },
            cancel() {
                this.dateRange = [];
                this.page.query.param = {
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
