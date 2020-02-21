<template>
    <v-dict-uploader :postSuccess="postSuccess" v-model="vFilename" :form-data="{}">

    </v-dict-uploader>
</template>

<style lang="less" scoped>

</style>

<script>
    export default {
        props:{
            postSuccess:{
                type: Function ,

            }
        },
        data() {
            return {
                vFilename: ""
            }
        },
    }

</script>

