<!-- 名称选择-->

<template>

    <el-select v-model="currentValue" placeholder="请选择" filterable :loading="loading"
               :clearable="clearable" :disabled="disabled" @change="handleChange">
        <el-option v-for="item in options" :key="item.id"
                   :label="item.code+'--'+item.epCode+'--'+item.remark "
                   :value="item.id" :disabled="item.disabled">
        </el-option>
    </el-select>
</template>

<script>
    import {fetch } from "@/utils";

    export default {
        data () {
            return {
                loading: false,
                options: [],
                disOpts: [],
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
            orderId: {
                // type: Number,
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
            orderId: {
                handler: function(newVal, oldVal) {
                    this.refresh();
                },
                deep: true
            }
        },
        methods: {
            handleChange(val) {
                this.$emit('change', val)
            },
            refresh() {
                this.loading = true
                this.$api.dongxw.OrderLine.query({
                    param: {
                        orderId: this.orderId,
                        isDeleted: false
                    }
                }).then(rsp => {
                    for(var item in rsp.data) {
                        this.options=[]
                        this.options.push(item.product)
                    }
                    this.$message(rsp.data);
                    this.loading = false
                })
            }
        },
        created() {
            this.refresh()
        }
    }
</script>
