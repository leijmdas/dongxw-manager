// 会员
import request from '@/utils/request'

export default {
    /**
     * 查询
     */
    query(data) {
        return request({
            url: '/api/sys/dictdata/query',
            method: 'POST',
            data
        })
    },

}
