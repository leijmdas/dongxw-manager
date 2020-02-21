<template>

    <el-form :model='entity' :rules='rules' ref='form'  label-width='100px' class='dialog-form'>

        <el-row :span='24'>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='子系统' prop='subsysId'>
                    <el-input disabled placeholder='子系统' v-model='entity.subsysId'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='分类编号' prop='typeCode'>
                    <el-input  placeholder='分类编号' v-model='entity.typeCode'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='分类名称' prop='typeName'>
                    <el-input  placeholder='分类名称' v-model='entity.typeName'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='字典编号' prop='code'>
                    <el-input  placeholder='字典编号' v-model='entity.code'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='字典名称' prop='name'>
                    <el-input  placeholder='字典名称' v-model='entity.name'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='备注' prop='remark'>
                    <el-input  placeholder='备注' v-model='entity.remark'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='创建时间' prop='createTime'>
                    <el-input  placeholder='创建时间' v-model='entity.createTime'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='创建人' prop='createBy'>
                    <el-input  placeholder='创建人' v-model='entity.createBy'>
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


    const defaultEntity = {
        id:  null,	//  字典ID
        typeCode:  null,	//  分类编号
        typeName:  null,	//  分类名称
        code:  null,	//  字典编号
        name:  null,	//  字典名称
        createTime:  '2010-01-01 00:00:00' ,	//  创建时间
        createBy:  null,	//  创建人
        remark:  null,	//  备注
    };


    export default {
        components: {},
        data() {
            return {
                //ppp: '',
                ruleTpl: {when: null, then: null},
                entity: _.cloneDeep(defaultEntity),
                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {
                    // code: [
                    //     {required: true, message: "编号不能为空", trigger: "blur"},
                    //     {
                    //         min: 1,
                    //         max: 32,
                    //         message: "长度在 1 到 32 个字符",
                    //         trigger: "blur"
                    //     }
                    // ],
                    // name: [
                    //     {required: true, message: "名称不能为空", trigger: "blur"},
                    //     {
                    //         min: 1,
                    //         max: 64,
                    //         message: "长度在 1 到 64 个字符",
                    //         trigger: "blur"
                    //     }
                    // ],


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

                        this.$api.platform.DictDataService.save(params).then(rsp => {
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
                this.resetForm()
                this.entity.subsysId = options.subsysId
                if (options.id) {

                    this.$api.platform.DictDataService.findById(options.id).then(r => {
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
