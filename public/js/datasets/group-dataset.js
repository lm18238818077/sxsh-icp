var group = {
    interfaces: {
        addDynamicGroup: {
            header: "cloudICP.dispatch.group.addDynamicGroup(param)",
            params: {
                alias: "dynamic", 
                grpid: "0", 
                grouplist: [
                    {
                        isdn: "20001" 
                    }
                ], 
                maxperiod: "60", 
                priority: "15", 
                uelist: [ 
                    {
                        isdn: "1043"
                    }, 
                    {
                        isdn: "1044"
                    }
                ],
                callback: "function(data) {printLog(data);}"
            }
        },
        deleteDynamicGroup: {
            header: "cloudICP.dispatch.group.deleteDynamicGroup(param)",
            params: {
                grpid: '65534',
                callback: "function(data) {printLog(data);}"
            }
        },
        modifyDynamicGroup: {
            header: "cloudICP.dispatch.group.modifyDynamicGroup(param)",
            params: {
                grpid: "0", 
                addlist: [
                    {
                        "isdn": "1042" 
                    }
                ], 
                dellist: [ 
                    {
                        "isdn": "1043"
                    }, 
                    {
                        "isdn": "1044"
                    }
                ],
                callback: "function(data) {printLog(data);}"
            }
        },
        queryDynamicGroup: {
            header: "cloudICP.dispatch.query.queryDynamicGroup(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        addPatchGroup: {
            header: "cloudICP.dispatch.group.addPatchGroup(param)",
            params:{
                name: "0",
                callback: "function(data) {printLog(data);}"
            }
        },
        deletePatchGroup: {
            header: "cloudICP.dispatch.group.deletePatchGroup(param)",
            params: {
                grpid: "65534",
                callback: "function(data) {printLog(data);}"
            }
        },
        addPatchGroupMember: {
            header: "cloudICP.dispatch.group.addPatchGroupMember(param)",
            params: {
                grpid: "65517",
                memberlist: [
                    {
                        isdn: "2001"
                    }
                ],
                callback: "function(data) {printLog(data);}"
            }
        },
        deletePatchGroupMember: {
            header: "cloudICP.dispatch.group.deletePatchGroupMember(param)",
            params: {
                grpid: "65517",
                memberlist: [
                    {
                        isdn: "2001"
                    }
                ],
                callback: "function(data) {printLog(data);}"
            }
        },
          queryPatchGroup: {
            header: "cloudICP.dispatch.query.queryPatchGroup(param)",
            params:{
                callback: "function(data) {printLog(data);}"
            }
        },
        queryPatchGroupMembers: {
            header: "cloudICP.dispatch.query.queryPatchGroupMembers(param)",
            params:{
                grpid: "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        subscribeTalkingGroup: {
            header: "cloudICP.dispatch.group.subscribeTalkingGroup(param)",
            params:{
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        unsubscribeTalkingGroup: {
            header: "cloudICP.dispatch.group.unsubscribeTalkingGroup(param)",
            params:{
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        joinTalkingGroup: {
            header: "cloudICP.dispatch.group.joinTalkingGroup(param)",
            params:{
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        subjoinTalkingGroup: {
            header: "cloudICP.dispatch.group.subjoinTalkingGroup(param)",
            params:{
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        pttTalkingGroup: {
            header: "cloudICP.dispatch.group.pttTalkingGroup(param)",
            params:{
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        pttreleaseTalkingGroup: {
            header: "cloudICP.dispatch.group.pttreleaseTalkingGroup(param)",
            params:{
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        leaveTalkingGroup: {
            header: "cloudICP.dispatch.group.leaveTalkingGroup(param)",
            params:{
                "cid": "0",
                callback: "function(data) {printLog(data);}"
            }
        },
        pttTalkingGroupEmergencyCall: {
            header: "cloudICP.dispatch.group.pttTalkingGroupEmergencyCall(param)",
            params:{
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        breakoffTalkingGroup: {
            header: "cloudICP.dispatch.group.breakoffTalkingGroup(param)",
            params:{
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
        addTalkingGroupTempUser: {
            header: "cloudICP.dispatch.group.addTalkingGroupTempUser(param)",
            params:{
                "userid": "10086",
                "grpid": "2001",
                callback: "function(data) {printLog(data);}"
            }
        },
		breakinTalkingGroup: {
            header: "cloudICP.dispatch.group.breakinTalkingGroup(param)",
            params:{
                "grpid": "20001",
                callback: "function(data) {printLog(data);}"
            }
        },
        getPDTGroupInfo: {
            header: "cloudICP.dispatch.group.getPDTGroupInfo(param)",
            params:{
                "userid": "1001",
                "operation": "0",
                callback: "function(data) {printLog(data);}"
            }
        },
        setListenGroup: {
            header: "cloudICP.dispatch.group.setListenGroup(param)",
            params:{
                "grpid": "1111",
                "operation": "0",
                callback: "function(data) {printLog(data);}"
            }
        },
    }
}