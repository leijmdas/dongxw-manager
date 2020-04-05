<template>
    <div>

        <v-toolbar title="采购清单" type="alert">
            <el-switch slot="tip" style="color:mediumpurple;margin-left:20px; margin-right: 20px"
                       active-color="#13ce66" inactive-color="#ff4949"
                       v-model="isShowPrdPic" active-text="显示图片" inactive-text="不显示">
            </el-switch>

            <el-button type="primary"  plain @click="createMulti">多选新增</el-button>
            <el-button type="primary"  plain @click="search">查询</el-button>

        </v-toolbar>
        <v-table ref='table' :dblclick='edit' :page='page' :table-minheight='350' @dataloaded='onDataloaded'>

            <el-table-column prop='productId' :sortable='true' label='产品款号' width='120'>
                <template slot-scope='{row}'><span style='color:black'>
			    {{row.product.epCode}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='productId1' :sortable='true' label='条形码' width='120'>
                <template slot-scope='{row}'><span style='color:black'>
			    {{row.product.barCode}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='productId11' :sortable='true' label='产品描述' width='180'>
                <template slot-scope='{row}'><span style='color:black'>
			    {{row.product.remark}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="picUrl" label="产品图片" v-if="isShowPrdPic" width="90">
                <template slot-scope="{row}">
                    <v-image-preview v-model="row.product.imgUrls" :picUrl="row.product.picUrl"  >
                    </v-image-preview>
                </template>
            </el-table-column>
            <el-table-column prop='qty' :sortable='true' label='数量' width='90'>
                <template slot-scope='{row}'><span style='color:black'>
			        {{row.qty}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='unit' :sortable='true' label='单位' width='80'>
                <template slot-scope='{row}'><span style='color:black'>
			        {{row.product.unit}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='price' :sortable='true' label='单价' width='90'>
                <template slot-scope='{row}'><span style='color:black'>
			        {{row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='money' :sortable='true' label='金额' width='110'>
                <template slot-scope='{row}'><span style='color:black'>
			        {{row.money}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='remark' :sortable='true' label='备注' width='120'>
                <template slot-scope='{row}'><span style='color:black'>
			        {{row.remark}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='createDate' :sortable='true' label='创建时间' width='120'>
                <template slot-scope='{row}'><span style='color:black'>
			{{row.createDate}}</span>
                </template>
            </el-table-column>
            <el-table-column prop='createBy' :sortable='true' label='创建人' width='110'>
                <template slot-scope='{row}'><span style='color:black'>
			{{row.createByName}}</span>
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
        <v-dialog :appendToBody="true" ref="formDlg" width="50%" title="订单产品表">

            <form-panel @saved="onFormSaved"></form-panel>
            <div slot="footer" style="margin-right: 60px">
                <el-button type="primary" @click="$refs.formDlg.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDlg.hide()}">取消</el-button>
            </div>
        </v-dialog>

        <v-dialog :appendToBody="true" ref="formDlgMultiSelect" width="50%" title="订单产品表">

            <form-multi-select ref="formMultiSelect" @saved="onFormSaved"></form-multi-select>
            <div slot="footer" style="margin-right: 60px">
                <el-button type="primary" @click="()=>{$refs.formDlgMultiSelect.hide();confirmMultiSelect();}">确定
                </el-button>
                <el-button type="default" @click="()=>{$refs.formDlgMultiSelect.hide()}">关闭</el-button>
            </div>
        </v-dialog>


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
    import FormPanel from './FormItem';
    import FormMultiSelect from '@/components/widgets/dongxw/MakeplanMultiSelect.vue';

    export default {
        components: {FormMultiSelect, FormPanel},

        data() {
            return {
                orderId:-1,
                purchaseOrderId : -1,

                isShowPrdPic: false,
                dateRangeType: 'orderDate',
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
                    getData: this.$api.dongxw.PurchaseOrderItemService.query
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
            createMulti() {
                this.$refs.formDlgMultiSelect.show({orderId: this.orderId});
            },
            create() {
                //this.$refs.formDlg.show({orderId: this.purchaseOrder.orderId});
            },
            edit(row) {
                this.$refs.formDlg.show({id: row.id});
            },
            confirmMultiSelect() {
                let selectedRows = this.$refs.formMultiSelect.getSelectedRows()
                let params = {
                    purchaseOrderId: this.purchaseOrderId,
                    makePlanIds: selectedRows.map(x => x.id).join(),
                }
                if(params.makePlanIds.trim().length>0) {
                    this.$api.dongxw.PurchaseOrderItemService.saveMulti(params).then(rsp => {
                        this.$msgJsonResult(rsp)
                        this.search()
                    });
                }else{
                    this.$message("请选择订单产品！")
                }
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

                this.page.query.param.purchaseOrderId = this.purchaseOrderId;
                //this.page.query.param.orderId = this.orderId;
                return this.page.query;
            },
            /*
            导出
            */
            exportRecords() {
                // let self = this;
                // this.$confirm("确定要导出所有查询的记录吗?", "提示", {
                //     type: "warning"
                // }).then(() => {
                //     let params = self.getSearchParams();
                //     self.$api.dongxw.OrderLine.export(params);
                //
                // });
            },


            toggleStatus(row) {

            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.PurchaseOrderItemService.deleteById(row.id).then(rsp => {
                        this.$msgJsonResult(rsp);
                        if (rsp.code == 0 ) {
                            this.search();

                        }
                    });
                });
            },
            onFormSaved() {
                this.$refs.formDlg.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {
                this.orderId = options.orderId
                this.purchaseOrderId = options.id
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
