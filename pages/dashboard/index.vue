<template>
  <div v-if="user">
    <div class="flex justify-end px-4 gap-x-2">
      <p>Welcome <nuxt-link to="/dashboard/profile" class="font-bold">{{ user.username }}</nuxt-link>,</p>
      <button class="hover:underline" @click="handleLogout">logout</button>
    </div>
    <div class="px-10 my-10">
      <div class="border-b">
        <div>
          <textarea v-model="content" rows="5" class="border border-darkGrey w-full whitespace-pre-wrap p-2"></textarea>
          <div class="flex justify-end">
            <button class="my-4 p-2 bg-lightGrey rounded-md" @click="uploadPost">Create Post</button>
          </div>
        </div>
      </div>
      <Post v-for="post in posts" :key="post._id" :post="post" />
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
      content: ''
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
    await this.$store.dispatch('api/user/getUser');
    await this.$store.dispatch('api/post/getPosts');
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
    }
  }
}
</script>

<style>

</style>
