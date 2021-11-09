<script>
import qs from 'qs'

export default {
  data: () => ({
    message: ''
  }),
  mounted() {
    let query = this.$route.fullPath.split('#').pop()
    query = qs.parse(query)

    const token = query.access_token;

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
