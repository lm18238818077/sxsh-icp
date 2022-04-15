import { defineStore } from 'pinia'

export const useIcpStore = defineStore({
  id: 'icp',
  state: ()=>({
    cloudICP: null,
    success: false,
    callCurrent: ''
  }),
  actions:{
    init(data) {
      this.cloudICP = data
    },
  },
  getters: {

  }
})