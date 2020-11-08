<template>
    <div>
        <!--<div class="panel panel-default panel-search">-->
            <!--<el-form :inline="true">-->

                <!--<el-form-item label="产品大类" prop="parentId">-->
                    <!--<product-type-select v-model="page.query.param.parentId" :clearable="true"></product-type-select>-->

                <!--</el-form-item>-->
                <!--<el-form-item label="产品小类" prop="productTypeId">-->
                    <!--<product-sub-type-select :parentTypeId="page.query.param.parentId"-->
                                             <!--v-model="page.query.param.productTypeId"-->
                                             <!--:clearable="true"></product-sub-type-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="产品" prop="productId">-->
                    <!--<order-product-select style="width:300px" :orderId="page.query.param.orderId"-->
                                          <!--v-model="page.query.param.productId" :clearable="true"></order-product-select>-->
                <!--</el-form-item>-->

                <!--<el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>-->
                <!--<el-button @click="cancel">取消</el-button>-->
            <!--</el-form>-->
        <!--</div>-->
        <v-toolbar title="产品列表" type="alert">
            <el-switch slot="tip" style="color:mediumpurple;margin-left:20px; margin-right: 20px"
                       active-color="#13ce66" inactive-color="#ff4949"
                       v-model="isShowPrdPic" active-text="显示图片" inactive-text="不显示">
            </el-switch>

            <span v-if="!order.id" slot="tip"  style="color: red ; padding-left: 20px"> 请点上方订单然后编辑</span>
            <span  v-if="order.id" slot="tip" style="color: red ; padding-left: 20px">
                客户订单号: {{ order?order.customerOrderCode:'-' }}</span>
            <span  v-if="order.id" slot="tip" style="color: red ; padding-left: 80px">
                {{ order?order.epOrderCode:'-'}}</span>

            <!--<el-button @click="()=>{$bus.$emit('app:goback')}">返回</el-button>-->
            <el-button plain @click="exportRecords">导出XLS</el-button>
            <el-button type="primary" v-if="order.id" plain @click="create">新增</el-button>


        </v-toolbar>
        <v-table ref="table" :page="page"  :dblclick="edit" :table-minheight="450" @dataloaded="onDataloaded">

            <el-table-column prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
            </el-table-column>


            <el-table-column prop="picUrl" label="图片" v-if="isShowPrdPic" width="90">
                <template slot-scope="{row}">
                    <img v-if="row.product&&row.product.picUrl" :src="row.product.picUrl" width="60px" height="60px" alt="">

                </template>
            </el-table-column>

            <!--<el-table-column prop="customerId" label="客户名称" width="120">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.customer?row.customer.custName:'-'}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="customerOrderCode" label="客订单号" width="110">
                <template slot-scope="{row}">
                   <span style="color:green"> {{ row.orderMaster?row.orderMaster.customerOrderCode:'-'}} </span>
                </template>
            </el-table-column>

            <el-table-column prop="epOrderCode" label="EP订单号" width="120">
                <template slot-scope="{row}">
                    {{ row.orderMaster?row.orderMaster.epOrderCode:'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="parentId" label="产品大类" width="100">
                <template slot-scope="{row}">
                    {{ row.parentProductType?row.parentProductType.code:'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="productTypeId" label="产品小类" width="140">
                <template slot-scope="{row}">
                    {{ row.productType?row.productType.code:'-'}}
                </template>
            </el-table-column>

            <el-table-column :sortable="true" prop="code" label="客款号" width="100">
                <template slot-scope="{row}">
                    <span style="color: deeppink"> {{ row.product?row.product.code:'-'}} </span>
                </template>
            </el-table-column>
            <el-table-column prop="epCode" label="EP款号" width="100">
                <template slot-scope="{row}">
                    {{ row.product?row.product.epCode:'-'}}
                </template>
            </el-table-column>


            <el-table-column prop="remark" label="产品描述" width="180">>
                <template slot-scope="{row}">
                    {{ row.product?row.product.remark:'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="color" label="颜色" width="70">
                <template slot-scope="{row}">
                    {{ row.product?row.product.color:'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="size" label="尺寸" width="80">
                <template slot-scope="{row}">
                    {{ row.product?row.product.size:'-'}}
                </template>
            </el-table-column>
            <!--<el-table-column prop="barCode" label="条码" width="115">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{ row.product?row.product.barCode:'-'}}-->
                <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column prop="UPC-A" label="UPC-A" width="60"></el-table-column>-->
            <el-table-column prop="qty" label="数量" width="80"></el-table-column>
            <el-table-column prop="price" label="单价" width="60"></el-table-column>
            <el-table-column prop="money" label="金额" width="120"></el-table-column>
            <el-table-column prop="moneyType" label="货币" width="80">
                <template slot-scope="{row}">
                    {{ row.orderMaster?$dongxwDict.getText(row.orderMaster.moneyType,$dongxwDict.store.MONEY_TYPE):'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="70">
                <template slot-scope="{row}">
                    {{ row.product?row.product.unit:'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>

            <el-table-column prop="createDate" label="建档时间" width="100">
                <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.createDate)}}
                </template>
            </el-table-column>
            <el-table-column prop="createByName" label="建档人" width="100">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="80">
                <template slot-scope="{row}">
                        <span
                            :style="'style:red'"> {{$dongxwDict.getText(row.status,$dongxwDict.store.STATUS)}}</span>
                </template>
            </el-table-column>


            <el-table-column width="80" label="操作" :fixed="'right'">
                <template slot-scope="scope">

                    <el-button type="text" title="编辑" @click="edit(scope.row)">
                        <i class="el-icon-edit"></i>

                    </el-button>

                    <el-button type="text" @click="del(scope.row,scope.$index)" title="删除">
                        <i style="color:red" class="el-icon-delete red"></i>
                    </el-button>

                </template>
            </el-table-column>

        </v-table>
        <v-dialog ref="formDiag" width="50%" title="订单产品表">

            <form-panel @saved="onFormSaved"></form-panel>
            <div slot="footer" style="margin-right: 60px">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>
        <!--<v-dialog ref="formDiagView" title="订单原件">-->
        <!--<form-view-panel @saved="onFormSaved"></form-view-panel>-->
        <!--<div slot="footer">-->
        <!--&lt;!&ndash;<el-button type="primary" @click="$refs.formDiagView.dispatch('submit')">保存</el-button>&ndash;&gt;-->
        <!--<el-button type="default" @click="()=>{$refs.formDiagView.hide()}">关闭</el-button>-->
        <!--</div>-->
        <!--</v-dialog>-->

    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">
    .el-input {
        width: 160px;
    }

    .show-form {
        .el-radio-group {
            .el-radio {
                display: flex;
                align-items: center;
            }

            label {
                height: 40px;
            }
            .group-text {
                display: inline-block;
                width: 100px;
            }
            .title-text {
                display: inline-block;
                width: 120px;
            }
        }

    }

</style>
<script>
    import FormPanel from './Form';
    import ProductSubTypeSelect from '@/components/widgets/dongxw/ProductSubTypeSelect.vue';
    import ProductTypeSelect from '@/components/widgets/dongxw/ProductTypeSelect.vue';
    import ProductSelect from '@/components/widgets/dongxw/ProductSelect.vue';
    import OrderProductSelect  from '@/components/widgets/dongxw/ProductSelectByOrder.vue';

    export default {
        components: {ProductTypeSelect,ProductSubTypeSelect,ProductSelect,OrderProductSelect,FormPanel},
        data() {
            return {

                isShowPrdPic:false,
                dateRangeType: 'orderDate',
                order: {},
                orderId: 0,
                formStatus: 1,
                dateRange: [],
                summaryMap: {},
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {

                            isDeleted: false
                        }
                    },
                    getData: this.$api.dongxw.OrderLine.query
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
            getSearchParams() {
                this.page.query.param.orderId = this.order.id;
                this.page.query.dateRanges = {};
                if (this.dateRangeType != null && this.dateRange && this.dateRange.length > 0) {
                    this.page.query.dateRanges[this.dateRangeType] = {
                        startDate: this.dateRange[0],
                        endDate: this.dateRange.length > 1 ? this.dateRange[1] : null
                    };
                }
                return this.page.query;
            },
            /*
            导出
            */
            exportRecords() {
                let self = this;
                this.$confirm("确定要导出所有查询的记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    let params = self.getSearchParams();
                    self.$api.dongxw.OrderLine.export(params);

                });

            },
            create() {
                this.$refs.formDiag.show({order:this.order});
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
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.OrderLine.deleteById(row.id).then(rsp => {
                        this.$msgJsonResult(rsp);
                        if (rsp.code == 0 ) {
                            this.search();

                        }
                    });
                });
            },
            onFormSaved() {
                this.$refs.formDiag.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {

                this.order = options;
                this.search();
            },
            search() {
                this.getSearchParams();
                this.$refs.table.load();
            },
            cancel() {
                this.dateRangeType = null;
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
