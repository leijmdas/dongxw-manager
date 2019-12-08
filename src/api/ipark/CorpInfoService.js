import request from '@/utils/request'
export default {

  /**
   * 查询
   */
  query(data) {
    return request({
      url: '/api/ipark/corp_info/query',
      method: 'POST',
      data
    })
  },
  save(data) {
    return request({
      url: '/api/ipark/corp_info/save',
      method: 'POST',
      data
    })
  },
  get(id) {
    return request({
      url: '/api/ipark/corp_info/get/'+id,
      method: 'GET'
    })
  },
  delete(id) {
    return request({
      url: '/api/ipark/corp_info/delete/'+id,
      method: 'POST'
    })
  },
}
