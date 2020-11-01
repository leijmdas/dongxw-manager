<!--模板名称选择-->

<template>
    <el-select v-model="currentValue" placeholder="请选择" filterable :loading="loading"
               style="width:130%" filterable remote :remote-method="remoteQuery"
               :clearable="clearable" :disabled="disabled" @change="handleChange">
        <el-option v-for="item in options"
                   :key="item.id"
                   :label="item.code + ' '+ item.name"
                   :value="item.id" :disabled="item.disabled">
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
            sId: {
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
            sId: {
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
            remoteQuery(code){
              this.refresh(code)
            },

            refresh(code) {
                let chinaReg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                let isChina = chinaReg.test(code);

                this.loading = true
                this.$api.dongxw.SupplierService.query(
                    {
                        orderBys: 'code|asc',
                        param: {
                            code: isChina ? null : code,
                            name: isChina ? code : null,
                        }
                    }
                ).then(rsp => {
                    this.options = rsp.data
                    this.loading = false
                })
            }
        },
        created() {
            this.refresh()
        }
    }
</script>
