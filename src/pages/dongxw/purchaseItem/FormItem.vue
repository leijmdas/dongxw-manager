<template>
    <div>
    <el-form :model="entity" label-width="90px" :rules="rules"
             style="margin-right: 10px" ref="form" class="dialog-form">

        <rm-view v-model="entity.productId" ref="productView"  :style="'margin-top: 5px'" >

        </rm-view>
        <el-collapse>

            <el-collapse-item ref="productSelectDlg" title="选择物料" style="margin-left:4%;width:96%">
                <rm-search v-model="entity.productId"
                                :customerId="entity.customerId" :clearable="true"
                                :style="'margin-bottom: -20px'"  >
                </rm-search>
            </el-collapse-item>
        </el-collapse>
        <el-row>

            <el-col :span="8">
                <el-form-item label="数量" style="width:100%" prop="qty">
                    <el-input placeholder="数量" v-model="entity.qty"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="单价" style="width:100%" prop="price">
                    <el-input placeholder="单价" v-model="entity.price"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">

                <el-form-item label="金额" prop="money">
                    <el-input placeholder="金额" v-model="money" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="备注" style="margin-top: 10px" prop="remark">
                    <el-input placeholder="备注" type="textarea" :rows="2" v-model="entity.remark"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">

            <el-form-item label="建档时间" prop="createDate">
                    <el-input disabled placeholder="建档时间" v-model="entity.createDate" disabled></el-input>

                </el-form-item>
            </el-col>
            <el-col :span="12">

                <el-form-item label="建档人" prop="createByName">
                    <el-input disabled placeholder="建档人" v-model="entity.createByName" disabled></el-input>

                </el-form-item>
            </el-col>
        </el-row>


    </el-form>


    </div>
</template>
<style lang="less" scoped>
    .orderLine .el-upload-dragger {
        img {
            width: 400px;
            height: 300px;
        }
    }
    .el-form-item{
        margin-top: 10px;
    }
    .input-class{
        width: 500px;
        height: 40px;
    }
    .dialog-form {
        .el-radio-group {
            .el-radio {
                display: flex;
                align-items: center;
            }

            label {
                height: 40px;
            }
            .group-text {
                display: inline-block;
                width: 100px;
            }
            .title-text {
                display: inline-block;
                width: 120px;
            }
        }

    }
</style>

<script>

    import RmView from '@/components/widgets/dongxw/RmView.vue';
    import RmSearch from '@/components/widgets/dongxw/RmSearch.vue';

    const defaultEntity = {
        id: null,
        orderId : null,
        makePlanId:0 ,
        orderLineId:0,
        purchaseOrderId:null,
        productId : null,
        purchaseOrderId: null,

        qty : 0,
        price : 0,
        money : 0,
        createDate : null,
        createBy: 0,
        remark : '',
    };
    export default {
        components: {RmView, RmSearch},
        data() {
            return {
                isExp :false,
                customerId : null,
                orderId : null,
                purchaseOrderId : null,
                activeName: 'orderInfo',
                ruleTpl: {when: null, then: null},
                entity: _.cloneDeep(defaultEntity),

                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {

                }
            };
        },
        computed: {
            money: function () {
                this.entity.money = Math.round(100*this.entity.qty * this.entity.price)/100
                return this.entity.money
            }

        },



        methods: {

            getProps(scope) {
                return this.entity.props.filter(p => p.propScope == scope);
            },
            onRuleDefsLoaded(opts) {
                this.ruleDefs = opts || [];
                this.resetProps();
            },

            resetProps() {
            },
            setValues(vals) {
                this.resetEntity = _.cloneDeep(vals);
                this.entity = _.cloneDeep(this.resetEntity);
            },
            submitForm() {
                if(!this.entity.productId){
                    this.$message("请选择物料!")
                    return
                }
                this.$refs["form"].validate(valid => {
                    if (valid) {

                        this.$api.dongxw.PurchaseOrderItemService.save(this.entity).then(rsp => {
                            this.$emit("saved", rsp);

                        });
                    }
                });
            },
            resetForm() {
                this.$refs["form"].resetFields();
                this.entity = _.cloneDeep(defaultEntity);
            },
            init(options) {
                //console.log(JSON.stringify(options))
                this.resetForm();
                if (options.orderId) {
                    this.orderId = options.orderId
                    this.purchaseOrderId = options.purchaseOrderId
                    this.entity.purchaseOrderId = this.purchaseOrderId
                    this.entity.orderId = this.orderId
                    this.entity.createDate = this.$dongxwDict.formatDateZero(new Date())

                    //this.$message(JSON.stringify(this.entity))
                }
                if (options.id) {
                    this.isDisabled = true;
                    this.$api.dongxw.PurchaseOrderItemService.findById(options.id).then(rr => {
                        let r = rr.data;
                        this.isDisabled = r.status > 0;
                        this.entity = r;
                    });
                }
                if (options.order) {

                    this.order = options.order;
                    this.entity.orderId = this.order.id
                    this.entity.customerId = this.order.customerId
                    this.entity.product = {
                        customerId: this.order.customerId,
                        productTypeId: null,
                        parentId : null ,
                        id : null ,
                    }
                }


            }
        },
        mounted() {
            this.$on("init", this.init);
            this.$on("submit", this.submitForm);
        }
    };
</script>
