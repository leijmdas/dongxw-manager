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
            url: '/dongxw/ordermaster/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/ordermaster/query',
            method: 'POST',
            data
        })
    },
    sumBySub(id) {
        return request({
            url: '/dongxw/ordermaster/sumBySub/'+id,
            method: 'POST'
        })
    },
    compute(data) {
        return request({
            url: '/dongxw/ordermaster/compute',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/ordermaster/export',
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
            url: '/dongxw/ordermaster/exportMail',
            method: 'POST',
            data
        })
    },

    findById(id) {
        return request({
            url: '/dongxw/ordermaster/findById/'+id,
            method: 'POST'
        })
    },
    deleteById(id) {
        return request({
            url: '/dongxw/ordermaster/deleteById/'+id,
            method: 'POST'
        })
    },


}
