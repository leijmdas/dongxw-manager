<template>
    <v-table ref="table" :multi="true" :page="page"  :table-minheight="250"  >

        <!--<el-table-column prop="seq" label="序号" width="50">-->
            <!--<template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>-->
        <!--</el-table-column>-->

        <el-table-column prop="outFlag" label="外发" width="70">
            <template slot-scope="{row}">
                    <span :style="row.outFlag==1?'color:blue':''">
                    {{$dongxwDict.getText(row.outFlag,$dongxwDict.store.OUT_FLAG)}}
                        </span>
            </template>
        </el-table-column>


        <el-table-column prop="customerId" label="客户名称" width="110">
            <template slot-scope="{row}">
                {{ row.customer?row.customer.custName:'-'}}
            </template>
        </el-table-column>

        <!--<el-table-column prop="epOrderCode" label="EP订单号" width="120"></el-table-column>-->

        <el-table-column prop="customerOrderCode" label="客订单号" width="110">
            <template slot-scope="{row}">
                {{ row.orderMaster?row.orderMaster.customerOrderCode:'-'}}
            </template>
        </el-table-column>

        <el-table-column prop="code" label="客款号" width="100">
            <template slot-scope="{row}">
                <span style="color:green">      {{ row.product?row.product.code:'-'}} </span>
            </template>
        </el-table-column>
        <el-table-column prop="epCode" label="EP款号" width="100">
            <template slot-scope="{row}">
                {{ row.product?row.product.epCode:'-'}}
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="产品描述" width="120">
            <template slot-scope="{row}">
                {{ row.product?row.product.remark:'-'}}
            </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色" width="100">
            <template slot-scope="{row}">
                {{ row.product?row.product.color:'-'}}
            </template>
        </el-table-column>
        <el-table-column prop="qty" label="数量" width="100">
            <template slot-scope="{row}">
                {{ row.orderLine?row.orderLine.qty:'-'}}
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="{row}">
                    <span :style="checkColor(row)">
                    {{$dongxwDict.getText(row.status,$dongxwDict.store.AUDIT_STATUS)}}
                        </span>
            </template>
        </el-table-column>
        <el-table-column prop="outPrepareRm" label="外发备料" width="80">
            <template slot-scope="{row}">
                    <span :style="row.outPrepareRm==1?'color:blue':''">
                    {{$dongxwDict.getText(row.outPrepareRm,$dongxwDict.store.YESNO_TYPE)}}
                        </span>
            </template>
        </el-table-column>
        <el-table-column prop="backupQty" label="备品" width="100"></el-table-column>

        <el-table-column prop="orderDate" label="接单日期" width="100">
            <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.orderDate)}}
            </template>
        </el-table-column>
        <el-table-column prop="issueDate" label="要求交期" width="100">
            <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.issueDate)}}
            </template>
        </el-table-column>
        <el-table-column prop="rmDate" label="物料到位日期" width="100">
            <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.rmDate)}}
            </template>
        </el-table-column>
        <el-table-column prop="pkgDate" label="包材到位日期" width="100">
            <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.pkgDate)}}
            </template>
        </el-table-column>
        <el-table-column prop="planStart" label="计划上线日期" width="100">
            <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.planStart)}}
            </template>
        </el-table-column>
        <el-table-column prop="planEnd" label="计划完成日期" width="100">
            <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.planEnd)}}
            </template>
        </el-table-column>
        <el-table-column prop="finishFlag" label="完成?" width="75">
            <template slot-scope="{row}">
                    <span :style="row.finishFlag==0?'color: red':'color: green'">
                        {{$dongxwDict.getText(row.finishFlag,$dongxwDict.store.FINISH_FLAG)}}
                    </span>
            </template>
        </el-table-column>
        <el-table-column prop="realEnd" label="实际完成日期" width="100">
            <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.realEnd)}}
            </template>
        </el-table-column>

        <el-table-column prop="status" label="订单状态" width="80">
            <template slot-scope="{row}">
                    <span :style="row.status==0?'color: red':''">
                        {{$dongxwDict.getText(row.orderMaster?row.orderMaster.status:-1,$dongxwDict.store.ORDER_STATUS)}}
                    </span>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>

        <el-table-column prop="createDate" label="建档时间" width="100">
            <template slot-scope="{row}">
                {{ $dongxwDict.viewDate(row.createDate)}}
            </template>
        </el-table-column>
        <el-table-column prop="createByName" label="建档人" width="80">
        </el-table-column>


    </v-table>


</template>

<style lang="less" scoped>

</style>

<script>

    export default {
        props: {
            orderId: {
                type: Number,
                default: -1,
            }
        },
        data() {
            return {
                page: {
                    query: {
                        orderBys: 'id|desc',
                        param: {
                            outFlag: 1,
                            orderId: this.orderId,
                            isDeleted: false
                        }
                    },
                    getData: this.$api.dongxw.MakePlan.query
                },
            }
        },
        methods:{
            getSelectedRows(){
              return this.$refs.table.getSelectedRows()
            },
            checkColor(row) {
                if(row.status===0)
                {
                    return 'color:darkblue'
                }
                if(row.status===20)
                {
                    return 'color:green'
                }
                if(row.status===30)
                {
                    return 'color:red'
                }
                return ''
            },
            getSearchParams() {

                return this.page.query
            },
            search() {
                this.getSearchParams()
                this.$refs.table.load()
            },

            init(options = {}) {
                this.page.query.param.orderId = options.orderId
                this.search()
            },
        },
        created() {
        },

        mounted() {
            this.$on("init", this.init);
        }

    }

</script>
