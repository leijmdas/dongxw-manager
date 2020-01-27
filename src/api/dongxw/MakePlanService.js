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
            url: '/dongxw/makeplan/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/makeplan/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/makeplan/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    findById(id) {
        return request({
            url: '/dongxw/makeplan/findById/'+id,
            method: 'POST'
        })
    },
    deleteById(id) {
        return request({
            url: '/dongxw/makeplan/deleteById/'+id,
            method: 'POST'
        })
    },
    makePlanByOrder(orderId) {
        return request({
            url: '/dongxw/makeplan/makePlanByOrder/'+orderId,
            method: 'POST'
        })
    },
    checkPlanByOrder(orderId) {
        return request({
            url: '/dongxw/makeplan/checkPlanByOrder/'+orderId,
            method: 'POST'
        })
    },

    rmPlanByOrder(orderId) {
        return request({
            url: '/dongxw/makeplan/rmPlanByOrder/'+orderId,
            method: 'POST'
        })
    },

}
