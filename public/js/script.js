/**
 * A object manage dataset and i18n resources
 * 
 * dataset: a object, represent dataset
 * 
 * init() read i18n and dataset resources from files
 * set lang(value) change language and trigger ui fresh
 */
Config = $.extend(Config, {

    dataset: {},

    backupDataset: {},

    // location of the dataset file
    _datasetUrl: './assets/dataset.json',

    // location of the i18n file
    _i18nUrl: './assets/strings_zh.properties',

    // language, 'cn' represent Chinese and 'en' represent English
    _lang: 'cn',

    // i18n key-value sets
    _i18n: { "cn": null },

    // a event tell dataset is loaded
    _datasetReadyEvent: null,

    // a event to trigger refreshing the whole page
    _triggerRefreshEvent: null,

    /**
     * init() function
     */
    init: function() {
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
        if (isIE) {
            this._datasetReadyEvent = document.createEvent("Event");
            this._datasetReadyEvent.initEvent('dataset-ready', true, true);
            this._triggerRefreshEvent = document.createEvent("Event");
            this._triggerRefreshEvent.initEvent('trigger-refresh-event', true, true);
        } else {
            this._datasetReadyEvent = new CustomEvent("dataset-ready", { "defail": "none" });
            this._triggerRefreshEvent = new CustomEvent("trigger-refresh-event", { "defail": "none" });
        }

        document.addEventListener("dataset-ready", function(e) {
            Config._readI18n();
        });

        this._readDataSet();
    },

    /**
     * lang() change language and trigger ui fresh
     * 
     * @param {String} value language,'cn' represent Chinese and 'en' represent English
     */
    set lang(value) {
        if (value == 'cn') {
            this._lang = 'cn';
            this._i18nUrl = './assets/strings_zh.properties';
            this._i18nGetter = function() { return this._i18n.cn };
        } else {
            this._lang = 'en';
            this._i18nUrl = './assets/strings_en.properties';
            this._i18nGetter = function() { return this._i18n.en };
        }

        this._readI18n();
    },

    /**
     * i18n() according to current language, assign i18n resources to relatived value
     * 
     * @param {Object} value i18n resourecs
     */
    set i18n(value) {
        if (this._lang == 'cn') {
            this._i18n.cn = value;
        } else {
            this._i18n.en = value;
        }
    },

    /**
     * i18n() according to current language, return relatived value 
     * 
     * @return {Object} i18n resourecs
     */
    get i18n() {
        return this._i18nGetter();
    },

    /**
     * _i18nGetter() according to current language, return relatived value 
     * 
     * @return {Object} i18n resourecs
     */
    _i18nGetter: function() { return this._i18n.cn },

    /**
     * _readDataSet() read dataset from the file by ajax. A dataset-ready event will be emited.
     */
    _readDataSet: function() {
        Config.dataset = {
            models: {
                "auth": auth,
                "voice": voice,
                "video": video,
                "group": group,
                "conf": conf,
                "sms": sms,
                "gis": gis,
                "query": query,
                "device": device
            }
        };



        Config.backupDataset = JSON.parse(JSON.stringify(Config.dataset));
        Config._readI18n();
        document.dispatchEvent(Config._datasetReadyEvent);
    },

    /**
     * _readI18n() read i18n from the file by ajax. A trigger-refresh-event event will be emited.
     */
    _readI18n: function() {
        // if current language is loaded, emit the event.
        if (this._i18n[this._lang] != null) {
            document.dispatchEvent(Config._triggerRefreshEvent);
            return;
        } else {
            this._i18n[this._lang] = {};
        }

        if (this._lang == 'cn') {
            parse(i18nCn)
        } else {
            parse(i18nEn)
        }

        // ajax callback function        
        function parse(json) {
            let newDataset = {};

            for (value in json) {
                let arr = value.split('.');

                let ite = newDataset;

                function forFunc(v, i, a) {
                    if (ite[v] == null) {
                        ite[v] = {}
                    }

                    if (i == arr.length - 1) {
                        if (!$.isEmptyObject(ite[v])) {}
                        ite[v] = decodeURI(json[value]);
                        ite = newDataset;
                    } else {
                        ite = ite[v]
                    }
                }

                arr.forEach(forFunc)
            }

            Config.i18n = newDataset;
            document.dispatchEvent(Config._triggerRefreshEvent);
        }
    },
});

/**
 * A object manage ui
 * 
 * currentGroup: string, current model
 * currentInterface: string, current interface
 * 
 * init() initialized eidtors and add eventlisteners
 * refreshPage(value) refresh the whole page according to current dataset and i18n resources.
 */
var uiManager = {
    isSilence: false,

    currentGroup: 'auth',

    currentInterface: 'unifiedLogin',

    _colorChanged: null,

    /**
     * init() function
     */
    init: function() {
        this._initEventListener();
    },

    /**
     * refreshPage() refresh the whole page according to current dataset and i18n resources.
     */
    refreshPage: function() {
        if (!$.isEmptyObject(Config.dataset)) {
            $("#interface-name").text(Config.dataset.models[this.currentGroup].interfaces[this.currentInterface].header);

            let str = JSON.stringify(Config.dataset.models[this.currentGroup].interfaces[this.currentInterface].params, null, 4);

            let findex = str.indexOf("function(data) {printLog(data);}");
            let eindex = findex + "function(data) {printLog(data);}".length;

            let newStr = str.substr(0, findex - 1) + str.substr(findex, "function(data) {printLog(data);}".length) + str.substr(eindex + 1);
            // this.inputEditor.setValue(Config.dataset.models[this.currentGroup].interfaces[this.currentInterface].params);
            if (uiManager.currentInterface == 'unifiedLogin') {
                $('#input-editor').val("{\n    \"callback\": function(data) {printLog(data);}\n}");
                $('.common-label-input').attr('style', 'display: none');
                $('.common-label-loginonly').attr('style', 'display: unset');
            } else if (uiManager.currentInterface == 'unifiPasswordChange') {
                $('#input-editor').val("{\n    \"user\": \"10086\" \n    \"oldPassword\": \"*****\" \n    \"newPassword\": \"*****\" \n    \"callback\": function(data) {printLog(data);}\n}");
                $('.common-label-input').attr('style', 'display: none');
                $('.common-label-loginonly').attr('style', 'display: unset');
            } else{
                $('#input-editor').val(newStr);
                $('.common-label-input').attr('style', 'display: unset');
                $('.common-label-loginonly').attr('style', 'display: none');
            }


            if (Config.dataset.models[uiManager.currentGroup].interfaces[uiManager.currentInterface]["response"]) {
                this.insertResponseEditor(Config.dataset.models[uiManager.currentGroup].interfaces[uiManager.currentInterface]["response"])
            } else {
                this.insertResponseEditor('')
            }

            if (this.isSilence) {
                $('#silenc-mode-btn').text(Config.i18n.common.label.silencemode)
                $('.dark-primary-color').css({ "background-color": "black" });
                $('.accent-color').css({ "background-color": "black" });
                $('.light-primary-color').attr("style", "background-color: gray !important");
                $('#reset-log').mouseover(function() {
                    $(this).attr("style", "background-color: gray !important");
                }).mouseout(function() {
                    $(this).removeAttr("style");
                });
            } else {
                $('#silenc-mode-btn').text(Config.i18n.common.label.toomanymessages)
                $('.dark-primary-color').css({ "background-color": "#0097A7" });
                $('.accent-color').css({ "background-color": "#009688" });
                $('.light-primary-color').attr("style", "background-color: #B2EBF2 !important");
                $('#reset-log').mouseover(function() {
                    $(this).attr("style", "background-color: #00BCD4 !important");
                }).mouseout(function() {
                    $(this).removeAttr("style");
                });
            }
        }

        this._iterate(Config.i18n, '');
    },

    /**
     * insertResponseEditor(msg) insert string into response editor
     */
    insertResponseEditor: function(msg) {
        Config.dataset.models[uiManager.currentGroup].interfaces[uiManager.currentInterface].response = msg;
        $('#response-editor').val(JSON.stringify(msg, null, 4));
    },

    editorOnChange: function() {
        let index = $('#input-editor').val().indexOf('function(data) {printLog(data);}')
        let str = $('#input-editor').val().substr(0, index) + " null}";
        try {
            var param = JSON.parse(str);
        } catch (err) {
            window.alert(err);
            Config.dataset.models[this.currentGroup].interfaces[this.currentInterface].params = 
                $.extend(Config.dataset.models[this.currentGroup].interfaces[this.currentInterface].paramsfig,
                    Config.backupDataset.models[this.currentGroup].interfaces[this.currentInterface].params
                )
            this.refreshPage();
            return;
        }
        param["callback"] = "function(data) {printLog(data);}"
        Config.dataset.models[this.currentGroup].interfaces[this.currentInterface].params = param;
    },

    /**
     * langChange() click function, change language
     */
    langChange: function(value) {
        if (value == 1) {
            Config.lang = 'cn';
        } else {
            Config.lang = 'en';
        }
    },

    /**
     * groupTitleClick() click function
     */
    groupTitleClick: function(index) {
        if ($('#sublist-' + index).css('display') == 'none') {
            $('#sublist-' + index).css('display', 'block');
        } else {
            $('#sublist-' + index).css('display', 'none');
        }
    },

    /**
     * isSilenceClick() click function
     */
    isSilenceClick: function() {
        this.isSilence = !this.isSilence;
        var func;

        if (this.isSilence == true) {
            func = function() {};
        } else {
            func = function(data) {
                if (data["eventName"] == "OnDispatchKickOutNotifyEvent") {
                    $("#logined-user").text(Config.i18n.common.label.usernotlogined);
                    window.alert(Config.i18n.common.label.kickout);
                }
                printLog(data, true);
            }
        }

        cloudICP.dispatch.event.register({"eventType":"MSPNotify", "eventName": "OnVDMStatusNotify", "callback": func});
        cloudICP.dispatch.event.register({"eventType": "GroupNotify", "eventName": "OnTalkingGroupStatusChange", "callback": func});
        cloudICP.dispatch.event.register({"eventType": "GroupNotify", "eventName": "OnTalkingGroupFixedMemberChange", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"GroupNotify", "eventName": "OnTalkingGroupTerminalMemberChange", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"GroupNotify", "eventName": "OnDynamicGroupStateChange", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"GroupNotify", "eventName": "OnDynamicGroupMemberChange", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"GroupNotify", "eventName": "OnDynamicGroupOptFailed", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"GroupNotify", "eventName": "OnPatchGroupStateChange", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"GroupNotify", "eventName": "OnPatchGroupMemberChange", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"GroupNotify", "eventName": "OnDynamicGroupMemberChangeFailure", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"ModuleNotify", "eventName": "OnDisConnection", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"ModuleNotify", "eventName": "OnConnection", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"VoiceNotify", "eventName": "OnUserStatusNotify", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"VoiceNotify", "eventName": "OnUserStatusNotify", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"GroupCallNotify", "eventName": "OnGroupCallStatusNotify", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"GroupNotify", "eventName": "OnTalkingGroupMemberChange", "callback": func});
        cloudICP.dispatch.event.register({"eventType":"MsNotify", "eventName": "OnRecvStateMsgNotify", "callback": func});

        this.refreshPage();
    },

    /**
     * groupTitleClick() click function
     */
    resetLog: function() {
        $('#log-area').val('');
    },

    /**
     * inputReset() click function, reset values of input editor
     */
    inputReset: function() {
        Config.dataset.models[this.currentGroup].interfaces[this.currentInterface].params = {};

        Config.dataset.models[this.currentGroup].interfaces[this.currentInterface].params =
        $.extend(Config.dataset.models[this.currentGroup].interfaces[this.currentInterface].params,
            Config.backupDataset.models[this.currentGroup].interfaces[this.currentInterface].params
        );

        if (Config.dataset.models[uiManager.currentGroup].interfaces[uiManager.currentInterface]["response"]) {
            Config.dataset.models[uiManager.currentGroup].interfaces[uiManager.currentInterface]["response"] = '\"\"';
        }
        this.refreshPage();
    },

    loginClick: function() {
        Config.dataset.models["auth"].interfaces["unifiedLogin"].params = {
            user: $('#input-isdn').val(),
            password: $('#input-password').val(),
            force: $('#input-force').is(':checked').toString()
        }
        invokeCloudICPSDK("auth", "unifiedLogin");
        return;
    },

    changePWDClick: function() {
        if ($('#re-enter-password').val() != $('#new-password').val()) {
            alert("Re-Enter password should equal with new password.")
            return;
        }
        Config.dataset.models["auth"].interfaces["unifiPasswordChange"].params = {
            user: $('#input-user').val(),
            oldPassword: $('#old-password').val(),
            newPassword: $('#new-password').val()
        }
        invokeCloudICPSDK("auth", "unifiPasswordChange");
    },

    changeMdcAddress: function () {
        var mdcIP = $('#input-mdcIp').val();
        var ansswer = confirm("确定需要改变mdc的ip地址？");
        if (ansswer && (undefined != cloudICP) && (undefined != cloudICP.dispatch)) {
            cloudICP.dispatch.webSocket.ModifyMdcIp({ mdcip: mdcIP,callback: cloudICP.dispatch.webSocket.getModifyMdcip });
        }
        return;
    },

    /**
     * _initEventListener() add event listener
     */
    _initEventListener: function() {
        document.addEventListener("dataset-ready", function(e) {
            var template = $.templates("#menuTemplate");
            var html = template.render(Config.dataset.models);
            $('#doc-list-placeholder').html(html);
            $('#sdk-server-ip-btn').text('SDK Server IP: ' + Config.serverAddress);

            $('.fakelink').each(function(index, value) {
                $(this).click(function(event) {
                    event.preventDefault();


                    uiManager.currentInterface = $(this).attr('mytag');
                    uiManager.currentGroup = $(this).parent().parent().attr('mytag');

                    if (uiManager.currentInterface == 'unifiedLogin') {
                        $("#login-input-block").removeAttr("style");
                        $("#change-password-block").attr("style", "display: none");
                        $("#change-mdcip-block").attr("style", "display: none");
                        $('#reset-click').attr("style", "display: none");
                        $('#send-click').attr("style", "display: none");
                        $("#input-editor").prop("disabled", true);
                    } else if(uiManager.currentInterface == 'unifiPasswordChange') {
                        $("#change-password-block").removeAttr("style");
                        $("#change-mdcip-block").removeAttr("style");
                        $("#login-input-block").attr("style", "display: none");
                        $('#reset-click').attr("style", "display: none");
                        $('#send-click').attr("style", "display: none");
                        $("#input-editor").prop("disabled", true);
                        $("#video-container").attr("style", "display: none");
                        if ((undefined != cloudICP) && (undefined != cloudICP.dispatch)) {
                            $('#input-mdcIp').val(cloudICP.config["mdcip"]);
                            $('#msp-version').html("[mspVersion:" + cloudICP.config["mspVersion"] + "]");
                            cloudICP.dispatch.webSocket.getLocalIp({ callback: cloudICP.dispatch.webSocket.getLocalIpCallBack });
                        }
                    } else {
                        $("#login-input-block").attr("style", "display: none");
                        $("#change-password-block").attr("style", "display: none");
                        $("#change-mdcip-block").attr("style", "display: none");
                        $('#reset-click').attr("style", "display: unset");
                        $('#send-click').attr("style", "display: unset");
                        $("#input-editor").prop("disabled", false);
                    }

                    $('#body-model-name').removeClass();
                    $('#body-model-name').addClass(uiManager.currentGroup + '-modelname');

                    $('#body-interface-name').removeClass();
                    $('#body-interface-name').addClass(uiManager.currentGroup + '-interfaces-' + uiManager.currentInterface);

                    $('#send-click').attr('onclick', 'invokeCloudICPSDK(uiManager.currentGroup,uiManager.currentInterface)');

                    if (uiManager._colorChanged != null) {
                        uiManager._colorChanged.removeClass('light-primary-color')
                        uiManager._colorChanged.removeAttr("style");
                    }

                    $(this).addClass('light-primary-color');
                    if (uiManager.isSilence) {
                        $('.light-primary-color').attr("style", "background-color: gray !important");
                    }

                    uiManager._colorChanged = $(this);

                    document.dispatchEvent(Config._triggerRefreshEvent);
                    return false;
                });

                if (index == 0) {
                    $(this).parent().parent().prev().click();
                    $(this).click();
                }
            });
        });

        document.addEventListener("trigger-refresh-event", function(e) {
            uiManager.refreshPage();
        });
    },

    /**
     * _iterate() recursivly process object
     */
    _iterate: function(obj, parent) {
        if (parent != '') {
            parent = parent + '-';
        }

        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] == "object") {
                    this._iterate(obj[property], parent + property);
                } else {
                    if (property != '') {
                        $('.' + parent + property).text(obj[property])
                    }
                }
            }
        }
    }
}

/**
 * invokeCloudICPSDK(modelname, interface) invoke cloud icp sdk
 * @param {String} modelname
 * @param {String} interface
 */
function invokeCloudICPSDK(modelname, interface) {
    let params = Config.dataset.models[uiManager.currentGroup].interfaces[uiManager.currentInterface].params;
    let heads = Config.dataset.models[uiManager.currentGroup].interfaces[uiManager.currentInterface].header;
    if (heads.split(".") instanceof Array) {
        modelname = heads.split(".")[2];
    }


    var passInPrams = {}
    passInPrams = $.extend(passInPrams, params);
    if (interface == 'loginToMDC') {
        passInPrams['callback'] = function(data) {
            if (data["rsp"] == 0) {
                $("#logined-user").text(Config.i18n.common.label.user + Config.dataset.models.auth.interfaces.loginToMDC.params.isdn);
            }
            printLog(data);
        };
    } else if (interface == 'unifiedLogin') {
        passInPrams['callback'] = function(data) {
            if (data["rsp"] == 0) {
                $("#logined-user").text(Config.i18n.common.label.user + Config.dataset.models.auth.interfaces.unifiedLogin.params.user);
            }
            printLog(data);
        };
    } else if (interface == 'unifiedLogout') {
        passInPrams['callback'] = function(data) {
            if (data["rsp"] == 0) {
                $("#logined-user").text(Config.i18n.common.label.usernotlogined);
            }
            printLog(data);
        };
    } else if (interface == 'unifiPasswordChange') {
        passInPrams['callback'] = function (data) {
            if (data["rsp"] == 0) {
                $("#logined-user").text(Config.i18n.common.label.usernotlogined);
            }
            printLog(data);
        };
    }else if (interface == 'logoutFromMDC') {
        passInPrams['callback'] = function(data) {
            if (data["rsp"] == 0) {
                $("#logined-user").text(Config.i18n.common.label.usernotlogined);
            }
            printLog(data);
        };
    } else {
        passInPrams['callback'] = function(data) {
            if (uiManager.isSilence) {
                if (modelname == "query") {
                    var modiData = {};
                    modiData["rsp"] = data["rsp"];
                    modiData["desc"] = data["desc"];
                    printLog(modiData);
                    return;
                }
            }
            printLog(data);
        };
    }

    // check if the custom function call is defined
    if (undefined == this[modelname] || undefined == this[modelname][interface]) {
        cloudICP['dispatch'][modelname][interface](passInPrams);
    } else {
        this[modelname][interface](passInPrams);
    }
}

function format(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

function printLog(msg, isEvent) {
    if (uiManager.isSilence) {
        if (msg["eventName"] == "OnRecvGISNotify" ||
            msg["eventName"] == "OnUserStatusNotify") {
            return;
        }
    };

    var logMsg = 'Event';
    if (isEvent == null) {
        uiManager.insertResponseEditor(msg);
        return;
    }

    var date = new Date().format("yyyy-MM-dd hh:mm:ss");
    $('#log-area').val($('#log-area').val() + '[' + date + '] ' + logMsg + ': ' + JSON.stringify(msg) + '\n');
    $('#log-area').scrollTop($('#log-area')[0].scrollHeight);
}

uiManager.init();
Config.init();

//initialize CloudICP js sdk
let config = {
    serverWSPort: Config.serverWSPort,
    serverAddress: Config.serverAddress,
    serverHttpPort: Config.serverHttpPort,
    debugMode: Config.debugMode,
    udcIP: Config.udcIP,
    udcPort: Config.udcPort,
    ringFlag: Config.ringFlag,
    mediaType: Config.mediaType,
    mode: Config.mode, //plugins 插件模式 window 弹窗模式
    ssl_enable: Config.ssl_enable
}

ICPSDK_Dispatch_Event.prototype.printEvent = function(data) {
    if (data["eventName"] == "OnDispatchKickOutNotifyEvent") {
        $("#logined-user").text(Config.i18n.common.label.usernotlogined);
        window.alert(Config.i18n.common.label.kickout);
    }
    printLog(data, true);
}

config["sdkStatusNotify"] = function(data) {
    var date = new Date().format("yyyy-MM-dd hh:mm:ss");
    $('#log-area').val($('#log-area').val() + '[' + date + '] SDK Status Nofity : ' + JSON.stringify(data) + '\n');
    $('#log-area').scrollTop($('#log-area')[0].scrollHeight);
}

var icp = new ICPSDK(config);





// var timer;
// function startTimer(){clearTimeout(timer);timer=setTimeout(function(){
//     if (cloudICP.userInfo["isdn"]) {
//         cloudICP.dispatch.auth.unifiedLogout({"callback": function(data) {
//             if (data["rsp"] == 0) {
//                 $("#logined-user").text(Config.i18n.common.label.usernotlogined);
//                 window.alert(Config.i18n.common.label.autologout);
//             }
//         } })
//     }
// },600 *1000);}
// document.onmousemove=document.onmousedown=startTimer

