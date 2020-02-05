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
            url: '/dongxw/purchaseplan/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/purchaseplan/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    export(data) {
        return request({
            url: '/dongxw/purchaseplan/export',
            method: 'POST',
            data,
            responseType: 'blob'
        })
    },
    findById(id) {
        return request({
            url: '/dongxw/purchaseplan/findById/'+id,
            method: 'POST'
        })
    },
    deleteById(id) {
        return request({
            url: '/dongxw/purchaseplan/deleteById/'+id,
            method: 'POST'
        })
    },

    makePurchasePlanByOrder(orderId) {
        return request({
            url: '/dongxw/purchaseplan/makePurchasePlanByOrder/'+orderId,
            method: 'POST'
        })
    },

    // makeSheetByPlan (planId) {
    //     return request({
    //         url: '/dongxw/purchaseplan/makeSheetByPlan/'+planId,
    //         method: 'POST'
    //     })
    // },

    findPurchaseByPlan(planId) {
        return request({
            url: '/dongxw/purchaseplan/findPurchaseByPlan/'+planId,
            method: 'POST'
        })
    },
}
