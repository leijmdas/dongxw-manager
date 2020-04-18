<!--cust管理-->
<template>
    <div v-model="currentValue" >
        <div class="panel panel-default panel-search">
            <el-form :inline="true">

                <el-form-item  label="供应商编码" prop="code">
                    <el-input v-model="page.query.param.code" clearable></el-input>
                </el-form-item>
                <el-form-item label="供应商名称" prop="name">
                    <el-input v-model="page.query.param.name" clearable></el-input>
                </el-form-item>
                <!--<el-form-item label="状态" prop="status">-->
                    <!--<el-select :clearable="true" v-model="page.query.param.status" style="width:100px">-->
                        <!--<el-option v-for="item in $dongxwDict.store.STATUS" :key="item[0]" :value="item[0]"-->
                                   <!--:label="item[1]"></el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="类型" prop="type">
                    <el-select :clearable="true" v-model="page.query.param.type" style="width:100px">
                        <el-option v-for="item in $dongxwDict.store.SUPPLY_TYPES" :key="item[0]" :value="item[0]"
                                   :label="item[1]"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <v-toolbar title="供应商名单" type="alert">
            <!--<el-button plain @click="confirmFindClick">确定</el-button>-->
            <el-button type="primary" plain @click="cancelFind">关闭</el-button>
        </v-toolbar>


        <v-table ref="table" :multi="false"  :page="page" :tableMaxheight="400" :table-minheight="300"
                 @dataloaded="onDataloaded">

            <el-table-column :sortable="true" prop="code" label="供应商编码" width="100">
                <template slot-scope="{row}">
                    <span >{{ row.code }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column :sortable="true"  prop="name" label="name" width="200"></el-table-column>-->
            <el-table-column :sortable="true" width='260' prop="name" label='****** 请选择供应商 ******'>
                <template slot-scope="{row}">
                    <el-button  :style="'width:100%'"  @click='confirmFind(row)'> <span  style="color: darkmagenta ">{{ row.name }}</span>
                    </el-button>
                </template>
            </el-table-column>
            <!--<el-table-column prop="country" label="国家" width="80"></el-table-column>-->
            <el-table-column prop="addr" label="地址" width="300"></el-table-column>

            <el-table-column prop="type" label="类型" width="120">
            <template slot-scope="{row}">
                {{$dongxwDict.getText(row.type,$dongxwDict.store.SUPPLY_TYPES)}}
            </template>
            </el-table-column>

            <!--<el-table-column prop="email" label="电子邮箱" width="120">-->
            <!--</el-table-column>-->
            <el-table-column :sortable="true"  prop="contact" label="联系人" width="120">
            </el-table-column>
            <!--<el-table-column :sortable="true" prop="tel" label="联系人电话" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column :sortable="true" prop="fax" label="传真" width="120">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="moneyType" label="结算币种" width="80">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{$dongxwDict.getText(row.moneyType,$dongxwDict.store.MONEY_TYPE)}}-->
                <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column prop="createDate" disable  label="建档时间" width="100">-->
                <!--<template slot-scope="{row}">-->
                    <!--{{row.createDate.substr(0,10)}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="status" label="状态" width="60">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.status,$dongxwDict.store.STATUS)}}
                </template>
            </el-table-column>
            <!--<el-table-column prop="remark" label="备注" width="180">-->
            <!--</el-table-column>-->

        </v-table>

    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">

    .status_green {
        color: red;
    }
</style>

<script>


    export default {
        components: {},
        props: {
            value: {
                required: true
            },
            confirmFind: {
                Type: Function,
                required: true,
            },
            cancelFind: {
                Type: Function,
                required: true,
            },
        },
        data() {
            return {
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
                    getData : this.$api.dongxw.SupplierService.query

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
            currentValue: {
                get () {
                    return this.value
                },
                set (val) {
                    this.$emit('input', val)
                }
            }
        },
        methods: {
            confirmFindClick(){
                if(this.confirmFind)
                {
                    this.confirmFind()
                }
            },
            cancelFindClick(){
                if(this.cancelFind)
                {
                    this.cancelFind()
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
                this.$api.dongxw.SupplierService.export(params);
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
                let status = row.status;
                let msg = '确定上架此活动吗？</br><span style="color:red">一旦上架，部分信息不允许修改!</span>';
                if (status == 1) {
                    msg = '确定下架此活动吗？</br><span style="color:red">一旦下架，已派发的优惠券无法使用!</span>';
                }
                this.$confirm(msg, "确认", {
                    type: "warning",
                    dangerouslyUseHTMLString: true
                }).then(() => {
                    this.$api.dongxw.CustomerService.updateStatus(row.id, status == 1 ? 2 : 1).then(rsp => {
                        this.search();
                        this.$message({
                            type: "success",
                            message: "操作成功!"
                        });
                    });
                });
            },
            del(row) {
                this.$confirm("确定删除此条记录吗?", "提示", {
                    type: "warning"
                }).then(() => {
                    this.$api.dongxw.SupplierService.deleteById(row.id).then(rsp => {
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
                this.$refs.table.load();
            },
            cancel() {
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
