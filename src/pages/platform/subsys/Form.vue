<template>

    <el-form :model='entity' :rules='rules' ref='form'  label-width='100px' class='dialog-form'>

        <el-row :span='24'>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='子系统标识' prop='subsysId'>
                    <el-input disabled placeholder='子系统标识' v-model='entity.subsysId'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='子系统代号' prop='subsysNo'>
                    <el-input  placeholder='子系统代号' v-model='entity.subsysNo'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='子系统名称' prop='subsysName'>
                    <el-input  placeholder='子系统名称' v-model='entity.subsysName'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='子系统表' prop='remark'>
                    <el-input  placeholder='子系统表' v-model='entity.remark'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='ip' prop='ip'>
                    <el-input  placeholder='ip' v-model='entity.ip'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='port' prop='port'>
                    <el-input  placeholder='port' v-model='entity.port'>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
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

    //import BranchCompanySelect from '@/components/widgets/BranchCompanySelect.vue';
    const defaultEntity = {
        subsysId: null,	//  子系统标识
        subsysNo: ' ',	//  子系统代号
        subsysName: ' ',	//  子系统名称
        remark: ' ',	//  子系统表
        ip: ' ',	//  ip
        port: ' ',	//  port
    };


    export default {
        components: {},
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
                    code: [
                        {required: true, message: "编号不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 32,
                            message: "长度在 1 到 32 个字符",
                            trigger: "blur"
                        }
                    ],
                    name: [
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
                        let params = Object.assign({}, this.entity);

                        this.$api.platform.SubsysDictService.save(params).then(rsp => {
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
                this.resetForm();
                if (options.subsysId) {
                    console.log(JSON.stringify(this.entity));
                    this.$api.platform.SubsysDictService.findById(options.subsysId).then(r => {
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
