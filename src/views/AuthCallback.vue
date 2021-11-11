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
    const expired_in = query.expires_in;

    if (!token || !expired_in) {
      this.message = 'Не удалось войти. Пожалуйста попробуйте позже'
      return
    }

    this.$store.commit('auth/setToken', token)
    this.$store.commit('auth/setExpiredAt', Date.now() + expired_in * 1000)
    this.$router.push({ name: 'home' })
  }
}
</script>

<template>
  {{ message }}
</template>
