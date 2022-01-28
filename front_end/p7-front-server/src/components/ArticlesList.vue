<style scoped>
.post-container {
  max-width: 1440px;
  height: 100%;
  background-color: rgb(245, 245, 245);
  display: flex;
  justify-content: center;
}
.list-group-item {
background-color:white;
  /* display: flex; */
    border-radius: 10px;
    margin-top: 144px;
height: auto;
/* padding: 1rem 1rem; */
max-width: 1250px;

}
.list-group
{
display: flex;
justify-content: center;
height: 100%;
}
.contain-cards
{

max-width: 900px;
/* padding: 70px; */

}
.sec-nav{

height: 180px;
background-color: white;
margin-left: 0;
position: relative;
margin-top: 34px;
color:black ;
display: flex;
justify-content: center;
  
}

.comment-link
{
color: black;
font-size: 14px;
padding: 10px;
}
.footer-card{
height: 50px; 
    display: flex;
   
    align-content: center;
    justify-content: flex-start;
    padding: 10px;
}
.nav-post{
margin-top: 45px;
background-color:white ;
display: flex;
height: 300px;
}

</style>

<template>


   <div class="post-container">
  <b-container class="contain-cards mx-md ">
     <b-nav class="nav-post" fixed="top w-500" >     
    <b-nav-item>
    
    <AddArticle></AddArticle>
    
    </b-nav-item>
  </b-nav>
  
     
    <b-row class="row mx-md p-1">
    <b-col  class="mt-2 p-0 rounded ">
  <!--::::::: container article :::::::::::::::::::::::::::: -->
  <!--::::::: container article :::::::::::::::::::::::::::: -->
    <b-card-group class="list-group-item"
      v-for="article in articles"
                :key="article.id">   
                
    <h5>{{ article.title }}</h5>
    
     <b-card
      img-src="https://picsum.photos/id/948/1200/200"
     rounded alt="Rounded image"
      img-top> 
      
      <b-card-text>
       {{ article.description }}
      </b-card-text>
      </b-card>
      
     <b-card-footer class="footer-card">
    
      <b-button v-b-modal.addComment>
       <b-icon icon="chat-right-quote" aria-hidden="true">Commentaire</b-icon>
      </b-button>
      <hr>
      <br>
      
        <b-card-text class="reaction"
        v-for="commentlist in commentsList"
        :key="commentlist.id">
        <span>{{ commentlist.comments }}</span>fdghgf
       
     
       </b-card-text>
    
     </b-card-footer>
  <CommentsList></CommentsList>
    </b-card-group>
     <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllArticles">
        Remove All
      </button>  -->
      
        <b-card>
  <CommentsList></CommentsList>
  </b-card>
  
    </b-col>

    </b-row>
    </b-container> 
  <!--:::::::::: container Article :::::::::::::::::::::::::::: -->
  <!--:::::::::: container Comment :::::::::::::::::::::::::::: -->
  
   
    <b-modal  id="addComment" title="Post-Comment">
    <!-- <b-form-group>
  
    <b-form  @submit="saveComments"
     
      label-for="saveComments">
    
        <b-form-input p-3
          class="form-control"
          
          v-model="comment"
          name="comment"></b-form-input>
         
     <b-button type="submit" variant="primary">Submit</b-button>
  
    </b-form> -->

  <!-- <b-form v-else>
      <h4>You submitted successfully!</h4>
      <b-button p-3 class="btn btn-success" @click="newComment">Add</b-button>
    </b-form> -->
<!-- </b-form-group> -->

  <b-form @submit="saveComments">
      <b-form-group
        id="input-comment"
        label="Comment:"
        label-for="Comment-input"
        description="We wait your reaction at every post "
      >
        <b-form-input
          id="input-comment"
          v-model="reaction"
          type="text"
          placeholder="Enter Comment"
          required
        ></b-form-input>
      </b-form-group>


      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

  </b-modal>  
  
    <!-- <div class="mt-2">Value: {{ comment }}</div> -->
    
  </div>
</template>


<script>
// import CommentDataService from "../services/CommentDataService";
import ArticleDataService from "../services/ArticleDataService";
import AddArticle from "../components/AddArticle.vue";
// import { mapState } from 'vuex'
// import Comment from "../components/Comment.vue";
// import CommentsList from "../components/CommentsList.vue";

import axios from 'axios';

import authHeader from "../services/auth-header";
import CommentsList from "./CommentsList.vue";

const apiUrl = "http://localhost:3000/api";

let config = {
headers: authHeader()
};


export default {
name: "articles-list",
 components: {
    AddArticle,
    CommentsList
},


  data() {
    return {
  
  
   articles: [],
    // commentslist: [],
      // articles: [
      // { title: ""},
      // {  description: ""},
      // {  id:""},
      // { user:""},
        // { comment:""],
    //    addcomments:  [],
      // submitted: false,
      // currentArticle: null,
      // currentIndex: 0,
    // ],
      title: "",
      description: "",
      id:"",
      user:"",
     comment:"",
     reaction:"",
    };
  },
  
  
  methods: {
  
  //  submit : function(){
  //     this.$refs.form.$el.submit()
  //   },
  
  
    retrieveArticles() {
      ArticleDataService.getAll()
        .then(response => {
          this.articles = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
    },

    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
    },

    removeAllArticles() {
      ArticleDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      ArticleDataService.findByTitle(this.title)
        .then(response => {
          this.articles = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    
     saveComments(event) {
        event.preventDefault() 
        //  alert(JSON.parse(this.comment))
         {
  if(this.label === "") {
    return;
  }
  this.$emit('comment', this.label);
  this.label = "";
}
        
        
    console.log("toto")
      var data = {
        content: this.comment
      };
      
      // CommentDataService.create(data) 
      
       console.log(data)
       axios
        .post(`${apiUrl}/comments`, data, config)
    
        .then(response => {
          this.comment.id = response.data.id;
     
           console.log("toto")
          console.log("comments")
          // Upload image
          // url/artciles/ this.comment.id  / upload
         
          this.submitted = true;
         console.log(response)
           console.log("toto")
        })
        
        .catch(e => {
          console.log(e);
        });
        
    
     },
    newComment() {
      this.submitted = false;
      this.comment = {};
    },
    
  },
  mounted() {
    this.retrieveArticles();
  },
  
};
</script>

