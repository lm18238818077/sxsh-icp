export default{
  OnDialInRinging: {
    rsp: {
      2002: '语音呼入振铃事件',
      3002: '视频呼入振铃事件',
      3011: '视频分发呼入振铃事件',
    },
    value: {
      callee: '',
      caller: '',
      cid: '',
      calltype: {
        video: '视频呼叫',
        voice: '语音呼叫',
        discreetlisten: '缜密侦听',
        monitor: '监控视频',
        halfdial: '半双工点呼',
        dispatch: '分发',
      }
    }
  }
}