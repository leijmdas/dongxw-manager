<!--模板名称选择-->

<template>
    <el-select v-model="currentValue" placeholder="请选择" filterable :loading="loading"
               :clearable="clearable" :disabled="disabled" @change="handleChange">
        <template v-for="item in options">
            <el-option v-if="selectDb" :disabled="item.disabled"
                       :key="item.subsysId" :label="item.remark" :value="item.remark">
            </el-option>
            <el-option v-else :disabled="item.disabled"
                       :key="item.subsysId" :label="item.subsysName" :value="item.subsysId">
            </el-option>
        </template>
    </el-select>
</template>

<script>
    import { fetch } from "@/utils";

    export default {
        data () {
            return {
                loading: false,
                options: [],
                disOpts: []
            }
        },
        props: {
            selectDb:{
                type: Boolean,
                default: false
            },
            value: {
                required: true
            },
            clearable: {
                type: Boolean
            },
            disabled: {
                type: Boolean
            },
            subsysId: {
                //type: Number
            }
        },
        computed: {
            currentValue: {
                get () {
                    return this.value
                },
                set (val) {
                    this.$emit('input', val)
                }
            }
        },
        watch: {
            subsysId: {
                handler: function(newVal, oldVal) {

                    this.refresh();
                },
                deep: true
            }
        },
        methods: {
            handleChange (val) {
                this.$emit('change', val)
            },
            refresh () {
                this.loading = true
                this.$api.platform.SubsysDictService.query().then(rsp => {
                    this.options = rsp.data
                    this.loading = false
                })
            }
        },
        created () {
            this.refresh()
        }
    }
</script>
