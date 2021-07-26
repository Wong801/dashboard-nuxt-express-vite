import { user } from '~/lib/misc/endpoint'

export const state = () => ({
  userInfo: null
})

export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload
  }
}

export const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post(user('login'), payload)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.post(user('logout'), '',{
        headers: {
          'Authorization': `Bearer ${this.$cookies.get('jwt')}`
        }
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response.data)
      })
    })
  },
  async getUser({ commit }) {
    const res = await this.$axios.$post(user('getUser'), '',{
      headers: {
        'Authorization': `Bearer ${this.$cookies.get('jwt')}`
      }
    })
      .catch(err => {
        return err
      })
    if(res.success) {
      await commit('setUserInfo', res.data)
    }
  }
}
