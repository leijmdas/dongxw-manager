<template>
    <div>
        <el-form :model="entity" :rules="rules" ref="form"
                 @keyup.enter.stop.native=" nextFocus('') " label-width="90px" class="dialog-form">
            }

            <!--<rm-view v-model="entity.childId"></rm-view>-->
                    <!--<el-collapse>-->

                        <!--<el-collapse-item title="选择物料" style="margin-left:4%;width:96%">-->
                            <!--<rm-search v-model="entity.childId" ref="productSelectDlg" :style="'margin-bottom: -20px'"-->
                                       <!--:customerId="entity.customerId" :clearable="true">-->
                            <!--</rm-search>-->
                        <!--</el-collapse-item>-->
                    <!--</el-collapse>-->
                    <el-row>

                            <el-row :span="24" style="margin-top: 5px">
                                <el-col :span="12">
                                    <el-form-item label="裁片名称" prop="cutPartName">
                                        <el-input @keyup.enter.stop.native=" nextFocus('i1') " placeholder="裁片名称" ref="i1" v-model="entity.cutPartName"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="尺寸(长）" prop="sizeL">
                                        <el-input @keyup.enter.stop.native=" nextFocus('i2') "  ref="i2" placeholder="尺寸(长）"   v-model="entity.sizeL"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col  :span="8">
                                    <el-form-item v-if="productType.code!='20'" label="刀数" prop="knifeQty">
                                        <el-input  placeholder="刀数" v-model="entity.knifeQty"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item  v-if="productType.code!='20'" label="X" prop="sizeX">
                                        <el-input placeholder="" v-model="entity.sizeX"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item @keyup.enter.stop.native=" nextFocus('i3') "  ref="i3"  v-if="productType.code!='20'"  label="尺寸(宽）" prop="sizeW">
                                        <el-input placeholder="尺寸(宽）"
                                                  v-model="entity.sizeW"></el-input>
                                    </el-form-item>
                                </el-col>

                                <!--sizeL/length*-->
                                <el-col :span="12">
                                    <el-form-item label="长封度" prop="length">
                                        <el-input @keyup.enter.stop.native=" nextFocus('i4') "  ref="i4"  placeholder="长封度" v-model="entity.length"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  v-if="productType.code!='20'"  label="宽封度" prop="width">
                                        <el-input @keyup.enter.stop.native=" nextFocus('i5') "  ref="i5"  placeholder="宽封度" v-model="entity.width"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="件数" prop="pieces">
                                        <el-input @keyup.enter.stop.native=" nextFocus('i6') "  ref="i6"  placeholder="件数" v-model="entity.pieces"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!--<el-col :span="8">-->
                                    <!--<el-switch style="margin-left: 90px;margin-top: 5px" v-model="entity.source"-->
                                               <!--active-color="#13ce66" inactive-color="#ff4949"-->
                                               <!--active-text="有组件" inactive-text="无组件"-->
                                               <!--:active-value=1 :inactive-value=0>-->
                                    <!--</el-switch>-->
                                <!--</el-col>-->

                                <el-col :span="12">
                                    <el-form-item label="每个用量" prop="eachQty">
                                        <el-input :disabled="true||entity.source===1" placeholder="每个用量" v-model="autoEachQty"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" >

                                    <el-form-item :label="entity.lossType==0?'损耗数':'损耗(%)'" prop="lossRate">
                                        <!--<el-input    placeholder="损耗" v-model="entity.lossRate"></el-input>-->
                                        <el-input @keyup.enter.stop.native=" nextFocus('i7') "  ref="i7"  :disabled="entity.source===1"  placeholder="损耗" v-model="entity.lossRate"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  label="用量" prop="totalQty">
                                        <el-input disabled placeholder="用量" v-model="totalQty"></el-input>
                                    </el-form-item>
                                </el-col>
                                <!--<el-col :span="8">-->
                                    <!--<el-form-item label="单价" prop="price">-->
                                        <!--<el-input placeholder="单价" v-model="entity.price"></el-input>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->

                                <!--<el-col :span="8">-->
                                    <!--<el-form-item label="金额" prop="totalMoney">-->
                                        <!--<el-input disabled placeholder="金额" v-model="totalMoney"></el-input>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->
                            </el-row>
                            <!--<el-col :span="12" >-->
                                <!--<el-form-item  label="损耗类型" prop="lossType">-->
                                    <!--<el-select  style="width:100%" v-model="entity.lossType"  >-->
                                        <!--<el-option v-for="item in $dongxwDict.store.LOSS_TYPE" :key="item[0]"-->
                                                   <!--:value="item[0]" :label="item[1]"></el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                            <!--</el-col> -->
                        <el-row :span="24" style="margin-top: 5px">

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
    .el-input.is-disabled /deep/ .el-input__inner {
        color: darkmagenta;
        background-color: ghostwhite; /*#d0e9c6 rgba(255, 255, 255, 0.8);*/
    }

</style>

<script>

    import RmSearch from '@/components/widgets/dongxw/RmSearch.vue';
    import RmView from '@/components/widgets/dongxw/RmView.vue';
    import RmTypeSelect from '@/components/widgets/dongxw/RmTypeSelect.vue';
    import SubTypeSelect from '@/components/widgets/dongxw/RmSubTypeSelect.vue';

    const defaultEntity = {
        customerId: 0,
        bigType : 0,
        smallType : 0,
        id: null,
        depth: 1,
        source: 0,
        lossType: 1,
        lossRate: 0,
        lossQty: 0,
        eachQty: 0,
        qty: 0,

        price: 0,
        money: 0,
        parentId: 0,
        productId: null,
        cutPartName: '',

        sizeL: '0',
        sizeW: '0',
        sizeX: '',
        width: 0,
        length: 0,
        pieces: 1,
        knifeQty: 0,
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
            parentRm : {
                type: Object,
            },

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
            autoEachQty: function () {
                let qty = 0
                if (this.productType.code == '20' && this.entity.length > 0) {
                    qty = parseFloat(this.entity.sizeL) / parseFloat(this.entity.length)
                }
                else if ((this.productType.code == '10' || this.productType.code == '11')
                     && (this.entity.length +this.entity.width > 0) ) {
                    qty = parseFloat(this.entity.sizeL) * this.entity.sizeW / this.entity.width
                        / parseFloat(this.entity.length)
                } else {

                }
                this.entity.eachQty = qty
                return qty
            },
            totalQty: function () {
                let qty = (parseFloat(this.entity.lossRate) + 100) / 100 * parseFloat(this.entity.eachQty)
                    * parseFloat(this.entity.pieces)
                return parseFloat(qty).toFixed(4)
            },

            totalMoney: function () {
                let totalMoney = (this.totalQty * this.entity.price).toFixed(4)
                return totalMoney
            },

            productType: function () {
                return this.parentRm.childRm.productType
            }
        },
        methods: {
            nextFocus(p) {
                if (p === 'i1') {
                    this.$refs.i2.$el.querySelector('input').focus()
                }
                if (p === 'i2') {
                    this.$refs.i3.$el.querySelector('input').focus()
                }
                if (p === 'i3') {
                    this.$refs.i4.$el.querySelector('input').focus()
                }
                if (p === 'i4') {
                    this.$refs.i5.$el.querySelector('input').focus()
                }
                if (p === 'i5') {
                    this.$refs.i6.$el.querySelector('input').focus()
                }
                if (p === 'i6') {
                    this.$refs.i7.$el.querySelector('input').focus()
                }
                if (p === 'i7') {
                    this.$refs.i1.$el.querySelector('input').focus()
                }
            },
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
                    this.entity.childId=0//this.$message("请选择物料!")                    return
                }
                this.$refs["form"].validate(valid => {
                    if (valid) {

                        let params = Object.assign({}, this.entity)
                        if(!params.id)
                        {
                            params.parentId = this.parentRm.id
                            params.productId = this.parentRm.productId
                        }
                        this.$api.dongxw.BomService.save(params).then(rsp => {
                            this.$emit("saved", rsp);
                        });
                    }
                });
            },
            resetForm() {
                this.entity = _.cloneDeep(defaultEntity)
                this.entity.parentId = this.parentRm.id
                this.entity.productId = this.parentRm.productId

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

                //this.$refs.form.blur();
            }
        },
        mounted() {
            this.$on("init", this.init);
            this.$on("submit", this.submitForm);
            //this.addEnterListener();
        },

        destroy() {
            //this.removeEnterListener();
        },
    };
</script>
