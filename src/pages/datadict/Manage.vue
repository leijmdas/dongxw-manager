<template>
  <div>

      <a href="http://120.78.136.63:88/v/login.html" target="_blank" class="go-to">元数据字典</a>
  </div>
</template>
<style lang="less" scoped>
    .el-upload-dragger {

    img {
        width: 300px;
        height: 300px;
  }
}
</style>

<script>

    export default {
  //components: { ParkSelect,UserSelect },
  data() {
    return {
      formStatus: 1,

      dateRange: [],

      dateRangeType: 'entryOn',
     page: {
        query: {
          sortBys: 'id|desc',
          param: { isDeleted: false,
             parkInfo:{}
          }
        },
        getData: this.$api.ipark.AccessInfoService.queryAccess
      }
    };
  },
  methods: {
    init(options = {}) {

      this.search();

    },
    search() {
      this.page.query.dateRanges = {};
      if (this.dateRangeType != null && this.dateRange && this.dateRange.length > 0) {

        this.page.query.dateRanges[this.dateRangeType] = {
          startDate: this.dateRange[0],

          endDate: this.dateRange.length > 1 ? this.dateRange[1] : null
        };
      }

      this.$refs.table.load();
    }

  },
  mounted() {
    //this.$on('init', this.init);
  }
};
</script>
