<script>
// Login.vue
export default {
  data: () => ({
    form: {
      username: '',
      password: '',
    },
  }),
  computed: {
    canSubmit() {
      return this.form.username && this.form.password
    }
  },
  methods: {
    submit() {
      if (!this.canSubmit) {
        return;
      }

      this.$store.dispatch('auth/login', this.form)
    }
  }
}
</script>

<template>

  <form @submit.prevent="submit">

    <div>
      <input v-model="form.username" type="text" placeholder="Email или имя пользователя">
    </div>

    <div>
      <input v-model="form.password" type="password" placeholder="Пароль">
    </div>

    <button :disabled="!canSubmit">
      Войти
    </button>

  </form>

</template>
