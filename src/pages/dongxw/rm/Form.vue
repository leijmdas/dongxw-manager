<template>
    <div>
        <el-form :model="entity" :rules="rules" ref="form" label-width="120px" class="dialog-form">
            <el-tabs :stretch="isExp" v-model="activeName">
                <el-tab-pane label="物料信息" name="productInfo">
                    <el-row>
                        <el-col :span="23">

                            <el-row :span="24" style="margin-top: 10px">
                                <el-col :span="12">
                                    <el-form-item label="大类" prop="parentId" :rules="[{ required: true}]">
                                        <rm-type-select  style="width:100%"
                                                          v-model="entity.parentId"
                                                          :clearable="true">

                                        </rm-type-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="小类" prop="productTypeId" :rules="[{ required: true}]">
                                        <sub-type-select  style="width:100%" :parentTypeId="entity.parentId"
                                                                 v-model="entity.productTypeId"
                                                                 :clearable="true">

                                        </sub-type-select>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row :span="24" style="margin-top: 10px">
                                <el-col :span="12">
                                    <el-form-item label="物料代码" prop="code">
                                        <el-input placeholder="物料代码" v-model="entity.code"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="物料名称" prop="name">
                                        <el-input placeholder="物料名称" v-model="entity.name"></el-input>
                                    </el-form-item>
                                </el-col>


                            </el-row>
                            <el-form-item label="规格型号" prop="remark">
                                <el-input placeholder="规格型号" v-model="entity.remark"></el-input>
                            </el-form-item>
                            <el-row :span="24" style="margin-top: 5px">
                                <el-col :span="12">
                                    <el-form-item label="颜色" prop="color">
                                        <el-input placeholder="颜色" v-model="entity.color"></el-input>
                                    </el-form-item>
                                </el-col> <el-col :span="12">
                                <el-form-item label="尺寸" prop="size">
                                    <el-input placeholder="尺寸" v-model="entity.size"></el-input>
                                </el-form-item>
                            </el-col>
                                <el-col :span="12">
                                    <el-form-item label="单位" prop="unit">
                                        <el-input placeholder="单位" v-model="entity.unit"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="单价" prop="price">
                                        <el-input placeholder="单价" v-model="entity.price"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">

                                    <el-form-item label="状态" prop="moneyType">
                                        <el-select  style="width:100%" v-model="entity.status" :disabled="isDisabled">
                                            <el-option v-for="item in $dongxwDict.store.STATUS" :key="item[0]"
                                                       :value="item[0]" :label="item[1]"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                                  <!--<el-col :span="12">-->
                                    <!--<el-form-item label="条码" prop="barCode">-->
                                        <!--<el-input placeholder="条码" v-model="entity.barCode"></el-input>-->
                                    <!--</el-form-item>-->
                                <!--</el-col>-->

                            <!--<el-form-item label="原料图片" prop="">-->

                                <!--<div :span="12" >-->
                                    <!--<v-image-uploader  :isShow="isShow" :form-data="{}" v-model="entity.picUrl"-->
                                        <!--:imgStyle="'margin-right:10px;width:160px;height:160px'"/>-->

                                <!--</div>-->
                            <!--</el-form-item>-->


                            <el-form-item label="备注" prop="memo">
                                <el-input placeholder="备注" type="textarea" :rows="2"  v-model="entity.memo"></el-input>
                            </el-form-item>
                            <el-row :span="24" style="margin-top: 10px">
                                <el-col :span="12">
                                    <el-form-item label="建档人" prop="createByName">
                                        <el-input placeholder="建档人" disabled v-model="entity.createByName"></el-input>

                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">

                                    <el-form-item label="建档时间" prop="createDate">
                                        <el-input placeholder="建档时间" disabled v-model="entity.createDate"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-tab-pane>


            </el-tabs>
        </el-form>

    </div>
</template>
<style lang="less" scoped>
    .productLogo .el-upload-dragger {
        img {
            width: 200px ;
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

    import RmTypeSelect from '@/components/widgets/dongxw/RmTypeSelect.vue';
    import  SubTypeSelect from '@/components/widgets/dongxw/RmSubTypeSelect.vue';

    const defaultEntity = {
        customerId : 0,
        id: null,
        epCode: null,
        code: null,
        status : 1,
        remark : '',
        color : '',
        size : '',
        barCode : '',
        picUrl : null ,
        imgUrls : null,
        upcA : '',
        memo : '',
        unit: '',
        createBy: 0,
        productTypeId: null,
        parentId: null,
        createBy:null,
        createDate:null,
        ibQty : 0,
        ibGw : 0,
        ibNw : 0,
        ibSize : '',
        obQty : 0,
        obGw : 0,
        obNw : 0,
        obSize : '',
        pkgFront:'',
        pkgSide:'',
        pkgRemark:'',
        imgRemark:null
    };


    export default {
        components: { RmTypeSelect,SubTypeSelect},
        data() {
            return {

                options: [
                    { label: '产品正面', value: '1' },
                    { label: '产品背面', value: '2' },
                    { label: '内部结构', value: '3' },
                    { label: 'logo', value: '4' },
                    { label: '拉链以及拉头', value: '5' },
                    { label: '内唛', value: '6' },
                    { label: '', value: '0' },
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


                }
            };
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
            onDiscountTypeChange(val) {
                if (val == 3) {
                    //次数只能一次
                    this.entity.discountValue = 1;
                }
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
                        if (this.entity.code == null) {
                            this.entity.code = this.entity.epCode
                        }
                        if (this.entity.epCode == null) {
                            this.entity.epCode = this.entity.code
                        }
                        this.entity.code =  this.entity.code?this.entity.code.Trim():this.entity.code;
                        this.entity.epCode =  this.entity.epCode.Trim();
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
                //this.$refs.imagePreview.clearFiles();

                this.resetForm();
                if (options.id) {
                    console.log(JSON.stringify(this.entity));

                    this.$api.dongxw.ProductService.findById(options.id).then(r => {
                        console.log(JSON.stringify(r))
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
