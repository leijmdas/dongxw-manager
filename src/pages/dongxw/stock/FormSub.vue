<template>
    <div>
        <p></p>
        <el-form :model="entity" :rules="rules" ref="form" label-width="120px" class="dialog-form">


            <el-form-item label="大类" prop="parentId">
                <product-type-select v-model="entity.parentId"  clearable ></product-type-select>
            </el-form-item>

            <el-form-item label="小类编码" prop="code">
                <el-input placeholder="小类编码" v-model="entity.code"></el-input>
            </el-form-item>
            <el-form-item label="小类名称" prop="name" >
                <el-input placeholder="小类名称" v-model="entity.name"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="remark" >
                <el-input placeholder="描述" v-model="entity.remark"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="less" scoped>
    .merchantLogo .el-upload-dragger {
        img {
            height: 200px !important;
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
    import ProductTypeSelect from '@/components/widgets/dongxw/ProductTypeSelect.vue';

    const defaultEntity = {
        id: null,
        code: '',
        name: '',
        active: 1,
        parentId : 0
    };

    export default {
        components: {ProductTypeSelect},
        props:{
            parentId:{
                // type:Number
            }
        },
        data() {
            return {
                ppp: '',

                ruleTpl: {when: null, then: null},
                entity: _.cloneDeep(defaultEntity),
                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {
                    custNo: [
                        {required: true, message: "编号不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 6,
                            message: "长度在 1 到 6 个字符",
                            trigger: "blur"
                        }
                    ],
                    custName: [
                        {required: true, message: "名称不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 64,
                            message: "长度在 1 到 64 个字符",
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
                    discountType: [
                        {
                            type: "number",
                            required: true,
                            message: "请选择优惠类型",
                            trigger: "change"
                        }
                    ],

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


            },
            setValues(vals) {
                this.resetEntity = _.cloneDeep(vals);
                this.entity = _.cloneDeep(this.resetEntity);
             },
            submitForm() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        //this.entity.parentId = this.parentId;
                        let params = Object.assign({}, this.entity);
                        console.log(this.entity);
                        this.$api.dongxw.ProductTypeService.save(params).then(rsp => {
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
                    this.entity.parentId = this.parentId
                }
            },
            init(options) {
                this.resetForm();
                if (options.id) {
                    console.log(JSON.stringify(this.entity));

                    this.$api.dongxw.ProductTypeService.findById(options.id).then(r => {
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
