// 会员
import request from '@/utils/request'

export default {


    selectTable(data) {
        return request({
            url: '/api/sys/metadata/table/selectTable',
            method: 'POST',
            data

        })
    },



}
