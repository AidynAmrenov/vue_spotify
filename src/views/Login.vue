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

    <div style="display: flex; justify-content: center; padding: 15px">

      <el-button @click="submit">
        Login via Spotify
      </el-button>

    </div>

</template>
