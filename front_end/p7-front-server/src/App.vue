<style lang="css" scoped>

#app
{
/* background-color:#bcc1ca9c; */
background-color:#f0f3ee;
}

.content-vue
{
height: auto;
max-width: 2250px;
margin-top: 0em;
    /* display: flex; */
}
.img-profile
{
height: 100%;
max-width: 100%;
}

#nav1_top
{
opacity: 0.9;
color: white!important
}
.footer-jumbo
{
opacity: 0.5;
margin-top: 3rem;
}
img
{
width: 8rem;
height: 7rem;
}


</style>


<template>

  <div id='app'>
  
 <!-- <b-img :src="require(`@/assets/Groupomania.jpg`)" class="img-profile" ></b-img> -->
  
  <b-navbar class="Regular shadow" 
  id="nav1_top"
  fixed="top" 
  toggleable="lg" 
  type="dark"
  variant="dark"
  text-variant="white">
  
  
  
    <b-navbar-brand href="#">Groupomania 

    </b-navbar-brand>
    <!-- <img :src="require(`@/assets/icon-left-font-monochrome-white.png`)" /> -->

    
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    
     <b-navbar-nav>
     
      </b-navbar-nav>
    
      <!-- Right aligned nav items -->
  <b-navbar-nav class="ml-auto">
    <!-- <b-navbar class="navbar-nav mr-auto"> -->
    <b-navbar-nav>
    
   <b-nav-item class="nav-item">
          <router-link to="/articles" class="nav-link">Articles</router-link>
        </b-nav-item> 
        
       <!-- <b-nav-item class="nav-item">
          <router-link to="/add" class="nav-link">add</router-link>
        </b-nav-item> -->
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
  
  
  <b-container class="content-vue" >
  
<router-view />
</b-container>


<div>
  <b-jumbotron class="footer-jumbo" bg-variant="dark" text-variant="dark" style="background-image: url(https://picsum.photos/1750/400/?image=532
); margin-bottom:0">
   <p>Footer</p>
  </b-jumbotron>
</div>


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

