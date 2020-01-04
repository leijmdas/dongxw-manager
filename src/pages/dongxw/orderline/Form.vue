<template>
    <el-form :model="entity" :rules="rules" ref="form" label-width="120px" class="dialog-form">
        <el-tabs :stretch="isExp" v-model="activeName" >
            <el-tab-pane label="基本信息" name="orderInfo">

                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="产品大类" prop="parentId">
                            <product-type-select v-model="entity.parentId" :clearable="true"></product-type-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品小类" prop="productTypeId">
                            <product-sub-type-select :parentTypeId="entity.parentId" v-model="entity.productTypeId"
                                                     :clearable="true"></product-sub-type-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="产品标识" prop="productId">
                            <product-select :productTypeId="entity.productTypeId" v-model="entity.productId"
                                            :clearable="true"></product-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="客款号" prop="customerCode">
                            <el-input placeholder="客款号" v-model="entity.customerCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="数量" prop="qty">
                            <el-input placeholder="数量" v-model="entity.qty"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单价" prop="price">
                            <el-input placeholder="单价" v-model="entity.price"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--<el-form-item label="单位" prop="unit">-->
                <!--<el-input placeholder="单位" v-model="entity.unit"></el-input>-->
                <!--</el-form-item>-->
                <el-row :span="24">
                    <el-col :span="12">
                        <el-form-item label="货币" prop="unit">
                            <el-input placeholder="货币" v-model="entity.currency"></el-input>
                        </el-form-item>
                    </el-col>
                    <!--`color` varchar(16) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '配色 ',-->
                    <!--<el-form-item label="金额" prop="unit">-->
                    <!--<el-input placeholder="金额" v-model="entity.money"></el-input>-->
                    <!--</el-form-item>-->
                    <!--`order_id` int(11) NOT NULL DEFAULT '0' COMMENT '订单标识 ',   -->
                    <el-col :span="12">

                        <el-form-item label="供应商" prop="supplierId">
                            <supplier-select v-model="entity.supplierId" :clearable="true"></supplier-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--`pic_url` varchar(128) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '图片 ',-->
                <!--`size` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '0' COMMENT '尺寸 ',-->
                <el-form-item label="备注" style="margin-top: 10px" prop="remark">
                    <el-input placeholder="备注" v-model="entity.remark"></el-input>
                </el-form-item>


            </el-tab-pane>
            <el-tab-pane label="包装信息" name="orderPackageInfo">
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="内盒数量" prop="ibQty">
                            <el-input placeholder="内盒数量" v-model="entity.ibQty"></el-input>
                        </el-form-item>
                        <el-form-item label="内盒毛重(kg)" prop="ibGw">
                            <el-input placeholder="内盒毛重(kg)" v-model="entity.ibGw"></el-input>
                        </el-form-item>

                        <el-form-item label="内盒净重(kg)" prop="ibNw">
                            <el-input placeholder="内盒净重(kg)" v-model="entity.ibNw"></el-input>
                        </el-form-item>
                        <el-form-item label="内盒尺寸" prop="ibSize">
                            <el-input placeholder="内盒尺寸" v-model="entity.ibSize"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row  style="margin-top: 20px">

                    <el-col :span="22">
                        <el-form-item label="外箱数量" prop="obQty">
                            <el-input placeholder="外箱数量" v-model="entity.obQty"></el-input>
                        </el-form-item>
                        <el-form-item label="外箱毛重(kg)" prop="obGw">
                            <el-input placeholder="外箱毛重(kg)" v-model="entity.obGw"></el-input>
                        </el-form-item>

                        <el-form-item label="外箱净重(kg)" prop="obNw">
                            <el-input placeholder="外箱净重(kg)" v-model="entity.obNw"></el-input>
                        </el-form-item>
                        <el-form-item label="外箱尺寸" prop="obSize">
                            <el-input placeholder="外箱尺寸" v-model="entity.obSize"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="主料" name="orderMaterial">
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="主料" prop="material">
                            <el-input placeholder="主料" v-model="entity.materialRemark"></el-input>
                        </el-form-item>
                        <el-form-item label="customerId" prop="customerId">
                            <el-input placeholder="customerId" v-model="customerId" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="orderId" prop="orderId">
                            <el-input placeholder="orderId" v-model="orderId" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-tab-pane>
        </el-tabs>
    </el-form>
</template>
<style lang="less" scoped>
    .orderLine .el-upload-dragger {
        img {
            width: 400px;
            height: 300px;
            // height: 60% !important;
        }
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

    import ProductSubTypeSelect from '@/components/widgets/dongxw/ProductSubTypeSelect.vue';
    import ProductTypeSelect from '@/components/widgets/dongxw/ProductTypeSelect.vue';
    import ProductSelect from '@/components/widgets/dongxw/ProductSelect.vue';
    import SupplierSelect  from '@/components/widgets/dongxw/SupplierSelect.vue';

    const defaultEntity = {
        id: null,
        customerId : null,
        orderId : null,
        productId : null,
        productTypeId : null,
        customerCode : '',
        picUrl : '',
        size: '',
        color : '',
        qty : 0,
        unit : '',
        price : 0,
        currency :'',
        money : 0,
        supplierId :null,
        material :'',
        ibQty : 0,
        ibGw : 0,
        ibNw : 0,
        ibSize : '',
        obQty : 0,
        obGw : 0,
        obNw : 0,
        obSize : '',

        createBy: 0,
        remark : '',
        status: 1
    };
    export default {
        components: {ProductTypeSelect,ProductSubTypeSelect, ProductSelect,SupplierSelect},
        data() {
            return {
                isExp :false,
                customerId : null,
                orderId : null,
                activeName: 'orderInfo',
                ruleTpl: {when: null, then: null},
                entity: _.cloneDeep(defaultEntity),
                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {
                    parentId: [{
                        required: true
                    }],
                    productTypeId: [{
                        required: true
                    }],
                    productId: [{
                        required: true
                    }],

                    supplierId: [{
                        required: true
                    }],
                    name: [
                        {required: true, message: "名称不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 128,
                            message: "长度在 1 到 128 个字符",
                            trigger: "blur"
                        }
                    ],

                    customerOrderCode: [
                        {required: true, message: "客户订单号", trigger: "blur"},
                        {
                            min: 1,
                            max: 128,
                            message: "长度在 1 到 128 个字符",
                            trigger: "blur"
                        }
                    ],
                    startOn: [
                        {
                            required: true,
                            message: "请选择开始时间",
                            trigger: "blur"
                        }
                    ],
                    merchantId: [
                        {
                            type: "number"
                        }
                    ],
                    status: [
                        {
                            type: "number",
                            required: true,
                            message: "请选择状态",
                            trigger: "change"
                        }
                    ],

                    limitDays: [
                        {
                            required: false
                        }
                    ],
                    limitTotalNum: [
                        {
                            required: false
                        }
                    ],
                    isMerchant: [
                        {
                            required: true
                        }
                    ],

                    limitPermanTimes: [
                        {
                            required: true,
                            message: "限次不能为空",
                        }
                    ],
                    visibility: [
                        {
                            required: false,
                        }
                    ],

                    effectRange: [
                        {
                            required: true,
                            message: "请选择活动时间"
                        }
                    ]
                }
            };
        },
        methods: {
            getProps(scope) {
                return this.entity.props.filter(p => p.propScope == scope);
            },
            onRuleDefsLoaded(opts) {
                this.ruleDefs = opts || [];
                this.resetProps();
            },
            onDiscountTypeChange(val) {
                if (val == 3) {
                    //次数只能一次
                    this.entity.discountValue = 1;
                }
            },
            resetProps() {
                let ruleCode = this.entity.ruleTplCode;
                if (!ruleCode) {
                    return;
                }
                if (!this.ruleDefs) {
                    return;
                }
                let opt = this.ruleDefs.filter(tmp => tmp.code == ruleCode)[0];
                if (!opt) return;
                this.ruleTpl = opt;
                let whenFields = opt.when == null ? [] : opt.when.fields;
                let thenFields = opt.then == null ? [] : opt.then.fields;
                let oldProps = this.oldProps || [];

                function field2Props(fields, type) {
                    let rs = [];
                    fields.forEach(f => {
                        let tmpOlds = oldProps.filter(
                            p => p.propKey == f.prop && p.propScope == type
                        );
                        let tmpOld = tmpOlds.length > 0 ? tmpOlds[0] : null;
                        rs.push({
                            propKey: f.prop,
                            propName: f.name,
                            propValue: tmpOld == null ? "" : tmpOld.propValue,
                            remark: f.remark,
                            required: !!f.required,
                            propScope: type
                        });
                    });
                    return rs;
                }

                let whenProps = field2Props(whenFields || [], "when");
                let thenProps = field2Props(thenFields || [], "then");
                this.entity.props = [];
                this.entity.props = this.entity.props.concat(whenProps).concat(thenProps);
            },
            setValues(vals) {
                this.resetEntity = _.cloneDeep(vals);
                this.entity = _.cloneDeep(this.resetEntity);
            },
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if ( !this.entity.customerId ) {
                            this.entity.customerId = this.customerId;
                            this.entity.orderId = this.orderId;
                        }
                        let params = Object.assign({}, this.entity);
                        console.log(JSON.stringify(params));
                        // this.$message({
                        //     message: '恭喜你，这是一条成功消息' +this.customerId,
                        //     type: 'success'
                        // });
                        this.$api.dongxw.OrderLine.save(params).then(rsp => {
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
                this.resetForm();
                if (options.customerId) {
                    this.customerId = options.customerId;
                    this.orderId = options.orderId;
                }
                if (options.id) {
                    this.isDisabled = true;
                    this.$api.dongxw.OrderLine.findById(options.id).then(rr => {
                        let r = rr.data;
                        this.isDisabled = r.status > 0;

                        this.entity = r;

                    });
                } else {
                    this.isDisabled = false;
                }
            }
        },
        mounted() {
            this.$on("init", this.init);
            this.$on("submit", this.submitForm);
        }
    };
</script>
