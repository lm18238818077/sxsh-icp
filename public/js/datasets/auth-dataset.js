var auth = {
    interfaces: {
        unifiedLogin: {
            header: "cloudICP.dispatch.auth.unifiedLogin(param)",
            params: {
                user: '1042',
                password: '',
                force: 'false',
                callback: "function(data) {printLog(data);}"
            }
        },
        unifiedLogout: {
            header: "cloudICP.dispatch.auth.unifiedLogout(param)",
            params: {
                callback: "function(data) {printLog(data);}"
            }
        },
        unifiPasswordChange: {
            header: "cloudICP.dispatch.auth.unifiPasswordChange(param)",
            params: {
                "user": "",
                "newPassword": "",
                "oldPassword": "",
                callback: "function(data) {printLog(data);}"
            }
        },
    }
}