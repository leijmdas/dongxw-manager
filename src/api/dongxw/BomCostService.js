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
            url: '/dongxw/bomcost/save',
            method: 'POST',
            data
        })
    },
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/bomcost/query',
            method: 'POST',
            data
        })
    },
    /**
     * 导出xlsx
     */
    // export(data) {
    //     return request({
    //         url: '/dongxw/bomcost/export',
    //         method: 'POST',
    //         data,
    //         responseType: 'blob'
    //     })
    // },
    findById(id) {
        return request({
            url: '/dongxw/bomcost/findById/'+id,
            method: 'POST'
        })
    },
    findByByProduct(id) {
        return request({
            url: '/dongxw/bomcost/findByByProduct/'+id,
            method: 'POST'
        })
    },


    deleteById(id) {
        return request({
            url: '/dongxw/bom/deleteById/'+id,
            method: bomcost
        })
    },



}
