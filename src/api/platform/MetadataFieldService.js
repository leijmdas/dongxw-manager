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
            url: '/api/sys/metadatafield/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/api/sys/metadatafield/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/api/sys/metadatafield/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    findById(id) {
        return request({
            url: '/api/sys/metadatafield/findById/' + id,
            method: 'POST'
        })
    },
    deleteAllByMetadataId(metadataId) {
        return request({
            url: '/api/sys/metadatafield/deleteAllByMetadataId/'+metadataId,
            method: 'POST'
        })
    },
    deleteById(id) {
        return request({
            url: '/api/sys/metadatafield/deleteById/'+id,
            method: 'POST'
        })
    },

}
