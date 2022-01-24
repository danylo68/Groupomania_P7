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
  
    border-radius: 10px;
    margin-top: 7px;
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


</style>

<template>


   <div class="post-container">
  <b-container class="contain-cards mx-md ">
  
  <!-- search bar :::::::::::::: -->
   <!-- <b-row class="sec-nav p-1 rounded shadow"> -->
     <b-nav fixed="top w-500" >
            
    <!-- <b-nav-item active>Active</b-nav-item> -->
    <b-nav-item>
    
    <!--tm <b-button pill variant="outline-secondary"><router-link to="/add" class="nav-link"><h6>Post Article</h6></router-link></b-button> -->
    </b-nav-item>
    <b-nav-item>
    
    <!-- <b-button pill variant="outline-secondary"><router-link to="/article" class="nav-link"><h6>Article</h6></router-link></b-button> -->
    </b-nav-item>
    <!-- <b-nav-item disabled>Disabled</b-nav-item> -->
  </b-nav>
  
  <AddArticle></AddArticle>
  
       
       
       
    <b-row class="row mx-md p-1">
       
  
    <b-col  class="mt-2 p-0 rounded ">
  <!------------ --------------------------- -->
  
    <b-card-group class="list-group-item"
      v-for="article in articles"
                :key="article.id">
                
    <h5>{{article.title}}</h5>
    
     <b-card
      img-src="https://picsum.photos/id/948/1200/200"
     rounded alt="Rounded image"
      img-top>
      <b-card-text>
      
       {{ article.description}}
       <hr>
       <!-- btn fot call modal window -->
         <b-button v-b-modal.modal-com>
       <b-icon icon="chat-right-quote" aria-hidden="true"></b-icon>
      </b-button>
      <!-- --------------------------- -->
      </b-card-text>
      </b-card>
     <b-card-footer class="footer-card">
    Commentaire contenus
     </b-card-footer>
    </b-card-group>
  
      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllArticles">
        Remove All
      </button> -->     
    </b-col>
    <!-- container article :::::::::::::::::::::::::::: -->
    </b-row>
    </b-container> 
   
    <b-modal  id="modal-com" title="Post Comment">
    <b-form-group>
  <h4>Create Comment</h4>
    <b-form v-if="!submitted">  
      
    <b-form-group
      :state="nameState"
      label="content"
      label-for="content">
      
        <b-form-input p-3
          class="form-control"
          id="content"
          required
          v-model="comment"
          name="content"/>
           </b-form-group> 
     
      <!-- btn submit for create Comment in modal -->
    <button v-on@click="saveComment" id="button" class="btn btn-success">Submit</button> 
    </b-form>
<!-- 
    <b-form v-else>
      <h4>You submitted successfully!</h4>
      <button p-3 class="btn btn-success" @click="newComment">Add</button>
    </b-form> -->
</b-form-group>

  </b-modal>  
  
    
  </div>
</template>


<script>
import ArticleDataService from "../services/ArticleDataService";
import AddArticle from "../components/AddArticle.vue";
// import AddComment from "../components/AddComment.vue";

export default {
name: "articles-list",
 components: {
   AddArticle,
  //  AddComment
  },


  data() {
    return {
    // content: '',
    //    contentState: null,
    //     submittedContent: [],
    
      articles: [],
      comments:  [],
      currentArticle: null,
      currentIndex: 0,
      title: "",
      description: "",
      id:"",
      user:"",
      
    };
  },
  methods: {
  
  // checkFormValidity() {
  //       const valid = this.$refs.form.checkValidity()
  //       this.nameState = valid
  //       return valid
  //     },
  //     resetModal() {
  //       this.content = ''
  //       this.cotnentState = null
  //     },
  //     handleOk(bvModalEvt) {
  //       // Prevent modal from closing
  //       bvModalEvt.preventDefault()
  //       // Trigger submit handler
  //       this.handleSubmit()
  //     },
  //     handleSubmit() {
  //       // Exit when the form isn't valid
  //       if (!this.checkFormValidity()) {
  //         return
  //       }
  //       // Push the name to submitted names
  //       this.submittedContent.push(this.content)
  //       // Hide the modal manually
  //       this.$nextTick(() => {
  //         this.$bvModal.hide('modal-prevent-closing')
  //       })
  //     },
  
  
  
  
  
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
    }
  },
  mounted() {
    this.retrieveArticles();
  }
};
</script>

