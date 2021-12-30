<template>
  <div class="container">
  <va-navbar color="dark" shape class="mb-2">
    <template #left>
      <va-navbar-item>LOGO HERE</va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>Right</va-navbar-item>
      <va-navbar-item>Register</va-navbar-item>
      <va-navbar-item>Connexion</va-navbar-item>
    </template>
  </va-navbar>
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>