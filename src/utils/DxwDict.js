import Vue from 'vue';

let DongxwDict = {

    store: {

        MONEY_TYPE: [ [100, '人民币'], [200, '美元'], [300, '港币'] ]

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
Vue.prototype.$dongxwDict = DongxwDict;
export default DongxwDict;
