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
            url: '/api/dongxw/customer/query',
            method: 'POST',
            data
        })
    },
    queryAccess(data) {
        return request({
            url: '/api/ipark/access_info/queryAccess',
            method: 'POST',
            data
        })
    },

}
