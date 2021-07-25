<template>
  <div>
    <h1 class="text-4xl font-bold text-center my-16">Login</h1>
    <div class="absolute inset-1/4">
      <div class="flex flex-col w-max mx-auto">
        <label>Username/Email:</label>
        <input v-model="user.username" type="text" class="border">
        <label>Password:</label>
        <input v-model="user.password" type="password" class="border">
        <button class="bg-lightGrey hover:bg-darkGrey my-4 rounded-sm font-semibold" @click="handleLogin">Login</button>
        <span>Don't have account? <nuxt-link to="/register">Register</nuxt-link></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      if(!this.user.username) {
        this.$toast.error('username/email cannot be empty!')
      } else if(!this.user.password) {
        this.$toast.error('password cannot be empty!')
      } else {
        this.$axios.post('/api/user/login', this.user)
          .then(res =>{
            this.$cookies.set('jwt', res.data.token)
            this.$toast.success(res.data.msg)
          })
          .catch(err => this.$toast.error(err.response.data.msg));
      }
    }
  }
}
</script>

<style>

</style>
