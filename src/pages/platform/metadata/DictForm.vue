<template>
    <div>
        <el-form :model="entity" :rules="rules" ref="form"  label-width="90px"
                 class="dialog-form" style="margin-right: 20px">


            <el-row :span="24">
                <el-col :span="24">
                    <el-form-item style="width:100%" label="中文名称" prop="metadataAlias">
                        <el-input placeholder="中文名称" v-model="entity.metadataAlias"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="24">

                    <el-form-item label="英文名称" prop="metadataName">
                        <el-input placeholder="英文名称" v-model="entity.metadataName"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="子系统" prop="subsysId">
                        <subsys-select style="width:100%" disabled v-model="entity.subsysId" :clearable="true"></subsys-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :span="24">
                <el-col :span="12">
                    <el-form-item label="排序" prop="metadataOrder">
                        <el-input placeholder="排序" v-model="entity.metadataOrder"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :span="24">
                <el-col :span="12">

                    <el-form-item label="数据库" prop="metadataDb">

                        <subsys-select  style="width:100%"  :selectDb="true" v-model="entity.metadataDb" :clearable="true"></subsys-select>
                    </el-form-item>
                </el-col>

                <el-col :span="24">

                    <el-form-item label="描述" prop="metadataMemo">
                        <el-input placeholder="描述" v-model="entity.metadataMemo"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row :span="24">
                <el-col :span="12">
                    <el-form-item   label="元数据类型" prop="metadataType">
                        <el-select style="width:100%"  v-model="entity.metadataType">
                            <el-option v-for="item in $dict.store.METADATA_TYPE" :key="item[0]"
                                       :value="item[0]" :label="item[1]"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="允许建表" prop="metadataAutocreate">
                        <el-select style='width:100%' v-model='entity.metadataAutocreate'>
                            <el-option :key='true' :value='true' :label='"是"'></el-option>
                            <el-option :key='false' :value='false' :label='"否"'></el-option>
                        </el-select>
                    </el-form-item>

                </el-col>

            </el-row>

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


    import SubsysSelect from '@/components/widgets/platform/SubsysSelect.vue';

    const defaultEntity = {
        metadataId: null,

        metadataDb: 'dongxw',
        metadataAutocreate: true,
        metadataType: 1,
        metadataOrder: 0,
        refSrc: '0',
        refObject: '0',
        refParam: '0',

        metadataName: '',
        metadatalias: '',
        metadataMemo: '',
        metadataCached: false,
        metadataReadonly: false,
        metadataAddDel: true,
        expTagtableHead: false,
        metadataStmt:'',
        metadataIndex: '',
        metadataRemark:'',
        metadataParentid: 0,
        metadataSortFields: '',


    };


    export default {
        components: {SubsysSelect},
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
                    custNo: [
                        {required: true, message: "编号不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 32,
                            message: "长度在 1 到 32 个字符",
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

                        this.$api.platform.MetadataDictService.save(params).then(rsp => {
                            this.$emit("saved", rsp);
                        });
                    }
                });
            },
            resetForm() {
                //this.$refs["form"].resetFields();
                this.entity = _.cloneDeep(defaultEntity);
                if (!this.entity.id) {

                    //this.entity.createDate = this.$dongxwDict.formatDateZero(new Date())
                }
            },
            init(options) {
                this.resetForm()
                //debugger
                if (options.metadataId) {

                    this.$api.platform.MetadataDictService.findById(options.metadataId).then(r => {

                        this.entity = r.data;
                    });
                } else {
                    this.subsysId = options.subsysId
                    this.entity.subsysId = this.subsysId
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
