var video = {
    interfaces: {
        monitorVideo: {
            header: "cloudICP.dispatch.video.monitorVideo(param)",
            params: {
                "to": "12",
                "monitorParam": {
                    "fmt": "4K",
                    "mute": "0",
                    "confirm": "0",
                    "camera": "0",
                    "showToolbar": 1,
                    "buttonIDs": 7,
                    "videooffer": "3"               
                },
                callback: "function(data) {printLog(data);}"
            }
        },
        dialVideo: {
            header: "cloudICP.dispatch.video.dialVideo(param)",
            params: {
                "to": "12",
                "dialVideoParam":{ 
                "fmt":"1080P",
                "showToolbar": 1,
                "buttonIDs": 7
               },
                callback: "function(data) {printLog(data);}"
            }
        },
        answer: {
            header: "cloudICP.dispatch.video.answer(param)",
            params: {
                "cid": "12",
                "windowInfo": {
                    "width": "400",
                    "height": "400",
                    "posX": "0",
                    "posY": "0",
                    "showToolbar": 1,
                    "buttonIDs": 7
                },
                callback: "function(data) {printLog(data);}"
            }
        },
        reject: {
            header: "cloudICP.dispatch.video.reject(param)",
            params: {
                "cid": "12",     
                callback: "function(data) {printLog(data);}"
            }
        },
        release: {
            header: "cloudICP.dispatch.video.release(param)",
            params: {
               "cid": "12",  
                callback: "function(data) {printLog(data);}"
            }
        },
        dispatchVideo: {
            header: "cloudICP.dispatch.video.dispatchVideo(param)",
            params: {
                "src": "4016",
                "fmt": "720P",
                "dest":[ 
                    { 
                        "isdn": "1042"
                    }, 
                    { 
                        "isdn": "1043"
                    }, 
                ], 
                "destGroups":[ 
                    { 
                        "isdn": "4001"
                    }, 
                    { 
                        "isdn": "4002"
                    }, 
                ],    
                callback: "function(data) {printLog(data);}"
            }
        },
        cancelVideoDispatch: {
            header: "cloudICP.dispatch.video.cancelVideoDispatch(param)",
            params: {
                "src": "4016", 
                "dest": "1212",      
                "destGroup": "4001", 
                callback: "function(data) {printLog(data);}"
            }
        },
        startVideoUploadWall: {
            header: "cloudICP.dispatch.video.startVideoUploadWall(param)",
            params: {
                "src": "4016", 
                "channel": "70006",      
                callback: "function(data) {printLog(data);}"
            }
        },
        stopVideoUploadWall: {
            header: "cloudICP.dispatch.video.stopVideoUploadWall(param)",
            params: {
                "src": "4016",
                "channel": "70006",
                callback: "function(data) {printLog(data);}"
            }
        },
        ptzctrlCamera: {
            header: "cloudICP.dispatch.video.ptzctrlCamera(param)",
            params: {
                "to": "12", 
                "act": "1",
                "value": "5",
                "showToolbar": 1,
                "buttonIDs": 7,
                callback: "function(data) {printLog(data);}"
            }
        },
    }
}