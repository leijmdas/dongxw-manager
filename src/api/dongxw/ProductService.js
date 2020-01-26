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
            url: '/dongxw/product/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/product/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出产品xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/product/export',
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
            url: '/dongxw/product/exportMail',
            method: 'POST',
            data
        })
    },
    /**
     * 导出原材料半成品xlsx
     */
    exportRm(data) {
        return request({
            url: '/dongxw/product/exportRm',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    findById(id) {
        return request({
            url: '/dongxw/product/findById/' + id,
            method: 'POST'
        })
    },
    deleteById(id) {
        return request({
            url: '/dongxw/product/deleteById/'+id,
            method: 'POST'
        })
    },
}
