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
            url: '/dongxw/monthclose/save',
            method: 'POST',
            data
        })
    },
    /**
     * 保存
     */
    saveByIds(data) {
        return request({
            url: '/dongxw/monthclose/saveByIds',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/monthclose/query',
            method: 'POST',
            data
        })
    },
    queryMc(data) {
        return request({
            url: '/dongxw/monthclose/queryMc',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/monthclose/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    findById(id) {
        return request({
            url: '/dongxw/monthclose/findById/'+id,
            method: 'POST'
        })
    },
    mc(id) {
        return request({
            url: '/dongxw/monthclose/mc/'+id  ,
            method: 'POST'
        })
    },

    balance(id) {
        return request({
            url: '/dongxw/monthclose/balance/'+id  ,
            method: 'POST'
        })
    },


}
