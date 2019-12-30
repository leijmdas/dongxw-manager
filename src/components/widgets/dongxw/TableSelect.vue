<!--模板名称选择-->

<template>
    <el-select v-model="currentValue" placeholder="请选择" filterable :loading="loading" :clearable="clearable" :disabled="disabled" @change="handleChange">
        <el-option v-for="item in options" :key="item.metadataId" :label="item.metadataAlias" :value="item.metadataId" :disabled="item.disabled">
        </el-option>
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
                    this.value = ''
                    this.currentValue = ''
                    this.refresh();
                },
                deep: true
            }
        },
        methods: {
            handleChange (val) {
                this.$emit('change', val)
            },
            refresh() {
                this.loading = true
                this.$api.metadata.MetaData.queryDicts({
                    param: {
                        subsysId: this.subsysId, isDeleted: false
                    }
                }).then(rsp => {
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
