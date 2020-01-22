<template>
<div>
    <manage-panel ref="managePanel" :fatherMethodShowSub="funShowSub" :tableHeight="'300px'" ></manage-panel>
    <manage-panel-sub ref="managePanelSub"></manage-panel-sub>
</div>

</template>
<script>

    import ManagePanel from './Manage';
    import ManagePanelSub from './ManageSub';

    export default {
        components: {ManagePanel,ManagePanelSub},
        data() {
            return {
                collapse: false,
                parentId : null
            }
        },

        methods: {
            tabClick(tab) {

            },
            funShowSub(row) {
                this.parentId = row.id;
                console.log(row.id);
                console.log(this.parentId);
                this.$refs.managePanelSub.init({parentId: row.id});

            }
        },


        mounted() {
            this.$refs.managePanel.init({parentId: 0});
            this.$refs.managePanelSub.init({parentId: 1});


        }
    }
</script>
