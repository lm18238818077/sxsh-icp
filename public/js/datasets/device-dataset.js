var device = {
    interfaces: {
        getSoundDevice: {
            header: "cloudICP.dispatch.device.getSoundDevice(param)",
            params: {
                callback: "function(data) {printLog(data);}"
            }
        },
        getVolume: {
            header: "cloudICP.dispatch.device.getVolume(param)",
            params: {
                cid: "10",
                callback: "function(data) {printLog(data);}"
            }
        },
        setVolume: {
            header: "cloudICP.dispatch.device.setVolume(param)",
            params: {
                cid: "-1",
                volume: "50",
                callback: "function(data) {printLog(data);}"
            }
        },
        muteSpeaker: {
            header: "cloudICP.dispatch.device.muteSpeaker(param)",
            params: {
                cid: "-1",
                callback: "function(data) {printLog(data);}"
            }
        },
        unmuteSpeaker: {
            header: "cloudICP.dispatch.device.unmuteSpeaker(param)",
            params: {
                cid: "-1",
                callback: "function(data) {printLog(data);}"
            }
        },
        muteMic: {
            header:"cloudICP.dispatch.device.muteMic(param)",
            params:{
                cid: "-1",
                callback:"function(data) {printLog(data);}"
            }
        },
        unmuteMic:{
            header:"cloudICP.dispatch.device.unmuteMic(param)",
            params:{
                cid: "-1",
                callback:"function(data) {printLog(data);}"
            }
        },
        querySoundDevice: {
            header: "cloudICP.dispatch.device.querySoundDevice(param)",
            params: {
                callback: "function(data) {printLog(data);}"
            }
        },
        assignSoundDevice: {
            header: "cloudICP.dispatch.device.assignSoundDevice(param)",
            params: {
                "cid": "1",    
                "number": "10086",    
                "outputDev": "aaa",    
                "inputDev": "bbbb",
                callback: "function(data) {printLog(data);}"
            }
        },
        sendDTMF: {
            header: "cloudICP.dispatch.device.sendDTMF(param)",
            params: {
                cid: "1044",
                function : "1",
                callback: "function(data) {printLog(data);}"
            }
        },
        queryCameraAbility: {
            header: "cloudICP.dispatch.device.queryCameraAbility(param)",
            params: {
                callback: "function(data) {printLog(data);}"
            }
        },
        stopPlayTone: {
            header: "cloudICP.dispatch.device.stopPlayTone(param)",
            params: {
                callback: "function(data) {printLog(data);}"
            }
        },
        getVersion: {
            header: "cloudICP.dispatch.device.getVersion(param)",
            params: {
                callback: "function(data) {printLog(data);}"
            }
        },
        initMRS: {
            header: "cloudICP.dispatch.device.initMRS(param)",
            params: {
                "mrsIp": "10.1.1.1",
                callback: "function(data) {printLog(data);}"
            }
        },
        forceInitMSP: {
            header: "cloudICP.dispatch.device.forceInitMSP(param)",
            params: {
                callback: "function(data) {printLog(data);}"
            }
        },
        setWindowInfo: {
            header: "cloudICP.dispatch.device.setWindowInfo(param)",
            params: {
                "cid": "12",
                "windowInfo": {
                    "width": "400",
                    "height": "400",
                    "posX": "0",
                    "posY": "0"
                },
                callback: "function(data) {printLog(data);}"
            }
        },
        getResolution: {
            header: "cloudICP.dispatch.device.getResolution(param)",
            params: {
                callback: "function(data) {printLog(data);}"
            }
        },
        snapshot: {
            header: "cloudICP.dispatch.device.snapshot(param)",
            params: {
                "cid": "12",
                "SnapshotPath": "d:/1126_1.bmp",
                "SnapshotFormat": "bmp",
                callback: "function(data) {printLog(data);}"
            }
        },
        RecordStart: {
            header: "cloudICP.dispatch.device.RecordStart(param)",
            params: {
                "cid": "12",
                "RecFile": "",
                "Type": "video",
                "MaxSize":"",
                callback: "function(data) {printLog(data);}"
            }
        },
        RecordStop: {
            header: "cloudICP.dispatch.device.RecordStop(param)",
            params: {
                "cid": "12",
                "Type": "video",
                callback: "function(data) {printLog(data);}"
            }
        },
        windowOnTop: {
            header: "cloudICP.dispatch.device.windowOnTop(param)",
            params: {
                "cid": "12",
                "isOnTop": true,
                callback: "function(data) {printLog(data);}"
            }
        }
    }
}