export const state = () => ({
  searchParam: ''
})

export const mutations = {
  setSearchParam(state, payload) {
    state.searchParam = payload
  }
}