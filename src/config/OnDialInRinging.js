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
  },
  OnGroupCallStatusNotify: {
    rsp: {
      4027: '组呼激活',
      4028: '组呼未激活',
    },
    value: {
      grpid: '组呼群组号',
      name: '主讲方名字',
      speaker: '主讲方id',
    }
  }
}