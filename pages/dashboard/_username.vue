<template>
  <div class="w-full xl:w-1/2 lg:w-4/5 mx-auto px-10">
    <div class="flex flex-col lg:flex-row justify-center lg:justify-between gap-y-6 gap-x-2 py-4">
      <div class="flex gap-x-4">
        <input v-model="search.username" type="search" class="border px-1 border-darkGrey focus:outline-none focus:border-black w-full lg:w-auto" placeholder="Search for user..." @keyup.enter="findUser">
        <button class="bg-lightGrey focus:outline-none px-2 rounded-md hover:bg-darkGrey" @click="findUser">Search</button>
      </div>
      <div v-if="user" class="flex mx-auto lg:mx-0">
        <p>Welcome {{ user.username }},</p>
        <button class="hover:underline" @click="handleLogout">logout</button>
      </div>
    </div>
    <div v-if="user" class="px-10 text-center lg:text-left w-full lg:w-full">
      <h1 class="text-5xl font-bold">{{ user.username }}</h1>
      <p class="text-2xl">{{ user.firstName }} {{ user.lastName }}</p>
    </div>
    <div class="my-10">
      <div class="border-b">
        <div>
          <textarea v-model="content" rows="5" class="border border-darkGrey w-full whitespace-pre-wrap p-2 bg-white bg-opacity-50 focus:bg-opacity-90 focus:outline-none"></textarea>
          <div class="flex justify-end">
            <button class="my-4 p-2 bg-lightGrey rounded-md" @click="uploadPost">Create Post</button>
          </div>
        </div>
      </div>
      <div v-if="posts">
        <Post v-for="post in posts" :key="post._id" :post="post" :half="true" />
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
  async created() {
    if(!this.user) {
      await this.$store.dispatch('api/user/getUser');
      await this.$store.dispatch('api/post/getPosts', this.user.username)
    } else {
      await this.$store.dispatch('api/post/getPosts', this.user.username)
    }
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
    getPost(id) {
      this.$store.dispatch('api/post/getPosts', id);
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
