/**
 * 访问记录
 */
import request from '@/utils/request'

export default {

    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/dongxw/customer/query',
            method: 'POST',
            data
        })
    },

    findById(id) {
        return request({
            url: '/dongxw/customer/findById/'+id,
            method: 'POST'
        })
    },
    // hld() {
    //     return request({
    //         url: '/hongld/select',
    //         method: 'POST'
    //     })
    // },

}
