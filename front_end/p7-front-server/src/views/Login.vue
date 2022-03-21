<style scoped>

/* label {
  display: block;
  margin-top: 10px;
} */

 .btn{
display: flex;
justify-content: center;
align-content: center;
margin-top: 21px;

}

.card-container.card {
/* z-index: 10; */
   top: 15em;
  max-width: 373px !important;
  padding: 35px 35px;
 opacity: 0.9;

}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
/* opacity: 0.8; */
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 18px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 13px 34px rgba(0, 0, 0, 0.3);
}


.jumbo-head
{
position:fixed;
left:0;
right:0;
top:0;
bottom:0;

}
.login-block
{
height: 670px;


}


</style>



<template>
  <div class="col-md-12">
  

 <b-container class="login-block">
  
  <b-container-fluid class="jumbo-head">
  <b-jumbotron header="Groupomania" class="jumbotron text-white jumbotron-image shadow"  lead="Social App" alt="Fluid"
  
   style="background-image: url(https://picsum.photos/1750/400/?image=1033);">
  <!-- <b-img src="https://picsum.photos/1024/400/?image=1033" fluid alt="Responsive image"></b-img> -->
    
  </b-jumbotron>
</b-container-fluid>

    <b-container class="card card-container">
     <h4>Sign In</h4>
      <!-- <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      /> -->
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
        
          <label for="username">Username</label>
            <!-- <b-icon icon="person-fill"></b-icon> -->
          <input
        
            v-model="user.username"
            v-validate="'required'"
            type="text"
            
            class="form-control"
            name="username"
          />
          <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >Username is required!</div>
        </div>
        <div class="form-group">
        
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </b-container>
    
    
    
    </b-container>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
      image:""

    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

