<template>
<div>
    <!--<el-tabs :stretch="isExp" tab-position="top" v-model="activeName" @tab-click="tabClick"-->
             <!--@tab-remove="removeTab">-->
        <!--<el-tab-pane id="tabOrder" label="订单管理" name="orderInfo">-->
    <order-form ref="orderDlg" :funShowPic="funShowPic" :fatherMethod="funShowOrderLine"></order-form>
        <!--</el-tab-pane>-->
        <!--<el-tab-pane id="tabLine" label="订单产品" name="orderLine">-->
            <!--<order-line ref="orderLine"></order-line>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane id="tabPic" label="订单原件" name="tabPic">-->
            <!--<form-view-panel ref="viewPanel"></form-view-panel>-->
        <!--</el-tab-pane>-->
    <!--</el-tabs>-->
    <order-line ref="orderLine"></order-line>
</div>
</template>


<script>
    import OrderForm from './Manage';
    import OrderLine from '../orderline/Manage';
    import FormViewPanel from './FormViewPic';

    export default {
        components: {OrderForm, OrderLine, FormViewPanel},
        data() {
            return {
                activeName: 'orderInfo',
                isExp : false,
                showOrderLine: true,
            }
        },
        computed: {},

        methods: {
            tabClick(tab) {
                //console.log(tab.name);
                if (tab.name === 'orderInfo') {
                }
                if (tab.name === 'orderLine') {
                    if (this.$refs.orderDlg.getRow()) {
                        this.$refs.orderDlg.showLine(this.$refs.orderDlg.getRow());
                    }
                }
                if (tab.name === 'tabPic') {
                    console.log(this.$refs.orderDlg.getRow());
                    if (this.$refs.orderDlg.getRow()) {
                        this.$refs.orderDlg.showPic(this.$refs.orderDlg.getRow());
                    }
                }
            },
            removeTab(name) {
                console.log(name);
                this.$message({
                    message: '恭喜你，这是一条成功消息'+name,
                    type: 'success'
                });
            },
            clickbtn() {
                this.$message({
                    message: '恭喜你，这是一条成功消息',
                    type: 'success'
                });

            },
            // mehods里面定义showTabPane方法
            showTabPane (control, pane) {
                let dom = '';
                this.$nextTick(() => {
                    dom = document.getElementById(pane)
                    if (control == 1) {
                        dom.style.display = 'inline-block';
                    } else {
                        dom.style.display = 'none';
                    }
                })
            },
            funShowOrderLine(row) {

                // this.activeName = 'orderLine';
                this.$refs.orderLine.init(row);

            },
            funShowPic(row) {
                this.$refs.viewPanel.init(row);

            }
        },


        mounted() {
            this.$refs.orderDlg.init();
            // this.orderType = this.$route.params.orderType;
            // if (this.orderType == null) {
            //     this.orderType = localStorage.pageBizType;
            // } else {
            //     localStorage.orderType = this.orderType;
            // }
            // this.$message(this.orderType);
        }
    }
</script>
