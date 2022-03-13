
<style scoped>
 .profile-container{
 width: 50%;
 margin-top: 10rem;
 border-radius: 18px;
/* box-shadow: 3px 3px 3px 0px; */

 } 
 .card-profile
{
border-radius: 18px;
width: 100%;

}
 .jumbo-head {
/* position:absolute; */
max-width: 100%;
background-position: center center;
background-repeat: no-repeat;
background-size: cover;
left:0; 
right:0;
top:0; 
bottom:0;
}
 
 
</style>

<template>
<div class="mt-0">
<b-container fluid="lg" class="jumbo-head">
  <b-jumbotron header="Groupomania" class="jumbotron text-white jumbotron-image shadow"  lead="Social App" alt="Fluid"
   style="background-image: url(https://picsum.photos/1750/400/?image=180);">
  <!-- <b-img src="https://picsum.photos/1024/400/?image=1033" fluid alt="Responsive image"></b-img> -->
  </b-jumbotron>
</b-container>


<div class="col-md-10">


  <b-container class="profile-container">
  
   
    <b-card-group deck class="card-profile">
      <b-card border-variant="dark" header="About Profile:" align="center">
       <h3>
        <strong>{{currentUser.username}}</strong>
      </h3>
    
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.user_id}}
    </p>
    <hr>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
      <hr>
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>
  </b-card-group>
  
  
  
  
    <!-- <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul> --> 
  </b-container>
  </div>
  
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>