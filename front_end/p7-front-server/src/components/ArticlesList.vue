<style scoped>
.post-container {
  max-width: 1440px;
  height: 100%;
  background-color: rgb(245, 245, 245);
  display: flex;
  justify-content: center;
}
.list-group-item {
  background-color: white;
  /* display: flex; */
  border-radius: 10px;
  margin-top: 144px;
  height: auto;
  /* padding: 1rem 1rem; */
  max-width: 1250px;
}

.contain-cards {
  max-width: 900px;
  /* padding: 70px; */
}
.sec-nav {
  height: 180px;
  background-color: white;
  margin-left: 0;
  position: relative;
  margin-top: 34px;
  color: black;
  display: flex;
  justify-content: center;
}

.imageUrl
{
  width:auto
}
.footer-card {
  height: 50px;
  display: flex;

  align-content: center;
  justify-content: flex-start;
  padding: 10px;
}
.nav-post {
  margin-top: 45px;
  background-color: white;
  display: flex;

  box-shadow: 0px 2px 11px 1px grey;
}
</style>

<template>
  <div class="post-container">
    <b-container class="contain-cards mx-md ">
      <b-nav class="nav-post" fixed="top w-500" border="shadow">
        <!-- :::::::::::::::::::::::::::::::::: -->

        <AddArticle></AddArticle>

        <!--:::::::::::::::::::::::::::::::::::::  -->
      </b-nav>
      <b-row class="row mx-md p-1">
        <b-col class="mt-2 p-0 rounded ">
          <!--   Card Article  ---------------------------->
          <b-container class="card-content">
            <b-card-group
              class="list-group-item"
              id="myCard"
              ref="myCard"
              v-for="(article, index) in articles"
              :key="article.id">
              from index: {{ index }},
              <!-- <br />{{ article.user.username }} <br /> -->
              id article:{{ article.article_id }}
              
              <b-card
                :img-src="article.image"
                class="imageUrl
"
                rounded
                alt="Rounded image"
                img-top>
           
        
   
                <b-card-text>
                
         
                  <h5>{{ article.title }}:</h5>

                  <hr />
                  {{ article.description }}
                  
                </b-card-text>
              </b-card>

              <b-card-footer class="footer-card">
                <b-button id="show-btn" @click="showModal(article.article_id)">
                  <b-icon icon="chat-right-quote" aria-hidden="true"></b-icon>
                  Comment
                </b-button>
              </b-card-footer>
              <hr />
              <b> reply: </b>

              <CommentsList :article_id="article.article_id" />
            </b-card-group>
          </b-container>
          <!-- ------------------------- -->

          <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllArticles">
        Remove All
      </button>  -->
        </b-col>
      </b-row>
    </b-container>

    <!-- :::::::::  Modal  :::::::::::::::::::::::::::::::::::::::: -->
    <b-modal ref="my-modal" title="Post-Comment">
      <b-form v-on:submit="saveComments">
        <b-form-group id="reply-comment" label-for="input-comment">
          <b-form-input
            id="input-comment"
            v-model="formComment"
            type="text"
            placeholder="Enter comment"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
        {{ article.article_id }}
      </b-form>
    </b-modal>
    <!-- :::::::::  Modal  :::::::::::::::::::::::::::::::::::::::: -->
  </div>
</template>

<script>
import ArticleDataService from '../services/ArticleDataService'
import AddArticle from '../components/AddArticle.vue'
import CommentsList from '../components/CommentsList.vue'
import axios from 'axios'
import authHeader from '../services/auth-header'



const apiUrl = 'http://localhost:3000/api'
const config = {
  headers: authHeader()
}

export default {
  name: 'articles-list',

  props: {
    articles: {
      article_id:"",
      // default: () => [],
      // required: true,
      // type: Number,
      image:"",
    }
  },

  components: {
    AddArticle,
    CommentsList
  },

  data () {
    return {
    
      profile: "",   
      article_id:"",
      actualArticle:"",
      article:"",
      formComment: "",  
      comment: "",
      user:"",
      index:"",
      content: "",

    }
    
    
    
  },
  // ::::::::::::::::::::::::::::::::::::::::
  // ::::::::::::::::::::::::::::::::::::::::

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

    setActiveArticle (article, index) {
      this.currentArticle = article
      this.currentIndex = index
    },

    removeAllArticles () {
      ArticleDataService.deleteAll()
        .then(response => {
          console.log(response.data)
          this.refreshList()
        })
        .catch(e => {
          console.log(e)
        })
    },

    searchTitle () {
      ArticleDataService.findByTitle(this.title)
        .then(response => {
          this.articles = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },

    submit: function () {
      this.$refs.form.$el.submit()
    },

    showModal (articleId) {
      this.$refs['my-modal'].show()
      this.actualArticle = articleId
    },

    saveComments (event) {
      event.preventDefault()

      const data = {
        content: this.formComment,
        article_id: this.actualArticle
      }
      console.log(data)

      axios
        .post(`${apiUrl}/comments/:article_id`, data, config)

        .then(response => {
          this.comment = response.data.id
          // Upload image
          // url/artciles/ this.comment.id  / uploa
          console.log(response.data)
          this.submitted = true
        })
        .catch(e => {
          console.log(e)
        })
    },
    newComment () {
      this.submitted = false
      this.comment = {}
    }
  },
  mounted () {
    this.retrieveArticles()
  }
}
</script>
