
const state = () => ({
  icp: null
})


// actions
const actions = {

}

// mutations
const mutations = {
  save (state, data) {
    state.icp = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}