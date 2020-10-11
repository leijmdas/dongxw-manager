/**
 * 访问记录
 */
import request from '@/utils/request'

export default {

    selectCustomerByYm(data) {
        return request({
            url: '/dongxw/master/selectCustomerByYm',
            method: 'POST',
            data
        })
    },
/**
     * 保存
     */
    save(data) {
        return request({
            url: '/dongxw/master/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/master/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/master/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    //对帐单
    exportCheckSheet(data) {
        return request({
            url: '/dongxw/master/exportCheckSheet',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },

    findById(id) {
        return request({
            url: '/dongxw/master/findById/'+id,
            method: 'POST'
        })
    },

    deleteById(id) {
        return request({
            url: '/dongxw/master/deleteById/'+id,
            method: 'POST'
        })
    },
}
