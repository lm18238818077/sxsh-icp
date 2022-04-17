import { defineStore } from 'pinia'

export const useIcpStore = defineStore({
  id: 'icp',
  state: ()=>({
    cloudICP: null,
    success: false,
    callCurrent: '',  //正在呼入的号码
    isdn: null,
    onCallConnect: []
  }),
  actions:{
    init(data) {
      this.cloudICP = data
    },
    addCall(data){
      this.onCallConnect.push(data)
    },
    reduceCall(id){
      let index = this.onCallConnect.findIndex(v=>v.cid == id)
      this.onCallConnect.splice(index, 1)
    }
  },
  getters: {

  }
})