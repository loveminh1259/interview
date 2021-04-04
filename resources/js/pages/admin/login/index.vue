<template>
  <div>
    <form class="login" @submit.prevent="onLogin">
      <h1 class="text-center">Login</h1>
      <p class="text-danger text-center" v-if="error !== ''">{{error}}</p>
      <input type="email" v-model="dataLogin.email" placeholder="email" />
      <input type="password" v-model="dataLogin.password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>

    <a href="https://codepen.io/davinci/" target="_blank"
      >check my other pens</a
    >
  </div>
</template>

<script>
import authService from "../../../services/api/auth";
export default {
  data() {
    return {
      dataLogin: { email: "", password: "" },
      error: ''
    };
  },
  methods: {
    async onLogin() {
      let res = await authService.login(this.dataLogin);
      if (res.data.error === 0) {
        this.$store.commit("setAuthenticated", {
          userData: res.data.data,
          isAuthenticated: true,
          token: res.data.access_token,
        });
        this.$router.go();
      } else {
        this.error = res.data.message
      }
    },
  },
};
</script>

<style scoped>
@import url("./assets/style.css");
</style>