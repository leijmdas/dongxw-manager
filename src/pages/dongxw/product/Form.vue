<template>
    <div>
        <el-form :model="entity" :rules="rules" ref="form" label-width="100px" class="dialog-form">
            <el-tabs :stretch="false" v-model="activeName">
                <el-tab-pane style="margin-right: 10px" label="产品信息" name="productInfo">

                    <el-row :span="24" style="margin-top: 10px">
                        <el-col :span="12">
                            <el-form-item label="客户" style="width:100%" prop="customerId"
                                          :rules="[{ required: true}]">
                                <customer-select style="width:100%" v-model="entity.customerId"
                                                 :clearable="true"></customer-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="产品名称" prop="name">
                                <el-input disabled placeholder="产品名称" v-model="entity.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :span="24" style="margin-top: 10px">
                        <el-col :span="12">
                            <el-form-item label="产品大类" prop="parentId" :rules="[{ required: true}]">
                                <product-type-select style="width:100%" v-model="entity.parentId" :clearable="true">

                                </product-type-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="产品小类" prop="productTypeId" :rules="[{ required: true}]">
                                <product-sub-type-select style="width:100%" :parentTypeId="entity.parentId"
                                                         v-model="entity.productTypeId"
                                                         :clearable="true"></product-sub-type-select>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row :span="24" style="margin-top: 10px">
                        <el-col :span="12">

                            <el-form-item label="EP款号" prop="epCode">
                                <el-input placeholder="EP款号" v-model="entity.epCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">

                            <el-form-item label="客款号" prop="code">
                                <el-input placeholder="客款号" v-model="entity.code"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-form-item label="产品描述" prop="remark">
                        <el-input placeholder="产品描述" v-model="entity.remark"></el-input>
                    </el-form-item>
                    <el-row :span="24" style="margin-top: 5px">
                        <el-col :span="12">
                            <el-form-item label="颜色" prop="color">
                                <el-input placeholder="颜色" v-model="entity.color"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="尺寸" prop="size">
                                <el-input placeholder="尺寸" v-model="entity.size"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :span="24" style="margin-top: 5px">
                        <el-col :span="12">
                            <el-form-item label="单位" prop="unit">
                                <el-input placeholder="单位" v-model="entity.unit"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">

                            <el-form-item label="状态" prop="moneyType">
                                <el-select style="width:100%" v-model="entity.status" :disabled="isDisabled">
                                    <el-option v-for="item in $dongxwDict.store.STATUS" :key="item[0]"
                                               :value="item[0]" :label="item[1]"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :span="24" style="margin-top: 10px">
                        <el-col :span="12">
                            <el-form-item label="条码" prop="barCode">
                                <el-input placeholder="条码" v-model="entity.barCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="UPC-A" prop="upcA">
                                <el-input placeholder="UPC-A" v-model="entity.upcA"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="产品图片" prop="">

                        <div :span="12">
                            <v-image-uploader :isShow="isShow" :form-data="{}" v-model="entity.picUrl"
                                              :imgStyle="'margin-right:10px;width:160px;height:160px'"/>

                        </div>
                    </el-form-item>
                    <el-form-item label="备注" prop="memo">
                        <el-input placeholder="备注" type="textarea" :rows="2"
                                  v-model="entity.memo"></el-input>
                    </el-form-item>
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

                </el-tab-pane>
                <el-tab-pane label="包装信息" name="packageInfo">

                    <el-row :span="24" class="clsCommon">
                        <el-col :span="11">
                            <el-row :span="12">
                                <el-form-item label="内盒尺寸" prop="ibSize">
                                    <el-input placeholder="内盒尺寸" v-model="entity.ibSize"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row :span="12">
                                <el-form-item label="内盒数量" prop="ibQty">
                                    <el-input placeholder="内盒数量" v-model="entity.ibQty"></el-input>
                                </el-form-item>
                            </el-row>
                            <el-row :span="12">
                                <el-form-item label="内盒毛重(kg)" prop="ibGw">
                                    <el-input placeholder="内盒毛重(kg)" v-model="entity.ibGw"></el-input>
                                </el-form-item>

                                <el-form-item label="内盒净重(kg)" prop="ibNw">
                                    <el-input placeholder="内盒净重(kg)" v-model="entity.ibNw"></el-input>
                                </el-form-item>
                            </el-row>
                        </el-col>
                        <el-col :span="12" style="margin-left: 20px">
                            <span>内箱箱唛</span>
                            <el-input type="textarea" :rows="5" placeholder="内箱箱唛"
                                      v-model="entity.pkgSideImgRemark"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :span="24" class="clsCommon">
                        <el-col :span="11">
                            <el-row>
                                <el-form-item label="外箱尺寸" prop="obSize">
                                    <el-input placeholder="外箱尺寸(x*y*z)" v-model="entity.obSize"></el-input>
                                </el-form-item>
                                <el-form-item label="CBM" prop="cbm">
                                    <el-input disabled placeholder="CBM" v-model="cbm"></el-input>
                                </el-form-item>
                                <el-form-item label="外箱数量" prop="obQty">
                                    <el-input placeholder="外箱数量" v-model="entity.obQty"></el-input>
                                </el-form-item>

                                <el-form-item label="外箱毛重(kg)" prop="obGw">
                                    <el-input placeholder="外箱毛重(kg)" v-model="entity.obGw"></el-input>
                                </el-form-item>

                                <el-form-item label="外箱净重(kg)" prop="obNw">
                                    <el-input placeholder="外箱净重(kg)" v-model="entity.obNw"></el-input>
                                </el-form-item>

                            </el-row>
                        </el-col>
                        <el-col :span="12" style="margin-left: 20px">
                            <span>外箱箱唛</span>

                            <v-image-preview-pkg ref="imgViewPkgOut" v-model="entity.pkgFrontImgRemark"
                                                 :imgRemarks="entity.pkgFrontImgRemark" :showRemark="false"
                                                 :options="options" :showRemoveBtn="true"
                                                 :funHandleChange="funHandleChange"
                                                 :imgStyle="'width:130px;height:120px'">
                            </v-image-preview-pkg>
                        </el-col>
                    </el-row>

                    <el-row :span="24" class="clsCommon">

                        <el-col :span="12">
                            <el-form-item label="正唛" prop="pkgFront">
                                <el-input type="textarea" :rows="6" placeholder="正唛"
                                          v-model="entity.pkgFront"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <v-image-preview-pkg ref="imgViewPkgFront" v-model="entity.pkgFrontImgUrls"
                                                 :imgRemarks="entity.pkgFrontImgRemark" :showRemark="false"
                                                 :options="options" :showRemoveBtn="true"
                                                 :funHandleChange="funHandleChange"
                                                 :imgStyle="'width:130px;height:120px'">
                            </v-image-preview-pkg>
                        </el-col>
                    </el-row>
                    <el-row :span="24" class="clsCommon">
                        <el-col :span="12">
                            <el-form-item label="侧唛" prop="pkgSide">
                                <el-input type="textarea" :rows="6" placeholder="侧唛"
                                          v-model="entity.pkgSide"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="12">

                            <v-image-preview-pkg ref="imgViewPkgSide" v-model="entity.pkgSideImgUrls"
                                                 :imgRemarks="entity.pkgSideImgRemark" :showRemark="false"
                                                 :options="options" :showRemoveBtn="true"
                                                 :funHandleChange="funHandleChange"
                                                 :imgStyle="'width:130px;height:120px'">
                            </v-image-preview-pkg>
                        </el-col>
                    </el-row>


                    <el-row :span="24" class="clsCommon">
                        <el-form-item label="备注" prop="pkgRemark">
                            <el-input placeholder="备注" type="textarea" :rows="3"
                                      v-model="entity.pkgRemark"></el-input>
                        </el-form-item>
                    </el-row>
                    <!--</fieldset>-->
                </el-tab-pane>
                <el-tab-pane label="产品图片" name="prdImage">
                    <v-image-preview ref="imagePreview" v-model="entity.imgUrls" :imgRemarks="entity.imgRemark"
                                     :options="options" :showRemoveBtn="true" :funHandleChange="funHandleChange"
                                     :imgStyle="'margin-right:10px;width:140px;height:120px'">
                    </v-image-preview>
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

    .clsCommon {
        margin-top: 10px;
        margin-left: -15px;
        margin-right: 15px;
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

    import ProductTypeSelect from '@/components/widgets/dongxw/ProductTypeSelect.vue';
    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';
    import ProductSubTypeSelect from '@/components/widgets/dongxw/ProductSubTypeSelect.vue';

    const defaultEntity = {

        id: null,
        epCode: null,
        code: null,
        status: 1,
        remark: '',
        color: '',
        size: '',
        barCode: '',
        picUrl: null,
        imgUrls: null,
        upcA: '',
        memo: '',
        unit: '',
        createBy: 0,
        productTypeId: null,
        parentId: null,
        createBy: null,
        createDate: null,
        ibQty: 0,
        ibGw: 0,
        ibNw: 0,
        ibSize: '',
        obQty: 0,
        obGw: 0,
        obNw: 0,
        obSize: '',
        pkgFront: '',
        pkgSide: '',
        pkgRemark: '',
        imgRemark: null
    };


    export default {
        components: {CustomerSelect, ProductTypeSelect, ProductSubTypeSelect},
        data() {
            return {

                options: [
                    {label: '产品正面', value: '1'},
                    {label: '产品背面', value: '2'},
                    {label: '内部结构', value: '3'},
                    {label: 'logo', value: '4'},
                    {label: '拉链以及拉头', value: '5'},
                    {label: '内唛', value: '6'},
                    {label: '', value: '0'},
                ],
                isShow: true,
                multiple: true,
                isExp: false,
                activeName: 'productInfo',

                ruleTpl: {when: null, then: null},
                entity: _.cloneDeep(defaultEntity),
                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {
                    epCode: [
                        {required: true, message: "编号不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 32,
                            message: "长度在 1 到 32 个字符",
                            trigger: "blur"
                        }
                    ],
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
                    // obQty: [
                    //     {
                    //         type: "number",
                    //         required: true,
                    //         message: "外箱数量请输入数字",
                    //         trigger: "change"
                    //     }
                    // ],
                    // obGw: [
                    //     {
                    //         type: "number",
                    //         required: true,
                    //         message: "外箱毛重(kg)请输入数字",
                    //         trigger: "change"
                    //     }
                    // ],
                    // obNw: [
                    //     {
                    //         type: "number",
                    //         required: true,
                    //         message: "外箱净重(kg)请输入数字",
                    //         trigger: "change"
                    //     }
                    // ],
                    // ibQty: [
                    //     {
                    //         type: "number",
                    //         required: true,
                    //         message: "内盒数量请输入数字",
                    //         trigger: "change"
                    //     }
                    // ],
                    // ibGw: [
                    //     {
                    //         type: "number",
                    //         required: true,
                    //         message: "内盒毛重(kg)请输入数字",
                    //         trigger: "change"
                    //     }
                    // ], ibNw: [
                    //     {
                    //         type: "number",
                    //         required: true,
                    //         message: "内箱净重(kg)请输入数字",
                    //         trigger: "change"
                    //     }
                    // ],
                }
            };
        },
        computed: {
            cbm: {
                get() {
                    let v = this.entity.obSize.split('*')

                    if (v.length === 3) {
                        var multi = function (a, b) {
                            return parseInt(a) * parseInt(b);
                        }
                        return (v.reduce(multi, 1) / 1000000).toFixed(4)
                    }
                    return 0;
                }
            }
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

                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.entity.code = this.entity.code.Trim();
                        this.entity.epCode = this.entity.epCode.Trim();
                        let params = Object.assign({}, this.entity);

                        this.$api.dongxw.ProductService.save(params).then(rsp => {
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
                    //console.log(JSON.stringify(this.entity));

                    this.$api.dongxw.ProductService.findById(options.id).then(r => {
                        //console.log(JSON.stringify(r))
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
