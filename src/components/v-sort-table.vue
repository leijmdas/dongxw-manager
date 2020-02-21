<template>
    <div>
        <!-- row-key="code"  :default-sort="{prop: 'order', order: 'ascending'}"-->
        <span style="border: solid 1px;">请拖拽排序</span>
        <span style="margin-left: 60px">
            <el-button type="primary" @click="okBtnClick">保存</el-button>
            <el-button type="default" @click="closeBtnClick">取消</el-button>
        </span>
        <el-table  :id="elTableId" :data="tableData" v-loading="loading" border align="left">
            <el-table-column show-overflow-tooltip v-for="(item, index) in title"
                             :width="index==0?'60':''"
                             :key="`header_${index}`"
                             :prop="title[index].prop"
                             :label="item.label">
                <template slot-scope="scope">
                    <p>{{scope.row[item.prop]}}</p>
                </template>
            </el-table-column>

        </el-table>
        <!--<span style="border: solid 1px;margin-left: 100px">排序功能</span>-->
       <slot></slot>
    </div>
</template>

<style lang="less" scoped>
    span {
        margin-left: 10px;
        height: 40px;
        color: red;
        text-align: center;
        line-height: 2px;
    }

</style>

<script>
    import Sortable from 'sortablejs'

    export default {
        components: {Sortable},
        props: {
            /*使用控件者必须保证同页面下不重复*/

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
                elTableId: 'el-Table' + this.genID(),
                multipleSelection: [],
                loading: false,
                title: [],
                sortedData: [],
                tableData: [],

            }
        },
        methods: {
            genID(length = 3) {
                return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
            },
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
                //const tbody = document.querySelector('.el-table__body-wrapper tbody')
                let elTable = document.querySelector('#' + this.elTableId)
                const tbody = elTable.querySelector('.el-table__body-wrapper tbody')
                const _this = this
                Sortable.create(tbody, {
                    onEnd({newIndex, oldIndex}) {
                        const currRow = _this.sortedData.splice(oldIndex, 1)[0]
                        _this.sortedData.splice(newIndex, 0, currRow)

                    }
                })
            },
            load() {
                this.tableData.splice(0, this.tableData.length);
                let params = _.cloneDeep(this.page.query)
                params['_openLoading'] = false;

                this.page.getData(params).then(rsp => {
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
            },
            show(){
                this.init()
                this.load()
            }
        },

        mounted() {
            this.$on("init", this.init)
            //this.init()
            //this.$message("load sort table")
        }

    }
</script>
