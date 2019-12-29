// 会员
import request from '@/utils/request'

export default {
    querySubsys() {
        return request({
            url: '/api/sys/metadata/subsysdict/query',
            method: 'POST'
        })
    },
    queryFieldsByTable(tableName) {
        return request({
            url: '/api/sys/metadata/queryFieldsByTable?tableName=' + tableName,
            method: 'POST'
        })
    },

    queryDicts(data) {
        return request({
            url: '/api/sys/metadata/queryDicts',
            method: 'POST',
            data
        })
    },

    queryFields(data) {
        return request({
            url: '/api/sys/metadata/queryFields',
            method: 'POST',
            data

        })
    },



}
