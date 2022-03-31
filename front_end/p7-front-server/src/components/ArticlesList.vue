<style scoped>
#listArticles-container
{ 
height: 60%;
margin-top: 16rem;
/* background-color: #bcc1ca9c; */
max-width: 1250px;
}
.list-group-item {
  background-color: white;
  /* position: relative; */
  display: flex;
  flex-direction:column;
  padding: 0px;
  margin-top: 30px;
  height: auto;
  border-radius: 12px 12px 12px 12px;
  box-shadow: 2px 3px 10px 2px lightgrey;
  height: auto;
}
.content_img
{
height: 20%;
}

.footer-card {
  height: auto;
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 15px;
}
.nav-post {
  margin-top: 5rem;
  background-color: white;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 7px 1px lightgrey;
  border-radius: 12px 12px 12px 12px;
  max-width: 768px;
}
.jumbo-head {
position:absolute;
max-width: 100%;
background-position: center center;
background-repeat: no-repeat;
background-size: cover;
left:0; 
right:0;
top:0; 
bottom:0;
}
.article-comment
{
display: flex;
flex-direction: column-reverse;
}

.articleId
{
font-size: 12px;
}
</style>


<template>
  <div cols="12" > 
  
  <b-container fluid="lg" class="jumbo-head" >
  <b-jumbotron header="Groupomania" class="jumbotron text-white jumbotron-image shadow"  lead="Social App" alt="Fluid"
   style="background-image: url(https://picsum.photos/1750/400/?image=532);">
  <!-- <b-img src="https://picsum.photos/1024/400/?image=1033" fluid alt="Responsive image"></b-img> -->
  </b-jumbotron>
  </b-container> 
      <!-- <b-container class="bv-example-row bv-example-row-flex-cols"> -->
      <b-row  id="listArticles-container"  align-v="center" class="mx-auto  mx-md">
      <!-- <b-col md="4" class="rounded"> 
        </b-col> --> 
       <b-col align-self="center" md="8" offset-md="2" mt>   

        <b-container class="nav-post" border="shadow">
        <AddArticle></AddArticle> 
        </b-container>
        
        <b-container class="article-comment" border="shadow">      
          <b-card
              class="list-group-item"
              id="myCard"
              ref="myCard"
              :img-src="article.image"  alt="Responsive image"

              v-for="article in articles"
              :key="article.id">
              <b-card-header>
              <h4>{{ article.title }}:</h4>
              </b-card-header>
              
              <b-card
                fluid
                class="content_img"
                img-top>      
                                     
                <b-card-text>    
                <h5> {{ article.description }}</h5>
                  <!-- <p class="articleId">article Id: {{ article.article_id }}
                  <p class="user-article">from: {{ article.user.username }} </p>

                  </p> -->
                </b-card-text>
                <p class="articleId">article Id: {{ article.article_id }}
                  </p>

              </b-card>  
              <!-- :::::::::::::  BTN MODAL  :::::::::::::::::: -->
              <b-card-footer class="footer-card">  
 
            <div>
                <b-button  pill variant="light" size="sm" id="show-btn" @click="showModal(article.article_id)">
                  <b-icon icon="chat-right-text" aria-hidden="true"></b-icon>
                  Commentaire
                </b-button>
        </div>      
          <div>
           <b-button pill variant="outline-secondary" size="sm" @click="modalUpdate(article.article_id)">
            
              <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>              
               </b-button>
        
                 <b-button pill variant="outline-danger" size="sm" @click.prevent="deleteArticle(article.article_id)">
                 <b-icon icon="trash" aria-hidden="true"></b-icon>
               </b-button>
           </div>
        
              </b-card-footer>         
              <CommentsList :article_id="article.article_id" />
              </b-card>      
              </b-container>
        </b-col>
      </b-row>

    <!-- :::::::::  Modal Commentaire :::::::::::::::::::::::::::::::::::::::: -->
    <b-modal 
    ref="myModal" 
    title="Ajout du Commentaire">
      <b-form v-on:submit="saveComments">
        <b-form-group
        id="reply-comment" 
        label-for="input-comment">    
          <b-form-input
            id="input-comment"
            v-model="formComment"
            type="text"
            placeholder="Entrer vos commentaire"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" value="Submit" variant="primary" size="sm">Envoyer</b-button>
        <!-- {{ article.article_id }} -->
      </b-form> 
    </b-modal>
  
    <!-- :::::::::  Modal Update :::::::::::::::::::::::::::::::::::::::: -->
     <b-modal 
     ref="modalArticle" 
    title="Modifier Article">
      <b-form v-on:submit.prevent="modifyArticle()">
      
        <b-form-group
        id="input-group-1"       
        label-for="input-title">        
          <b-form-input
            id="input-title"
            v-model="article.title"
            type="text"
            placeholder="Changer Titre"
            required
          ></b-form-input></b-form-group>
          
       <b-form-group
        id="input-group-2" 
        label-for="input-article">    
          <b-form-input
            id="input-description"
            v-model="article.description"
            type="text"
            placeholder="Changer Description"
       
            required
          ></b-form-input></b-form-group>
          
         <b-form-group id="input-group-3" 
         label-for="input-image">     
          <b-form-input
            id="input-image"
            v-model="article.image"
            type="text"
            accept="image/*" 
            enctype="multipart/form-data"
            name="imagesArray"
            @change="onChange"
            placeholder="file"
            required
          ></b-form-input></b-form-group>
 
        <b-button type="submit" value="Submit" variant="primary" size="sm">Envoyer Modification</b-button>
      </b-form> 
    </b-modal>
    
    
  </div>
</template>

<script>

import ArticleDataService from '../services/ArticleDataService'
import AddArticle from '../components/AddArticle.vue'
import CommentsList from '../components/CommentsList.vue'
import axios from 'axios'
import authHeader from '../services/auth-header.js'

// const apiUrl = 'http://192.168.1.26:3000/api'
const apiUrl = 'http://localhost:3000/api'



export default {
  name: 'articles-list',

  // props: {
  //   article: {
  //   }
  // },
  
  components: {
    AddArticle,
    CommentsList,
  },

  data () {
    return {
    formArticle_title:"",
    formArticle_description:"",
    form:{
    title:"",
    description:"",
    image: "",
    },
    
    
    type: [Number,Array, String, Object],
     article: {
      id: null,
      title: "",       
      image: String,   
      description: "",    
      published: false,
      imagesArray: null,
      user_id:"",
    },  
      profile: "",  
      article_id:"",
      actualArticle:"",
      articles:"",
      formComment: "",  
      formArticle:"",
      comment: "",
      user:"",
      index:"",
      content: "",
      myModal: "",
      modalArticle:"",
      button:"",
      fileUpload: "",
    }
  },
  
  methods: {
    retrieveArticles () {
    ArticleDataService.getAll()
    .then(response => {
    this.articles = response.data  
    this.image = response.data
    console.log(this.articles)

        })
    .catch(e => {
    console.log(e)
        })
    },

    refreshList () {
      this.retrieveArticles()
      this.currentArticle = null
      this.currentIndex = -1
    },
    
     onChange (event) {
        this.imagesArray = event.target.files[0];
      },

    setActiveArticle (article, index) {
      this.currentArticle = article
      this.currentIndex = index
    },

    // ::::::::::: Edit Article via Modal:::::::::::
    modalUpdate (article_id) {
    console.log(article_id);
      ArticleDataService.get(article_id)
              .then((response) => {
                this.article = response.data;
                 this.$refs['modalArticle'].show()
                this.loading = false;
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
        },
    
    // ::::::::::: Update Article_Modal ready for Agile Method  ::::::::::::::
    modifyArticle (){ 
    const formData = new FormData();

  formData.append('title', this.article.title)
  formData.append('description', this.article.description)
  formData.append('image', this.imagesArray)

 console.log(this.imagesArray)
     
    const article_id = this.article.article_id
      console.log(article_id);
      
     ArticleDataService.update(article_id, formData)
        .then(response => {
         response = response.data,
        
          console.log(response)
          this.submitted = true
          this.$refs['modalArticle'].hide()
          this.formData = null
          this.refreshList()

        })
        .catch(e => {
          console.log(e)
        })
    },
    
    submit: function () {
      this.$refs.form.$el.submit()
    },

    showModal (articleId) {
      this.$refs['myModal'].show()
      this.actualArticle = articleId
    },
   
// :::::::::::: Post Comment via Modal  :::::::::::::::
    saveComments (event) {
      event.preventDefault()
      const data = {
        content: this.formComment,
        article_id: this.actualArticle
      }
      console.log(data)
    axios.post(`${apiUrl}/comments/:article_id`, data,  { headers: authHeader() })
        .then(response => {
          this.comment = response.data.id
          console.log(response.data)
          this.submitted = true
          this.$refs['myModal'].hide()
          
          this.formComment = null
          this.refreshList()
        })
        .catch(e => {
          console.log(e)

        })
    },
    newComment () {
      this.submitted = false;
      this.comment = {};   
    },
      
    
    deleteArticle(article_id) {
    console.log(article_id);
    
      ArticleDataService.delete(article_id)   
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "articles" });
          this.refreshList()
        })
        .catch(e => {
          console.log(e);
        });
    }, 
  },
    
  mounted () {
    this.message = '';
    this.retrieveArticles()
    this.retrieveArticles(this.$route.params.id);
   
  }
  
}

</script>
