var sms = {
    interfaces: {
        sendDispSMS: {
            header: "cloudICP.dispatch.sms.sendDispSMS(param)",
            params: {
                dest: "1044",
                content: "nihao!!!!!",
				locationshare: "121.47;31.23;10;shanghai",
                callback: "function(data) {printLog(data);}"
            }
        },
        sendDispMMS: {
            header: "cloudICP.dispatch.sms.sendDispMMS(param)",
            params: {
                    "dest": [
                        { "isdn": "3007", "msgid": "1562402131549" }, { "isdn": "3006", "msgid": "1562402162434" }
                    ],
                    "content": "nihao!!!!!",
                    "attach": "test.txt",
                    "callback": "function(data) {printLog(data);}"
            }
        }
    }
}