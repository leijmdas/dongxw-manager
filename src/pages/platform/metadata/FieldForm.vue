<template>

    <el-form :model='entity' :rules='rules' ref='form'  label-width='100px' class='dialog-form'>

        <el-row :span='24'>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='中文名称' prop='fieldMemo'>
                    <el-input  placeholder='中文名称' v-model='entity.fieldMemo'>
                    </el-input>
                </el-form-item>

            </el-col>

            <el-col :span='12'>
                <el-form-item style='width:100%' label='字段名称' prop='fieldName'>
                    <el-input  placeholder='字段名称' v-model='entity.fieldName'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='字段类型' prop='fieldType'>
                    <dict-data-select style='width:100%' v-model='entity.fieldType'></dict-data-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='排序' prop='fieldOrder'>
                    <el-input  placeholder='排序' v-model='entity.fieldOrder'>
                    </el-input>
                </el-form-item>
            </el-col>


            <el-col :span='12'>
                <el-form-item style='width:100%' label='字段长度' prop='fieldSize'>
                    <el-input  placeholder='字段长度' v-model='entity.fieldSize'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='小数位数' prop='fieldDecimal'>
                    <el-input :disabled="!(entity.fieldType=='DECIMAL')"  placeholder='小数位数' v-model='entity.fieldDecimal'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='是否为空' prop='fieldIsNull'>
                    <el-select style='width:100%' v-model='entity.fieldIsNull' >
                        <el-option :key = 'true' :value = 'true' :label = '"是"' ></el-option >
                        <el-option :key = 'false' :value = 'false' :label = '"否"' ></el-option >
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='默认值' prop='fieldDefault'>
                    <el-input :disabled="entity.fieldIsNull"  placeholder='默认值' v-model='entity.fieldDefault'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='是否主键' prop='fieldPk'>
                    <el-select style='width:100%' v-model='entity.fieldPk' >
                        <el-option :key = 'true' :value = 'true' :label = '"是"' ></el-option >
                        <el-option :key = 'false' :value = 'false' :label = '"否"' ></el-option >
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='自动生成' prop='fieldAuto'>
                    <el-select :disabled="!entity.fieldPk" style='width:100%' v-model='entity.fieldAuto' >
                        <el-option :key = 'true' :value = 'true' :label = '"是"' ></el-option >
                        <el-option :key = 'false' :value = 'false' :label = '"否"' ></el-option >
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='是否显示' prop='fieldVisible'>
                    <el-select style='width:100%' v-model='entity.fieldVisible' >
                        <el-option :key = 'true' :value = 'true' :label = '"是"' ></el-option >
                        <el-option :key = 'false' :value = 'false' :label = '"否"' ></el-option >
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='显示颜色' prop='displayColor'>
                    <el-input  :disabled="!entity.fieldVisible" placeholder='显示颜色' v-model='entity.displayColor'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='显示长度' prop='fieldDisplaysize'>
                    <el-input  :disabled="!entity.fieldVisible" placeholder='显示长度' v-model='entity.fieldDisplaysize'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='显示格式' prop='fieldFormat'>
                    <el-select :disabled="!entity.fieldVisible"  style='width:100%' v-model='entity.fieldFormat' >
                        <el-option :key='0' :value='"0"' :label='"0--默认"' ></el-option >
                        <el-option :key='1' :value='"1"' :label='"1--金额"' ></el-option >
                        <el-option :key='2' :value='"2"' :label='"2--百分比%"' ></el-option >
                        <el-option :key='3' :value='"3"' :label='"3--序号"' ></el-option >
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='页面控件' prop='fieldComponent'>
                    <el-select :disabled="!entity.fieldVisible"  style='width:100%' v-model='entity.fieldComponent' >
                        <el-option :key='0' :value='0' :label='"0--默认"' ></el-option >
                        <el-option :key='1' :value='1' :label='"1--按扭"' ></el-option >
                        <el-option :key='2' :value='2' :label='"2--下拉框"' ></el-option >
                        <el-option :key='3' :value='3' :label='"3--多选框"' ></el-option >
                        <el-option :key='4' :value='4' :label='"4--单选框"' ></el-option >
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='页面弹出框' prop='refPool'>
                    <el-select :disabled="!entity.fieldVisible"  style='width:100%' v-model='entity.refPool' >
                        <el-option :key='0' :value='"0"' :label='"0--默认"' ></el-option >
                        <el-option :key='1' :value='"1"' :label='"1--选任务面板"' ></el-option >
                        <el-option :key='2' :value='"2"' :label='"2--选人员面板"' ></el-option >
                        <el-option :key='100' :value='"100"' :label='"100--测试标签函数"' ></el-option >
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='是否只读' prop='fieldReadonly'>
                    <el-select style='width:100%' v-model='entity.fieldReadonly' >
                        <el-option :key = 'true' :value = 'true' :label = '"是"' ></el-option >
                        <el-option :key = 'false' :value = 'false' :label = '"否"' ></el-option >
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='计算字段' prop='fieldIscal'>
                    <el-select style='width:100%' v-model='entity.fieldIscal' >
                        <el-option :key = 'true' :value = 'true' :label = '"是"' ></el-option >
                        <el-option :key = 'false' :value = 'false' :label = '"否"' ></el-option >
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='最小值' prop='fieldMin'>
                    <el-input  placeholder='最小值' v-model='entity.fieldMin'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='最大值' prop='fieldMax'>
                    <el-input  placeholder='最大值' v-model='entity.fieldMax'>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item style='width:100%' label='关联类型' prop='fieldSrc'>
                    <el-select style='width:100%' v-model='entity.fieldSrc' >
                        <el-option :key='0' :value='0' :label='"0--none"' ></el-option >
                        <el-option :key='100' :value='100' :label='"100--数据POOL"' ></el-option >
                        <el-option :key='200' :value='200' :label='"200--数据字典"' ></el-option >
                        <el-option :key='300' :value='300' :label='"300--关联显示"' ></el-option >
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='24'>
                <el-form-item style='width:100%' label='关联数据' prop='refObject'>
                    <el-input :disabled="entity.fieldSrc===0"  type='textarea' :rows='2'  placeholder='关联数据' v-model='entity.refObject'>
                    </el-input>
                </el-form-item>
            </el-col>
            <!--<el-col :span='24'>-->
                <!--<el-form-item style='width:100%' label='关联参数' prop='refParameter'>-->
                    <!--<el-input  type='textarea' :rows='2'  placeholder='关联参数' v-model='entity.refParameter'>-->
                    <!--</el-input>-->
                <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span='12'>-->
                <!--<el-form-item style='width:100%' label='关联表' prop='refTable'>-->
                    <!--<el-input  placeholder='关联表' v-model='entity.refTable'>-->
                    <!--</el-input>-->
                <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span='12'>-->
                <!--<el-form-item style='width:100%' label='关联字段' prop='refField'>-->
                    <!--<el-input  placeholder='关联字段' v-model='entity.refField'>-->
                    <!--</el-input>-->
                <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span='12'>-->
                <!--<el-form-item style='width:100%' label='关联条件' prop='refFilter'>-->
                    <!--<el-input  placeholder='关联条件' v-model='entity.refFilter'>-->
                    <!--</el-input>-->
                <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span='12'>-->
                <!--<el-form-item style='width:100%' label='关联显示字段' prop='refDisplayID'>-->
                    <!--<el-input  placeholder='关联显示字段' v-model='entity.refDisplayID'>-->
                    <!--</el-input>-->
                <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span='24'>
                <el-form-item style='width:100%' label='说明' prop='fieldRemark'>
                    <el-input  placeholder='说明' v-model='entity.fieldRemark'>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

    <!---->
</template>

<style lang="less" scoped>
    .btn_leftright {
        float: left;
        margin-right: 5px;
        margin-right: 5px;

    }

    .el-upload-dragger {
        img {
            height: 200px !important;
        }
    }

    .dialog-form {

        margin-right: 20px;

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
        fieldId: null,	//  字段标识
        metadataId: 0,	//  元数据标识
        fieldMemo: '',	//  中文名称
        fieldName: '',	//  字段名称
        fieldType: 'INTEGER',	//  字段类型
        fieldOrder: 0,	//  排序
        fieldPk: false,	//  是否主键
        fieldAuto: false,	//  自动生成
        fieldIsNull: false,	//  是否为空
        fieldDefault: '0',	//  默认值
        fieldSize: 0,	//  字段长度
        fieldDecimal: 0,	//  小数位数
        fieldVisible: true,	//  是否显示
        displayColor: 'black',	//  显示颜色
        fieldDisplaysize: 80,	//  显示长度
        fieldFormat: '0',	//  显示格式
        fieldComponent: 0,	//  页面控件
        refPool: '0',	//  页面弹出框
        fieldReadonly: false,	//  是否只读
        fieldIscal: false,	//  计算字段
        fieldMin: '0',	//  最小值
        fieldMax: '0',	//  最大值
        fieldSrc: 0,	//  关联类型
        refObject: '0',	//  关联数据
        refParameter: '0',	//  关联参数
        refTable: '0',	//  关联表
        refField: '0',	//  关联字段
        refFilter: '0',	//  关联条件
        refDisplayID: '0',	//  关联显示字段
        fieldRemark: 'r',	//  说明
        createTime : null,
    };
    import DictDataSelect from '@/components/widgets/platform/DictDataSelect.vue';

    export default {
        components: {DictDataSelect},
        data() {

            return {
                table: {},
                ruleTpl: {when: null, then: null},
                entity: _.cloneDeep(defaultEntity),
                dateRange: [],
                oldProps: [],
                ruleDefs: [],
                isDisabled: false,
                limitTotal: false,
                rules: {
                     fieldMemo: [
                        {required: true, message: "中文名称不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 32,
                            message: "长度在 1 到 64 个字符",
                            trigger: "blur"
                        }
                    ],

                    fieldName: [
                        {required: true, message: "字段名称不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 64,
                            message: "长度在 1 到 64 个字符",
                            trigger: "blur"
                        }
                    ],
                    fieldType: [
                        {required: true, message: "字段类型不能为空", trigger: "blur"},
                        {
                            min: 1,
                            max: 64,
                            message: "长度在 1 到 16 个字符",
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
                        if (params.fieldId==null&& this.table.metadataId) {
                            params.metadataId = this.table.metadataId
                        }
                        this.$api.platform.MetadataFieldService.save(params).then(rsp => {
                            this.$emit("saved", rsp);
                        });
                    }
                });
            },
            resetForm() {
                //this.$refs["form"].resetFields();
                this.entity = _.cloneDeep(defaultEntity);
                if (!this.entity.id) {

                     this.entity.createTime = this.$dongxwDict.formatDateZero(new Date())
                }
            },
            init(options) {
                this.resetForm()   //debugger
                if (options.table) {
                    this.table = options.table
                }
                if (options.fieldId) {

                    this.$api.platform.MetadataFieldService.findById(options.fieldId).then(r => {

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
