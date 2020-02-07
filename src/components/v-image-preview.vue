<template>
    <div>
        <el-row :span="24" :removeUrl="funRemoveUrl">

            <el-col :span="6" v-for="(url,index) in urlInfo" :key="url">

                <el-select v-if="url&&showRemoveBtn&&showRemark" v-model="remarks[index]" filterable
                           filterable allow-create placeholder="请选择" @change="handleChange">
                    <el-option v-for="item in options"
                               :key="item.label" :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
                <el-button v-if="url && showRemoveBtn" @click="removeUrl(url)" style="margin-left:5px" type="text"
                           title="删除" plain>
                    <i class="el-icon-delete " style="color:red;"></i>
                </el-button>

                <el-upload :action="action" :show-file-list="false" :auto-upload="true" :data="formData"
                           :disabled="!showRemoveBtn" :beforeUpload="beforeUpload" :on-success="updateSuccess">
                    <img :src="url" @click="setCurUrl(url)" class="avatar" :style="imgStyle"/>
                </el-upload>
            </el-col>

        <span v-if="showRemoveBtn" :span="24">

            <el-col :span="1" style=" padding-top: 120px">
                <el-button @click="clearAllImg" type="text" title="清除图片" plain>
                    <i class="el-icon-delete " style="color:red"></i>
                </el-button>
            </el-col>
            <el-col :span="3" style="margin-left: -10px">
                <el-upload ref="upload" :data="formData" :limit="limit" :multiple="true"
                           :action="action" :auto-upload="true" list-type="text"
                           :show-file-list="false" :beforeUpload="beforeUpload" :on-exceed="handleExceed"
                           :on-preview="handlePictureCardPreview"  :on-success="handleSuccess" :on-remove="handleRemove">
                    <i class="el-icon-plus  el-upload--picture-card"></i>

                </el-upload>
            </el-col>
        </span>
        </el-row>
    </div>
</template>
<script>
    import {getToken} from '@/utils/auth'
    export default {
        name: 'vImageUploader',
        data() {
            return {
                urls: null,
                formData: {maxSize: 500},
                action: '/api/file/upload',
                limit: 12,
                remarks: [],

            }
        },
        props: {
            showRemark : {
                required : false,
                type: Boolean ,
                default : true
            },
            options: {
                required: false,
                type: Array,
            },
            funRemoveUrl: {
                required: false,
                type: Function,
            },
            funHandleChange: {
                required: false,
                type: Function
            },
            imgRemarks: {
                type: String,
                required: false
            },
            value: {
                type: String,
                required: false
            },
            picUrl: {
                type: String,
                required: false,
                default:null
            },
            imgStyle: {
                required: false,
                type: String,
                default: 'width:60px;height:60px'
            },

            showRemoveBtn:{
                required : false,
                type: Boolean ,
                default:false
            },
        },
        watch: {
            imgRemarks(val) {
                if(this.imgRemarks){
                    this.remarks = this.imgRemarks.split(",")
                }
            }
        },
        computed: {

            urlInfo: {
                get() {
                    let arr = this.value ? this.value.split(',') : [];
                    if(this.picUrl){
                        arr.unshift(this.picUrl)
                    }
                    this.remarks = new Array(arr.length)
                    if(this.imgRemarks){
                        this.remarks = this.imgRemarks.split(",")
                    }
                    return arr
                },
                set (val) {
                    this.$emit('input', val)
                }
            }
        },
        methods: {
            clearFiles(){
                this.$refs.upload.clearFiles();

            },
            clearAllImg() {
                this.$refs.upload.clearFiles();
                this.urlInfo = null;
                if (this.remarks) {
                    this.remarks = []
                    this.funHandleChange(this.remarks)
                }
            },
            handleChange(value) {
                if (this.funHandleChange) {
                    this.funHandleChange(this.remarks)
                }
            },


            removeUrl(url) {
                this.$refs.upload.clearFiles();

                let newurls  = _.cloneDeep(this.urlInfo);
                var index = newurls.indexOf(url);
                if (index > -1) {
                    newurls.splice(index, 1);
                }

                if(this.remarks){
                   this.remarks.splice(index, 1);
                   this.funHandleChange(this.remarks)
                }
                this.urlInfo = newurls.join(',')
            },
            handleExceed() {
                this.$message('最多只允许上传'+this.limit+'张图片！')
            },
            handleSuccess(response, file, fileList) {
                console.log(response.path)
                let urls = this.urlInfo
                urls.push(response.path)
                this.urlInfo = urls.join(',')
                console.log(this.urlInfo)

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {

            },
            handleDownload(file) {
                console.log(file);
            },
            beforeUpload(file) {
                // if(!this.showRemoveBtn){
                //     return false
                // }
                if(file.size>500*1024){
                    this.$message({
                        type: 'error',
                        message: '文件大于500k!'
                    });
                    return false;
                }
                Object.assign(this.formData,{"access-token":getToken()})
            },
            setCurUrl(url){
                this.curUrl=url
                console.log(this.curUrl)
            },
            updateSuccess(response, file, fileList) {
                let urls = this.urlInfo
                let ind = urls.indexOf(this.curUrl,0)
                urls.splice(ind,1,response.path);
                this.urlInfo = urls.join(',')
            },
        }



    }

</script>
