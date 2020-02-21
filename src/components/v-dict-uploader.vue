<template>
    <div>

        <el-upload v-loading="loading" :drag="drag" :action="action" :data="formData" :limit="limit"
                   :accept="accept" :before-upload="beforeUpload" :on-success="onSuccess" :on-error="onError"
                   :disabled="disabled" :show-file-list="showFileList" :multiple="multiple">

            <slot>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </slot>
            <div class="el-upload__tip" v-show="isShow">
                <slot name="tip"></slot>
            </div>
            <el-input v-if="preview&&currentValue" v-model="currentValue" disabled
                      style="color:red" type="textarea" :rows="2" placeholder="remark">
            </el-input>


        </el-upload>

    </div>
</template>
<style scoped lang="less">
    .el-upload {
        width: 100%;
        height: 100%;
    }

    .el-upload-dragger {
        width: 100%;
        height: 100%;
    }
    .el-input.is-disabled /deep/ .el-input__inner {
        color: red;
        background-color: ghostwhite;
    }

</style>

<script>
    import {getToken} from '../utils/auth'
    import {Consts} from '../utils'

    export default {
        name: 'vImageUploader',
        data() {
            return {
                loading: false,
                objectUrl: undefined
            }
        },
        props: {
            postSuccess :{
              type: Function
            },
            isShow: {
                required: false,
                type: Boolean,
                default: true
            },
            value: {
                type: String,
                required: false
            },
            imgStyle: {
                required: false,
                type: String,
                default: 'width:100%; height: 100%'
            },

            action: {
                type: String,
                default: '/api/sys/metadata/table/uploadDict'
            },
            accept: {
                type: String,
                default: 'text/*'
            },
            formData: {
                type: Object,
                required: false,
                default: () => {
                }
            },
            drag: {
                type: Boolean,
                default: true
            },
            limit: {
                type: Number
            },
            showFileList: {
                type: Boolean
            },
            preview: {
                type: Boolean,
                default: true
            },
            disabled: {
                type: Boolean
            },
            tip: {
                type: String,
                default: '只能上传text/plain文件，且不超过1000kb'
            },
            checkParams: {
                type: Function,
                required: false
            },
            multiple: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            currentValue: {
                get() {
                    this.objectUrl = undefined
                    return this.value
                },
                set(val) {
                    this.$emit('input',val)
                },
            }
        },
        methods: {

            beforeUpload(file) {
                if (file.size > 2048 * 1024) {
                    this.$message({
                        type: 'error',
                        message: this.tip
                    });
                    return false;
                }
                Object.assign(this.formData, {"access-token": getToken()})
                this.objectUrl = URL.createObjectURL(file)
                let flag = true
                if (this.checkParams) {
                    flag = this.checkParams(this.formData)
                }
                this.loading = flag
                return flag;
            },
            onError(err, file, fileList) {
                let rsp = err.message
                this.objectUrl = undefined
                this.$message.error('上传失败![' + JSON.parse(rsp).msg + ']')
                this.$emit('onError', err, file, fileList)
                this.loading = false
                this.currentValue = JSON.stringify(file)

            },
            onSuccess(rsp, file) {
                this.loading = false
                this.$emit('input', rsp.path)
                this.$emit('onSuccess', rsp, file)
                this.currentValue = JSON.stringify(file)
                if(this.postSuccess){
                    this.postSuccess()
                }
            }
        },
        created() {
        }
    }
</script>
