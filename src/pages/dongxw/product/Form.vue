<template>
    <div>
        <el-form :model="entity" :rules="rules" ref="form" label-width="120px" class="dialog-form">
            <el-tabs :stretch="isExp" v-model="activeName">
                <el-tab-pane label="产品信息" name="productInfo">
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="客户" prop="customerId"
                                          :rules="[{ required: true}]">
                                <customer-select :width="'200px'" v-model="entity.customerId"
                                                 :clearable="true"></customer-select>
                            </el-form-item>
                            <el-row :span="24" style="margin-top: 10px">
                                <el-col :span="12">
                                    <el-form-item label="产品大类" prop="parentId" :rules="[{ required: true}]">
                                        <product-type-select v-model="entity.parentId"
                                                             :clearable="true"></product-type-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="产品小类" prop="productTypeId" :rules="[{ required: true}]">
                                        <product-sub-type-select :parentTypeId="entity.parentId"
                                                                 v-model="entity.productTypeId"
                                                                 :clearable="true"></product-sub-type-select>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row :span="24" style="margin-top: 10px">
                                <el-col :span="12">

                                    <el-form-item  label="客款号" prop="code">
                                        <el-input placeholder="客款号" v-model="entity.code"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">

                                    <el-form-item label="EP款号" prop="epCode">
                                        <el-input placeholder="EP款号" v-model="entity.epCode"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label="产品描述" prop="remark">
                                <el-input placeholder="产品描述" v-model="entity.remark"></el-input>
                            </el-form-item>

                            <el-form-item label="颜色" prop="color">
                                <el-input placeholder="颜色" v-model="entity.color"></el-input>
                            </el-form-item>
                            <el-form-item label="尺寸" prop="size">
                                <el-input placeholder="尺寸" v-model="entity.size"></el-input>
                            </el-form-item>

                            <el-form-item label="条码" prop="barCode">
                                <el-input placeholder="条码" v-model="entity.barCode"></el-input>
                            </el-form-item>

                            <el-form-item label="UPC-A" prop="upcA">
                                <el-input placeholder="UPC-A" v-model="entity.upcA"></el-input>
                            </el-form-item>


                            <el-row :span="24" style="margin-top: 10px">
                                <el-col :span="12">
                                    <el-form-item label="单位" prop="unit">
                                        <el-input placeholder="单位" v-model="entity.unit"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">

                                    <el-form-item label="状态" prop="moneyType">
                                        <el-select v-model="entity.status" :disabled="isDisabled">
                                            <el-option v-for="item in $dongxwDict.store.STATUS" :key="item[0]"
                                                       :value="item[0]" :label="item[1]"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-form-item label="产品图片" prop="">

                                <div :span="12" >
                                    <v-image-uploader    :isShow="isShow" :form-data="{}" v-model="entity.picUrl"
                                        :imgStyle="'margin-right:10px;width:160px;height:160px'"/>

                                    <!--<i slot="default" class="el-icon-plus"></i>-->
                                </div>
                            </el-form-item>


                            <el-form-item label="备注" prop="memo">
                                <el-input placeholder="备注" v-model="entity.memo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="包装信息" name="packageInfo">
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
                    <el-row style="margin-top: 20px">

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
                <el-tab-pane label="产品图片集" name="prdImage">
                    <v-image-preview v-model="entity.imgUrls"
                                     :showRemoveBtn = "true" :imgStyle="'margin-right:10px;width:140px;height:120px'">

                    <!--<el-upload ref="upload" list-type="text" :action="action" :data="formData"-->
                               <!--:beforeUpload="beforeUpload" :auto-upload="true"-->
                               <!--:on-success="handleSuccess" :on-exceed="handleExceed"-->
                               <!--:on-remove="handleRemove" :multiple="true" >-->
                        <!--<i class="el-icon-plus"></i>-->
                        <!--</el-upload>-->
                        <el-upload slot="loadImage" ref="myupload" :limit="limit" :multiple="true"
                                   :action="action" :auto-upload="true" :data="formData"
                                   list-type="text" :beforeUpload="beforeUpload"  :on-exceed="handleExceed"
                                   :on-preview="handlePictureCardPreview" :on-success="handleSuccess"
                                   :on-remove="handleRemove" >
                            <i class="el-icon-plus  el-upload--picture-card"></i>

                        </el-upload>

                    </v-image-preview>
                    <el-button   @click="clearAllImg" type="text" title="清除图片" plain>
                        <i class="el-icon-delete " style="color:red"></i>
                    </el-button>
                    <!--<el-dialog :visible.sync="dialogVisible">-->
                    <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                    <!--</el-dialog>-->
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
    import {getToken} from '@/utils/auth'

    import ProductTypeSelect from '@/components/widgets/dongxw/ProductTypeSelect.vue';
    import CustomerSelect from '@/components/widgets/dongxw/CustomerSelect.vue';
    import ProductSubTypeSelect from '@/components/widgets/dongxw/ProductSubTypeSelect.vue';

    const defaultEntity = {
        fileList:[],
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
        urls :[],
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
    };


    export default {
        components: {CustomerSelect,ProductTypeSelect,ProductSubTypeSelect},
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                urls:[
                    // 'http://120.78.136.63:8888/group1/M00/00/02/rBIvIF4RaECAJCaKAABm2RpgHNo984.jpg',
                    // 'http://120.78.136.63:8888/group1/M00/00/02/rBIvIF4RaECAJCaKAABm2RpgHNo984.jpg',

                ],
                //   fileList: [{'':'http://120.78.136.63:8888/group1/M00/00/01/rBIvIF4RV3OADd7cAAAWylUKCoI026.png'}],
                formData: {maxSize:500},
                action: '/api/file/upload',
                limit: 8,
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


                }
            };
        },
        methods: {

            clearImg() {
                this.entity.picUrl = null;
            },
            clearAllImg() {
                this.entity.imgUrls = null;
            },

            handleExceed() {
                this.$message('最多只允许上传'+this.limit+'张图片！')
            },
            handleSuccess(response, file, fileList) {
                console.log(response.path)
                let urls=this.entity.imgUrls?this.entity.imgUrls.split(','):[]
                urls.push(response.path)
                this.entity.imgUrls=urls.join(',')
                console.log(this.entity.imgUrls)

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                // this.$message(JSON.stringify(file.response.path))
                //this.urls = []
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
            beforeUpload(file) {

                if(file.size>500*1024){
                        this.$message({
                            type: 'error',
                            message: '文件大于500k!'
                        });
                    return false;
                }
                Object.assign(this.formData,{"access-token":getToken()})
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
                //this.entity.imgUrls = this.urls ? this.urls.join(',') : null;

                this.$refs["form"].validate(valid => {
                    if (valid) {
                        let params = Object.assign({}, this.entity);
                        this.$api.dongxw.ProductService.save(params).then(rsp => {
                            this.$emit("saved", rsp);
                        });
                    }
                });
            },
            resetForm() {
                //this.$refs["form"].resetFields();
                this.entity = _.cloneDeep(defaultEntity);
                if (!this.entity.id) {

                    this.entity.createDate = this.$dongxwDict.formatDateZero(new Date())
                }
            },
            init(options) {
                this.$refs.myupload.clearFiles();
                this.urls = [];
                this.resetForm();
                if (options.id) {
                    console.log(JSON.stringify(this.entity));

                    this.$api.dongxw.ProductService.findById(options.id).then(r => {
                        console.log(JSON.stringify(r))
                        this.entity = r.data;

                        //this.urls = this.entity.imgUrls  ? this.entity.imgUrls.split(',') : [];

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
