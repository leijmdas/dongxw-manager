import Vue from 'vue';

let DongxwDict = {

    store: {
        SUPPLY_TYPES: [[0, '原料供应商'],[1, '产品供应商'],  [2,'产品与原料供应商']],
        STATUS: [[0, '草稿'],[1, '启用'],  [2,'禁用']],
        LANGUAGE_TYPE: [[100, '中文'], [200, '英文']],
        MONEY_TYPE: [[100, '人民币'], [200, '美元'], [300, '港币']],
        YESNO_TYPE: [[1, '是'], [0, '否']],
        LOSS_TYPE: [[1, '损耗率(%)'], [0, '损耗数']],

        OUT_FLAG: [[1, '外发'], [0, '生产']],
        FINISH_FLAG: [[1, '完成'], [0, '未完成']],
        AUDIT_STATUS: [[0, '草稿'], [10, '提交审核'], [20, '审核通过'], [30, '审核不通过']],
         PLAN_STATUS: [[0, '草稿'], [10, '进行中'], [20, '完成'], [30, '取消']],
        ORDER_STATUS: [[0, '草稿'],[10, '下单'], [20, '生产中'], [30, '生产完成'], [40, '发货完成'], [50, '收款完成'], [100, '取消'],[101, '作废'] ],

        ORDER_TYPE: [[0, '普通订单'], [100, '父订单'], [200, '子订单']],
        RM_TYPE: [[100, '主料'], [200, '辅料'], [300, '包装材料'], [400, '部件']],
        // RM_TYPE: [[100, '主料'], [200, '辅料'], [300,'包装材料'], [400,'半成品'],[500,'成品']]
        STORE_TYPE: [[200, '原材料'],   [100,'半成品']],

    },
    getEntry: function (key, storeArr) {
        let arr = storeArr || [];
        return arr.find((entry) => entry[0] == key);
    },
    getText: function (key, storeArr) {
        let tmp = this.getEntry(key, storeArr);
        return tmp ? tmp[1] : '-';
    },
    viewDate: function ( d ) {
        return d ? d.substr(0,10) : '-';

    },

    formatDatetime: function(now) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    },

    formatDate: function (now) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        return year + '-' + month + '-' + date;
    },
    formatDateZero: function (now) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        return year + '-' + month + '-' + date + ' 00:00:00';
    },
    trim: function (s) {
        return trimRight(trimLeft(s));
    },
    //去掉左边的空白
    trimLeft: function (s) {
        if (s == null) {
            return "";
        }
        var whitespace = new String(" \t\n\r");
        var str = new String(s);
        if (whitespace.indexOf(str.charAt(0)) != -1) {
            var j = 0, i = str.length;
            while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
                j++;
            }
            str = str.substring(j, i);
        }
        return str;
    },

    //去掉右边的空白 www.2cto.com
    trimRight: function (s) {
        if (s == null) return "";
        var whitespace = new String(" \t\n\r");
        var str = new String(s);
        if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
            var i = str.length - 1;
            while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
                i--;
            }
            str = str.substring(0, i + 1);
        }
        return str;
    },


};
Vue.prototype.$dongxwDict = DongxwDict;

export default DongxwDict;
