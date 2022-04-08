var conf = {
    interfaces: {
        createConf: {
            header: "cloudICP.dispatch.conf.createConf(param)",
            params: {
                "isVideo": "false",
                "confRate": "",
                "memberInfos":[
                    {           
                        "number":"1212",           
                        "name":"1212",                   
                        "isCamera":"false",           
                        "isWatchOnly": "false",           
                        "h265": "false"     
                    }
                ],     
                callback: "function(data) {printLog(data);}"
            }
        },
        joinConf: {
            header: "cloudICP.dispatch.conf.joinConf(param)",
            params: {     
                "confId": "10080",     
                "fmt":"720P", 
                "unifiedAccessCode": "9000",     
                "passcode": "7878516",     
                "isVideo": "true",
                callback: "function(data) {printLog(data);}"
            }
        },
        acceptAudioConf: {
            header: "cloudICP.dispatch.conf.acceptAudioConf(param)",
            params: {     
                "cid": "120",
                callback: "function(data) {printLog(data);}"
            }
        },
        acceptVideoConf: {
            header: "cloudICP.dispatch.conf.acceptVideoConf(param)",
            params: {     
                "cid": "120",
                "windowInfo": {
                    "width": "400",
                    "height": "400",
                    "posX": "0",
                    "posY": "0"
                },
                callback: "function(data) {printLog(data);}"
            }
        },
        rejectAudioConf: {
            header: "cloudICP.dispatch.conf.rejectAudioConf(param)",
            params: {     
                "cid": "120",
                callback: "function(data) {printLog(data);}"
            }
        },
        rejectVideoConf: {
            header: "cloudICP.dispatch.conf.rejectVideoConf(param)",
            params: {     
                "cid": "120",
                callback: "function(data) {printLog(data);}"
            }
        },
        exitAudioConf: {
            header: "cloudICP.dispatch.conf.exitAudioConf(param)",
            params: {     
                "cid": "120",
                callback: "function(data) {printLog(data);}"
            }
        },
        exitVideoConf: {
            header: "cloudICP.dispatch.conf.exitVideoConf(param)",
            params: {     
                "cid": "120",
                callback: "function(data) {printLog(data);}"
            }
        },
        exitVideoConf: {
            header: "cloudICP.dispatch.conf.exitVideoConf(param)",
            params: {     
                "cid": "120",
                callback: "function(data) {printLog(data);}"
            }
        },
        addConfMembers: {
            header: "cloudICP.dispatch.conf.addConfMembers(param)",
            params: {     
                "confId": "10080",     
                "memberInfos":[{           
                    "number":"1212",           
                    "name":"1212",                   
                    "isCamera":"false",           
                    "isWatchOnly": "false",           
                    "h265": "false"     
                }],
                callback: "function(data) {printLog(data);}"
            }
        },
        hangupConfMember: {
            header: "cloudICP.dispatch.conf.hangupConfMember(param)",
            params: {     
                "confId": "10080",     
                "memberInfo":{           
                    "number":"1212",               
                },
                callback: "function(data) {printLog(data);}"
            }
        },
        callConfMember: {
            header: "cloudICP.dispatch.conf.callConfMember(param)",
            params: {     
                "confId": "10080",     
                "memberInfo":{           
                    "number":"1212",             
                },
                callback: "function(data) {printLog(data);}"
            }
        },
        endConf: {
            header: "cloudICP.dispatch.conf.endConf(param)",
            params: {     
                "confId": "10080",     
                callback: "function(data) {printLog(data);}"
            }
        },
        muteConfMember: {
            header: "cloudICP.dispatch.conf.muteConfMember(param)",
            params: {     
                "confId": "10080",
                "isMute": "false",     
                "number": "10086",
                callback: "function(data) {printLog(data);}"
            }
        },
        muteConf: {
            header: "cloudICP.dispatch.conf.muteConf(param)",
            params: {     
                "confId": "10080",
                "isMute": "false",     
                callback: "function(data) {printLog(data);}"
            }
        },
        holdConf: {
            header: "cloudICP.dispatch.conf.holdConf(param)",
            params: {
                "cid": "1",  
                callback: "function(data) {printLog(data);}"
            }
        },
        unholdConf: {
            header: "cloudICP.dispatch.conf.unholdConf(param)",
            params: {
                "cid": "1",  
                callback: "function(data) {printLog(data);}"
            }
        },
        watchConfMember: {
            header: "cloudICP.dispatch.conf.watchConfMember(param)",
            params: {     
                "confId": "10080",
                "number": "10086",     
                callback: "function(data) {printLog(data);}"
            }
        },
        watchMixPicture: {
            header: "cloudICP.dispatch.conf.watchMixPicture(param)",
            params: {     
                "confId": "10080",
                "mixPictureType" : "0",     
                "memberInfos":[{           
                    "number":"1212",     
                }], 
                callback: "function(data) {printLog(data);}"
            }
        },
        broadcastConfMember: {
            header: "cloudICP.dispatch.conf.broadcastConfMember(param)",
            params: {     
                "confId": "10080",
                "number": "10086",
                callback: "function(data) {printLog(data);}"
            }
        },
        broadcastMixPicture: {
            header: "cloudICP.dispatch.conf.broadcastMixPicture(param)",
            params: {     
                "confId": "10080",     
                "mixPictureType" : "0",     
                "memberInfos":[{           
                    "number":"1212",     
                }],
                callback: "function(data) {printLog(data);}"
            }
        },
        cancelBroadcastConfMember: {
            header: "cloudICP.dispatch.conf.cancelBroadcastConfMember(param)",
            params: {     
                "confId": "10080",
                "number": "10086",
                callback: "function(data) {printLog(data);}"
            }
        },
        cancelBroadcastMixPicture: {
            header: "cloudICP.dispatch.conf.cancelBroadcastMixPicture(param)",
            params: {     
                "confId": "10080",
                callback: "function(data) {printLog(data);}"
            }
        },
        startConfUploadWall: {
            header: "cloudICP.dispatch.conf.startConfUploadWall(param)",
            params: {     
                "confId" : "2440",  
                "number" : "10086",  
                "layerInfo": {
                    "xPos": "0",
                    "yPos": "0",
                    "width": "640",
                    "height": "480",
                    "decoder": "dec",
                    "termType": "dec_site",
                    "termName": "0",
                },
                callback: "function(data) {printLog(data);}"
            }
        },
        stopConfUploadWall: {
            header: "cloudICP.dispatch.conf.stopConfUploadWall(param)",
            params: {     
                "layerID": "",
                "owner": "",
                "termName": "",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryConfListByAttendee: {
            header: "cloudICP.dispatch.conf.queryConfListByAttendee(param)",
            params: {
                "confID": "",    
                callback: "function(data) {printLog(data);}"
            }
        },
        queryRecordURLByConfID: {
            header: "cloudICP.dispatch.conf.queryRecordURLByConfID(param)",
            params: {     
                "confId":  "1044",  
                callback: "function(data) {printLog(data);}"
            }
        },
        queryVWallDisplayMatrixInfo: {
            header: "cloudICP.dispatch.conf.queryVWallDisplayMatrixInfo(param)",
            params: {     
                callback: "function(data) {printLog(data);}"
            }
        },
        queryConfWallInfo: {
            header: "cloudICP.dispatch.conf.queryConfWallInfo(param)",
            params: {     
                callback: "function(data) {printLog(data);}"
            }
        },
        setChairmanName: {
            header: "cloudICP.dispatch.conf.setChairmanName(param)",
            params: {     
                name: "test",
                callback: "function(data) {printLog(data);}"
            }
        },
		setSpokenMember:{
			header: "cloudICP.dispatch.conf.setSpokenMember(param)",
			params: {
                confId: "10088",
                member: "10086",
				isSpoken: "true",
                callback: "function(data) {printLog(data);}"
			}
        },
        delConfMember:{
			header: "cloudICP.dispatch.conf.delConfMember(param)",
			params: {
                confId: "10088",
                "memberInfo":{           
                    "number":"1212",             
                },
                callback: "function(data) {printLog(data);}"
			}
        },
        proxyFloor:{
			header: "cloudICP.dispatch.conf.proxyFloor(param)",
			params: {
                confId: "10088",
                member: "10086",
				operation: "0",
                callback: "function(data) {printLog(data);}"
			}
		},
		queryContinuousPresenceInfo:{
			header: "cloudICP.dispatch.conf.queryContinuousPresenceInfo(param)",
			params: {
                confId: "10088",
                callback: "function(data) {printLog(data);}"
			}
        },
        acceptApplyFloor:{
			header: "cloudICP.dispatch.conf.acceptApplyFloor(param)",
			params: {
                confId: "165",
                applier: "1008",
                callback: "function(data) {printLog(data);}"
			}
        },
        rejectApplyFloor:{
			header: "cloudICP.dispatch.conf.rejectApplyFloor(param)",
			params: {
                confId: "165",
                applier: "1008",
                callback: "function(data) {printLog(data);}"
			}
		},
        applyFloor:{
			header: "cloudICP.dispatch.conf.applyFloor(param)",
			params: {
                confId: "10080",
                applier: "1008",
                floorType: "1008",
                callback: "function(data) {printLog(data);}"
			}
		},
    }
}
