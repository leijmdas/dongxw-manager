import request from '@/utils/request'
export default {

  /**
   * 查询
   */
  query(data) {
    return request({
      url: '/api/ipark/merchant_info/query',
      method: 'POST',
      data
    })
  },
  save(data) {
    return request({
      url: '/api/ipark/merchant_info/save',
      method: 'POST',
      data
    })
  },
  get(id) {
    return request({
      url: '/api/ipark/merchant_info/get/'+id,
      method: 'GET'
    })
  },
  delete(id) {
    return request({
      url: '/api/ipark/merchant_info/delete/'+id,
      method: 'POST'
    })
  },
}
