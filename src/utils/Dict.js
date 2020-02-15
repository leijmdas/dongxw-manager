import Vue from 'vue';

let Dict = {

    store: {
        STTATUS: [[1, '正常'], [0, '异常']],
        STATUSS: [[1, '启用'], [0, '禁用']],

        ROLE_TYPE: [[1, '功能角色'], [2, '数据角色']],
        CORP_TYPE: [[1, '有限责任公司'], [2, '个人独资'], [3, '合伙企业'], [4, '集体所有制企业'], [5, '个体工商户'], [0, '其它']],

        METADATA_TYPE: [[1, '表'], [2, '视图'], [3, 'SP'], [4, '标签库'], [5, '接口'], [6, '标签表'], [7, '标签视图']],
    },
    getEntry: function (key, storeArr) {
        let arr = storeArr || [];
        return arr.find((entry) => entry[0] == key);
    },
    getText: function (key, storeArr) {
        let tmp = this.getEntry(key, storeArr);
        return tmp ? tmp[1] : '-';
    }

}
Vue.prototype.$dict = Dict
export default Dict
