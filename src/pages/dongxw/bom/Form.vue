<template>
    <div>
        <el-form :model="entity" :rules="rules" ref="form" label-width="100px" class="dialog-form">
            <el-tabs :stretch="isExp" v-model="activeName">
                <el-tab-pane label="物料用量" name="productInfo">
                    <rm-view v-model="entity.childId"></rm-view>
                    <el-collapse>

                        <el-collapse-item title="选择物料" style="margin-left:4%;width:96%">
                            <rm-search v-model="entity.childId" ref="productSelectDlg" :style="'margin-bottom: -20px'"
                                       :customerId="entity.customerId" :clearable="true">
                            </rm-search>
                        </el-collapse-item>
                    </el-collapse>
                    <el-row>
                            <el-table-column prop="knifeQty" label="刀数" width="100"></el-table-column>

                            <el-row :span="24" style="margin-top: 10px">

                                <el-col :span="9">
                                    <el-form-item label="尺寸(长）" prop="sizeL">
                                        <el-input placeholder="尺寸(长）" v-model="entity.sizeL"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="X" prop="sizeX">
                                        <el-input placeholder="X" v-model="entity.sizeX"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="9">
                                    <el-form-item label="尺寸(长）" prop="sizeW">
                                        <el-input placeholder="尺寸(宽）" v-model="entity.sizeW"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :span="24" style="margin-top: 10px">
                                <el-col :span="12">
                                    <el-form-item label="宽封度" prop="width">
                                        <el-input placeholder="宽封度" v-model="entity.width"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="长封度" prop="length">
                                        <el-input placeholder="长封度" v-model="entity.length"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="刀数" prop="knifeQty">
                                        <el-input placeholder="刀数" v-model="entity.knifeQty"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="单价" prop="price">
                                        <el-input placeholder="单价" v-model="entity.price"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="数量" prop="qty">
                                        <el-input placeholder="数量" v-model="entity.qty"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="金额" prop="money">
                                        <el-input disabled placeholder="金额" v-model="money"></el-input>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <!--<fieldset>-->
                                <!--<legend>损耗合计</legend>-->

                                <el-row :span="24">

                                    <el-col :span="12" >

                                        <el-form-item  label="损耗类型" prop="lossType">

                                            <el-select  style="width:100%" v-model="entity.lossType"  >
                                                <el-option v-for="item in $dongxwDict.store.LOSS_TYPE" :key="item[0]"
                                                           :value="item[0]" :label="item[1]"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12" >

                                        <el-form-item  :label="entity.lossType==0?'损耗数':'损耗率(%)'" prop="lossQty">
                                            <el-input placeholder="损耗" v-model="entity.lossQty"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row :span="24">
                                    <el-col :span="12">
                                        <el-form-item label="总数量" prop="totalQty">
                                            <el-input disabled placeholder="总数量" v-model="totalQty"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="总金额" prop="totalMoney">
                                            <el-input disabled placeholder="总金额" v-model="totalMoney"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            <el-row :span="24" style="margin-top: 10px">
                                <el-col :span="12">

                                    <el-form-item label="建档时间" prop="createDate">
                                        <el-input placeholder="建档时间" disabled v-model="entity.createDate"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="建档人" prop="createByName">
                                        <el-input placeholder="建档人" disabled v-model="entity.createByName"></el-input>

                                    </el-form-item>
                                </el-col>
                            </el-row>
                    </el-row>
                </el-tab-pane>


            </el-tabs>
        </el-form>

    </div>
</template>
<style lang="less" scoped>
    .productLogo .el-upload-dragger {
        img {
            width: 200px;
            height: 100px !important;
        }
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

    import RmSearch from '@/components/widgets/dongxw/RmSearch.vue';
    import RmView from '@/components/widgets/dongxw/RmView.vue';
    import RmTypeSelect from '@/components/widgets/dongxw/RmTypeSelect.vue';
    import SubTypeSelect from '@/components/widgets/dongxw/RmSubTypeSelect.vue';

    const defaultEntity = {
        depth : 1,
        source : 1,
        lossType :1,
        lossQty : 0,
        customerId: 0,
        id: null,
        qty: 0,
        price: 0,
        money: 0,
        parentId: 0,
        productId: null,

        sizeL:0,
        sizeW:0,
        sizeX:'',
        length: 0,
        width : 0,
        knifeQty:0,
        code: null,
        status: 1,
        remark: '',
        color: '',
        size: '',
        unit: '',
        createBy: 0,
        productTypeId: null,
        createBy: null,
    };


    export default {
        components: {RmSearch, RmView, RmTypeSelect, SubTypeSelect},
        props: {

            productId: {
                type: Number,
                required: true
            },

        },
        data() {
            return {
                //switchLossRate:true,
                options: [

                    {label: '', value: '0'},
                ],
                isShow: true,
                multiple: true,
                isExp: false,
                activeName: 'productInfo',

                entity: _.cloneDeep(defaultEntity),
                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {

                    code: [
                        {required: true, message: "编号不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 32,
                            message: "长度在 1 到 32 个字符",
                            trigger: "blur"
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
                }
            };
        },
        computed: {
            money: function () {
                this.entity.money = Math.round(100 * this.entity.qty * this.entity.price) / 100
                return this.entity.money
            },

            totalMoney: function () {
                let money = Math.round(100 * parseFloat(this.totalQty) * this.entity.price)  / 100
                return  money

            },

            totalQty: function () {
                let type = parseInt(this.entity.lossType)
                if (type == 1) {
                    return (100 + parseFloat(this.entity.lossQty)) * this.entity.qty / 100
                } else {

                    return parseFloat(this.entity.qty)+ parseInt(this.entity.lossQty)
                }
            },
        },
        watch: {

        },
        methods: {

            clearImg() {
                this.entity.picUrl = null;
            },

            funHandleChange(imgRemarkArray) {
                this.entity.imgRemark = imgRemarkArray.join(",")
            },

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
                if (!this.entity.childId) {
                    this.$message("请选择物料!")
                    return
                }
                this.$refs["form"].validate(valid => {
                    if (valid) {

                        let params = Object.assign({}, this.entity)
                        if(!params.id)
                        {
                            params.productId = this.productId
                        }
                        this.$api.dongxw.BomService.save(params).then(rsp => {
                            this.$emit("saved", rsp);
                        });
                    }
                });
            },
            resetForm() {
                this.entity = _.cloneDeep(defaultEntity);
                if (!this.entity.id) {

                    this.entity.createDate = this.$dongxwDict.formatDateZero(new Date())
                }
            },
            init(options) {
                this.resetForm();
                if (options.id) {

                    this.$api.dongxw.BomService.findById(options.id).then(r => {
                        this.entity = r.data;

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
