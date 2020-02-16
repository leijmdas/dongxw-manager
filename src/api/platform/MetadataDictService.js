/**
 * 访问记录
 */
import request from '@/utils/request'

export default {
    /**
     * 保存
     */
    save(data) {
        return request({
            url: '/api/sys/metadatadict/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/api/sys/metadatadict/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/api/sys/metadatadict/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    findById(id) {
        return request({
            url: '/api/sys/metadatadict/findById/' + id,
            method: 'POST'
        })
    },

    deleteById(id) {
        return request({
            url: '/api/sys/metadatadict/deleteById/'+id,
            method: 'POST'
        })
    },


}
