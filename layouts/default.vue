<template>
  <div>
    <header class="w-full px-6 py-2 bg-lightGrey">
      <h1 class="text-lg text-center font-semibold">Wong801 Portfolio</h1>
    </header>
    <nuxt-link v-if="$route.fullPath !== '/' && !$cookies.get('jwt')" to="/" class="underline px-4">Back to home</nuxt-link>
    <Nuxt />
    <footer class="w-full bottom-0 fixed">
      <div class="text-center">
        <a href="https://github.com/Wong801" target="_blank">Github</a>
      </div>
      <div class="py-1 bg-lightGrey ">
        <p class="text-center text-darkGrey font-bold">&copy; {{ new Date().getFullYear() }} Wong801</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
