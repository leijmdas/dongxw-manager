<template>
    <div>
        <dict-manage ref="dictMng" v-model="table"></dict-manage>

        <el-tabs v-model="activeName" @tab-click="handleTabClick" style="margin-left: 5px">
            <el-tab-pane label="字段信息" name="fieldForm">
                <field-manage :enableView="enableFieldForm" ref="fieldMng" v-model="table"></field-manage>
            </el-tab-pane>
            <el-tab-pane label="元数据检查" name="checkForm">
                <!--<field-manage ref="fieldMng" v-model="table"></field-manage>-->
            </el-tab-pane>
            <el-tab-pane label="元数据记录" name="dataForm">
                <table-data-form :enableView="enableDataForm" :metadataId="table.metadataId"></table-data-form>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<style>

</style>

<script>
    import DictManage from './DictManage'
    import FieldManage from './FieldManage'
    import TableDataForm from './TableDataForm'

    export default {
        components: {TableDataForm,DictManage, FieldManage},
        data(){
            return {
                enableFieldForm : true,
                enableCheckForm : false,
                enableDataForm : false,
                activeName: "fieldForm",
                table :{
                    fields: []
                }
            }
        },
        watch: {
            table: {
                handler: function (newVal, oldVal) {
                    console.log("Manage rev from tableMng: "+this.table.metadataAlias)
                },
                deep: true, //immediate:true ,
            },
        },
        methods: {
            init(options = {}) {
                //this.search();
            },
            handleTabClick(tab, event) {
                // debugger
                this.enableFieldForm = tab.name === "fieldForm"
                this.enableCheckForm = tab.name === "checkForm"
                this.enableDataForm = tab.name === "dataForm"

            }
        },

        created() {
        },
        mounted() {
            this.$on("init", this.init)
            this.$refs.dictMng.init()
        }
    }

</script>
