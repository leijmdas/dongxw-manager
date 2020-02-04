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
            url: '/dongxw/makesheet/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/makesheet/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/makesheet/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    findById(id) {
        return request({
            url: '/dongxw/makesheet/findById/'+id,
            method: 'POST'
        })
    },
    deleteById(id) {
        return request({
            url: '/dongxw/makesheet/deleteById/'+id,
            method: 'POST'
        })
    },

    makeSheetByPlanOrder(orderId) {
        return request({
            url: '/dongxw/makesheet/makeSheetByPlanOrder/'+orderId,
            method: 'POST'
        })
    },

    makeSheetByPlan (planId) {
        return request({
            url: '/dongxw/makesheet/makeSheetByPlan/'+planId,
            method: 'POST'
        })
    },
    findSheetByPlan(planId) {
        return request({
            url: '/dongxw/makesheet/findSheetByPlan/'+planId,
            method: 'POST'
        })
    },
}
