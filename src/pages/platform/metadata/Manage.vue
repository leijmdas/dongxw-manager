<template>
    <div>

        <dict-manage ref="dictMng" v-model="table"></dict-manage>

        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="字段信息" name="fieldForm">
                <field-manage :enableView="enableFieldForm" ref="fieldMng" v-model="table"></field-manage>
            </el-tab-pane>
            <el-tab-pane label="元数据检查" name="checkForm">
                <check-dict-form :enableView="enableCheckForm" :metadataId="table.metadataId"></check-dict-form>
            </el-tab-pane>
            <el-tab-pane label="元数据记录" name="dataForm">
                <table-data-form :enableView="enableDataForm" :metadataId="table.metadataId"></table-data-form>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<style lang="less" scoped>
    .transfer-footer {
        margin-left: 20px;
        alignment: center;
        padding: 6px 5px;
    }
</style>

<script>
    import DictManage from './DictManage'

    import FieldManage from './FieldManage'
    import TableDataForm from './TableDataForm'
    import CheckDictForm from './CheckDictForm'

    export default {
        components: {  CheckDictForm, TableDataForm, DictManage, FieldManage},
        data() {
            // const generateData = _ => {
            //     const data = [];
            //     for (let i = 1; i <= 15; i++) {
            //         data.push({
            //             key: i,
            //             label: `备选项 ${ i }`,
            //             disabled: false
            //         });
            //     }
            //     return data;
            // };
            return {

                // page:{
                //     getData: this.$api.platform.MetadataFieldService.query,
                //     query:{
                //         orderBys: "fieldOrder|asc",
                //         param: {subsysId: 0, isDeleted: false, metadataId: 320},
                //         dateRanges: {},
                //         limit: 20,
                //         start: 0,
                //         _openLoading: false,
                //     }
                // },
                //data: generateData(),
                //value: [1, 4],
                enableFieldForm: true,
                enableCheckForm: false,
                enableDataForm: false,
                activeName: "fieldForm",
                table: {
                    fields: []
                }
            }
        },
        watch: {
            table: {
                handler: function (newVal, oldVal) {
                },
                deep: true, //immediate:true ,
            },
        },
        methods: {

            init(options = {}) {
            },
            handleTabClick(tab, event) {
                // debugger
                this.enableFieldForm = tab.name === "fieldForm"
                this.enableCheckForm = tab.name === "checkForm"
                this.enableDataForm = tab.name === "dataForm"

            },

        },

        created() {
        },
        mounted() {
            this.$on("init", this.init)
            this.$refs.dictMng.init()
        }
    }

</script>
