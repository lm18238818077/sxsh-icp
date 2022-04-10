import { defineStore } from 'pinia'

export const useIcpStore = defineStore({
  id: 'icp',
  state: ()=>({
    cloudICP: null
  }),
  actions:{
    init(data) {
      this.cloudICP = data
    },
  },
  getters: {

  }
})