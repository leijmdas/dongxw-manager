<!--cust管理-->
<template>
    <div>
        <div class="panel panel-default panel-search">
            <el-form :inline="true">

                <el-form-item sortable="true" label="客户编码" prop="custNo">
                    <el-input v-model="page.query.param.custNo" clearable></el-input>
                </el-form-item>
                <el-form-item sortable="true" label="客户名称" prop="custName">
                    <el-input v-model="page.query.param.custName" clearable></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="moneyType">
                    <el-select :clearable="true" v-model="page.query.param.status" style="width:100px">
                        <el-option v-for="item in $dongxwDict.store.STATUS" :key="item[0]" :value="item[0]"
                                   :label="item[1]"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="结算币种" prop="moneyType">
                    <el-select :clearable="true" v-model="page.query.param.moneyType" style="width:100px">
                        <el-option v-for="item in $dongxwDict.store.MONEY_TYPE" :key="item[0]" :value="item[0]"
                                   :label="item[1]"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search" v-keycode="'ENTER'">查询</el-button>
                    <el-button @click="cancel">取消</el-button>

                </el-form-item>
            </el-form>
        </div>
        <v-toolbar title="客户列表" type="alert">
            <el-switch slot="tip" style="alignment:left;margin-left:80px "
                       v-model="isShowSecurity"
                       active-text="显示敏感信息"
                       inactive-text="不显示">
            </el-switch>
            <el-button type="primary" plain @click="create">新增</el-button>
            <el-button plain @click="exportRecords">导出 XLS</el-button>

        </v-toolbar>


        <v-table ref="table" :page="page" :dblclick="edit" :table-minheight="450" @dataloaded="onDataloaded">
            <el-table-column prop="seq" type="index"  label="序号" width="50">
                <!--<template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>-->
            </el-table-column>
            <el-table-column   :sortable="true" prop="custNo" label="客户编码" width="100"></el-table-column>
            <el-table-column :sortable="true" prop="custName" label="客户名称" width="220">
                <template slot-scope="scope">
                    <a class="link-name"
                        href="javascript:;"
                        :title="scope.row.custName"
                        @click="edit(scope.row)" >{{ scope.row.custName }}
                    </a>
                </template>

            </el-table-column>

            <el-table-column prop="custSname" v-if="isShowSecurity" label="详细名称" width="245"></el-table-column>

            <el-table-column prop="country" label="客户国家" width="80"></el-table-column>
            <el-table-column prop="custType" label="客户类型" width="70">
                <template slot-scope="scope">
                    {{scope.row.custNo.substr(0,2)==='CN'?'内销':'外销'}}
                </template>
            </el-table-column>
            <el-table-column prop="addr" v-if="isShowSecurity" label="地址" width="300"></el-table-column>

            <el-table-column prop="email" v-if="isShowSecurity" label="公司电子邮箱" width="150">
            </el-table-column>
            <el-table-column prop="contact" v-if="isShowSecurity" label="联系人" width="150">
            </el-table-column>
            <el-table-column prop="tel" v-if="isShowSecurity" label="联系电话" width="160">
            </el-table-column>
            <el-table-column prop="fax" v-if="isShowSecurity" label="传真" width="160">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="60">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.status,$dongxwDict.store.STATUS)}}
                </template>
            </el-table-column>

            <el-table-column prop="moneyType" label="结算币种" width="80">
                <template slot-scope="{row}">
                    {{$dongxwDict.getText(row.moneyType,$dongxwDict.store.MONEY_TYPE)}}
                </template>
            </el-table-column>
            <el-table-column prop="createDate"  label="建档时间"   width="120" >
                <template slot-scope="{row}">
                    {{row.createDate.substr(0,10)}}
                </template>
            </el-table-column>
            <el-table-column prop="createBy"  label="建档人"   width="120">
                <template slot-scope="{row}">
                    {{row.createByName}}
                </template>
            </el-table-column>
            <el-table-column v-show="isShowSecurity" prop="isShowSecurity"  label=""  >
                <template slot-scope="{row}">

                </template>
            </el-table-column>


            <el-table-column width="100" label="操作" :fixed="'right'">
                <template slot-scope="scope">

                    <el-button type="text" title="编辑" @click="edit(scope.row)"  >
                        <i class="el-icon-edit"></i>
                    </el-button>
                     <el-button type="text" style="color:red" @click="del(scope.row,scope.$index)" title="删除" v-if="scope.row.status==0">
                      <i class="el-icon-delete red"></i>
                    </el-button>
                </template>
            </el-table-column>
        </v-table>
        <v-dialog ref="formDiag" :width="'600px'" title="信息编辑">
            <form-panel @saved="onFormSaved"></form-panel>
            <div slot="footer">
                <el-button type="primary" @click="$refs.formDiag.dispatch('submit')">保存</el-button>
                <el-button type="default" @click="()=>{$refs.formDiag.hide()}">取消</el-button>
            </div>
        </v-dialog>
    </div>
</template>
<style rel="stylesheet/less" scoped lang="less">

    .status_green {
        color: green;
    }
</style>

<script>
    //import ProductTypeSelect from '@/components/widgets/ProductTypeSelect.vue';
    import FormPanel from './Form';

    export default {
        components: { FormPanel },
        data() {
            return {
                isShowSecurity: false ,
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
                    getData : this.$api.dongxw.CustomerService.query

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
                console.log(params);
                this.$api.dongxw.CustomerService.export(params);
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
                    this.$api.ipark.PromotionInfoService.updateStatus(row.id, status == 1 ? 2 : 1).then(rsp => {
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
                    this.$api.dongxw.CustomerService.deleteById(row.id).then(rsp => {
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
            //let ret=this.$api.dongxw.CustomerService.findById(1);
            //console.log(JSON.stringify(ret));
        }
    };
</script>
