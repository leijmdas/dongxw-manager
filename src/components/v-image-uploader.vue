<template>
    <div>
        <el-button v-if="preview && currentValue" @click="clearImg"type="text" title="清除图片" plain>
            <i class="el-icon-delete " style="color:red"></i>
        </el-button>
        <el-upload v-loading="loading" :drag="drag" :action="action" :data="formData" :limit="limit"
                   :accept="accept"
                   :before-upload="beforeUpload" :on-success="onSuccess" :on-error="onError"
                   :disabled="disabled" :show-file-list="showFileList" :multiple="multiple">

             <img v-if="preview && currentValue" :src="currentValue" class="avatar"  :style="imgStyle" >
            <div v-else>
                <slot>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </slot>
                <div class="el-upload__tip" v-show="isShow">
                    <slot name="tip"></slot>
                </div>
            </div>

         </el-upload>

    </div>
</template>
<style scoped lang="less">
.el-upload{
  width:100%;
  height:100%;
}
.el-upload-dragger {
  width:100%;
  height:100%;
}
</style>

<script>
  import {getToken} from '../utils/auth'
  import {Consts} from '../utils'
  export default {
    name:'vImageUploader',
    data () {
      return {
        loading: false,
        objectUrl: undefined
      }
    },
      props: {
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
            default: '/api/file/upload'
        },
        accept: {
            type: String,
        default: 'image/*'
      },
      formData: {
        type: Object,
        required:false,
        default:()=>{}
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
        default: '只能上传jpg/png文件，且不超过500kb'
      },
      checkParams: {
        type: Function,
        required:false
      },
      multiple:{
        type:Boolean,
        required: false,
        default:false
      }
    },
    computed: {
      currentValue: {
        get() {
            this.objectUrl = undefined

            return this.value
        },

      }
      },
      methods: {
          clearImg() {
              this.$emit('input', null)
          },

          beforeUpload(file) {

              Object.assign(this.formData, {"access-token": getToken()})
              console.log(this.formData)
              this.objectUrl = URL.createObjectURL(file)
              let flag = true
              if (this.checkParams) {
                  flag = this.checkParams(this.formData)
              }
        this.loading = flag
        return flag;
      },
      onError (err, file, fileList) {
        // let rsp = err.message.substring('5xx '.length)
        let rsp = err.message
        this.objectUrl = undefined
        this.$message.error('上传失败![' + JSON.parse(rsp).msg + ']')
        this.$emit('onError', err, file, fileList)
        this.loading = false
      },
      onSuccess (rsp, file) {
        this.loading = false
        this.$emit('input', rsp.path)
        this.$emit('onSuccess', rsp, file)
      }
    },
    created () {
    }
  }
</script>
