<template>

    <el-container>
        <el-aside id="aside" :style="collapse?'width:20%':'width:50%'" :collapse="collapse">
            <manage-panel ref="managePanel"></manage-panel>
        </el-aside>

        <el-main id="mainContainer" v-loading="loading" element-loading-text="loading ...">
        </el-main>
    </el-container>


</template>
<script>

    import ManagePanel from './Manage';

    export default {
        components: {ManagePanel},
        data() {
            return {
                collapse: false
            }
        }
    }
</script>
