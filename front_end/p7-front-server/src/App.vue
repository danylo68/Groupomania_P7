<style lang="css" scoped>
.b-img{
z-index: 1;
position:relative;
max-width: 1824px;
}
.container
{
margin-top: 6em;
/* background-color: rgb(218, 216, 210); */
}

#app
{
background-color:rgba(245, 245, 245, 0.993);
}

.img
{
height: 30px;
}
</style>


<template>
  <div id='app'>

  <b-navbar fixed="top" toggleable="lg" type="dark" variant="dark">
  <!-- <b-img :src="require(`@/assets/icon-left.png`)" alt="Responsive image"></b-img> -->
    <b-navbar-brand href="#">Groupomania</b-navbar-brand>
    
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    
     <b-navbar-nav>
       <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home"/>Home</router-link>
      </b-navbar-nav>
    
      <!-- Right aligned nav items -->
  <b-navbar-nav class="ml-auto">
    <!-- <b-navbar class="navbar-nav mr-auto"> -->
    <b-navbar-nav>
    
   <b-nav-item class="nav-item">
          <router-link to="/articles" class="nav-link">Articles</router-link>
        </b-nav-item> 
        
        
        
       <b-nav-item class="nav-item">
          <router-link to="/add" class="nav-link">Post</router-link>
        </b-nav-item>
        </b-navbar-nav>
        
   <!-- </b-navbar> -->
  
        <b-nav-item v-if="showAdminBoard">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </b-nav-item>
        
        <b-nav-item v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </b-nav-item>
        
        <b-nav-item>
          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
        </b-nav-item> 

      <b-navbar-nav v-if="!currentUser" class="navbar-nav ml-auto">
        <b-nav-item>
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </b-nav-item>
        
        <b-nav-item>
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Sign In
          </router-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-if="currentUser" class="navbar-nav ml-auto">
        <b-nav-item right>
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </b-nav-item>
        
        <b-nav-item right>
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
       </b-nav-item>
    
      </b-navbar-nav>

     </b-navbar-nav>
      
    </b-collapse>
    
  </b-navbar>
  
  
  <!-- <div class="img-nav"> -->
  <!-- <b-img src="https://picsum.photos/1824/300/?image=318" fluid alt="Responsive image"></b-img> -->
  <!-- <b-img src="https://picsum.photos/1824/300/?image=378"  class="shadow" fluid alt="Responsive image"></b-img> -->
<!-- </div> -->


<!-- <b-container class="upload" style="width:600px">
      <div class="my-4">
      </div>
      <upload-image></upload-image>
    </b-container>
   -->
  
<router-view />
  </div>
</template>

<script>

// import UploadImage from "./components/UploadImage";

export default {
name: "app",
  
data() {
    return {
      logo: '/assets/icon.png'
    }
    
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

