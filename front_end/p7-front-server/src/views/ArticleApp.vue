<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-nav-item>
      <router-link to="/" class="navbar-brand"></router-link>
      </b-nav-item>
      
      <b-navbar class="navbar-nav mr-auto">
   <b-nav-item class="nav-item">
          <router-link to="/article" class="nav-link">Article</router-link>
        </b-nav-item>
        <b-nav-item class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </b-nav-item>
      </b-navbar>
    </b-navbar>

    <b-container class="container mt-3">
      <router-view />
    </b-container>
    
  </div>
</template>



<script>
export default {
  name: "app"
};
</script>