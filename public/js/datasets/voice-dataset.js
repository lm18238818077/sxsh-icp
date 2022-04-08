var voice = {
    interfaces: {
        dial: {
            header: "cloudICP.dispatch.voice.dial(param)",
            params: {
                "to": "1044",
                "Answer-Mode": "1",     
                callback: "function(data) {printLog(data);}"
            }
        },
        answer: {
            header: "cloudICP.dispatch.voice.answer(param)",
            params: {
                "cid": "13",  
                callback: "function(data) {printLog(data);}"
            }
        },
        reject: {
            header: "cloudICP.dispatch.voice.reject(param)",
            params: {
                "cid": "13",     
                callback: "function(data) {printLog(data);}"
            }
        },
        release: {
            header: "cloudICP.dispatch.voice.release(param)",
            params: {
                "cid": "13",     
                callback: "function(data) {printLog(data);}"
            }
        },
        intercept: {
            header: "cloudICP.dispatch.voice.intercept(param)",
            params: {
                "to": "10087",     
                callback: "function(data) {printLog(data);}"
            }
        },
        hold: {
            header: "cloudICP.dispatch.voice.hold(param)",
            params: {
                "cid": "1",  
                callback: "function(data) {printLog(data);}"
            }
        },
        unhold: {
            header: "cloudICP.dispatch.voice.unhold(param)",
            params: {
                "cid": "1",  
                callback: "function(data) {printLog(data);}"
            }
        },
        transfer: {
            header: "cloudICP.dispatch.voice.transfer(param)",
            params: {
               "to": "1043",
                "speaker": "1044",      
                callback: "function(data) {printLog(data);}"
            }
        },
        cancelTransfer: {
            header: "cloudICP.dispatch.voice.cancelTransfer(param)",
            params: {
                "to": "1043",
                "speaker": "1044",       
                callback: "function(data) {printLog(data);}"
            }
        },
        breakOff: {
            header: "cloudICP.dispatch.voice.breakOff(param)",
            params: {
                "to": "1043",      
                callback: "function(data) {printLog(data);}"
            }
        },
        halfDial: {
            header: "cloudICP.dispatch.voice.halfDial(param)",
            params: {
                "to": "1043",        
                callback: "function(data) {printLog(data);}"
            }
        },
        releaseHalfDial: {
            header: "cloudICP.dispatch.voice.releaseHalfDial(param)",
            params: {
                "cid": "12",   
                callback: "function(data) {printLog(data);}"
            }
        },
        closeHalfDial: {
            header: "cloudICP.dispatch.voice.closeHalfDial(param)",
            params: {
                "cid": "12",   
                callback: "function(data) {printLog(data);}"
            }
        },
        discreetListen: {
            header: "cloudICP.dispatch.voice.discreetListen(param)",
            params: {
                "opType" : "start",
                "to": "1043",     
                callback: "function(data) {printLog(data);}"
            }
        },
        ambienceListen: {
            header: "cloudICP.dispatch.voice.ambienceListen(param)",
            params: {
                "to": "12",     
                callback: "function(data) {printLog(data);}"
            }
        },
        subscribeUserStatus: {
            header: "cloudICP.dispatch.voice.subscribeUserStatus(param)",
            params: {
                "reslist": [ 
                        {"isdn": "1043"}, 
                        {"isdn": "1044"}
                ],             
                callback: "function(data) {printLog(data);}"
            }
        },
        unsubscribeUserStatus: {
            header: "cloudICP.dispatch.voice.unsubscribeUserStatus(param)",
            params: {
                "reslist": [         
                    {"isdn": "1043"}, 
                    {"isdn": "1044"}
                ],
                callback: "function(data) {printLog(data);}"
            }
        },
        dialout: {
            header: "cloudICP.dispatch.voice.dialout(param)",
            params: {
                "to": "1044",
                callback: "function(data) {printLog(data);}"
            }
        },
        releaseDialout: {
            header: "cloudICP.dispatch.voice.releaseDialout(param)",
            params: {
                "cid": "13",
                callback: "function(data) {printLog(data);}"
            }
        },
        voiceBroadcast: {
            header: "cloudICP.dispatch.voice.voiceBroadcast(param)",
            params: {
                "to": "1008",
                "audioFile": "./audio/cn/403.wav",
                callback: "function(data) {printLog(data);}"
            }
        },
    }
}