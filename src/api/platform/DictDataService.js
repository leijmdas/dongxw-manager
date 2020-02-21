// 会员
import request from '@/utils/request'

export default {
    /**
     * 查询
     */

    query(data) {
        return request({
            url: '/api/sys/dictdata/query',
            method: 'POST',
            data
        })
    },

    /**
     * 保存
     */
    save(data) {
        return request({
            url: '/api/sys/dictdata/save',
            method: 'POST',
            data
        })
    },

    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/api/sys/dictdata/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    findById(id) {
        return request({
            url: '/api/sys/dictdata/findById/' + id,
            method: 'POST'
        })
    },

    deleteById(id) {
        return request({
            url: '/api/sys/dictdata/deleteById/'+id,
            method: 'POST'
        })
    },

}
