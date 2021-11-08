<script>
export default {
  data: () => ({
    loading: false,
  }),
  created() {
    this.loading = true
    this.$store.dispatch('auth/init')
      .then(() => {

        if (this.$store.getters['auth/check']) {
          this.$router.isReady().then(() => {
            this.$router.push({ name: 'home' })
          })
        }

      })
      .finally(() => {
        this.loading = false
      })
  },
}
</script>

<template>
  <router-view v-if="!loading" :key="$route.fullPath" />
</template>
