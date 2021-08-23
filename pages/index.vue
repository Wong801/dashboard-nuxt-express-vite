<template>
  <div class="py-10">
    <div class="text-center text-xl p-2 w-max mx-auto bg-white bg-opacity-60 font-semibold">
      <p>{{ time }}</p>
    </div>
    <div class="flex w-2/5 mx-auto mt-32 items-center gap-x-4">
      <div class="border-r">
        <h1 class="text-5xl font-bold text-center leading-loose">Welcome to My Simple Project</h1>
      </div>
      <div>
        <div v-if="$cookies.get('jwt')" class="mx-auto w-max">
          <nuxt-link class="hover:bg-white hover:bg-opacity-70 rounded-lg p-20  text-3xl" to="/dashboard">Dashboard</nuxt-link>
        </div>
        <div v-else class="flex flex-col gap-y-8 mx-auto text-center w-max justify-between text-3xl">
          <nuxt-link class="hover:bg-white hover:bg-opacity-70 rounded-lg px-20 py-5" to="/register">Register</nuxt-link>
          <nuxt-link class="hover:bg-white hover:bg-opacity-70 rounded-lg px-20 py-5" to="/login">Login</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      time: dayjs(Date.now()).format('DD MMM YYYY HH:mm:ss A')
    }
  },
  mounted() {
    setInterval(() => {
      this.time = dayjs(Date.now()).format('DD MMM YYYY HH:mm:ss A')
    }, 1000)
  }
}
</script>

<style scoped>
.margin {
  margin: 20%
}
</style>
