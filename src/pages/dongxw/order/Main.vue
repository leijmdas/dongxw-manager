<template>

    <el-tabs  :stretch="isExp" type="border-card" tab-position="top" v-model="activeName">
        <el-tab-pane label="订单管理" name="orderInfo">
            <order-form ref="orderDlg"></order-form>
        </el-tab-pane>
        <el-tab-pane label="订单产品管理" name="orderLine">

        </el-tab-pane>

    </el-tabs>
</template>


<script>
    import OrderForm from './Manage';

    export default {
        components: {OrderForm},
        data() {
            return {
                activeName: 'orderInfo',
                isExp : false,
            }
        },
        computed: {},

        methods: {},
        mounted() {
            this.$refs.orderDlg.init();
        }
    }
</script>
