<template>
    <div>
        <!-- row-key="code"  :default-sort="{prop: 'order', order: 'ascending'}"-->
        <el-table ref="multipleTable" @selection-change="handleSelectionChange"
                  :data="tableData" v-loading="loading" border align="left">
            <!--<el-table-column type="selection" width="45" :fixed="'left'"></el-table-column>-->

            <el-table-column show-overflow-tooltip v-for="(item, index) in title"
                             :key="`header_${index}`" :prop="title[index].prop" :label="item.label">
                <template slot-scope="scope">
                    <p>{{scope.row[item.prop]}}</p>
                </template>
            </el-table-column>
        </el-table>
        <span style="border: solid 1px;">请拖拽排序</span>
        <span style="margin-left: 130px">
            <el-button type="primary" @click="okBtnClick">确定</el-button>
            <el-button type="default" @click="closeBtnClick">取消</el-button>
        </span>
    </div>
</template>

<style lang="less" scoped>
    span {
        margin-left: 10px;
        height:40px;
        color:red;
        text-align: center;
        line-height: 2px;
    }

</style>

<script>
    import Sortable from 'sortablejs'

    export default {
        components: {Sortable},
        props: {
            doSortFun: {
                type: Function,
                default: null,
            },
            doCloseFun: {
                type: Function,
                default: null,
            },
            page : {
                type: Object,
                required: false
            },
            header: {
                type: Array,
                required: false
            }
        },
        watch: {

            tableData: {
                handler: function (newVal, oldVal) {
                    this.title = this.header.slice(1)
                    this.sortedData = _.cloneDeep(this.tableData)
                },
                deep: true,
                //immediate:true ,
            },
        },

        data() {

            return {
                //doSortMetadataDict: this.$api.platform.MetadataTableService.doSortMetadataDict,
                multipleSelection: [],
                loading: false,
                title: [],
                sortedData: [],
                tableData: [],

            }
        },
        methods: {
            closeBtnClick(){

                if(this.doCloseFun){
                    this.doCloseFun()
                }
            },
            okBtnClick() {
                if(this.doSortFun){
                    this.doSortFun(this.sortedData)
                }
                if(this.doCloseFun){
                    this.doCloseFun()
                }
                // let ids = [] // debugger
                // this.getSortedData().forEach((item, index, array) => {
                //     ids.push(item[this.header[0].prop])
                // })
                //
                // this.$message(JSON.stringify(ids))
                // let params = {
                //     subsysId: this.page.query.param.subsysId,
                //     ids: ids.join(",")
                // }
                // this.doSortMetadataDict(params).then(
                //     rsp => {
                //         this.$msgJsonResult(rsp)
                //     })
            },
            handleSelectionChange(val) {
                // this.multipleSelection = val;
            },
            getSortedData() {
                return this.sortedData
            },
            rowDrop() {
                // const tbody = document.querySelector('.el-table__body-wrapper tbody')
                // Sortable.create(tbody)
                // Sortable.create(tbody, {
                //     onEnd({ newIndex, oldIndex }) {
                //         const currRow = _this.tableData.splice(oldIndex, 1)[0]
                //         _this.tableData.splice(newIndex, 0, currRow)
                //     }
                // })
                const tbody = document.querySelector('.el-table__body-wrapper tbody')
                const _this = this
                Sortable.create(tbody, {
                    onEnd({newIndex, oldIndex}) {
                        const currRow = _this.sortedData.splice(oldIndex, 1)[0]
                        _this.sortedData.splice(newIndex, 0, currRow)

                    }
                })
            },
            load() {
                let params = _.cloneDeep(this.page.query)
                params.start=this.page.start
                params.limit=this.page.limit

                params['_openLoading'] = false;
                this.page
                    .getData(params)
                    .then(rsp => {
                        this.tableData = rsp.data
                        //this.$emit("dataloaded", rsp);
                    })
                    .catch(err => {
                        this.showLoading = false;
                        this.tableData.splice(0, this.tableData.length);

                    });
            },
            init() {
                this.rowDrop()
                //this.sortedData = _.cloneDeep(this.tableData)
            },
        },

        mounted() {
            this.$on("init", this.init)
            this.init()
        }

    }
</script>
