/**
 * 访问记录
 */
import request from '@/utils/request'

export default {
    saveMulti(data) {
        return request({
            url: '/dongxw/purchaseorderitem/saveMulti',
            method: 'POST',
            data
        })
    },
    /**
     * 保存
     */
    save(data) {
        return request({
            url: '/dongxw/purchaseorderitem/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/purchaseorderitem/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/purchaseorderitem/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },


    findById(id) {
        return request({
            url: '/dongxw/purchaseorderitem/findById/'+id,
            method: 'POST'
        })
    },
    deleteById(id) {
        return request({
            url: '/dongxw/purchaseorderitem/deleteById/'+id,
            method: 'POST'
        })
    },


}
