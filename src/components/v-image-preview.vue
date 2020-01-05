<template>
    <div v-model="urls" :removeUrl="funRemoveUrl">
        <span v-for="url in urls">
              <span v-if="url">
                <el-button @click="removeUrl(url)"type="text" title="删除" plain>
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
                // urls:[
                //     'http://120.78.136.63:8888/group1/M00/00/02/rBIvIF4RaECAJCaKAABm2RpgHNo984.jpg',
                //     'http://120.78.136.63:8888/group1/M00/00/02/rBIvIF4RaECAJCaKAABm2RpgHNo984.jpg',
                //
                // ]
            }
        },
        props: {
            funRemoveUrl:{
                required : true,
                type: Function ,
            },
            urls: {
                required: true,
                type: Array,
                default: []
            },
            imgStyle: {
                required: false,
                type: String,
                default: null
            }
        },
        methods: {
            removeUrl(url) {
                if(this.funRemoveUrl){
                    this.funRemoveUrl(url)
                }
            }
        }



    }

</script>
