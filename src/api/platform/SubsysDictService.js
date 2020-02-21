// 会员
import request from '@/utils/request'

export default {
    query() {
        return request({
            url: '/api/sys/subsysdict/query',
            method: 'POST'
        })
    },

    /**
     * 保存
     */
    save(data) {
        return request({
            url: '/api/sys/subsysdict/save',
            method: 'POST',
            data
        })
    },

    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/api/sys/subsysdict/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    findById(id) {
        return request({
            url: '/api/sys/subsysdict/findById/' + id,
            method: 'POST'
        })
    },

    deleteById(id) {
        return request({
            url: '/api/sys/subsysdict/deleteById/'+id,
            method: 'POST'
        })
    },

}
