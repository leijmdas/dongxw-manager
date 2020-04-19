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
    checkDict(data) {
        return request({
            url: '/api/sys/metadata/table/checkDict',
            method: 'POST',
            data

        })
    },
    copyMaster(data) {
        return request({
            url: '/api/sys/metadata/table/copyMaster' ,
            method: 'POST',
            data
        })
    },

    makeDbTable(data) {
        return request({
            url: '/api/sys/metadata/table/makeDbTable' ,
            method: 'POST',
            data
        })
    },
    dropDbTable(data) {
        return request({
            url: '/api/sys/metadata/table/dropDbTable' ,
            method: 'POST',
            data
        })
    },
    /**
     * 生成element页面代码
     * */
    makeWebPage(data) {
        return request({
            url: '/api/sys/metadata/table/makeWebPage' ,
            method: 'POST',
            data
        })
    },
    /**
     * sort subsysId,ids
     * */
    doSortMetadataDict(data) {
        return request({
            url: '/api/sys/metadata/table/doSortMetadataDict' ,
            method: 'POST',
            data
        })
    },

    /**
     * sort subsysId,ids
     * */
    doSortMetadataField(data) {
        return request({
            url: '/api/sys/metadata/table/doSortMetadataField' ,
            method: 'POST',
            data
        })
    },


    //@PathVariable("metadataId")
    dbImportTableFields(metadataId) {
        return request({
            url: '/api/sys/metadata/table/dbImportTableFields/' + metadataId,
            method: 'POST'
        })
    },

    //全量刷新
    dbImportTables(subsysId) {
        return request({
            url: '/api/sys/metadata/table/dbImportTables/' + subsysId   ,
            method: 'POST',
        })
    },
    //异步刷新
    dbImportTablesAsync(subsysId) {
        return request({
            url: '/api/sys/metadata/table/dbImportTablesAsync/' + subsysId   ,
            method: 'POST',
        })
    },
    //增量刷新
    dbImportTablesInc(subsysId) {
        return request({
            url: '/api/sys/metadata/table/dbImportTablesInc/' + subsysId   ,
            method: 'POST',
        })
    },

    //exportDictTable
    /**
     * 导出dict
     */
    exportDictTable(metadataId) {
        return request({
            url: '/api/sys/metadata/table/exportDictTable/' + metadataId,
            method: 'POST',
            responseType: 'blob'
        })
    },
    //exportDictTable
    /**
     * 导出dict
     */

    exportDictTables(metadataIds) {
        return request({
            url: '/api/sys/metadata/table/exportDictTables/' + metadataIds,
            method: 'POST',
            responseType: 'blob'
        })
    },
}
