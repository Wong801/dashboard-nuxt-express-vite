<template>
  <div>
    <div class="absolute inset-1/4">
    <div class="h-full flex">
      <div class="self-center text-center w-full">
        <h1 class="text-3xl py-4">Welcome to my simple project :)</h1>
        <div class="flex justify-between text-3xl w-1/2 mx-auto">
          <nuxt-link class="hover:bg-lightGrey hover:text-darkGrey rounded-lg w-full p-2" to="/register">Register</nuxt-link>
          <span class="p-2">|</span>
          <nuxt-link class="hover:bg-lightGrey hover:text-darkGrey rounded-lg w-full p-2" to="/login">Login</nuxt-link>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
