<template>
    <v-table ref="table" :multi="true" :page="page"  :table-minheight="250"  >

        <el-table-column prop="seq" label="序号" width="50">
            <template slot-scope="scope"><span>{{scope.$index + 1}} </span></template>
        </el-table-column>


        <el-table-column prop="code" label="物料代码" width="100">
            <template slot-scope="{row}">
                {{ row.childRm?row.childRm.code:'-'}}
            </template>
        </el-table-column>


        <el-table-column prop="name" label="物料名称" width="120">
            <template slot-scope="{row}">
                {{ row.childRm?row.childRm.name:'-'}}
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="规格型号" width="140">
            <template slot-scope="{row}">
                {{ row.childRm?row.childRm.remark:'-'}}
            </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色" width="120">
            <template slot-scope="{row}">
                {{ row.childRm?row.childRm.color:'-'}}
            </template>
        </el-table-column>
        <el-table-column prop="rmDate" label="到位日期" width="100">
            <template slot-scope="{row}">
                {{ row.rmDate}}
            </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="90">
            <template slot-scope="{row}">
                {{ row.childRm?row.childRm.unit:'-'}}
            </template>
        </el-table-column>
        <el-table-column prop="totalQty" label="总用量" width="120">
            <template slot-scope="{row}">
                {{ row.totalQty}}
            </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" width="100">
            <template slot-scope="{row}">
                {{ row.price}}
            </template>
        </el-table-column>

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
                    getData: this.$api.dongxw.PurchasePlanService.query
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
