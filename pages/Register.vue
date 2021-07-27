<template>
  <div>
    <h1 class="text-4xl font-bold text-center my-16">Register</h1>
    <div class="absolute inset-1/4">
      <div class="flex flex-col w-max mx-auto">
        <label>Email:</label>
        <input v-model="user.email" type="email" class="border" @keyup.enter="handleRegister">
        <label>First Name:</label>
        <input v-model="user.firstName" type="text" class="border" @keyup.enter="handleRegister">
        <label>Last Name:</label>
        <input v-model="user.lastName" type="text" class="border" @keyup.enter="handleRegister">
        <label>Username:</label>
        <input v-model="user.username" type="text" class="border" @keyup.enter="handleRegister">
        <label>Password:</label>
        <input v-model="user.password" type="password" class="border" @keyup.enter="handleRegister">
        <label>Confirm Password:</label>
        <input v-model="passwordConfirm" type="password" class="border" @keyup.enter="handleRegister">
        <span class="text-xs">{{ passwordConfirm === user.password ? '' : 'Confirm Password does not match' }}</span>
        <button class="bg-lightGrey hover:bg-darkGrey my-4 rounded-sm font-semibold" @click="handleRegister">Register</button>
        <span>Already have account? <nuxt-link to="/login">Login</nuxt-link></span>
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
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',

      },
      passwordConfirm: ''
    }
  },
  methods: {
    handleRegister() {
      if(!this.user.email || !this.user.firstName || !this.user.lastName || !this.user.username || !this.user.password) {
        this.$toast.error('Please fill all fields!')
      } else if(this.user.password !== this.passwordConfirm) {
        this.$toast.error('Confirm password does not match with password')
      } else {
        this.$store.dispatch('api/user/register', this.user)
          .then(res => {
            this.$router.push('/login')
            this.$toast.success(res.data.msg)
          })
          .catch(err => this.$toast.error(err.msg))
      }
    }
  }
}
</script>

<style>

</style>
