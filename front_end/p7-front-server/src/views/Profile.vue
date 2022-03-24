
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
<div class="col-md-12">
  <b-container class="profile-container">
  
   
    <b-card-group deck class="card-profile">
      <b-card border-variant="dark" header="Votre Profile:" align="center">
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
    
        <b-card-footer>
        <p>Supprimer le Profile</p>
        <span>
          <b-button pill variant="outline-danger" size="sm" @click="deleteUser(currentUser.id)">
                 <b-icon icon="trash" aria-hidden="true"></b-icon>
               </b-button>
        </span>
        </b-card-footer>
      </b-card>
  </b-card-group>
  
    
  </b-container>
  </div>
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
      //  userId: localStorage.getItem('user_id'),
       token: "",
    }
  }, 
 methods: {
 
    deleteUser(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = id;
    console.log(user)
    console.log(user_id) 

        axios.delete(`${apiUrl}/${user_id}`,config)
        
        .then(response => 
        { 
        alert('user supprimé');
        console.log(user)
        console.log(response.data);
        localStorage.removeItem('user');
        location.reload();
        // this.$router.push('/register'); 
         })
        .catch(e => {
        console.log(e);
        })    
    }
    
    // },
 
 
 }, 
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>















// return new Promise((resolve, reject) => {
// axios.delete(process.env.VUE_APP_BASE_URL + 'api/users/' + userId + '/',
// config).then(response => { resolve(response) }).catch(error => { reject(error)
// }) }) }
