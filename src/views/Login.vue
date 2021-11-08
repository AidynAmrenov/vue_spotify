<script>
// Login.vue
export default {
  methods: {
    submit() {
      this.$store.dispatch('auth/login')
    }
  }
}
</script>

<template>

  <button @click="submit">
    Login via Spotify
  </button>

</template>
