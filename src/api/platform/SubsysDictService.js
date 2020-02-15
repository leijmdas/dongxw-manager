// 会员
import request from '@/utils/request'

export default {
    query() {
        return request({
            url: '/api/sys/subsysdict/query',
            method: 'POST'
        })
    },



}
