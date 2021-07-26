<template>
  <div>
    <h1 class="text-4xl font-bold text-center my-16">Login</h1>
    <div class="absolute inset-1/4">
      <div class="flex flex-col w-max mx-auto">
        <label>Username/Email:</label>
        <input v-model="user.username" type="text" class="border">
        <label>Password:</label>
        <input v-model="user.password" type="password" class="border">
        <button class="bg-lightGrey hover:bg-darkGrey my-4 rounded-sm font-semibold" @click="handleLogin">{{ isLoading ? 'Logging in' : 'Login' }}</button>
        <span>Don't have account? <nuxt-link to="/register">Register</nuxt-link></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware({ $cookies, redirect }) {
    if($cookies.get('jwt')) {
      return redirect('/dashboard')
    }
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    handleLogin() {
      this.isLoading = true
      if(!this.user.username) {
        this.$toast.error('username/email cannot be empty!')
        this.isLoading = false
      } else if(!this.user.password) {
        this.$toast.error('password cannot be empty!')
        this.isLoading = false
      } else {
        this.$store.dispatch('api/user/login', this.user)
          .then(res => {
            this.$cookies.set('jwt', res.data.token, {
              maxAge: 60 * 60 * 24
            })
            this.$router.push('/dashboard')
            this.$toast.success(res.data.msg)
            this.isLoading = false
          })
          .catch(err => {
            this.$toast.error(err.msg)
            this.isLoading = false
          })
      }
    }
  }
}
</script>

<style>

</style>
