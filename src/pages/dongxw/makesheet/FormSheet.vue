<!--cust管理-->
<template>
    <div>

        <v-toolbar title="制造清单" type="alert">
            <el-switch slot="tip" v-model="showPlan" @change="changeSwitch" active-color="#13ce66" inactive-color="#ff4949"
                       active-text="显示计划列表" inactive-text="不显示">
            </el-switch>

            <span v-if="!product.code" slot="tip" style="color:red;margin-left:  40px;margin-top: 30px">
                请点左方产品后编辑
            </span>
            <span v-else slot="tip" style="color:green;margin-left: 40px;margin-top: 40px">
                {{  product.code +" : "+product.epCode +" ( "+product.remark + " )"}}
            </span>
            <!--<el-button plain @click="exportRecords">导出 XLS</el-button>-->
            <!--<el-button type="primary" v-show="productId>0" plain @click="create">新增</el-button>-->
        </v-toolbar>


        <v-table ref="table" :page="page" :dblclick="edit"  :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column  prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span >{{scope.$index + 1}} </span></template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单" width="90">
                <span style="color:green"> {{ order? order.customerOrderCode :'-' }} </span>
            </el-table-column>
            <el-table-column prop="productId" label="产品" width="100">
                <template slot-scope="{row}">
                    <span style="color:green"> {{ row.product? row.product.code :'-' }} </span>
                </template>
            </el-table-column>
            <el-table-column prop="source" label="组件" width="100">
                <template slot-scope="{row}">
                    <span :style="row.source?'color:green':''"> {{ row.source }} </span>
                </template>
            </el-table-column>

            <el-table-column prop="code" label="物料代码" width="80">
                <template slot-scope="{row}">
                    <span :style="row.parentId>0?'color:blue':''">  {{ row.childRm? row.childRm.code :row.parentId>0? '组件' :'-' }} </span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="物料名称" width="120">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.name :'-' }}
                </template>
            </el-table-column>

            <el-table-column prop="color" label="颜色" width="100">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.color :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="pieces" label="件数" width="60"></el-table-column>

            <!--<el-table-column prop="width" label="宽封度" width="70"></el-table-column>-->
            <!--<el-table-column prop="cutPartName" label="裁片名称" width="120"></el-table-column>-->
            <!--<el-table-column   label="尺寸(英寸）" align="center">-->
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
            <el-table-column prop="qty" label="用量" width="80"></el-table-column>
            <el-table-column prop="unit" label="单位" width="70">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.unit :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="totalQty" label="总用量" width="100"></el-table-column>


            <el-table-column prop="parentId" label="大类" width="80">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.productType.name :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="productSubType" label="小类" width="100">
                <template slot-scope="{row}">
                    {{ row.childRm ? row.childRm.productSubType.name :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="建档时间" width="120">
            </el-table-column>

            <el-table-column prop="createByName" label="建档人" width="80">
            </el-table-column>

            <el-table-column width="60" label="操作" :fixed="'right'">
                <template slot-scope="scope">

                    <!--<el-button type="text" title="编辑" @click="edit(scope.row)">-->
                        <!--<i class="el-icon-edit"></i>-->
                    <!--</el-button>-->

                    <el-button v-if="order.id" type="text"  style="color:red"
                               @click="del(scope.row,scope.$index)" title="删除"  >
                        <i class="el-icon-delete red"></i>
                    </el-button>
                </template>
            </el-table-column>
        </v-table>
        <v-dialog ref="formDiag"  :width="'750px'" title="信息编辑">
            <form-panel :productId="productId" @saved="onFormSaved"></form-panel>
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


    .el-switch {
        margin-left:20px;
        margin-right: 20px;
        active-color: #13ce66 ;
        inactive-color:#ff4949 ;
    }
</style>

<script>
    import ProductMaster from '@/components/widgets/dongxw/ProductMaster.vue';
    import RmTypeSelect from '@/components/widgets/dongxw/RmTypeSelect.vue';
    import SubTypeSelect from '@/components/widgets/dongxw/RmSubTypeSelect.vue';

    import FormPanel from './Form';
    export default {
        components: { ProductMaster,FormPanel,RmTypeSelect, SubTypeSelect },
        data() {
            return {

                switchShow: true,
                showQryBar: true,
                showPlan: true,
                productId: -1,

                orderDateRange: [],
                summaryMap: {},
                currentPage: 1,
                page: {
                    query: {
                        orderBys: 'childId|desc',
                        param: {
                            productId: undefined,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.dongxw.MakeSheetService.query

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
        props: {
            value: {
                required: true
            },
            handleShowPlan : {
                type : Function ,
                required: true,
            }

        },
        computed: {
            order:{
                get () {
                    return this.makeplan.order
                }
            },
            makeplan: {
                get () {
                    return this.value
                },
                set (val) {
                    this.$emit('input', val)
                }
            } ,
            product:{
                get () {
                    return this.makeplan.product
                }
            },
        },
        watch: {
            makeplan : {
                handler: function(newVal, oldVal) {
                    this.search();
                },
                deep: true
            }
        },
        methods: {
            changeSwitch(){
                if(this.handleShowPlan){
                    this.handleShowPlan(this.showPlan)
                }
            },
            onDataloaded(rsp) {

            },
            /*
            导出
             */
            exportRecords() {
                let params = this.getSearchParams();
                this.$api.dongxw.MakeSheetService.exportRm(params);
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
                //this.$refs.formDiag.show({id: row.id});
            },
            toggleStatus(row) {

            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.MakeSheetService.deleteById(row.id).then(rsp => {
                        this.search();
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    });
                });
            },
            onFormSaved() {
                this.$refs.formDiag.hide()
                this.$refs.costPanel.$emit("init",{})
                this.$nextTick(this.search)
            },
            init(options = {}) {

                this.search();
            },

            search() {

                this.page.query.param.planId = this.makeplan.id
                this.page.query.param.orderId = this.order.id
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
