<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.btn{
display: flex;
justify-content: center;
align-content: center;
margin-top: 21px;

}

.card-container.card {
top: 15em;
max-width: 373px
!important;
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


.jumbo-head {
position:fixed;
left:0; 
right:0;
top:0; 
bottom:0;
}

.login-block
{ 
height: 46rem;
}

</style>

<template>
  <div class="col-md-12">
  <b-container class="login-block">
  
  <div fluid class="jumbo-head">
  <b-jumbotron header="Groupomania" class="jumbotron text-white jumbotron-image shadow"  lead="Social App" alt="Fluid"
   style="background-image: url(https://picsum.photos/1750/400/?image=1033);">
  
  </b-jumbotron>
</div>

    <div class="card card-container">
      <h4>Sign Up</h4>
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >
              {{ errors.first('username') }}
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div v-if="submitted && errors.has('email')" class="alert-danger">
              {{ errors.first('email') }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >
              {{ errors.first('password') }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
    
    
    </b-container>
  </div>
</template>



<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>


