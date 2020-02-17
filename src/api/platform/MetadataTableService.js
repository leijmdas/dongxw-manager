// 会员
import request from '@/utils/request'

export default {


    selectTable(data) {
        return request({
            url: '/api/sys/metadata/table/selectTable',
            method: 'POST',
            data

        })
    },
    checkDict(data) {
        return request({
            url: '/api/sys/metadata/table/checkDict',
            method: 'POST',
            data

        })
    },
    copyMaster(data) {
        return request({
            url: '/api/sys/metadata/table/copyMaster' ,
            method: 'POST',
            data
        })
    },

    makeDbTable(data) {
        return request({
            url: '/api/sys/metadata/table/makeDbTable' ,
            method: 'POST',
            data
        })
    },
    dropDbTable(data) {
        return request({
            url: '/api/sys/metadata/table/dropDbTable' ,
            method: 'POST',
            data
        })
    },
    /**
     * 生成element页面代码
     * */
    makeWebPage(data) {
        return request({
            url: '/api/sys/metadata/table/makeWebPage' ,
            method: 'POST',
            data
        })
    },

}
