<style scoped>
.list-group-item {
  background-color: #e7f3ec;
  /* display: flex; */
box-shadow: 2px 3px 10px 6px lightgrey;

  height: auto;
  border-radius: 8px 8px 8px 8px;
  margin-top: 1rem;
  height: 180px;
  
}
.footer-card
{
display: flex;
font-size: 12px;
/* align-content: flex-end; */
justify-content: space-between;
border-radius: 12px 12px 12px 12px;
margin-bottom: 3rem;

}
.user-comment
{
font-size: 12px;


}

/* .list {
  text-align: left;
  max-width: 750px;
  margin: auto;
} */
</style>

<template>
  <div class="list row">
    <div class="col-md-12">
    
    
      <b-card-group 
          class="list-group-item"
          v-for="comment in comments"
          :key="comment.id">
          <b-card-header>
          <!-- <p class="user-comment">from: {{ comment.user.username }}: </p> -->

          </b-card-header>
        
          <b-card-body>
          <h3>{{ comment.content }}</h3>
          </b-card-body>
          
          <b-card-footer  class="footer-card">
         
          <p> comment id {{ comment.comment_id }}
          / article id: {{ comment.article_id }}</p>
      <b-button pill variant="outline-danger" size="sm"

      @click="deleteComment(comment.comment_id)"
    >
    <b-icon icon="trash" aria-hidden="true"></b-icon>
      
    </b-button>
         </b-card-footer>
         
      </b-card-group>
      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeComments">
        Remove
      </button> -->
    </div>

    <!-- <b-card bg-variant="light" header="Light" class="text-center">
        <h4>Comment</h4>
    
       <b-card-text>
          <label><strong>Content:</strong></label> {{ currentComment.content }}
        </b-card-text>
        
         <b-card>
          <label><strong>Status:</strong></label> {{ currentComment.published ? "Published" : "Pending" }}
         </b-card>b-card-text>

        <a class="badge badge-warning"
          :href="'/comments/' + currentComment.id"
        >
          Edit
        </a>
    </div>   
  </b-card> -->
  </div>
</template>

<script>
import CommentDataService from '../services/CommentDataService'

export default {
  name: 'comments-list',
  props: {
    article_id: {
      type: Number,
      default: null
    },
    comment_id: {
      type: Number,
      default: null
    }
   
  },
  
  data () {
    return {
      comments: [],
      articles: [],
      currentComment: null,
      currentIndex: -1,
      index: '',
      comment: '',
      article: '',
      filterData: '',
      parameters: '',
      data: ''
    }
  },

  methods: {
    retrieveComments () {

      // Il faut changer cette méthode pour qu'elle envoit article_id à l'API pour pouvoir filtrer
      CommentDataService.getAll(this.article_id)
   
        .then(response => {
          this.comments = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },

    refreshList () {
      this.retrieveComments()
      this.currentComment = null
      this.currentIndex = -1
    },

    setActiveComment (comment, index) {
      this.currentComment = comment
      this.currentIndex = index
    },

     deleteComment(comment_id) {
     this.comment_id = this.comment.comment_id
     console.log(comment_id)

      CommentDataService.delete(comment_id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Comments" });
          this.refreshList()
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle () {
      CommentDataService.findByTitle(this.title)
        .then(response => {
          this.comments = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.retrieveComments()
    console.log('COMMENTS')
    console.log(this.article_id)
  }
}
</script>
