<template>

    <el-tabs :stretch="isExp" type="border-card" tab-position="top" v-model="activeName" @tab-click="tabClick"
             @tab-remove="removeTab">
        <el-tab-pane id="tabOrder" style="margin-right: 20px" label="订单管理" name="orderInfo">
            <order-form ref="orderDlg" :fatherMethod="funShowOrderLine"></order-form>
        </el-tab-pane>
        <el-tab-pane id="tabLine" label="订单产品管理" name="orderLine" closable>
            <order-line ref="orderLine"></order-line>
        </el-tab-pane>

    </el-tabs>
</template>


<script>
    import OrderForm from './Manage';
    import OrderLine from '../orderline/Manage';

    export default {
        components: {OrderForm, OrderLine},
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
                //this.showOrderLine = !this.showOrderLine;
                if (tab.name  === 'orderInfo') {
                    //this.showOrderLine = false;

                }
                this.showTabPane(this.showOrderLine ? 1 : 0, 'tabLine');
                // this.$message({
                //     message: '恭喜你，这是一条成功消息'+tab.name,
                //     type: 'success'
                // });
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
                // this.$alert('这是一段内容', '标题名称', {
                //     confirmButtonText: '确定',
                //     callback: action => {
                //         this.$message({
                //             type: 'info',
                //             message: `action: ${ action }`
                //         });
                //     }
                // });
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
            funShowOrderLine( row ) {
                // this.$message({
                //     message: '恭喜你，这是一条成功消息',
                //     type: 'success'
                // });
                this.showOrderLine = true;
                console.log(this.showOrderLine);

                this.showTabPane(this.showOrderLine ? 1 : 0, 'tabLine');
                this.activeName = 'orderLine';
                this.$refs.orderLine.init(row);

            }
        },
        mounted() {
            this.$refs.orderDlg.init();

        }
    }
</script>
