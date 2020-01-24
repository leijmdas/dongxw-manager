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
            url: '/dongxw/producttype/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/producttype/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出产品类型xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/producttype/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    /**
     * 导出原材料类型xlsx
     */
    exportRm(data) {
        return request({
            url: '/dongxw/producttype/exportRm',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },


    findById(id) {
        return request({
            url: '/dongxw/producttype/findById/' + id,
            method: 'POST'
        })
    },

    deleteById(id) {
        return request({
            url: '/dongxw/producttype/deleteById/' + id,
            method: 'POST'
        })
    },

}
