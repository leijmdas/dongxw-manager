/**
 * 访问记录
 */
import request from '@/utils/request'

export default {
    batchInsert(data) {
        return request({
            url: '/dongxw/trade/batchInsert',
            method: 'POST',
            data
        })
    },
    /**
     * 保存
     */
    save(data) {
        return request({
            url: '/dongxw/trade/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/trade/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/trade/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    findById(id) {
        return request({
            url: '/dongxw/trade/findById/'+id,
            method: 'POST'
        })
    },

    deleteById(id) {
        return request({
            url: '/dongxw/trade/deleteById/'+id,
            method: 'POST'
        })
    },
}
