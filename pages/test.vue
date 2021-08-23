<template>
  <div>
    <p class="text-center font-bold text-xl">
      {{ number }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 0,
    }
  },
  computed: {
    total() {
      return 5000
    }
  },
  mounted() {
    setInterval(() => {
      if(this.number < this.total) {
        ++this.number
      }
    }, 0.1)
  }
}
</script>

<style>

</style>
