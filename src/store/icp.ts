import { defineStore } from 'pinia'

export const useIcpStore = defineStore({
  id: 'icp',
  state: ()=>({
    cloudICP: null,
    success: false,
    isdn: null,
    onCallConnect: [
      // { cid: 34, calltype: 'video' },
      // { cid: 33, calltype: 'monitor' },
    ]
  }),
  actions:{
    init(data) {
      this.cloudICP = data
    },
    addCall(data){
      this.onCallConnect.push(data)
    },
    reduceCall(val){
      let index = this.onCallConnect.findIndex(v=>v.cid == val.cid)
      this.onCallConnect.splice(index, 1)
    }
  },
  getters: {

  }
})