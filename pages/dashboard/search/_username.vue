<template>
  <div class="w-1/2 mx-auto py-6 flex flex-col gap-y-8">
    <div class="flex gap-x-4">
      <input v-model="search.username" type="search" class="border px-1 border-darkGrey focus:outline-none focus:border-black w-full text-center" placeholder="Search for user..." @keyup.enter="findUser">
      <button class="bg-lightGrey focus:outline-none px-2 rounded-md hover:bg-darkGrey" @click="findUser">Search</button>
    </div>
    <div v-if="searchedUser" class="flex border border-lightGrey w-full px-6 py-4 rounded-lg gap-x-4 justify-between">
      <div class="flex flex-col w-full gap-y-2">
        <p class="text-xl font-bold px-20">{{ searchedUser.username }}</p>
        <div class="border"></div>
        <p class="text-sm text-darkGrey px-20">{{ searchedUser.firstName }} {{ searchedUser.lastName }}</p>
      </div>
      <button :class="searchedUser.username === user.username ? 'hidden' : ''" class="whitespace-nowrap bg-lightGreen hover:bg-darkGreen my-4 px-2 rounded-md font-bold text-white">+ Add</button>
    </div>
    <div v-else class="flex border border-lightGrey w-full px-6 py-4 rounded-lg gap-x-4 justify-between">
      <div class="flex flex-col w-full gap-y-2">
        <p class="text-xl font-bold px-20"> </p>
        <div class="border"></div>
        <p class="text-sm text-darkGrey px-20"> </p>
      </div>
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
  data() {
    return {
      search: {
        username: ''
      }
    }
  },
  computed: {
    searchedUser() {
      return this.$store.state.api.user.searchedUser
    },
    user() {
      return this.$store.state.api.user.userInfo
    }
  },
  async created() {
    if(this.$route.params.username || this.$store.state.helper.search.searchParam) {
      await this.$store.dispatch('api/user/findUser', this.$route.params.username || this.$store.state.helper.search.searchParam)
      .then((res) => {
        if(res.success) {
          this.$toast.success(res.msg)
        } else {
          this.$toast.error(res.msg)
        }
      })
    }
  },
  mounted() {
    if(!this.user) {
      this.$store.dispatch('api/user/getUser');
    }
  },
  methods: {
    findUser() {
      this.$store.commit('helper/search/setSearchParam', this.search.username)
      this.$router.push({ 
        name: 'dashboard-search-username',
        params: {
          username: this.search.username
        }
      })
    }
  }
}
</script>

<style>

</style>
