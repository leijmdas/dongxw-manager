<!--cust管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true">
                <el-form-item label="客户" prop="customerId">
                    <customer-select v-model="page.query.param.customerId" :clearable="true"></customer-select>

                </el-form-item>

                <el-form-item label="产品大类">
                    <product-type-select v-model="page.query.param.parentId" :clearable="true"></product-type-select>
                </el-form-item>
                <el-form-item label="产品小类">
                    <product-sub-type-select :parentTypeId="page.query.param.parentId" v-model="page.query.param.productTypeId" :clearable="true"></product-sub-type-select>
                </el-form-item>
                <el-form-item label="EP款号" prop="epCode">
                    <el-input v-model="page.query.param.epCode" clearable></el-input>
                </el-form-item>

                <el-form-item label="客款号" prop="code">
                    <el-input v-model="page.query.param.code" clearable></el-input>
                </el-form-item>

                <el-form-item label="产品描述" prop="remark">
                    <el-input v-model="page.query.param.remark" clearable></el-input>
                </el-form-item>
                <el-form-item label="颜色" prop="color">
                    <el-input v-model="page.query.param.color" clearable></el-input>
                </el-form-item>
                <el-form-item label="尺寸" prop="barCode">
                    <el-input v-model="page.query.param.size" clearable></el-input>
                </el-form-item>


            </el-form>
        </div>
        <v-toolbar title="数据列表" type="alert">
            <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
            <el-button @click="cancel">取消</el-button>

            <el-switch style="margin-left:20px; margin-right: 20px"
                       v-model="isShowPrdPic"
                       active-text="显示产品图片"
                       inactive-text="不显示">
            </el-switch>


        </v-toolbar>


        <v-table ref="table" :page="page" :dblclick="selectClose"  :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column  prop="seq" label="序号" width="50">
                <template slot-scope="scope"><span >{{scope.$index + 1}} </span></template>
            </el-table-column>

            <el-table-column prop="customerId" label="客户名称" width="120">
                <template slot-scope="{row}">
                    {{ row.customer?row.customer.custName:'-'}}
                </template>
            </el-table-column>

            <el-table-column prop="epCode" label="EP款号" width="100"></el-table-column>
            <!--<el-table-column prop="code" label="客款号" width="120"></el-table-column>-->

            <el-table-column prop="code" label="客款号" width="100">
                <template slot-scope="{row}">
                   <span   > {{row.code }} </span>
                </template>
            </el-table-column>
            <el-table-column prop="parentId" label="产品大类" width="120">
                <template slot-scope="{row}">
                    {{ row.productType? row.productType.code :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="productSubType" label="产品小类" width="160">
                <template slot-scope="{row}">
                    {{ row.productSubType? row.productSubType.code :'-' }}
                </template>
            </el-table-column>


            <el-table-column prop="remark" label="产品描述" width="245">

            </el-table-column>
            <el-table-column prop="unit" label="单位" width="60"></el-table-column>

            <el-table-column prop="picUrl" label="产品图片" v-if="isShowPrdPic" width="90">
                <template slot-scope="{row}">
                    <!--<img v-if="row.picUrl" :src="row.picUrl" width="60px" height="60px" alt="">-->

                    <v-image-preview v-model="row.imgUrls" :picUrl="row.picUrl"  >
                    </v-image-preview>

                </template>
            </el-table-column>
            <el-table-column prop="color" label="颜色" width="100">
            </el-table-column>
            <el-table-column prop="size" label="尺寸" width="150">
            </el-table-column>
            <el-table-column prop="barCode" label="条码" width="120">
            </el-table-column>

            <el-table-column prop="createDate" label="建档时间" width="150">
            </el-table-column>

            <el-table-column prop="status" label="状态" width="60">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.status,$dongxwDict.store.STATUS)}}
                </template>
            </el-table-column>
            <el-table-column prop="ibQty" label="内盒数量"></el-table-column>
            <el-table-column prop="ibGw" label="内盒毛重(kg)" width="100"></el-table-column>
            <el-table-column prop="ibNw" label="内盒净重(kg)" width="100"></el-table-column>
            <el-table-column prop="ibSize" label="内盒尺寸"></el-table-column>

            <el-table-column prop="obQty" label="外箱数量"></el-table-column>
            <el-table-column prop="obGw" label="外箱毛重(kg)" width="100"></el-table-column>
            <el-table-column prop="obNw" label="外箱净重(kg)" width="100"></el-table-column>
            <el-table-column prop="obSize" label="外箱尺寸"></el-table-column>

            <el-table-column prop="memo" label="备注"  >
            </el-table-column>

            <!--<el-table-column width="100" label="操作" :fixed="'right'">-->
                <!--<template slot-scope="scope">-->

                    <!--<el-button type="text" title="编辑" @click="edit(scope.row)">-->
                        <!--<i class="el-icon-edit"></i>-->
                    <!--</el-button>-->

                    <!--<el-button type="text" @click="del(scope.row,scope.$index)" title="删除"  >-->
                        <!--<i class="el-icon-delete red"></i>-->
                    <!--</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </v-table>
        <v-dialog ref="formDiag" :width="'750px'" title="信息编辑">
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
</style>

<script>
    import ProductSubTypeSelect from '@/components/widgets/dongxw/ProductSubTypeSelect.vue';
    import ProductTypeSelect from '@/components/widgets/dongxw/ProductTypeSelect.vue';
    import FormPanel from './Form';
    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';

    export default {
        components: { CustomerSelect,FormPanel, ProductTypeSelect,ProductSubTypeSelect },
        data() {
            return {
                isShowPrdPic : false,
                formStatus: 1,
                orderDateRange: [],
                summaryMap: {},

                page: {
                    query: {
                        orderBys: 'id|desc',
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

            onDataloaded(rsp) {
                // if (rsp.total < 1) return;
                // let promotionIds = rsp.data.map(r => r.id);
                // this.$api.ipark.PromotionInfoService.summaryGroupByPromotionId(promotionIds).then(rs => {
                //     let _rs = rs || [];
                //     this.summaryMap = {}
                //     _rs.forEach(r => {
                //         this.summaryMap[r.promotionId] = r;
                //     })
                // })
            },
            /*
            导出
             */
            exportRecords() {
                let params = this.getSearchParams();
                this.$api.dongxw.ProductService.export(params);
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
            selectClose(row){
                this.row = row
                this.$message(JSON.stringify(row));
                this.formDiag.hide();

            },
            edit(row) {
               // this.$refs.formDiag.show({id: row.id});
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
                //this.formDiag = options.formDiag
                //this.queryForm = options.queryForm
                this.search();
            },
            search() {
                this.page.query.param.prdFlag = 0;
                this.$refs.table.load();
            },
            cancel() {
                this.dateRange = [];
                this.page.query.param = {
                    prdFlag: 0,
                };
                this.search();
            }
        },
        created() {
        },
        mounted() {
            this.$on("init", this.init);
            //let ret=this.$api.dongxw.CustomerService.findById(1);
            //console.log(JSON.stringify(ret));
        }
    };
</script>
