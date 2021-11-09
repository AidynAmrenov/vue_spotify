<script>
import TopBarSearch from './components/TopBarSearch.vue'

export default {
  components: {
    TopBarSearch,
  },
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
  <div v-if="!loading">

    <div class="el-menu el-menu--horizontal" style="padding: 10px">
      <top-bar-search />
    </div>

    <router-view :key="$route.fullPath" />

  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

body * {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
