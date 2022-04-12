let sdkStatusNotify = {
    0: 'SDK初始化成功',
    1: '连接本地守护进程失败，通过重新加载页面的方式初始化SDK',
    2: '表示连接本地媒体服务失败，通过重新加载页面的方式初始化SDK',
    3: '获取本地ip失败，通过重新加载页面的方式初始化SDK',
    4: '获取本地摄像头失败，通过重新加载页面的方式初始化SDK',
}

let sameStatus = {
    '10000': '服务端，用户鉴权失败，需要重新登录。',
    '10001': '服务端参数校验不合法，请检查参数。',
    '10002': '服务端异常，请联系管理员。',
    '-1': '请求发送到服务器的失败的异常。',
    '-2': '请求参数校验不合法。',
    '-3': '用户尚未登录',
}

let voiceDial = {
    '-4': '存在一个通话正在振铃，应答通话之前不能发起点呼。',
    '-5': '并发数量超出规定数量',
    '-6': '与其他通话业务冲突',
    ...sameStatus
}

let voiceAnswer = {
    '-4': '通话并发数量受到限制',
    '-5': '当前有通话业务与该业务冲突',
    ...sameStatus
}

let voiceReject = {
    '-4': '无法拒接该cid，该cid对应的呼叫可能在通话中。',
    ...sameStatus
}

let voiceRelease = {
    '-4': '被叫不能挂断正在振铃的呼叫',
    ...sameStatus
}

let videoDial = {
    '-4': '存在一个通话正在振铃，响应之前不能发起点呼。',
    '-5': '当前摄像头不支持该分辨率',
    '-7': '视频能力有限',
    '-8': '与其他通话业务冲突',
    ...sameStatus
}

let videoAnswer = {
    '-4': '该cid可能已经在通话中。',
    '-6': '当前有通话业务与该业务冲突',
    '-7': '视频能力有限',
    ...sameStatus
}

let videoReject = {
    '-4': '该cid可能已经在通话中。',
    ...sameStatus
}

let videoRelease = {
    '-4': '被叫不能挂断正在振铃的通话',
    ...sameStatus
}

let videoMonitor = {
    '-5': '并发数量超出规定数量',
    ...sameStatus
}



export {
    sdkStatusNotify,
    voiceDial,
    voiceAnswer,
    voiceReject,
    voiceRelease,
    videoDial,
    videoAnswer,
    videoReject,
    videoRelease,
    videoMonitor
}