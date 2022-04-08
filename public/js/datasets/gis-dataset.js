var gis = {
    interfaces: {
        subscribeGIS: {
            header: "cloudICP.dispatch.gis.subscribeGIS(param)",
            params: {
                uelist: [{ "isdn": "4012" }],
                callback: "function(data) {printLog(data);}"
            }
        },
        unsubscribeGIS: {
            header: "cloudICP.dispatch.gis.unsubscribeGIS(param)",
            params: {
                uelist: [{ "isdn": "4012" }],
                callback: "function(data) {printLog(data);}"
            }
        },
        queryGISSubList:{
            header: "cloudICP.dispatch.gis.queryGISSubList(param)",
            params: {
                callback: "function(data) {printLog(data);}"
            }
        }
    }
}