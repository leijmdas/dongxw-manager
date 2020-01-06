<template>
    <div>
        <el-row :span="24" :removeUrl="funRemoveUrl">

            <el-col :span="6" v-for="(url,index) in urlInfo">

                <!--<el-input v-if="url&&showRemoveBtn" style="width:120px" placeholder="描述" v-model="remarks[index]"></el-input>-->
                <el-select v-if="url&&showRemoveBtn" v-model="remarks[index]" filterable placeholder="请选择" @change="handleChange">
                    <el-option
                        v-for="item in options"
                        :key="item.label"
                        :label="item.label"
                        :value="item.label">
                    </el-option>
                </el-select>
                <el-button v-if="url && showRemoveBtn" style="margin-left:10px" @click="removeUrl(url)" type="text"
                           title="删除" plain>
                    <i class="el-icon-delete " style="color:red;"></i>
                </el-button>
                <img :src="url" class="avatar" :style="imgStyle"/>

            </el-col>

        </el-row>
        <el-row v-if="showRemoveBtn" :span="24" >

            <el-col :span="1" style=" padding-top: 120px">
                <slot name="slotRmBtn"></slot>
            </el-col>

            <el-col :span="3" style="margin-left: -10px">
                <slot name="slotLoadImg" >
                </slot>
            </el-col>
        </el-row>



    </div>
</template>
<script>
    export default {
        name: 'vImageUploader',
        data() {
            return {
                urls: null,
                remarks : [],
                options: [
                    { label: '产品正面', value: '1' },
                    { label: '产品背面', value: '2' },
                    { label: '内部结构', value: '3' },
                    { label: 'logo', value: '4' },
                    { label: '拉链以及拉头', value: '5' },
                    { label: '内唛', value: '6' },
                ],
            }
        },
        props: {
            funRemoveUrl:{
                required : false,
                type: Function ,
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
            handleChange(value) {
                this.item = this.options.find((item) => {
                    return item.value === value
                })
                if(this.imgRemarks) {
                    this.imgRemarks = this.imgRemarks.join(",")
                    console.log(this.imgRemarks)
                    this.$message(JSON.stringify(this.imgRemarks))
                }
            },

            selectBlur(e) {
                this.aaa = e.target.value
            },
            searchBlur(e) {
                this.aaa = e.target.value
            },
            removeUrl(url) {
                if (this.funRemoveUrl) {
                    this.funRemoveUrl(url)
                }

                let newurls=[]
                for(var i in this.urlInfo){
                    if(url===this.urlInfo[i]){

                    }
                    else{
                        newurls.push(this.urlInfo[i])
                    }

                }

                this.urlInfo = newurls.join(',')
            },

        }



    }

</script>
