import Vue from 'vue';

let Dict = {

    store: {

        // MANAGER_LOGIN_TYPE: [[100, '分公司管理员'], [200, '商户管理员'], [300, '停车场保安']],
        MANAGER_LOGIN_TYPE: [[200, '商户管理员'], [300, '停车场保安']],

    },
        getEntry: function (key, storeArr) {
            let arr = storeArr || [];
            return arr.find((entry) => entry[0] == key);
        },
        getText: function (key, storeArr) {
            let tmp = this.getEntry(key, storeArr);
            return tmp ? tmp[1] : '-';
        }
    };
Vue.prototype.$dict = Dict;
export default Dict;
