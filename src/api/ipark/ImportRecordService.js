import request from '@/utils/request'
export default {

  /**
   * 查询
   */
  query(data) {
    return request({
      url: '/api/ipark/excel/query',
      method: 'POST',
      data
    })
  },
  queryImportRecordDetail(data) {
    return request({
      url: '/api/ipark/excel/queryImportRecordDetail',
      method: 'POST',
      data
    })
  },
  downloadParkPort(data){
    return request({
        url: '/api/ipark/excel/downloadParkPortModel',
        method: 'GET',
        responseType: 'blob',
        params:data
      })
  }
}