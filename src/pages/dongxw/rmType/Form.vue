<template>
    <div>
        <p></p>
        <el-form :model="entity" :rules="rules" ref="form" label-width="120px" class="dialog-form">

            <el-form-item label="存货分类" prop="prdFlag">
                <el-select  :clearable="true" v-model="entity.prdFlag" style="width:100px">
                    <el-option v-for="item in $dongxwDict.store.STORE_TYPE" :key="item[0]" :value="item[0]"
                               :label="item[1]"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="大类编码" prop="code" >
                <el-input placeholder="大类编码" v-model="entity.code"></el-input>
            </el-form-item>
            <el-form-item label="大类名称" prop="name">
                <el-input placeholder="大类名称" v-model="entity.name"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="remark">
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

    const defaultEntity = {
        id: null,
        code: '',
        name: '',
        active: 1,
        parentId : 0,
        prdFlag : 200
    };

    export default {
        components: {},
        data() {
            return {

                parentId:0,
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
                    parentId: [
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
                }
            },
            init(options) {
                this.resetForm();
                if (options.id) {

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
