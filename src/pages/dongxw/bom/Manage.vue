<!--cust管理-->
<template>
    <div>
        <!--<el-collapse  :v-model="'selectPrd'">-->
            <!--<el-collapse-item name="selectPrd">-->
                <!--<template slot="title">-->
                    <!--选择产品<i class="header-icon el-icon-info"></i>-->
                <!--</template>-->
                <product-master v-show="switchShow" :tableRowClick="search" ref="productMaster"></product-master>
            <!--</el-collapse-item>-->
        <!--</el-collapse>-->
        <div v-show="showQryBar" class="panel panel-default panel-search">
            <el-form :inline="true">
                <!--<el-table-column prop="childId" label="父件标识" width="60"></el-table-column>-->
                <el-switch style="margin-left:20px; margin-right: 20px" v-model="switchShow"
                           active-text="显示产品清单" inactive-text="不显示">
                </el-switch>
                <el-form-item label="大类" prop="orderType">
                    <rm-type-select  @change="search" v-model="page.query.param.bigType" :clearable="true"></rm-type-select>
                </el-form-item>
                <el-form-item label="小类">
                    <sub-type-select @change="search" :parentTypeId="page.query.param.bigType" v-model="page.query.param.smallType" :clearable="true"></sub-type-select>
                </el-form-item>


                <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                <el-button @click="cancel">取消</el-button>
                <!--<el-form-item>-->
                    <!--&lt;!&ndash;<el-button-group></el-button-group>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button @click="cancel">取消</el-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button type="primary" plain @click="()=>{$bus.$emit('app:flush')}">刷新</el-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;<el-button @click="()=>{$bus.$emit('app:goback')}">返回</el-button>&ndash;&gt;-->

                <!--</el-form-item>-->
            </el-form>
        </div>
        <v-toolbar title="BOM清单" type="alert">
            <el-switch slot="tip" style="margin-left:20px; margin-right: 30px"
                       v-model="showQryBar" active-text="显示查询框" inactive-text="不显示">
            </el-switch>
            <span v-if="!product.code" slot="tip" style="color:red;margin-left:  40px;margin-top: 30px">
                请点上方产品后编辑BOM
            </span>

            <span v-if="product.code" slot="tip" style="color:green;margin-left: 40px;margin-top: 40px">
                {{  product.code +" : "+product.epCode +" : "+product.remark}}
            </span>
            <el-button type="primary" v-show="productId>0" plain @click="create">新增</el-button>

            <el-button plain @click="exportRecords">导出 XLS</el-button>

            <!--<el-switch style="margin-left:20px; margin-right: 20px"-->
                       <!--v-model="isShowPrdPic" active-text="显示图片" inactive-text="不显示">-->
            <!--</el-switch>-->

        </v-toolbar>


        <v-table ref="table" :page="page" :dblclick="edit"  :table-minheight="450" @dataloaded="onDataloaded">
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
            <!--<el-table-column prop="parentId" label="父标识" width="80"></el-table-column>-->

            <el-table-column prop="parentId" label="大类" width="100">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.productType.name :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="productSubType" label="小类" width="120">
                <template slot-scope="{row}">
                    {{ row.childRm ? row.childRm.productSubType.name :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="code" label="物料代码" width="160">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.code :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="物料名称" width="180">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.name :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="规格型号" width="245">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.remark :'-' }}
                </template>
            </el-table-column>
            <el-table-column prop="color" label="颜色" width="100">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.color :'-' }}
                </template>
            </el-table-column>

            <el-table-column prop="unit" label="单位" width="80">
                <template slot-scope="{row}">
                    {{ row.childRm? row.childRm.unit :'-' }}
                </template>
            </el-table-column>

            <el-table-column prop="qty" label="数量" width="120"></el-table-column>
            <el-table-column prop="price" label="单价" width="120"></el-table-column>
            <el-table-column prop="money" label="金额" width="120"></el-table-column>
            <el-table-column prop="lossQty" label="损耗率(%)" width="120">
                <template slot-scope="{row}">
                   {{ row.lossType==1?row.lossQty:'0'}}
                </template>
            </el-table-column>
            <el-table-column prop="lossQty" label="损耗数" width="120">
                <template slot-scope="{row}">
                   {{ row.lossType==0?row.lossQty:'0'}}
                </template>
            </el-table-column>
            <el-table-column prop="length" label="长封度" width="120"></el-table-column>
            <el-table-column prop="width" label="宽封度" width="120"></el-table-column>
            <el-table-column prop="knifeQty" label="刀数" width="100"></el-table-column>
             <el-table-column prop="sizeL" label="尺寸(长）" width="120"></el-table-column>
            <el-table-column prop="sizeS" label="X" width="30"></el-table-column>
            <el-table-column prop="sizeW" label="尺寸(宽）" width="120"></el-table-column>

            <el-table-column prop="createDate" label="建档时间" width="120">
            </el-table-column>

            <el-table-column prop="createByName" label="建档人" width="80">
            </el-table-column>

            <el-table-column width="100" label="操作" :fixed="'right'">
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
                formStatus: 1,

                productId: -1,
                product : {},

                orderDateRange: [],
                summaryMap: {},
                currentPage : 1 ,
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            productId: undefined,
                            isDeleted: false
                        }
                    },
                    getData : this.$api.dongxw.BomService.query

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
                this.$refs.formDiag.hide();
                this.$nextTick(this.search);
            },
            init(options = {}) {
                this.$refs.productMaster.init()
                this.search();
            },
            search(row) {
                if (row) {
                    this.product = row
                    this.productId = row.id
                    this.page.query.param.productId = this.productId
                }
                this.page.query.param.customerId = 0
                this.$refs.table.currentPage = 1
                this.$refs.table.load()
            },
            cancel() {
                this.dateRange = [];
                //this.currentPage = 1;
                this.page.query.param = {
                    isDeleted: false,
                    productId : this.productId
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
