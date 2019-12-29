// 会员
import request from '@/utils/request'

export default {
    queryFieldsByTable(tableName) {
        return request({
            url: '/api/sys/metadata/queryFieldsByTable?tableName=' + tableName,
            method: 'POST'
        })
    },

    queryDicts(data) {
        return request({
            url: '/api/sys/metadata/queryDicts',
            method: 'POST',
            data
        })
    },

    queryFields(data) {
        return request({
            url: '/api/sys/metadata/queryFields',
            method: 'POST',
            data

        })
    },

    save(item) {
        return request({
            url: '/api/sys/httpjob/save',
            method: 'POST',
            data: item
    })
  },
  pause (id) {
    return request({
      url: '/api/sys/httpjob/pause/' + id,
      method: 'POST'
    })
  },
  resume (id) {
    return request({
      url: '/api/sys/httpjob/resume/' + id,
      method: 'POST'
    })
  }

}
