var query = {
    interfaces: {
        queryTalkingGroup: {
            header: "cloudICP.dispatch.query.queryTalkingGroup(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryTalkingGroupV1: {
            header: "cloudICP.dispatch.query.queryTalkingGroupV1(param)",
            params:{
                "offset": "0",
                "limit": "100",
                callback: "function(data) {printLog(data);}"
            }
			
        },
        queryTalkingGroupMembers: {
            header: "cloudICP.dispatch.query.queryTalkingGroupMembers(param)",
            params:{
                grpid: "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryTalkingGroupMembersV1: {
            header: "cloudICP.dispatch.query.queryTalkingGroupMembersV1(param)",
            params:{
                grpid: "2001",
                "offset": "0",
                "limit": "100",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryDynamicGroupMembers: {
            header: "cloudICP.dispatch.query.queryDynamicGroupMembers(param)",
            params:{
                grpid: "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryStaticGroup: {
            header: "cloudICP.dispatch.query.queryStaticGroup(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryStaticGroupV1: {
            header: "cloudICP.dispatch.query.queryStaticGroupV1(param)",
            params:{
                "offset": "0",
                "limit": "100",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryUserList: {
            header: "cloudICP.dispatch.query.queryUserList(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryUserListV1: {
            header: "cloudICP.dispatch.query.queryUserListV1(param)",
            params:{
                "offset": "0",
                "limit": "100",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryCameras: {
            header: "cloudICP.dispatch.query.queryCameras(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryDecoder: {
            header: "cloudICP.dispatch.query.queryDecoder(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryDepartmentList: {
            header: "cloudICP.dispatch.query.queryDepartmentList(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryCameraLevel: {
            header: "cloudICP.dispatch.query.queryCameraLevel(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryCameraLevelPermission: {
            header: "cloudICP.dispatch.query.queryCameraLevelPermission(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryTalkingGroupInfo: {
            header: "cloudICP.dispatch.query.queryTalkingGroupInfo(param)",
            params:{
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryPatchGroupInfo: {
            header: "cloudICP.dispatch.query.queryPatchGroupInfo(param)",
            params:{
                "grpid": "99899992",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryTalkingGroupPatchedInfo: {
            header: "cloudICP.dispatch.query.queryTalkingGroupPatchedInfo(param)",
            params:{
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryUserInfo: {
            header: "cloudICP.dispatch.query.queryUserInfo(param)",
            params:{
                "isdn": "2001", 
                callback: "function(data) {printLog(data);}"
            }
        },
        queryCameraInfo: {
            header: "cloudICP.dispatch.query.queryCameraInfo(param)",
            params:{
                "isdn": "2001", 
                callback: "function(data) {printLog(data);}"
            }
        },
        queryCameraPermissionInfo: {
            header: "cloudICP.dispatch.query.queryCameraPermissionInfo(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryCallInfo: {
            header: "cloudICP.dispatch.query.queryCallInfo(param)",
            params:{
                "isdn": "2001", 
                callback: "function(data) {printLog(data);}"
            }
        },
        queryDCInfo: {
            header: "cloudICP.dispatch.query.queryDCInfo(param)",
            params:{
                "isdn": "10086", 
                callback: "function(data) {printLog(data);}"
            }
        },
        queryUEInfo: {
            header: "cloudICP.dispatch.query.queryUEInfo(param)",
            params:{
                "isdn": "6001", 
                callback: "function(data) {printLog(data);}"
            }
        },
        queryUEGisInfo: {
            header: "cloudICP.dispatch.query.queryUEGisInfo(param)",
            params:{
                "isdn": "2001", 
                callback: "function(data) {printLog(data);}"
            }
        },
        queryRecord: {
            header: "cloudICP.dispatch.query.queryRecord(param)",
            params:{
                "call_type": "1",  
                "caller": "5010",  
                "callee": "5010",   
                "resource_id": "-1",  
                "end_sec": "2019-08-17 08:33:56",   
                "start_sec": "2019-04-17 08:31:57",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryCameraGPSInfo: {
            header: "cloudICP.dispatch.query.queryCameraGPSInfo(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryMRS: {
            header: "cloudICP.dispatch.query.queryMRS(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
		
    }
}