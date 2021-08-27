<template>
  <div :class="posts ? '': 'cursor-wait'">
    <div class="flex flex-col lg:flex-row justify-center lg:justify-between px-10 gap-x-2 gap-y-6 py-4">
      <div class="flex gap-x-4">
        <input v-model="search.username" type="search" class="border px-1 border-darkGrey focus:outline-none focus:border-black w-full lg:w-auto" placeholder="Search for user..." @keyup.enter="findUser">
        <button class="bg-lightGrey focus:outline-none px-2 rounded-md hover:bg-darkGrey" @click="findUser">Search</button>
      </div>
      <div v-if="user" class="flex ml-auto lg:mx-0">
        <p class="whitespace-nowrap">Welcome <button class="font-bold" @click="openProfile">{{ user.username }}</button>,</p>
        <button class="hover:underline" @click="handleLogout">logout</button>
      </div>
    </div>
    <div class="px-10 my-10">
      <div class="border-b">
        <div>
          <textarea v-model="content" rows="5" class="border border-darkGrey w-full whitespace-pre-wrap p-2 bg-white bg-opacity-50 focus:bg-opacity-90 focus:outline-none"></textarea>
          <div class="flex justify-end">
            <button class="my-4 p-2 bg-lightGrey rounded-md" @click="uploadPost">Create Post</button>
          </div>
        </div>
      </div>
      <div v-if="posts">
        <Post v-for="post in posts" :key="post._id" :post="post" />
      </div>
      <div v-else>
        <p>Getting data...</p>
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
      content: '',
      search: {
        username: ''
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.api.user.userInfo
    },
    posts() {
      return this.$store.state.api.post.posts
    }
  },
  created() {
    this.$store.dispatch('api/user/getUser');
    this.$store.dispatch('api/post/getPosts');
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('api/user/logout')
        .then(res => {
          this.$cookies.remove('jwt');
          this.$router.push('/');
          this.$toast.success(res.data.msg)
        })
    },
    uploadPost() {
      if(!this.content) {
        this.$toast.error('Please fill content field');
      } else {
        const payload = {
          content: this.content
        }
        this.$store.dispatch('api/post/uploadPost', payload)
          .then(res => {
            this.$toast.success(res.data.msg);
            this.$store.dispatch('api/post/getPosts');
            this.content = '';
          })
          .catch(err => {
            this.$toast.error(err.msg);
          })
      }
    },
    openProfile() {
      this.$router.push({
        name: 'dashboard-username',
        params: {
          username: this.user.username
        }
      })
    },
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
