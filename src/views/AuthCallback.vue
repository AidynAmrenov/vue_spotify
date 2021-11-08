<script>
export default {
  data: () => ({
    message: ''
  }),
  mounted() {
    const token = this.$route.query.code

    if (!token) {
      this.message = 'Не удалось войти. Пожалуйста попробуйте позже'
      return
    }

    this.$store.commit('auth/setToken', token)
    this.$router.push({ name: 'home' })
  }
}
</script>

<template>
  {{ message }}
</template>
