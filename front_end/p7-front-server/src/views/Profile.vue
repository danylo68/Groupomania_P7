
<style scoped>
 .profile-container{
 max-width: 50rem;
 margin-top: 4rem;
 margin-bottom: 4rem;
 } 
 .group_profile
{
width: 100%;
border-radius: 18px;
box-shadow: 0px 13px
34px rgb(0 0 0 / 30%); 
border: none;
}

.card 
{
border: aliceblue;
border-radius: 18px;

}
.card-header
{
border: aliceblue;
border-radius: 18px;
}
.card-footer
{
border: aliceblue;
border-radius: 18px;
}

 .jumbo-head {
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
<div cols="12" class="mt-0">
<div fluid class="jumbo-head">
  <b-jumbotron header="Groupomania" class="jumbotron text-white jumbotron-image shadow" lead="Social App" alt="Fluid"
   style="background-image: url(https://picsum.photos/1750/400/?image=180);">
  </b-jumbotron>
</div>

  <b-col align-self="center" md="8" offset-md="2" mt>   

  <b-container class="profile-container">
   
    <b-card-group class="group_profile">
    
      <b-card class="card-header" border-variant="dark" rounded header="Votre Profile:" align="center">
       <h3>
        <strong>{{currentUser.username}}</strong>
      </h3>
    
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <hr>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    
    <strong>Authorities:</strong>
    
      <p v-for="(role,index) in currentUser.roles" :key="index">{{role}}</p>
    
        <b-card-footer class="card-footer">
        <p>Supprimer le Profile</p>
        <span>
          <b-button aria-label="delete user" pill variant="outline-danger" size="sm" @click="deleteUser(currentUser.id)">
                 <b-icon icon="trash" aria-hidden="true"></b-icon>
               </b-button>
        </span>
        </b-card-footer>
      </b-card>
  </b-card-group>  
  </b-container>
  </b-col>
  
  </div>
</template>

<script>

// import AuthService from '../services/auth.service';
import axios from 'axios'
import authHeader from '../services/auth-header'
const apiUrl = 'http://localhost:3000/api/user'
const config = { headers: authHeader() }


export default {
  name: 'Profile',
  
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  
 data () {
    return {
      profile: "", 
      user_id: "",
      user: "",
       token: "",
    }
  }, 
 methods: {
 
    deleteUser(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = id;
        axios.delete(`${apiUrl}/${user_id}`,config)
        .then(response => 
        { 
        alert('user supprimé');
        console.log(user)
        console.log(response.data);
        localStorage.removeItem('user');
        window.location.reload();
        // this.$router.push('/register'); 
         })
        .catch(e => {
        console.log(e);
        })    
    }
 }, 
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

