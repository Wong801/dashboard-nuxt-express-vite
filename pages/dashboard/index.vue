<template>
  <div>
    <div v-if="user" class="flex justify-end px-4 gap-x-2">
      <p>Welcome <nuxt-link to="/dashboard/profile" class="font-bold">{{ user.username }}</nuxt-link>,</p>
      <button class="hover:underline" @click="handleLogout">logout</button>
    </div>
  </div>
</template>

<script>
export default {
  middleware({ $cookies, redirect }) {
    if(!$cookies.get('jwt')) {
      return redirect('/login')
    }
  },
  computed: {
    user() {
      return this.$store.state.api.user.userInfo
    }
  },
  async created() {
    await this.$store.dispatch('api/user/getUser')
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('api/user/logout')
        .then(res => {
          this.$cookies.remove('jwt');
          this.$router.push('/');
          this.$toast.success(res.data.msg)
        })
    }
  }
}
</script>

<style>

</style>
