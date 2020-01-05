<template>
    <div  :removeUrl="funRemoveUrl">
        <span v-for="url in urlArrays">
              <span v-if="url">
                <el-button v-if="showRemoveBtn" @click="removeUrl(url)"type="text" title="删除" plain>
                 <i class="el-icon-delete " style="color:red"></i>
                </el-button>

                <img :src="url" class="avatar" :style="imgStyle"/>
              </span>
        </span>
        <slot name="loadImage" style="float:left"></slot>

    </div>
</template>
<script>
    export default {
        name: 'vImageUploader',
        data() {
            return {
                urls: null
            }
        },
        props: {
            funRemoveUrl:{
                required : false,
                type: Function ,
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

        computed: {
            urlArrays: {
                get() {
                    let arr = this.value ? this.value.split(',') : [];
                    if(this.picUrl){
                        arr.unshift(this.picUrl)
                    }
                    return arr
                },
                set (val) {
                    this.$emit('input', val)
                }
            }
        },
        methods: {
            removeUrl(url) {
                // if (this.funRemoveUrl) {
                //     this.funRemoveUrl(url)
                // }
                this.$message(url);
                let newurls=[]
                for(var i in this.urlArrays){
                    if(url===this.urlArrays[i]){

                    }
                    else{
                        newurls.push(this.urlArrays[i])
                    }

                }

                this.urlArrays = newurls.join(',')
            }
        }



    }

</script>
