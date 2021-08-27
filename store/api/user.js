import { user } from '~/lib/misc/endpoint'

export const state = () => ({
  userInfo: null,
  searchedUser: null
})

export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  setSearchedUser(state, payload) {
    state.searchedUser = payload
  }
}

export const actions = {
  register({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post(user('register'), payload)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data)
        })
    })
  },
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
    try {
      await this.$axios.get(user('get'), {
        headers: {
          'Authorization': `Bearer ${this.$cookies.get('jwt')}`
        }
      }).then((res) => {
        commit('setUserInfo', res.data.data)
        return res.data
      })
    } catch(err) {
      return err
    }
  },
  findUser({ commit }, username) {
    return new Promise((resolve, reject) => {
      this.$axios.get(user('search'), {
        params: {
          username
        },
        headers: {
          'Authorization': `Bearer ${this.$cookies.get('jwt')}`
        }
      }).then(res => {
        commit('setSearchedUser', res.data.data)
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
