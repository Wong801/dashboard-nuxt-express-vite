import { post } from '~/lib/misc/endpoint'

export const state = () => ({
  posts: null
})

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  }
}

export const actions = {
  async getPosts({ commit }) {
    const res = await this.$axios.get(post('get'), {
      headers: {
        'Authorization': `Bearer ${this.$cookies.get('jwt')}`
      }
    })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err.response.data)
      })
    await commit('setPosts', res.data.data)
  },
  uploadPost({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post(post('create'), payload, {
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
  deletePost({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.delete(post(`delete/${payload.id}`), {
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
  }
}
