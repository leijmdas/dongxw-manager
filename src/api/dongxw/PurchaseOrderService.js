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
            url: '/dongxw/purchaseorder/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/purchaseorder/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/purchaseorder/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    /**
     * 导出xlsxMail
     */
    exportMail(data) {
        return request({
            url: '/dongxw/purchaseorder/exportMail',
            method: 'POST',
            data
        })
    },

    findById(id) {
        return request({
            url: '/dongxw/purchaseorder/findById/'+id,
            method: 'POST'
        })
    },
    deleteById(id) {
        return request({
            url: '/dongxw/purchaseorder/deleteById/'+id,
            method: 'POST'
        })
    },


}
