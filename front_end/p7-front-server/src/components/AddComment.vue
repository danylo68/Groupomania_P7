<style>
.submit-form {
  margin-bottom: 10em;
  margin: auto;
   z-index: 10;
     box-shadow: 0px 13px 34px rgba(0, 0, 0, 0.3);
     border: 1px solid rgb(196, 189, 189);
     height: 350px;
     bottom: 55em;
     width: 350px;
     display: flex;
     justify-content: center;
     align-content: center;
     position: relative;
}

.form-control
{
display: flex;
justify-content: center;
width: 300px;
}

.img {
height: 50px;
width: auto;
}
.btn-success{
margin-left: 108px;
}
.b-container{
width: 300px;

}

</style>



<template>
 <div class="col-md-8">
 
  <b-container class="p-3" > 
  <h4>Create Comment</h4>
    <b-form-group 
      @submit="saveComments">
      <b-form class="form-group p-3">
        <label for="content">Content</label>
        <b-form-input p-3
          class="form-control"
          id="content"
          required
          v-model="comment.content"
          name="content"/>
      </b-form>
      
      <button @click="saveComment" class="btn btn-success">Submit</button>
    </b-form-group>

    <!-- <b-form v-else>
      <h4>You submitted successfully!</h4>
      <button p-3 class="btn btn-success" @click="newComment">Add</button>
    </b-form> -->
     </b-container>
  <!-- </div> -->
  
  </div> 
</template>


<script>
// import CommentDataService from "../services/CommentDataService";

import axios from 'axios';

import authHeader from "../services/auth-header";

const apiUrl = "http://192.168.1.26:3000/api";

let config = {
headers: authHeader()
};

export default {
  name: "add-comment",
  data() {
    return {
      comment: {
        id: null,
        content: "",
        published: false
      },
      submitted: false
    };
  },
  

  methods: {
    savecomment() {
      var data = {
       
        content: this.comment.content
      };
      console.log("toto")
     
     
    //  axios.post(`${apiUrl}/comments`, data, config)
        .then(response => {
          this.comment.id = response.data.id;
          // Upload image
          // url/artciles/ this.comment.id  / uploa
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newComment() {
      this.submitted = false;
      this.comment = {};
    }
  }
};
</script>