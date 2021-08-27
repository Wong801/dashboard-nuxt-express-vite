<template>
  <div class="my-2 w-full border border-darkGrey rounded-md p-4 bg-white bg-opacity-80">
    <div class="border-b flex justify-between">
      <div>
        <h4>{{post.author}}</h4>
        <span class="text-xs text-darkGrey">{{ formatDate(post.created_at) }}</span>
      </div>
      <div class="px-4">
        <span class="self-start cursor-pointer select-none" @click="showMenu = !showMenu">...</span>
        <div v-if="showMenu" :class="half ? '' : 'right-16'" class="border border-darkGrey absolute bg-white">
          <div v-if="post.created_by === user.id">
            <button class="hover:bg-lightGrey w-full p-2" @click="deletePost(post._id)">Delete</button>
            <!-- <button class="hover:bg-lightGrey w-full p-2">Comment</button> -->
          </div>
          <div v-else class="w-full p-2">
          </div>
          <!-- <button class="hover:bg-lightGrey w-full p-2">Comment</button> -->
        </div>
      </div>
    </div>
    <p class="py-4 px-2">{{ post.content }}</p>
    <!-- <div class="flex gap-x-6">
      <button class="w-full py-2 text-center">Likes: {{ post.likes }}</button>
      <button class="w-full py-2 text-center">Comments</button>
    </div> -->
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    post: {
      type: Object,
      default() {
        return  {
          _id: '',
          created_by: '',
          author: '',
          created_at: new Date(),
          likes: 0,
          comments: []
        }
      }
    },
    half: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    user() {
      return this.$store.state.api.user.userInfo
    },
  },
  methods: {
    formatDate(payload) {
      return dayjs(payload).format('DD MMM YYYY HH:mm')
    },
    deletePost(id) {
      const payload = {
        id
      }
      this.$store.dispatch('api/post/deletePost', payload)
        .then(res => {
          this.$toast.success(res.data.msg);
          this.$store.dispatch('api/post/getPosts');
        })
        .catch(err => {
          this.$toast.error(err.msg);
        })
    }
  }
}
</script>

<style>

</style>
